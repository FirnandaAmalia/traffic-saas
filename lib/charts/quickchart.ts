import type {
  ChartData,
} from "./chart-data";

export function buildLineChartUrl(
  title: string,
  chart: ChartData
) {

  const config = {
    type: "line",

    data: {
      labels: chart.labels,

      datasets: [
        {
          label: title,

          data: chart.values,

          borderColor:
            "#2563EB",

          backgroundColor:
            "rgba(37,99,235,.15)",

          fill: true,

          tension: 0.35,
        },
      ],
    },

    options: {

      plugins: {
        legend: {
          display: false,
        },
      },

      scales: {

        y: {
          beginAtZero: true,
        },

      },

    },
  };

  return `https://quickchart.io/chart?c=${encodeURIComponent(
    JSON.stringify(config)
  )}`;

}