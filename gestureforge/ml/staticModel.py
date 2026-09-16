import pickle
from pathlib import Path

MODEL_PATH = Path(__file__).parent / "models" / "staticModel.pkl"

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)