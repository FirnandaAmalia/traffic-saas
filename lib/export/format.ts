export function formatNumber(
  value: number
) {
  return new Intl.NumberFormat(
    "en-US"
  ).format(value);
}

export function formatPercent(
  value: number
) {
  return `${value.toFixed(2)}%`;
}

export function formatMetric(
  title: string,
  value: number
) {
  if (title === "Engagement Rate") {
    return formatPercent(value);
  }

  return formatNumber(value);
}

export function formatChange(
  value: number
) {
  const sign =
    value >= 0 ? "+" : "";

  return `${sign}${value.toFixed(1)}%`;
}

export function isPositiveChange(
  value: number
) {
  return value >= 0;
}