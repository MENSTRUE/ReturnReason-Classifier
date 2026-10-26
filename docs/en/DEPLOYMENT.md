# Deployment and Security

> Research prototype; not production-ready.

Current status is local demo only; do not expose raw endpoints publicly.

Before production: verify dataset/checkpoint redistribution rights; secrets management; authentication; rate limiting; HTTPS; narrowed CORS; log and PII minimization; consent; retained audit trail; encrypted artifact storage; warm-up/readiness; RAM/CPU budgeting; model SHA/version verification; observability; rollback/canary; drift monitoring and incident response.

Do not commit customer records, large model files, `.env` or tokens.

`VITE_API_BASE_URL` is a public browser endpoint configuration, not a secret.

Backend knobs: `RRC_MODEL_DIR`, `RRC_MODEL_CONFIG`, `RRC_REVIEW_THRESHOLD`, `RRC_MAX_LENGTH`.

Model weights are hundreds of MB.

Keep actual returns decision-making human.

---

Evidence index: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
