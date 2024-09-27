import streamlit as st
import pandas as pd
import pickle

model = pickle.load(open('models/xgboost-model.pkl','rb'))

teams = [ 'India', 'Australia', 'England', 'South Africa', 'Pakistan', 'West Indies', 'Sri Lanka', 'New Zealand', 'Bangladesh', 'Afghanistan' ]
cities = ['Colombo', 'Mirpur', 'Johannesburg', 'Dubai', 'Auckland', 'Cape Town', 'London', 'Pallekele', 'Barbados', 'Melbourne', 'Durban', 'Wellington', 'St Lucia', 'Sydney', 'Hamilton', 'Lauderhill', 'Centurion', 'Manchester', 'Abu Dhabi', 'Southampton', 'Mumbai', 'Nottingham', 'Mount Maunganui', 'Chittagong', 'Kolkata', 'Lahore', 'Nagpur', 'Delhi', 'Cardiff', 'Christchurch', 'Bangalore', 'Chandigarh', 'Adelaide', 'St Kitts', 'Trinidad', 'Birmingham', 'Hambantota']

st.title('Cricket Analyzer')

col1, col2 = st.columns(2)

with col1:
    batting_team = st.selectbox('Select batting team', sorted(teams))

with col2:
    bowling_team = st.selectbox('Select bowling team', sorted(teams))

city = st.selectbox('Select city', sorted(cities))

col3, col4, col5, col6 = st.columns(4)

with col3:
    current_score = st.number_input('Current Score')

with col4:
    over = st.number_input('Over')

with col5:
    ball = st.number_input('Ball')

with col6:
    wickets = st.number_input('Wickets out')

if st.button('Predict Score'):
    balls_left = 120 - (over * 6 + ball)
    wickets_left = 10 - wickets
    crr = current_score / (over + ball / 6)

    input_df = pd.DataFrame({
        "batting_team": [batting_team], 
        "bowling_team": [bowling_team], 
        "city": [city], 
        "current_score": [current_score], 
        "balls_left": [balls_left], 
        "wickets_left": [wickets_left], 
        "crr": [crr]
    });

    result = int(round(model.predict(input_df)[0]));
    st.header("Predicted Score - " + str(result));
