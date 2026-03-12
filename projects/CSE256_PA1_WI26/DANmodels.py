import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset

class DAN(nn.Module):
    def __init__(self, word_embeddings, hidden_size, output_size=2):
        super(DAN, self).__init__()
        # 1. Pretrained GloVe layer (frozen=False allows fine-tuning)
        self.embeddings = word_embeddings.get_initialized_embedding_layer(frozen=False)
        embedding_dim = word_embeddings.get_embedding_length()
        
        # New: Word Dropout to regularize the input
        self.emb_dropout = nn.Dropout(0.3)
        
        # 2. Feed-forward layers
        self.fc1 = nn.Linear(embedding_dim, hidden_size)
        self.fc2 = nn.Linear(hidden_size, output_size)
        self.dropout = nn.Dropout(0.2) 

    def forward(self, x):
        # x: [batch_size, seq_len]
        embedded = self.embeddings(x)
        
        # Apply word dropout before averaging
        embedded = self.emb_dropout(embedded)
        
        # Average across the sequence length (dim 1)
        averaged = torch.mean(embedded, dim=1)
        
        # Hidden layers
        out = self.fc1(averaged)
        out = F.relu(out)
        out = self.dropout(out)
        logits = self.fc2(out)
        
        return F.log_softmax(logits, dim=1)

class DANRandom(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_size, output_size=2):
        super(DANRandom, self).__init__()
        # Randomly initialized embedding layer
        self.embeddings = nn.Embedding(vocab_size, embedding_dim)
        
        # New: Word Dropout (highly effective when training from scratch)
        self.emb_dropout = nn.Dropout(0.3)
        
        self.fc1 = nn.Linear(embedding_dim, hidden_size)
        self.fc2 = nn.Linear(hidden_size, output_size)
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        embedded = self.embeddings(x)
        
        # Apply word dropout before averaging
        embedded = self.emb_dropout(embedded)
        
        averaged = torch.mean(embedded, dim=1)
        out = F.relu(self.fc1(averaged))
        out = self.dropout(out)
        return F.log_softmax(self.fc2(out), dim=1)

class SentimentDatasetDAN(Dataset):
    def __init__(self, examples, word_indexer, max_seq_len=64):
        self.examples = examples
        self.word_indexer = word_indexer
        self.max_seq_len = max_seq_len

    def __len__(self):
        return len(self.examples)

    def __getitem__(self, idx):
        words = self.examples[idx].words
        label = self.examples[idx].label
        
        # Map words to indices, use UNK (1) if not found
        indices = [self.word_indexer.index_of(w) if self.word_indexer.index_of(w) != -1 
                   else self.word_indexer.index_of("UNK") for w in words]
        
        # Pad with PAD (0) or truncate to keep batch sizes consistent
        if len(indices) < self.max_seq_len:
            indices += [self.word_indexer.index_of("PAD")] * (self.max_seq_len - len(indices))
        else:
            indices = indices[:self.max_seq_len]
            
        return torch.tensor(indices), torch.tensor(label)