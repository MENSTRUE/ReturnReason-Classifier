# Reproduksibilitas dan Testing

> Prototipe riset; bukan sistem produksi.

Paket ini tidak menyertakan `models/indobert/model.safetensors` (~475 MiB) sebab batas ukuran GitHub.

Checkpoint disimpan di luar Git; salin ke `models/indobert/model.safetensors`.

Verifikasi SHA-256 terhadap `reports/release_checksums.json` untuk memastikan berat yang tepat; metadata/tokenizer saja tidak cukup untuk inferensi.

Notebook eksperimen `notebooks/returnreason-classifier.ipynb` merekam training, tetapi hasil dapat berubah jika dataset sumber, package, seed, GPU/Kaggle runtime berubah; tidak ada lockfile Python end-to-end atau jalur one-click retraining yang diverifikasi dari fresh clone.

Langkah: Python 3.11 → virtualenv → `pip install -r backend/requirements.txt` → di `backend/` `python -m pytest -v` dan `python -m uvicorn app.main:app --reload`; frontend Node/npm → `cd frontend`, `npm install`, `npm run build`, `npm run dev`.

Akses `http://127.0.0.1:8000/docs` dan `http://127.0.0.1:5173`.

Contoh PowerShell dari root: `Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8000/api/v1/predict -ContentType application/json -Body '{"text":"Sepatu ini kekecilan, ukurannya tidak sesuai."}'`.

Saat pemeriksaan lokal backend 7 tests passed; repo GitHub bisa tertinggal dari perubahan lokal, jadi cek status Git dan ulangi tes.

Smoke test API, lalu test single/batch/history/JSON export.

Tidak ada CI/deployment produksi yang terverifikasi.

---

Rujukan utama: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
