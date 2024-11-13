from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the pre-trained machine learning model
model = joblib.load('model/fake_log_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    message = data['message']  # Text to be checked
    prediction = model.predict([message])[0]
    return jsonify({'isFake': bool(prediction)})

if __name__ == '__main__':
    app.run(port=5001)
