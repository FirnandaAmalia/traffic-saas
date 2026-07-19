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
change:number | null
)
{

if(change === null){
return "-";
}


return change > 0
?
`+${change}%`
:
`${change}%`;

}

export function isPositiveChange(
  value: number
) {
  return value >= 0;
}