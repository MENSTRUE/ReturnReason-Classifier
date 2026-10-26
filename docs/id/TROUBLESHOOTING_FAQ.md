# Troubleshooting dan FAQ

> Prototipe riset; bukan sistem produksi.

**UI blank / TS1192 / no default export:** pastikan `frontend/src/App.tsx` menutup dengan `export default App;`, lalu `npm run build`.

**Model unavailable / 503:** cek `models/indobert/model.safetensors`, config dan tokenizer; cocokkan SHA-256; periksa `RRC_MODEL_DIR`.

**Health model_loaded=false:** normal sebelum request pertama (lazy loading).

**CORS/fetch failure:** backend `:8000`, frontend `:5173`, cek `VITE_API_BASE_URL` dan origins.

**Pytest mock gagal:** patch simbol `classify` pada modul tempat endpoint menggunakannya (`app.api.routes`), bukan lokasi definisi yang tidak dipakai.

**Slow first response:** pemuatan checkpoint CPU lazily membutuhkan memori/waktu.

**Git push >100MB:** model disimpan lokal dan di-ignore; bila pernah committed, butuh pembersihan history dengan backup + koordinasi force push.

**Mengapa akurasi 95% tetapi demo gagal?** angka dari synthetic-family heldout, bukan pelanggan nyata; perbedaan domain dan label bisa besar.

**Apakah 82% berarti 82% kemungkinan benar?** Tidak, skor softmax belum dikalibrasi.

**Mengapa pesan bukan retur diberi kelas?** Lima kelas tanpa OOD reject.

**Bolehkah dipakai refund otomatis?** Tidak.

**Apakah dashboard menyimpan data?** Riwayat hanya dalam state sesi browser; log server/operator tetap perlu diaudit terpisah sebelum deploy.

**Apakah tersedia checkpoint di GitHub?** Tidak.

**Apakah source license berarti dataset/model license?** Tidak, MIT hanya source code sesuai file LICENSE.

---

Rujukan utama: [`../../reports/final_summary.json`](../../reports/final_summary.json) · [`../../models/model_config.json`](../../models/model_config.json) · [`../../AGENTS.md`](../../AGENTS.md).
