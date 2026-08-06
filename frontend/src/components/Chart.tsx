import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type ApiData from "../types/ApiData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface ChartProps {
  data: ApiData | undefined;
}

export default function Chart({ data }: ChartProps) {
  if (!data) return <p>Loading chart...</p>;

  const currencyLabels = Object.keys(data.sorted_rates);

  const barBackgroundColors = currencyLabels.map((currency) => {
    if (currency === data.strongest.currency) {
      return "#10B981";
    }

    if (currency === data.weakest.currency) {
      return "#F43F5E";
    }

    return "#E2E8F0";
  });

  const formattedValues = Object.entries(data.sorted_rates).map(
    ([code, rate]) => (code === "JPY" ? rate / 100 : rate),
  );

  const chartData = {
    labels: currencyLabels.map((c) => (c === "JPY" ? "JPY (÷100)" : c)),
    datasets: [
      {
        label: `Rate (per 1 ${data.base_currency})`,
        data: formattedValues,
        backgroundColor: barBackgroundColors,
        borderRadius: 8,
        maxBarThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="border border-slate-200 shadow-sm p-5 rounded-2xl w-full max-w-5xl h-96 mx-auto bg-white">
      <Bar data={chartData} options={options} />
    </div>
  );
}
