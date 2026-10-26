# Roadmap dan Before–Now–Next

> Prototipe riset; bukan sistem produksi.

**BEFORE:** problem taxonomy alasan retur, eksplorasi sumber Bitext/Return Abuse/SEA-ID, pelatihan template sintetis, baseline klasifikasi.

**NOW (Day 19, 26 Okt 2026):** notebook training, checkpoint IndoBERT lokal, API single/batch, React dashboard, metrik terlapor, dua confusion matrix, 7 backend test lokal pernah lulus, 10 manual challenge menunjukkan 7 ketidaksesuaian.

**NEXT (urut prioritas):** (P0) cocokkan urutan id2label antara notebook/config/checkpoint dan regression set; (P0) publikasi transparan demo satu kasus benar dan laporan kegagalan; (P1) audit provenance/lisensi dataset; (P1) gold annotations independen minimum 100–200 kasus variatif termasuk negasi, multi-intent, OOD; (P1) evaluasi per kelas + confusion/error taxonomy; (P2) hard-negative dan fine-tuning terkendali; (P2) model reject/OOD dan strategi multi-label yang tervalidasi; (P3) calibration, CI, containerization, serving scaling, logging privacy, monitoring.

Target kualitas dinyatakan hipotesis hingga terbukti.

Tidak ada jadwal rilis produksi.

---

Rujukan utama: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
