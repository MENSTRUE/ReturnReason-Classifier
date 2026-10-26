# AGENTS.md — ReturnReason Classifier project contract

**Applies to every human or AI coding agent working on this repository.** Read this document and the root README before making changes. This is a research portfolio project; prioritize correctness, transparency and reproducibility over marketing polish. **Never silently commit or push** without explicit user authorization.

## 1. Mission and non-goals

Build and document a real local Indonesian return-reason *suggestion* system (IndoBERT → FastAPI → React), retaining human review. Not a production returns engine, refund decision-maker, fraud detector or proven real-customer classifier. Preserve existing functional paths; do not substitute hard-coded predictions or mock success for a missing model.

## 2. Source-of-truth hierarchy

1. Actual code, Git tree, tracked configs and checkpoint metadata.
2. `reports/final_summary.json`, split metric JSON, synthetic generation contract, checksums and confusion matrices.
3. Executed `notebooks/returnreason-classifier.ipynb` (distinguish source from executed outputs).
4. Test logs with date, command, environment and commit SHA.
5. Documentation and screenshots (secondary evidence).

When conflicting: **stop, explain, reconcile**. Never invent performance or assert that unexecuted tests pass. Do not treat an empty placeholder directory as implemented functionality.

## 3. Frozen evidence at the inspected revision

- `indobenchmark/indobert-base-p1`; five labels `defect`, `late_delivery`, `missing_item`, `size`, `wrong_item`.
- Sources: Bitext 44,884; Return Abuse 60,000; SEA-ID 1,000 source rows. These are **not** all supervised training examples.
- Generated synthetic 1,200 (840 train, 120 validation, 240 test); Bitext proxy training 3,629; external diagnostic 34; human-verified gold 0.
- Synthetic heldout: accuracy 0.9541666667; macro-F1 0.9533565857 (N=240).
- External diagnostic: accuracy 0.7352941176; macro-F1 0.4888888889 (N=34); only 3 observed classes.
- 3-epoch IndoBERT training status in `reports/indobert_status.json`; validation macro-F1 1.0 is not a production claim.
- Weights `models/indobert/model.safetensors` absent from Git; screenshots folder contains `.gitkeep`, not demo PNGs.
- Backend previously reported 7 tests passed; not an automatic claim for new changes.

Only update these statements after creating traceable replacement evidence and recording what changed.

## 4. Repository map / ownership

- `backend/app/main.py`: FastAPI app; `api/routes.py`: `/health`, `/predict`, `/batch`.
- `backend/app/core/settings.py`: environment, paths, review threshold, length and CORS settings.
- `backend/app/services/classifier.py`: local model loading, inference, label mapping, softmax and review metadata.
- `backend/app/schemas/prediction.py`: request validation; `backend/tests/test_api.py`: API contract tests.
- `frontend/src/App.tsx`: UI flows; `styles.css`: design; `main.tsx`: mount.
- `models/model_config.json`: class schema; `models/indobert/`: config/tokenizer; **weights excluded**.
- `notebooks/returnreason-classifier.ipynb`: experiment/training provenance.
- `reports/`: experiment evidence; `assets/plots/`: actual confusion matrices; `assets/screenshots/`: awaiting real PNGs.
- `data/raw|interim|processed`, `ml/*`, `scripts`, `tests`: mostly scaffolding; do not imply implementations.
- `exports/demo_predictions.csv`: demo data; `exports/real_return_annotations_TEMPLATE.csv`: annotation template, not gold labels.
- `docs/id`, `docs/en`, `backend/README.md`, `frontend/README.md`: placeholders unless separately populated.

## 5. Non-negotiable ML safeguards

- Never train on external heldout/test data, invent human labels or merge split families after evaluation.
- Always separate source-row counts from actual training counts and identify synthetic/proxy/human provenance.
- Preserve class order and verify `id2label`/`label2id` against model config before inference.
- No generic base model may be described as the task-trained checkpoint.
- Never call raw softmax a calibrated probability; never equate high score with correctness.
- Never claim rejection/OTHER, multi-label reasoning or human-gold accuracy without a trained/evaluated implementation.
- Retain manual review for every result, even `SUGGESTED`.
- Audit negation, quantity, mixed intent, slang and out-of-scope examples in future evaluation.

## 6. API and UI contracts

- `/health` reports artifact availability; do not pretend a successful load without actual inference.
- `/predict`: nonempty Indonesian text (schema max 2500 characters); `/batch`: up to 20 items.
- Response fields: `predicted_reason`, `display_label`, `score`, `scores`, `decision`, `manual_review_required`, `review_reason`, `confidence_is_calibrated`, `disclaimer`.
- `REVIEW_THRESHOLD` (default 0.65) is a **routing heuristic**, not validated rejection or calibrated confidence.
- `manual_review_required` must remain true; `confidence_is_calibrated` must remain false until independently demonstrated otherwise.
- On missing weights/import failures, surface actionable errors and 503; **no fake/demo fallback** on production API paths.
- Keep history accurately described as browser-session history until durable backend persistence exists.

## 7. Workflow: Before → Now → Next

