from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Restaurant Rating Predictor")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("../model/model.pkl")

class RestaurantInput(BaseModel):
    average_cost_for_two: float
    votes: int
    online_order: int
    table_booking: int

@app.get("/health")
def health():
    return {"status": "API is running"}

@app.post("/predict")
def predict(data: RestaurantInput):
    features = np.array([[
        data.average_cost_for_two,
        data.votes,
        data.online_order,
        data.table_booking
    ]])

    prediction = model.predict(features)
    return {"predicted_rating": round(float(prediction[0]), 2)}

# Mount static files (frontend)
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
