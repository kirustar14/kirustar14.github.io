import torch
from torch import nn
import torch.nn.functional as F
from torch.utils.data import Dataset
from collections import Counter, defaultdict
import re
from tqdm import tqdm  # Ensure this is installed: pip install tqdm

def train_bpe(texts, num_merges):
    # 1. Initialize vocabulary with characters and word-end markers
    word_counts = Counter()
    for text in texts:
        for word in text.split():
            word_counts[" ".join(list(word)) + " </w>"] += 1

    merges = []
    # Progress bar for learning merges
    for i in tqdm(range(num_merges), desc="Learning BPE Merges"):
        pairs = defaultdict(int)
        for word, freq in word_counts.items():
            symbols = word.split()
            for i in range(len(symbols) - 1):
                pairs[symbols[i], symbols[i+1]] += freq
        
        if not pairs:
            break
            
        best_pair = max(pairs, key=pairs.get)
        merges.append(best_pair)
        
        new_word_counts = {}
        bigram = re.escape(' '.join(best_pair))
        replacement = ''.join(best_pair)
        pattern = re.compile(r'(?<!\S)' + bigram + r'(?!\S)')
        
        for word, freq in word_counts.items():
            new_word = pattern.sub(replacement, word)
            new_word_counts[new_word] = freq
        word_counts = new_word_counts
        
    return merges

class BPETokenizer:
    def __init__(self, merges):
        self.merges = merges
        self.vocab = {"<PAD>": 0, "<UNK>": 1}
        
        current_idx = 2
        for pair in merges:
            token = "".join(pair)
            if token not in self.vocab:
                self.vocab[token] = current_idx
                current_idx += 1
        
        for pair in merges:
            for char in pair:
                if char not in self.vocab:
                    self.vocab[char] = current_idx
                    current_idx += 1

    def tokenize(self, text):
        words = [list(w) + ["</w>"] for w in text.split()]
        for pair in self.merges:
            first, second = pair
            for i in range(len(words)):
                j = 0
                while j < len(words[i]) - 1:
                    if words[i][j] == first and words[i][j+1] == second:
                        words[i][j:j+2] = ["".join(pair)]
                    else:
                        j += 1
        
        indices = []
        for word in words:
            for subword in word:
                indices.append(self.vocab.get(subword, self.vocab["<UNK>"]))
        return indices

class SentimentDatasetBPE(Dataset):
    def __init__(self, infile, tokenizer, max_length=128):
        self.examples = []
        self.tokenizer = tokenizer
        self.max_length = max_length
        
        # Read file lines first to get a total for the progress bar
        with open(infile, 'r') as f:
            lines = [line for line in f if line.strip()]
        
        # Progress bar for tokenizing the dataset
        for line in tqdm(lines, desc=f"Tokenizing {infile.split('/')[-1]}"):
            parts = line.strip().split("\t")
            label = int(parts[0])
            text = parts[1].lower()
            
            tokens = self.tokenizer.tokenize(text)
            
            if len(tokens) > max_length:
                tokens = tokens[:max_length]
            else:
                tokens = tokens + [0] * (max_length - len(tokens))
            
            self.examples.append((torch.tensor(tokens), torch.tensor(label)))

    def __len__(self):
        return len(self.examples)

    def __getitem__(self, idx):
        return self.examples[idx]

class DAN_BPE(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_size):
        super().__init__()
        self.embeddings = nn.Embedding(vocab_size, embedding_dim, padding_idx=0)
        nn.init.xavier_uniform_(self.embeddings.weight)
        
        
        self.dropout = nn.Dropout(0.4) 
        
        self.fc1 = nn.Linear(embedding_dim, hidden_size)
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, 2)
        
        # LayerNorm helps, but let's keep it simple
        self.ln1 = nn.LayerNorm(hidden_size)

    def forward(self, x):
        mask = (x != 0).float().unsqueeze(-1) 
        embedded = self.embeddings(x)
        
        # Apply dropout to embeddings instead of "Word Dropout"
        embedded = self.dropout(embedded) * mask
        
        # Masked Average
        summed = torch.sum(embedded, dim=1)
        lengths = torch.sum(mask, dim=1).clamp(min=1)
        averaged = summed / lengths
        
        # Feed-forward
        out = self.fc1(averaged)
        out = self.ln1(out)
        out = F.relu(out)
        out = self.dropout(out)
        
        out = self.fc2(out)
        out = F.relu(out)
        out = self.dropout(out)
        
        return F.log_softmax(self.fc3(out), dim=1)