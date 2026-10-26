# Datasets & Provenance

> Research prototype; not production-ready.

Kaggle project input bundle `/kaggle/input/datasets/wafabila/returnreason-classifier-multi-source-dataset/`: `bitext-retail/bitext-retail-ecommerce-llm-chatbot-training-dataset.csv` (44,884 rows), `ecommerce-returns/ecommerce_return_abuse_dataset.csv` (60,000), and `return-reasons-id/data.csv` (1,000).

These are experiment-local paths, not permanent public URLs or proof of dataset licensing.

Verify original source licensing before redistribution.

**Source rows are not training rows.** Experiment report: 1,200 synthetic examples constructed from 50 manually authored semantic templates, programmatic variants, seed 42; split 840 train, 120 validation, 240 test, balanced across five classes.

Additionally 3,629 Bitext proxy training rows appear in the report.

SEA-ID external diagnostic has only 34 examples, with synthetic diagnostic labels, spanning only three observed classes (15 late_delivery, 10 defect, 9 wrong_item).

There are **zero independently human-verified gold test examples**.

Return Abuse was not used to self-label free-text return reasons; SEA external was not used for training.

`data/raw`, `data/interim`, and `data/processed` are currently `.gitkeep` placeholders in Git.

Canonical classes: defect, late_delivery, missing_item, size, wrong_item.

Beware templating overlap, leakage, domain shift.

A human annotation template exists at `exports/real_return_annotations_TEMPLATE.csv` and tracks permission; never commit private customer records.

---

Evidence index: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
