# System Architecture

> Research prototype; not production-ready.

Flow: React/TypeScript (`frontend/src/App.tsx`) → HTTP JSON → FastAPI (`backend/app/main.py`, `backend/app/api/routes.py`) → classifier (`backend/app/services/classifier.py`) → local tokenizer + model (`models/indobert`) → five-class softmax → suggestion plus human review.

Endpoints: `GET /api/v1/health`, `POST /api/v1/predict` with `{"text":"..."}`, `POST /api/v1/batch` with `{"texts":["...", "..."]}`.

Configuration: `backend/app/core/settings.py` and `models/model_config.json`.

CORS permits localhost:5173 and 127.0.0.1:5173.

Model loads lazily once; inference is CPU compatible and protected by a thread lock.

`model_available` is not quality validation; `model_loaded=false` is normal before inference.

Limits: 2,500 chars/message, 20 messages/batch.

No authentication, persistent audit trail, rate limiting, production monitoring or authorization.

UI history lasts only in browser session.

---

Evidence index: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
