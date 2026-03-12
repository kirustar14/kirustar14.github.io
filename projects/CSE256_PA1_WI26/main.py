# models.py

import torch
from torch import nn
import torch.nn.functional as F
from sklearn.feature_extraction.text import CountVectorizer
from sentiment_data import read_sentiment_examples
from torch.utils.data import Dataset, DataLoader
import time
import argparse
import matplotlib.pyplot as plt
from torch.utils.data import DataLoader
from BOWmodels import SentimentDatasetBOW, NN2BOW, NN3BOW


from tqdm import tqdm

def train_epoch(data_loader, model, loss_fn, optimizer):
    size = len(data_loader.dataset)
    num_batches = len(data_loader)
    model.train()
    train_loss, correct = 0, 0
    
    # Wrap data_loader with tqdm for a progress bar
    progress_bar = tqdm(data_loader, desc="Training", leave=False)
    
    for batch, (X, y) in enumerate(progress_bar):
        # Move to device if using GPU, otherwise keep on CPU
        # X, y = X.to(device), y.to(device) 

        pred = model(X)
        loss = loss_fn(pred, y)
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        train_loss += loss.item()
        correct += (pred.argmax(1) == y).type(torch.float).sum().item()
        
        # Update progress bar with current loss
        progress_bar.set_postfix(loss=loss.item())

    return correct / size, train_loss / num_batches

def eval_epoch(data_loader, model, loss_fn, optimizer):
    model.eval()
    eval_loss, correct = 0, 0
    size = len(data_loader.dataset)
    
    # Progress bar for evaluation
    with torch.no_grad():
        for X, y in tqdm(data_loader, desc="Evaluating", leave=False):
            pred = model(X)
            eval_loss += loss_fn(pred, y).item()
            correct += (pred.argmax(1) == y).type(torch.float).sum().item()

    return correct / size, eval_loss / len(data_loader)


def experiment(model, train_loader, test_loader):
    loss_fn = nn.NLLLoss()
    # Start slightly lower to avoid overshooting the 77% peak
    optimizer = torch.optim.Adam(model.parameters(), lr=0.0005, weight_decay=1e-5)
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='max', factor=0.8, patience=5)

    best_dev_acc = 0.0
    
    for epoch in range(100):
        train_accuracy, _ = train_epoch(train_loader, model, loss_fn, optimizer)
        test_accuracy, _ = eval_epoch(test_loader, model, loss_fn, optimizer)
        
        scheduler.step(test_accuracy)

        if test_accuracy > best_dev_acc:
            best_dev_acc = test_accuracy
            # This "locks in" the best version of your model
            torch.save(model.state_dict(), 'best_subword_model.pt')

        if epoch % 10 == 9:
            print(f'Epoch #{epoch + 1}: Best Dev so far: {best_dev_acc:.3f}')
            
    print(f"Final Result: Highest Accuracy achieved was {best_dev_acc:.3f}")
    return best_dev_acc
