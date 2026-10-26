# Roadmap and Before–Now–Next

> Research prototype; not production-ready.

**BEFORE:** return taxonomy, Bitext/Return Abuse/SEA-ID source exploration, synthetic templates, baseline classifiers.

**NOW (Day 19, Oct 26, 2026):** training notebook, local IndoBERT checkpoint, single/batch API, React UI, documented metrics, two confusion matrices, seven locally passed backend tests, and ten challenging manual cases with seven expectation mismatches.

**NEXT (priority):** (P0) verify notebook/config/checkpoint id2label order and retain regression cases; (P0) transparently publish one successful demo alongside known failures; (P1) dataset permission/license audit; (P1) independent human-annotated gold sample of 100–200 varied examples including negation, multi-intent, OOD; (P1) per-class evaluation and error taxonomy; (P2) controlled hard negatives and fine-tuning; (P2) validated reject/OOD and multi-label design; (P3) calibration, CI, container deployment, privacy-preserving audit, monitoring.

All performance targets remain hypotheses until measured.

No production release schedule.

---

Evidence index: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
