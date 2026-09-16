from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import sklearn
from .staticModel import model
from fastapi.middleware.cors import CORSMiddleware

# Python API service to process and detect gesture from Mediapipe data
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    landmarks: list[float]

@app.get("/")
def root():
    return {"status": "GestureForge inference service running"}

@app.post("/predict")
def predict(request: PredictionRequest):
    landmarks = np.array(request.landmarks, dtype=np.float32)           
    prediction = model.predict(landmarks.reshape(1, -1))[0]            
    probabilities = model.predict_proba(landmarks.reshape(1, -1))[0]   
    confidence = float(np.max(probabilities))                           

    return {
        "gesture": prediction,
        "confidence": confidence,
    }