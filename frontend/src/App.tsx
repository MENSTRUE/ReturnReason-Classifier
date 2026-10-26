
import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  ClipboardList,
  Download,
  FileText,
  History,
  Layers,
  LoaderCircle,
  RefreshCcw,
  ShieldAlert,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";

type Reason =
  | "defect"
  | "late_delivery"
  | "missing_item"
  | "size"
  | "wrong_item";

type Result = {
  text: string;
  predicted_reason: Reason;
  display_label: string;
  score: number;
  scores: Record<string, number>;
  decision: "SUGGESTED" | "REVIEW";
  manual_review_required: boolean;
  review_reason: string;
  confidence_is_calibrated: boolean;
  disclaimer: string;
};

type Health = {
  status: string;
  model_available: boolean;
  model_loaded: boolean;
  model_name: string;
};

type Navigation = "Classifier" | "History" | "Methodology";
type Mode = "single" | "batch";

const API = (
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

const labels: Record<string, string> = {
  defect: "Produk rusak",
  late_delivery: "Pengiriman terlambat",
  missing_item: "Barang kurang",
  size: "Masalah ukuran",
  wrong_item: "Barang tidak sesuai",
};

const examples = [
  "Sepatu ini kekecilan, ukurannya tidak sesuai.",
  "Produk pecah saat saya buka paketnya.",
  "Saya memesan warna hitam, tetapi dikirim warna putih.",
  "Pesanan seharusnya sampai kemarin, namun belum diterima.",
  "Dari tiga barang yang dibeli, satu tidak ada di paket.",
];

const exampleLabels = [
  "Ukuran",
  "Rusak",
  "Salah barang",
  "Terlambat",
  "Kurang",
];

function exportJSON(data: unknown, name: string) {
  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}

async function readResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    const detail = data?.detail;

    const message =
      typeof detail === "string"
        ? detail
        : detail
          ? JSON.stringify(detail)
          : `HTTP ${response.status}`;

    throw new Error(message);
  }

  return data;
}

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const [history, setHistory] = useState<Result[]>([]);

  const [busy, setBusy] = useState(false);
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState("");

  const [mode, setMode] = useState<Mode>("single");
  const [batch, setBatch] = useState("");
  const [batchResults, setBatchResults] = useState<Result[]>([]);

  const [navigation, setNavigation] =
    useState<Navigation>("Classifier");

  const checkHealth = useCallback(async () => {
    try {
      const response = await fetch(`${API}/api/v1/health`);
      const data = await readResponse(response);

      setHealth(data as Health);
    } catch {
      setHealth(null);
    }
  }, []);

  useEffect(() => {
    void checkHealth();
  }, [checkHealth]);

  async function analyze() {
    if (!text.trim() || busy) return;

    setBusy(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API}/api/v1/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.trim(),
        }),
      });

      const data = (await readResponse(response)) as Result;

      setResult(data);
      setHistory((previous) => [data, ...previous].slice(0, 15));

      await checkHealth();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat analisis."
      );
    } finally {
      setBusy(false);
    }
  }

  async function analyzeBatch() {
    if (busy) return;

    const texts = batch
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!texts.length) return;

    if (texts.length > 20) {
      setError("Maksimal 20 pesan dalam satu batch.");
      return;
    }

    if (texts.some((item) => item.length > 2500)) {
      setError("Setiap pesan maksimal 2.500 karakter.");
      return;
    }

    setBusy(true);
    setError("");
    setBatchResults([]);

    try {
      const response = await fetch(`${API}/api/v1/batch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texts }),
      });

      const data = await readResponse(response);
      setBatchResults(data.items as Result[]);

      await checkHealth();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat batch analysis."
      );
    } finally {
      setBusy(false);
    }
  }

  const available = health?.model_available ?? false;

  return (
    <div className="shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brandIcon">
            <BrainCircuit size={21} />
          </span>

          <span>
            return<span className="brandBold">reason</span>
            <small>INTELLIGENCE STUDIO</small>
          </span>
        </div>

        <div className="sectionCaption">WORKSPACE</div>

        {(
          [
            { name: "Classifier", icon: Sparkles },
            { name: "History", icon: History },
            { name: "Methodology", icon: ClipboardList },
          ] as const
        ).map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={`nav ${
              navigation === name ? "active" : ""
            }`}
            onClick={() => setNavigation(name)}
          >
            <Icon size={17} />
            {name}
          </button>
        ))}

        <div className="sidebarBottom">
          <span className="tinyDot" />
          RESEARCH PREVIEW
          <span className="version">v0.1</span>

          <p>
            Human review remains required for every
            recommendation.
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <header className="topbar">
          <span>
            <span className="muted">Workspace</span>
            <span className="slash"> / </span>
            {navigation}
          </span>

          <div className="topRight">
            <button
              className="iconButton"
              title="Refresh service status"
              onClick={() => void checkHealth()}
            >
              <RefreshCcw size={16} />
            </button>

            <span
              className={`connection ${
                available ? "online" : "offline"
              }`}
            >
              <span className="dot" />
              {available ? "Model available" : "Model unavailable"}
            </span>
          </div>
        </header>

        <div className="content">
          {navigation === "Classifier" ? (
            <>
              {/* HERO */}
              <div className="hero">
                <div className="eyebrow">
                  <span />
                  NLP-POWERED RETURNS ANALYSIS
                </div>

                <h1>
                  Understand every <em>return reason.</em>
                </h1>

                <p>
                  Transform Indonesian customer return messages
                  into structured, explainable suggestions.
                  Built with a real local IndoBERT checkpoint
                  and human oversight.
                </p>

                <div className="heroFoot">
                  <span>
                    <Layers size={15} />
                    5 categories
                  </span>

                  <span>
                    <ShieldAlert size={15} />
                    Research-grade
                  </span>

                  <span>
                    <Activity size={15} />
                    Local inference
                  </span>
                </div>
              </div>

              <div className="workspaceGrid">
                {/* INPUT PANEL */}
                <section className="panel editor">
                  <div className="panelHead">
                    <div>
                      <div className="eyebrow small">
                        01 / INPUT
                      </div>

                      <h2>Classify return text</h2>
                    </div>

                    <div className="modeSwitch">
                      <button
                        className={
                          mode === "single" ? "selected" : ""
                        }
                        onClick={() => setMode("single")}
                      >
                        Single
                      </button>

                      <button
                        className={
                          mode === "batch" ? "selected" : ""
                        }
                        onClick={() => setMode("batch")}
                      >
                        Batch
                      </button>
                    </div>
                  </div>

                  {mode === "single" ? (
                    <>
                      <label
                        className="fieldLabel"
                        htmlFor="text"
                      >
                        CUSTOMER MESSAGE
                      </label>

                      <textarea
                        id="text"
                        maxLength={2500}
                        placeholder="Contoh: Saya mau retur karena sepatu yang datang terlalu kecil..."
                        value={text}
                        onChange={(event) =>
                          setText(event.target.value)
                        }
                      />

                      <div className="fieldFoot">
                        <span>
                          Bahasa Indonesia · Maks. 2.500 karakter
                        </span>
                        <span>{text.length}/2500</span>
                      </div>

                      <div className="examples">
                        <div className="fieldLabel">
                          TRY AN EXAMPLE
                        </div>

                        <div className="chips">
                          {examples.map((example, index) => (
                            <button
                              key={example}
                              onClick={() => {
                                setText(example);
                                setResult(null);
                                setError("");
                              }}
                            >
                              {exampleLabels[index]}
                              <ArrowUpRight size={13} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        className="primary"
                        disabled={!text.trim() || busy}
                        onClick={() => void analyze()}
                      >
                        {busy ? (
                          <LoaderCircle
                            className="spin"
                            size={17}
                          />
                        ) : (
                          <Sparkles size={17} />
                        )}

                        {busy
                          ? "Analyzing..."
                          : "Analyze return reason"}

                        <ArrowUpRight size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <label
                        className="fieldLabel"
                        htmlFor="batch"
                      >
                        ONE MESSAGE PER LINE · MAX 20
                      </label>

                      <textarea
                        id="batch"
                        placeholder={
                          "Barang datang rusak...\nSepatunya kekecilan..."
                        }
                        value={batch}
                        onChange={(event) =>
                          setBatch(event.target.value)
                        }
                      />

                      <div className="fieldFoot">
                        <span>
                          Batch processed sequentially,
                          CPU-compatible
                        </span>

                        <span>
                          {
                            batch
                              .split("\n")
                              .filter((line) => line.trim()).length
                          }{" "}
                          lines
                        </span>
                      </div>

                      <button
                        className="primary"
                        disabled={!batch.trim() || busy}
                        onClick={() => void analyzeBatch()}
                      >
                        {busy ? (
                          <LoaderCircle
                            className="spin"
                            size={17}
                          />
                        ) : (
                          <UploadCloud size={17} />
                        )}

                        Analyze batch
                      </button>

                      {batchResults.length > 0 && (
                        <div className="batchResults">
                          <div className="batchHeader">
                            <b>{batchResults.length} results</b>

                            <button
                              onClick={() =>
                                exportJSON(
                                  batchResults,
                                  "returnreason-batch.json"
                                )
                              }
                            >
                              <Download size={15} />
                              Export JSON
                            </button>
                          </div>

                          {batchResults.map((item, index) => (
                            <div key={index}>
                              <span>{item.text}</span>

                              <b>
                                {labels[item.predicted_reason] ||
                                  item.predicted_reason}
                              </b>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </section>

                {/* OUTPUT PANEL */}
                <section className="panel output">
                  <div className="panelHead">
                    <div>
                      <div className="eyebrow small">
                        02 / OUTPUT
                      </div>
                      <h2>Model interpretation</h2>
                    </div>

                    {result && (
                      <button
                        className="iconButton"
                        title="Export result JSON"
                        onClick={() =>
                          exportJSON(
                            result,
                            "returnreason-analysis.json"
                          )
                        }
                      >
                        <Download size={18} />
                      </button>
                    )}
                  </div>

                  {result ? (
                    <div className="result">
                      <div className="resultTop">
                        <span className="fieldLabel">
                          SUGGESTED CATEGORY
                        </span>

                        <span
                          className={`tag ${
                            result.decision === "REVIEW"
                              ? "orange"
                              : "blue"
                          }`}
                        >
                          {result.decision}
                        </span>
                      </div>

                      <div className="predicted">
                        {labels[result.predicted_reason] ||
                          result.predicted_reason}
                      </div>

                      <div className="codeName">
                        {result.predicted_reason}
                      </div>

                      <div className="scoresHeader">
                        <b>Model score distribution</b>
                        <span>uncalibrated</span>
                      </div>

                      {Object.entries(result.scores)
                        .sort((a, b) => b[1] - a[1])
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="scoreRow"
                          >
                            <div className="scoreLabels">
                              <span>{labels[key] || key}</span>
                              <b>
                                {(value * 100).toFixed(1)}%
                              </b>
                            </div>

                            <div className="track">
                              <div
                                style={{
                                  width: `${
                                    Math.max(
                                      0,
                                      Math.min(100, value * 100)
                                    )
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}

                      <div className="notice">
                        <ShieldAlert size={19} />
                        <span>
                          Human confirmation required.
                          Softmax scores are not calibrated
                          probabilities. No learned "other" class.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="empty">
                      <div className="emptyArt">
                        <BrainCircuit size={43} />
                        <span className="pulse" />
                      </div>

                      <h3>Your analysis appears here</h3>

                      <p>
                        Enter a return message and run the
                        classifier to inspect category scores
                        and review guidance.
                      </p>
                    </div>
                  )}
                </section>
              </div>

              {/* FEATURE CARDS */}
              <div className="bottomCards">
                <div>
                  <span className="iconBg">
                    <BrainCircuit size={20} />
                  </span>

                  <b>IndoBERT base p1</b>

                  <p>
                    Locally loaded transformer checkpoint for
                    Indonesian-language classification.
                  </p>
                </div>

                <div>
                  <span className="iconBg">
                    <ShieldAlert size={20} />
                  </span>

                  <b>Built for human review</b>

                  <p>
                    Experimental output, not a
                    production-ready automatic return decision.
                  </p>
                </div>

                <div>
                  <span className="iconBg">
                    <FileText size={20} />
                  </span>

                  <b>Auditable output</b>

                  <p>
                    Download real API results in JSON format
                    for qualitative review.
                  </p>
                </div>
              </div>
            </>
          ) : navigation === "History" ? (
            <>
              <h1 className="simpleTitle">
                Session history
              </h1>

              <p className="description">
                Recent predictions in this browser session only.
                No server-side data storage.
              </p>

              <section className="panel historyPanel">
                <div className="panelHead">
                  <h2>
                    Recent analyses ({history.length})
                  </h2>

                  <button
                    className="softButton"
                    onClick={() => setHistory([])}
                  >
                    <Trash2 size={15} />
                    Clear
                  </button>
                </div>

                {history.length ? (
                  history.map((item, index) => (
                    <div
                      className="historyRow"
                      key={index}
                    >
                      <div>
                        <b>
                          {labels[item.predicted_reason] ||
                            item.predicted_reason}
                        </b>

                        <p>{item.text}</p>
                      </div>

                      <button
                        onClick={() => {
                          setResult(item);
                          setText(item.text);
                          setNavigation("Classifier");
                        }}
                      >
                        Inspect
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="description">
                    No analyses yet. Analyze a message
                    to see it here.
                  </p>
                )}
              </section>
            </>
          ) : (
            <>
              <h1 className="simpleTitle">
                Methodology & limitations
              </h1>

              <section className="panel method">
                <h2>
                  Source-of-truth research boundaries
                </h2>

                <p>
                  This is a five-class experimental Indonesian
                  classifier fine-tuned on synthetic templates.
                  The checkpoint was evaluated on a synthetic
                  held-out set, but there is no independently
                  verified real-customer test set.
                </p>

                <div className="methodGrid">
                  <div>
                    <b>95.42%</b>
                    <span>
                      Synthetic held-out accuracy · n=240
                    </span>
                  </div>

                  <div>
                    <b>0.4889</b>
                    <span>
                      SEA-ID synthetic external macro-F1 · n=34
                    </span>
                  </div>

                  <div>
                    <b>0</b>
                    <span>
                      Human-verified gold test cases
                    </span>
                  </div>
                </div>

                <h3>What not to claim</h3>

                <p>
                  Do not describe scores as calibrated
                  confidence, customer-return acceptance rates,
                  or proven real-world classification accuracy.
                  The optional "other" decision is manual
                  review, not a model class.
                </p>

                <h3>Data privacy</h3>

                <p>
                  For local usage, text is sent to your own
                  FastAPI server. Do not paste personally
                  identifying or sensitive customer text
                  during demonstrations.
                </p>
              </section>
            </>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="error" role="alert">
              {error}

              <button onClick={() => setError("")}>
                Dismiss
              </button>
            </div>
          )}

          {/* FOOTER */}
          <footer>
            <span>RETURNREASON · DAY 19/100</span>

            <span>
              Research prototype
              <span className="slash"> • </span>
              Human-in-the-loop NLP
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
