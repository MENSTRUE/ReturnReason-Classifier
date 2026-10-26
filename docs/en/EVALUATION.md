# Evaluation and Audit

> Research prototype; not production-ready.

Primary evidence: `reports/final_summary.json`, `reports/synthetic_family_heldout_metrics.json`, `reports/SEA_ID_synthetic_external_metrics.json`, `reports/model_comparison.csv`, `reports/split_class_counts.csv`, and `assets/plots/*.png`.

Synthetic-family held-out n=240: accuracy 0.95417 and five-class macro-F1 0.95336, support 48 per class.

SEA-ID external diagnostic n=34: accuracy 0.73529, macro-F1 over five classes 0.48889; missing_item and size have **zero** observed support in this diagnostic.

Interpret the five-class macro average alongside per-class support.

IndoBERT finetuning completed three epochs per `reports/indobert_status.json`; real-customer metrics are unknown.

Synthetic-validation baselines in `reports/model_comparison.csv`: ID character SVM macro-F1 .95788, character logistic regression .95698, word SVM .90325, bilingual character SVM .83462.

Those are not real-world benchmarks or matched external results.

Exploratory 10-case manual checklist on Oct 26, 2026: 3 expectations matched and 7 did not; two cases explicitly probed OOD/multi-intent outside current learned label schema.

Failure examples: broken item → missing_item 57.6%; three ordered/two received → wrong_item 80.8%; correct size but broken zipper → size 94.5%; undamaged but too large → defect 92.7%; shop opening hours → missing_item 82.0%.

These percentages are **uncalibrated model softmax scores**, not correctness probabilities.

The checklist is not representative accuracy.

Before retraining, audit checkpoint label order, wrong predictions and independent annotation splits.

---

Evidence index: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