**Before editing:** inspect tree and affected source; read model/metrics manifests; identify the user's specific objective; list risks and test plan. **Now:** implement the smallest coherent change, keep backend/frontend schemas aligned, add tests and documentation, preserve known failure examples. **Next:** run relevant tests, report exact commands and results, update affected docs/evidence and provide a concise change summary. Never mark roadmap items complete based solely on writing documentation.

## 8. Validation gates

Backend (from `backend/`): `python -m pytest tests -q` and `python -m uvicorn app.main:app --reload` with a real matching checkpoint when testing inference.
Frontend (from `frontend/`): `npm install`, `npm run build`, `npm run dev` and manual UI test.
API: check `/health`, valid `/predict`, blank input, 2500+ chars, batch cap, missing checkpoint 503, score shape and label mapping.
ML: confirm dataset provenance, split isolation, per-class support, reproducibility settings, checkpoint hash, metrics and confusion matrices.
Security: no secret/PII/weights/large datasets committed; avoid customer-message logs; verify CORS and request limits.

**Report statuses precisely:** PASS (executed), FAIL (executed), NOT RUN, BLOCKED (missing dataset/checkpoint/environment). Never substitute a historical result for a fresh one.

## 9. Screenshot and asset policy

Only link real committed files. Existing plots:
- `assets/plots/synthetic_family_heldout_confusion_matrix.png`
- `assets/plots/SEA_ID_synthetic_external_confusion_matrix.png`

`assets/screenshots/` currently contains `.gitkeep`. After copying actual screenshots, name descriptively, keep a screenshot manifest, remove private text, and distinguish success/failure screenshots. Never create placeholder images and imply they are genuine results. Update README image paths only after verifying file existence.

## 10. Dataset, reproducibility and licensing

Kaggle bundle recorded: `/kaggle/input/datasets/wafabila/returnreason-classifier-multi-source-dataset/`; upstream provenance/licenses not established by path alone. Synthetic contract seed=42; 50 authored templates, 10 families/class, 1200 rows. Exact training reproduction requires input datasets, notebook environment, dependencies and checkpoint hashes. Preserve `reports/release_checksums.json`; verify against actual bytes. MIT applies to original repository code, not automatically to datasets, pretrained weights or other third-party content.

## 11. Security, privacy and deployment

This is a local research preview. No automatic refund/return adjudication. For hosted deployment require auth, rate limiting, TLS, appropriate CORS, PII minimization, logging policy, data retention/deletion, dependency and artifact verification, load tests, observability, and independent human-gold validation. Do not make network calls with user text without explicit product authorization.

## 12. Troubleshooting decision tree

- 503 / model unavailable → check `models/indobert/model.safetensors`, model directory env and package installs.
- Wrong labels → inspect `models/model_config.json`, checkpoint `id2label`, tokenizer and training order; never sort labels blindly.
- UI fetch fails → verify API running, `frontend/.env`, port and CORS.
- `ModuleNotFoundError: app` → run uvicorn from `backend/`.
- High score but wrong answer → distribution shift/negation/closed taxonomy; capture failure, do not claim threshold solves it.
- Broken screenshot → ensure PNG actually tracked at the referenced path.

## 13. Claim boundary checklist

Before writing README, demo, social post or PR description, ask:
1. Is this a fact observed in code/report or only an aspiration?
2. Is the metric synthetic, proxy, external, or independently human verified?
3. Are sample sizes and class support stated?
4. Are scores explicitly uncalibrated?
5. Are failures and out-of-scope limitations visible?
6. Are source data and checkpoint redistribution rights verified?
7. Are tests really executed for this change?

If any answer is unknown, state **unknown/not verified**, never guess.

## 14. Roadmap priorities

P0 human-gold corpus + provenance/annotation agreement; P1 multi-intent/out-of-scope and calibration; P2 reviewer correction UI + privacy-safe persistence + E2E tests; P3 CI, reproducible packaging, model/data cards, security and deployment. Do not sacrifice these for cosmetic metrics.

## 15. FAQ for contributors

**Can I change the five labels?** Only with a versioned ontology migration, retraining, tests, updated UI mapping and metrics.

**Can I add a heuristic OTHER?** You may propose a clearly named routing policy, but never call it a trained class or validated rejection.

**Can I overwrite report JSONs to make the README consistent?** No. Re-run the experiment or correct a demonstrable provenance error with an audit trail.

**Can I include Kaggle datasets or model weights?** Not until size, privacy, provenance and license checks pass.

**Can I publish screenshots from this chat as if committed?** No; the user must add the real images to the tracked assets directory.

**Can I auto-commit?** No. Only after explicit authorization.


## Documentation sync contract

When any API, model, dataset, metric, UI behavior, or deployment claim changes, update relevant sections in `README.md`, `docs/id/*.md`, `docs/en/*.md`, `backend/README.md`, and `frontend/README.md`; preserve parity in facts. Screenshot evidence resides at `assets/screenshots/` and must be linked only if an actual file exists. Do not promote manual screenshots to population metrics. Do not change the source-of-truth research numbers without matching report artifacts.
