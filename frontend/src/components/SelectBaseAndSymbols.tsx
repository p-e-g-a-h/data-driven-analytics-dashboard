import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import fetchData from "../api/fetchData";
import type ApiData from "../types/ApiData";

interface SelectBaseAndSymbolsProps {
  base: string;
  setBase: Dispatch<SetStateAction<string>>;
  symbols: string[];
  setSymbols: Dispatch<SetStateAction<string[]>>;
  setData: Dispatch<SetStateAction<ApiData | undefined>>;
  setError: Dispatch<SetStateAction<string | null>>;
}

export default function SelectBaseAndSymbols({
  base,
  setBase,
  symbols,
  setSymbols,
  setData,
  setError,
}: SelectBaseAndSymbolsProps) {
  const handleBase = (event: ChangeEvent<HTMLInputElement>) => {
    const newBase = event.target.value.trim().toUpperCase();
    setBase(newBase);

    if (symbols.includes(newBase)) {
      setSymbols(symbols.filter((symbol) => symbol !== newBase));
    }
  };
  const handleSymbols = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setSymbols([...symbols, value]);
    } else {
      setSymbols(symbols.filter((item) => item !== value));
    }
  };

  const currencyList = ["EUR", "USD", "GBP", "JPY", "CHF"];

  const handleSend = async () => {
    setError(null);
    try {
      const result = await fetchData(base, symbols);
      setData(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch data");
    }
  };

  return (
    <>
      <div className="w-full md:w-auto flex items-center gap-3 flex-col md:flex-row">
        {/* Base Input */}
        <input
          type="text"
          placeholder="Base"
          value={base}
          className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl shadow-xs text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-400"
          onChange={handleBase}
        />

        {/* Checkbox Group */}
        <div className="w-full h-12 px-4 bg-slate-100/80 border border-slate-200 rounded-xl shadow-xs flex items-center">
          <fieldset className="flex items-center gap-3 text-xs text-slate-700">
            <legend className="sr-only">Select Symbols</legend>
            <span className="font-semibold text-slate-500">
              Select Symbols:
            </span>
            {currencyList.map((code) => {
              const isDisabled = base === code;
              const isChecked = symbols.includes(code);
              return (
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  key={code}
                >
                  <input
                    type="checkbox"
                    id={code}
                    name="symbols"
                    value={code}
                    disabled={isDisabled}
                    checked={isChecked && !isDisabled}
                    onChange={handleSymbols}
                    className="accent-slate-900 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <label
                    htmlFor={code}
                    className={`cursor-pointer ${
                      isDisabled ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  >
                    {code}
                  </label>
                </div>
              );
            })}
          </fieldset>
        </div>

        {/* Send Button */}
        <button
          type="button"
          className="w-full h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </>
  );
}
