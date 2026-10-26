# Reproducibility and Testing

> Research prototype; not production-ready.

The large `models/indobert/model.safetensors` (~475 MiB) is intentionally excluded from Git; copy your matching checkpoint to that path.

Verify SHA-256 from `reports/release_checksums.json`; config/tokenizer alone cannot execute inference.

Research notebook: `notebooks/returnreason-classifier.ipynb`.

A full clean-room Kaggle rerun has not been independently verified; datasets, package versions, GPU and random seeds can affect results.

Python 3.11: create a venv, `pip install -r backend/requirements.txt`; from `backend/` run `python -m pytest -v` and `python -m uvicorn app.main:app --reload`.

Node/npm: from `frontend/`, `npm install`, `npm run build`, `npm run dev`.

URLs: API docs `http://127.0.0.1:8000/docs`, UI `http://127.0.0.1:5173`.

PowerShell smoke test from root: `Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/api/v1/predict -ContentType application/json -Body '{"text":"Sepatu ini kekecilan, ukurannya tidak sesuai."}'`.

Seven backend tests reportedly passed locally; remote Git may lag local fixes, so rerun after synchronization.

Verify single/batch/history/JSON export separately.

No verified production CI or deployment exists.

---

Evidence index: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
