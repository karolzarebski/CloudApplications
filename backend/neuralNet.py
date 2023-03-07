import pandas as pd
from sklearn import train_test_split
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset


# Define a PyTorch dataset for the training data
class VideoDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.tensor(X.values).float()
        self.y = torch.tensor(y.values).float()

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]


# Define a PyTorch neural network
class VideoNet(nn.Module):
    def __init__(self, shape):
        super(VideoNet, self).__init__()
        self.fc1 = nn.Linear(shape, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x


class NeuralNet:
    def __init__(self, connection):
        query = "SELECT Title, Likes, Comments, Views FROM VideoData"
        self.df = pd.read_sql_query(query, connection)

        # Preprocess the data
        self.X = self.df[['Title', 'Likes', 'Comments']]
        self.y = self.df['Views']

        # Convert the text data (title) to numerical features using one-hot encoding
        self.X = self.pd.get_dummies(self.X, columns=['Title'])
        self.net = None

        #begin training
        self.train()

    def train(self):
        # Split the data into training and validation sets
        X_train, X_val, y_train, y_val = train_test_split(self.X, self.y, test_size=0.2, random_state=42)
        self.net = VideoNet(X_train.shape[1])
        train_dataset = VideoDataset(X_train, y_train)
        train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
        # Define a loss function and an optimizer
        criterion = nn.MSELoss()
        optimizer = optim.Adam(self.net.parameters(), lr=0.001)

        # Train the neural network
        for epoch in range(100):
            running_loss = 0.0
            for i, data in enumerate(train_loader):
                inputs, labels = data
                optimizer.zero_grad()
                outputs = self.net.forward(inputs)
                loss = criterion(outputs, labels.unsqueeze(1))
                loss.backward()
                optimizer.step()
                running_loss += loss.item()
            print(f"Epoch {epoch + 1}, loss: {running_loss / len(train_loader)}")

        # Evaluate the model on the validation set
        with torch.no_grad():
            inputs = torch.tensor(X_val.values).float()
            labels = torch.tensor(y_val.values).float()
            outputs = self.net.forward(inputs)
            val_loss = criterion(outputs, labels.unsqueeze(1))
            print(f"Validation loss: {val_loss.item()}")

        # Save the model
        torch.save(self.net.state_dict(), 'video_net.pth')