def main():

    # Set up argument parser
    parser = argparse.ArgumentParser(description='Run model training based on specified model type')
    parser.add_argument('--model', type=str, required=True, help='Model type to train (e.g., BOW)')

    # Parse the command-line arguments
    args = parser.parse_args()

    # Load dataset
    start_time = time.time()

    train_data = SentimentDatasetBOW("data/train.txt")
    dev_data = SentimentDatasetBOW("data/dev.txt", vectorizer=train_data.vectorizer, train=False)
    train_loader = DataLoader(train_data, batch_size=16, shuffle=True)
    test_loader = DataLoader(dev_data, batch_size=16, shuffle=False)

    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Data loaded in : {elapsed_time} seconds")


    # Check if the model type is "BOW"
    if args.model == "BOW":
        # Train and evaluate NN2
        start_time = time.time()
        print('\n2 layers:')
        nn2_train_accuracy, nn2_test_accuracy = experiment(NN2BOW(input_size=512, hidden_size=100), train_loader, test_loader)

        # Train and evaluate NN3
        print('\n3 layers:')
        nn3_train_accuracy, nn3_test_accuracy = experiment(NN3BOW(input_size=512, hidden_size=100), train_loader, test_loader)

        # Plot the training accuracy
        plt.figure(figsize=(8, 6))
        plt.plot(nn2_train_accuracy, label='2 layers')
        plt.plot(nn3_train_accuracy, label='3 layers')
        plt.xlabel('Epochs')
        plt.ylabel('Training Accuracy')
        plt.title('Training Accuracy for 2, 3 Layer Networks')
        plt.legend()
        plt.grid()

        # Save the training accuracy figure
        training_accuracy_file = 'train_accuracy.png'
        plt.savefig(training_accuracy_file)
        print(f"\n\nTraining accuracy plot saved as {training_accuracy_file}")

        # Plot the testing accuracy
        plt.figure(figsize=(8, 6))
        plt.plot(nn2_test_accuracy, label='2 layers')
        plt.plot(nn3_test_accuracy, label='3 layers')
        plt.xlabel('Epochs')
        plt.ylabel('Dev Accuracy')
        plt.title('Dev Accuracy for 2 and 3 Layer Networks')
        plt.legend()
        plt.grid()

        # Save the testing accuracy figure
        testing_accuracy_file = 'dev_accuracy.png'
        plt.savefig(testing_accuracy_file)
        print(f"Dev accuracy plot saved as {testing_accuracy_file}\n\n")

        # plt.show()

    elif args.model == "DAN":
        #TODO:  Train and evaluate your DAN
        from DANmodels import DAN, SentimentDatasetDAN
        from sentiment_data import read_word_embeddings, read_sentiment_examples

        # Load 50d GloVe vectors
        word_embeddings = read_word_embeddings("data/glove.6B.50d-relativized.txt")
        
        train_exs = read_sentiment_examples("data/train.txt")
        dev_exs = read_sentiment_examples("data/dev.txt")
        
        train_data = SentimentDatasetDAN(train_exs, word_embeddings.word_indexer)
        dev_data = SentimentDatasetDAN(dev_exs, word_embeddings.word_indexer)
        
        train_loader = DataLoader(train_data, batch_size=64, shuffle=True)
        test_loader = DataLoader(dev_data, batch_size=64, shuffle=False)

        # Set hidden_size (experiment with 100-200)
        model = DAN(word_embeddings, hidden_size=512)
        
        print('\nStarting DAN Training...')
        experiment(model, train_loader, test_loader)
    
    elif args.model == "DAN_RANDOM":
        from DANmodels import DANRandom, SentimentDatasetDAN
        from sentiment_data import read_word_embeddings, read_sentiment_examples

        # We still need the indexer from GloVe to define our vocabulary,
        # but the DANRandom model will ignore the actual GloVe vectors.
        word_embeddings = read_word_embeddings("data/glove.6B.50d-relativized.txt")
        
        train_exs = read_sentiment_examples("data/train.txt")
        dev_exs = read_sentiment_examples("data/dev.txt")
        
        train_data = SentimentDatasetDAN(train_exs, word_embeddings.word_indexer)
        dev_data = SentimentDatasetDAN(dev_exs, word_embeddings.word_indexer)
        
        train_loader = DataLoader(train_data, batch_size=64, shuffle=True)
        test_loader = DataLoader(dev_data, batch_size=64, shuffle=False)

        # Initialize DANRandom with the size of our vocabulary
        vocab_size = len(word_embeddings.word_indexer)
        model = DANRandom(vocab_size=vocab_size, embedding_dim=50, hidden_size=512)
        
        print('\nStarting DAN Training (Random Initialization)...')
        experiment(model, train_loader, test_loader)
    
    elif args.model == "SUBWORDDAN":
        from bpe import train_bpe, BPETokenizer, SentimentDatasetBPE, DAN_BPE
        
        # --- EXPERIMENT SETTINGS ---
        num_merges = 4000 
        
        print(f"\n--- Starting BPE Experiment: {num_merges} merges ---")
        
        # Load training texts for BPE training (skipping labels)
        with open("data/train.txt", 'r') as f:
            train_texts = [line.strip().split(None, 1)[1] for line in f if line.strip()]
        
        # 1. Train BPE Merges
        merges = train_bpe(train_texts, num_merges)
        
        # 2. Build Tokenizer
        tokenizer = BPETokenizer(merges)
        
        # 3. Create Datasets (with progress bars)
        train_data = SentimentDatasetBPE("data/train.txt", tokenizer)
        dev_data = SentimentDatasetBPE("data/dev.txt", tokenizer)
        
        train_loader = DataLoader(train_data, batch_size=64, shuffle=True)
        test_loader = DataLoader(dev_data, batch_size=64, shuffle=False)
        
        # 4. Initialize Model
        # Note: vocab_size is determined by the BPE merges
        model = DAN_BPE(len(tokenizer.vocab), embedding_dim=128, hidden_size=256)
        
        print(f"BPE Subword Vocab Size: {len(tokenizer.vocab)}")
        print("Starting Model Training...")
        
        # 5. Run Experiment
        experiment(model, train_loader, test_loader)

if __name__ == "__main__":
    main()
