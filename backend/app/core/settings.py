from pathlib import Path
import os
ROOT = Path(__file__).resolve().parents[3]
MODEL_DIR = Path(os.environ.get("RRC_MODEL_DIR", str(ROOT / "models" / "indobert")))
MODEL_CONFIG = Path(os.environ.get("RRC_MODEL_CONFIG", str(ROOT / "models" / "model_config.json")))
ALLOWED_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]
MAX_CHARS = 2500
MAX_BATCH = 20
REVIEW_THRESHOLD = float(os.getenv("RRC_REVIEW_THRESHOLD", "0.65"))
MAX_LENGTH = int(os.getenv("RRC_MAX_LENGTH", "192"))
