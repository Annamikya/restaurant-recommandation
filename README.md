# Restaurant Rating Predictor

This project predicts restaurant ratings based on features like average cost for two, votes, online order availability, and table booking availability.

## Project Structure

- `model/`: Contains the trained machine learning model (`model.pkl`).
- `backend/`: FastAPI backend for prediction.
- `frontend/`: Simple HTML/CSS/JS frontend to interact with the API.

## Setup

1. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```

2. Run the backend:
   ```
   uvicorn main:app --reload
   ```

3. Open `frontend/index.html` in a browser to use the predictor.

## API Endpoints

- `GET /health`: Check API status.
- `POST /predict`: Predict rating based on input features.
