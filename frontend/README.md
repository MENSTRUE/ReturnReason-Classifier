# Frontend — ReturnReason Classifier

React 18 + TypeScript + Vite workspace. The UI is a local experimental dashboard, not an approval engine. See [architecture](../docs/en/ARCHITECTURE.md), [claim boundaries](../docs/en/CLAIMS_AND_LIMITATIONS.md).

```powershell
cd frontend
npm install
npm run build
npm run dev
```

Configure `VITE_API_BASE_URL=http://127.0.0.1:8000` with `frontend/.env.example` as reference; launch at `http://127.0.0.1:5173`. Backend must be running. Features: single prediction, up to 20-message batch, result distribution, JSON export, in-session history, research methodology page. User-facing model scores are uncalibrated; high scores can be confidently wrong. All cases require review.

If error `TS1192` occurs, ensure `src/App.tsx` has `export default App;`. If network errors occur, inspect browser DevTools Network and check backend health. `model_available` badge means artifacts exist; it does not certify prediction quality.
