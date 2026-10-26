# Evaluasi dan Audit

> Prototipe riset; bukan sistem produksi.

Sumber kebenaran angka: `reports/final_summary.json`, `reports/synthetic_family_heldout_metrics.json`, `reports/SEA_ID_synthetic_external_metrics.json`, `reports/model_comparison.csv`, `reports/split_class_counts.csv`, dan dua plot `assets/plots/*.png`.

Synthetic family held-out n=240: accuracy 0,95417, macro-F1 0,95336, masing-masing kelas support 48.

External SEA-ID diagnostik n=34: accuracy 0,73529, macro-F1 lima kelas 0,48889; support missing_item dan size = 0.

Nilai macro-F1 external mencakup kelas tanpa support sehingga perlu dibaca bersama class-level report.

Model IndoBERT fine-tuning 3 epoch (lihat `reports/indobert_status.json`), tetapi akurasi produksi tidak diketahui.

Model pembanding berdasarkan validasi sintetis (`reports/model_comparison.csv`): ID character SVM macro-F1 0,95788, ID character logistic regression 0,95698, ID word SVM 0,90325, bilingual character SVM 0,83462; nilai ini **bukan** benchmark pelanggan nyata atau perbandingan external yang setara.

Manual challenge 10 contoh pada 26 Okt 2026: 3 sesuai ekspektasi dan 7 tidak sesuai; dua contoh menguji OOD/multi-intent yang kelas model tidak bisa wakili.

Bukti contoh gagal: `Barang yang saya terima pecah ...` → missing_item (57,6% softmax) meski defect seharusnya; `Saya membeli tiga produk ...

dua` → wrong_item (80,8%) meski missing_item; `Ukuran sudah sesuai, tetapi resleting ...

rusak` → size (94,5%) meski defect; `Barangnya bagus dan tidak rusak, hanya terlalu besar` → defect (92,7%) meski size; `Halo, apakah toko masih buka?` → missing_item (82,0%) meski OOD.

Jangan menyebut checklist 10 contoh sebagai akurasi representatif.

Angka softmax bukan probabilitas keakuratan.

Sebelum memperbaiki training: audit label mapping dan contoh salah, evaluasi split independen/annotator, lalu re-train jika perlu.

---

Rujukan utama: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
