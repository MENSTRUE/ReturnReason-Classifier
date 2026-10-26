# Arsitektur Sistem

> Prototipe riset; bukan sistem produksi.

Alur: React/TypeScript (`frontend/src/App.tsx`) → HTTP JSON → FastAPI (`backend/app/main.py`, `backend/app/api/routes.py`) → classifier (`backend/app/services/classifier.py`) → tokenizer + model lokal (`models/indobert`) → softmax lima kelas → hasil + peninjauan manusia.

API: `GET /api/v1/health`, `POST /api/v1/predict` body `{"text":"..."}`, dan `POST /api/v1/batch` body `{"texts":["...", "..."]}`.

Sumber konfigurasi `backend/app/core/settings.py`, `models/model_config.json`; CORS mengizinkan localhost:5173 dan 127.0.0.1:5173.

Model dimuat sekali secara lazy, CPU-compatible, inferensi dilindungi lock thread.

Status `model_available` bukan bukti validasi akurasi; `model_loaded` sebelum inferensi boleh false.

Batas 2.500 karakter/pesan, 20 pesan/batch.

Prototipe tidak memiliki authentication, authorization, persisted audit trail, rate limiting atau production monitoring.

Riwayat UI hanya state sesi browser.

---

Rujukan utama: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
