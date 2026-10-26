# Deployment dan Keamanan

> Prototipe riset; bukan sistem produksi.

Status saat ini hanya demo lokal; jangan publikasikan endpoint tanpa batasan.

Sebelum deployment: hak distribusi data/checkpoint, secrets via env, authentication, rate-limit, HTTPS, CORS domain spesifik, sanitasi log, PII minimization, consent, audit trail, encrypted artifact storage, model warmup/readiness, budget RAM CPU, model version & checksum, observability, rollback, canary, monitoring drift dan rencana incident response.

Jangan unggah data pelanggan, file model besar, .env, atau token ke Git.

Frontend env `VITE_API_BASE_URL` adalah alamat API publik untuk browser, bukan secret.

Backend env `RRC_MODEL_DIR`, `RRC_MODEL_CONFIG`, `RRC_REVIEW_THRESHOLD` dan `RRC_MAX_LENGTH`.

Periksa kebutuhan resource CPU/RAM, sebab checkpoint ratusan MB.

Keputusan retur tetap dilakukan manusia.

---

Rujukan utama: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
