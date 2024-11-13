
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import joblib

# Check the current working directory
print("Current working directory:", os.getcwd())

# Check if the CSV file exists
file_path = 'logs.csv'
if not os.path.exists(file_path):
    print(f"Error: File '{file_path}' not found!")
    exit(1)  # Exit if the file is not found
else:
    print(f"File '{file_path}' exists.")

# Load the CSV data
try:
    data = pd.read_csv(file_path, encoding='utf-8', skip_blank_lines=True)
    print("Data loaded successfully.")
    print(data.head())
except pd.errors.EmptyDataError:
    print("Error: No columns to parse from file.")
    exit(1)
except pd.errors.ParserError as e:
    print(f"ParserError: {e}")
    exit(1)
except Exception as e:
    print(f"An unexpected error occurred: {e}")
    exit(1)

# Ensure the data contains the required columns
if 'message' not in data.columns or 'is_fake' not in data.columns:
    print("Error: Required columns ('message', 'is_fake') not found in the data.")
    exit(1)

# Check for missing values in the data
data.dropna(subset=['message', 'is_fake'], inplace=True)

# Vectorize the 'message' column
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(data['message'])
y = data['is_fake']

# Train the RandomForest model
model = RandomForestClassifier(random_state=42)
model.fit(X, y)

# Save the trained model
model_filename = 'fake_log_model.pkl'
joblib.dump(model, model_filename)

print(f"Model training complete and saved as '{model_filename}'.")
