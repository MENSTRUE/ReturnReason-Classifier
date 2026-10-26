# Troubleshooting and FAQ

> Research prototype; not production-ready.

**Blank UI / TS1192 / missing default export:** ensure `frontend/src/App.tsx` ends with `export default App;`, then `npm run build`.

**503 / model unavailable:** check `models/indobert/model.safetensors`, config/tokenizer and SHA-256; verify `RRC_MODEL_DIR`.

**Health reports model_loaded=false:** expected before lazy first prediction.

**CORS/fetch failure:** confirm backend `:8000`, frontend `:5173`, `VITE_API_BASE_URL` and allowed origins.

**Failing pytest mock:** patch `classify` where routes import it (`app.api.routes`).

**Slow initial response:** loading large CPU checkpoint is expected.

**Git push rejects >100MB:** keep weights local and ignored; if weight entered history, removal requires backup and carefully coordinated history rewrite.

**Why 95% reported but manual errors?** synthetic-family holdout does not validate real customers.

**Does 82% mean 82% correct?** No, uncalibrated softmax.

**Why label a non-return question?** Five-way forced classifier with no trained OOD rejection.

**Automatic refunds?** No.

**History persistence?** Browser session state only; separate server logs still require review.

**Checkpoint on GitHub?** No.

**Does MIT cover external data/models?** No; verify each asset's own license.

---

Evidence index: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
