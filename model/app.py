import pandas as pd
import numpy as np
import pickle
from flask import Flask, request

app = Flask(__name__)
model = pickle.load(open('models/xgboost-model.pkl','rb'))

def predict(data):
    input_df = pd.DataFrame({
        "batting_team": [data['batting_team']],
        "bowling_team": [data['bowling_team']],
        "city": [data['city']],
        "current_score": [data['current_score']],
        "balls_left": [data['balls_left']],
        "wickets_left": [data['wickets_left']],
        "crr": [data['crr']]
    })
    return int(round(model.predict(input_df)[0]))

@app.route("/predict-score", methods=["POST"])
def predict_score():
    data = request.json
    print(data)
    result = predict(data)
    return str(result)