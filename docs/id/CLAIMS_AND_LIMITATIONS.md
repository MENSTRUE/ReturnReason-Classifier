# Batas Klaim dan Keterbatasan

> Prototipe riset; bukan sistem produksi.

Yang dapat diklaim: prototipe NLP end-to-end lokal, checkpoint IndoBERT nyata, inferensi berbasis FastAPI, dashboard React, skor lima kelas, manual human confirmation, dan metrik sintetis yang diberi konteks.

Jangan klaim: 95% akurasi pelanggan nyata; model mampu memahami negasi; OOD detection terlatih; multi-label; softmax sebagai probabilitas terkalibrasi; automatic refund/fraud prevention; siap produksi; pelabelan gold independen.

`SUGGESTED` berarti top score ≥ threshold kebijakan sementara 0,65; `REVIEW` berarti di bawah threshold.

Keduanya tetap memerlukan manusia (`manual_review_required=true`).

Threshold tidak diuji sebagai safety guarantee.

Setiap perubahan ke kemampuan/bukti harus diperbarui serentak di README, docs dua bahasa, dan AGENTS.

Metrik validasi hasil training tidak boleh dibandingkan tanpa syarat dengan external diagnostic yang label/support-nya berbeda.

---

Rujukan utama: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
