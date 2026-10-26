# Dataset & Provenance

> Prototipe riset; bukan sistem produksi.

Dataset bersumber dari bundel Kaggle `/kaggle/input/datasets/wafabila/returnreason-classifier-multi-source-dataset/`: `bitext-retail/bitext-retail-ecommerce-llm-chatbot-training-dataset.csv` (44.884 baris), `ecommerce-returns/ecommerce_return_abuse_dataset.csv` (60.000), `return-reasons-id/data.csv` (1.000).

Nama direktori Kaggle adalah path lingkungan eksperimen, bukan URL publik permanen atau bukti lisensi.

Untuk akses dan ketentuan penggunaan cek halaman dataset asli secara terpisah.

**Jumlah data sumber bukan jumlah data yang dilatih.** Laporan mencatat 1.200 contoh sintetis dari 50 template semantik buatan manusia, variasi programatik, seed 42; split 840 train, 120 validation, 240 test, seimbang lima kelas.

Selain itu 3.629 baris Bitext digunakan sebagai proxy training (total jumlah pelatihan tercatat bergantung komposisi eksperimen).

Evaluasi external SEA-ID 34 contoh dengan label sintetis/diagnostik, hanya 3 kelas diamati (15 late_delivery, 10 defect, 9 wrong_item); **0 gold test beranotasi manusia**.

Return Abuse tidak digunakan sebagai alasan retur self-labeled, SEA external tidak dipakai training, dan `data/raw`, `data/interim`, `data/processed` dalam Git hanya placeholder `.gitkeep`.

Kelas canonical dari `models/model_config.json`: defect, late_delivery, missing_item, size, wrong_item.

Template overlap/leakage risk dan domain shift harus diuji; jangan memperlakukan synthetic test sebagai real customer data.

Template anotasi tersedia `exports/real_return_annotations_TEMPLATE.csv` dengan `source_permission` dan `annotator_id`; jangan commit informasi pribadi.

---

Rujukan utama: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
