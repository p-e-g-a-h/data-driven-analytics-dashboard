import { useState, useEffect } from "react";
import "./App.css";
import SelectBaseAndSymbols from "./components/SelectBaseAndSymbols";
import Chart from "./components/Chart";
import fetchData from "./api/fetchData";
import type ApiData from "./types/ApiData";

function App() {
  const [base, setBase] = useState("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [data, setData] = useState<ApiData | undefined>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setError(null);
      try {
        const result = await fetchData(base, symbols);
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load initial data",
        );
      }
    };

    loadData();
  }, []);

  if (error) {
    return (
      <div className="w-full max-w-xl flex justify-between items-center p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl">
        <span>⚠️ {error}</span>
        <button
          type="button"
          className="font-bold cursor-pointer hover:text-red-900"
          onClick={() => setError(null)}
        >
          ✕
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <h1 className="flex justify-center mt-10">Loading... Please Wait.</h1>
    ); // Or show a loading message
  }

  const details = {
    Base: data.base_currency,
    Strong: `${data.strongest.currency} ${data.strongest.rate}`,
    Avg: data.average_rate.toFixed(4),
    Weak: `${data.weakest.currency} ${data.weakest.rate}`,
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-center flex-col gap-10 bg-slate-50 font-sans p-10">
        <div className="text-center space-y-1 my-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Data-Driven Analytics Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Real-time exchange metrics & rate statistics
          </p>
        </div>

        <SelectBaseAndSymbols
          base={base}
          setBase={setBase}
          symbols={symbols}
          setSymbols={setSymbols}
          setData={setData}
          setError={setError}
        />

        <div className="w-full md:w-auto flex flex-wrap p-4 gap-y-3 bg-white border border-slate-200 rounded-xl shadow-sm">
          {Object.entries(details).map(([key, value]) => {
            let color = "text-slate-800";
            if (key === "Strong") color = "text-emerald-600";
            if (key === "Weak") color = "text-rose-500";

            return (
              <div key={key} className="w-1/2 md:w-auto md:px-4">
                <span className="text-slate-500">{key}: </span>
                <span className={`font-bold ${color}`}>{value}</span>
              </div>
            );
          })}
        </div>

        <Chart data={data} />
      </main>
    </>
  );
}

export default App;
