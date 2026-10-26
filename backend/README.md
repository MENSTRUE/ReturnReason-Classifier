# Backend — ReturnReason Classifier

FastAPI HTTP layer for a local IndoBERT research checkpoint. See [architecture](../docs/en/ARCHITECTURE.md), [testing](../docs/en/REPRODUCIBILITY.md), and [limitations](../docs/en/CLAIMS_AND_LIMITATIONS.md).

## Requirements
Python 3.11, model artifacts in `../models/indobert/` and configuration `../models/model_config.json`. From repo root:

```powershell
py -3.11 -m venv backend/.venv
backend/.venv/Scripts/python.exe -m pip install -r backend/requirements.txt
cd backend
.\.venv\Scripts\python.exe -m pytest -v
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

API: `GET /api/v1/health`, `POST /api/v1/predict`, `POST /api/v1/batch`; Swagger at `http://127.0.0.1:8000/docs`. Sample prediction body: `{"text":"Sepatu ini kekecilan, ukurannya tidak sesuai."}`. Batch body: `{"texts":["contoh satu", "contoh dua"]}` (max 20, 2,500 characters each).

A 503 indicates missing/unavailable model, 422 invalid input. All responses require human confirmation; score is not calibrated probability. Default threshold 0.65 routes low scores to `REVIEW`, not an independent OOD classifier.

Important: checkpoint is intentionally absent from GitHub; no external hosting is configured by default. See [FAQ](../docs/en/TROUBLESHOOTING_FAQ.md).
