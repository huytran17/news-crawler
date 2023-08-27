import { Paging } from "../../config/enums";

export default function Paginator({
  total,
  current = 1,
}: {
  total: number;
  current: number;
}) {
  const available_indicators: number[] = Array.from(
    Array(total).keys(),
    (_, index) => index + 1
  );

  const total_indicator = available_indicators.length;

  let start_redundant = 0;

  const start_center = Math.ceil(Paging.LIMIT_SHOWING / 2);
  const end_center = Math.floor(Paging.LIMIT_SHOWING / 2);

  let start_slice = current - start_center;
  if (start_slice < 0) {
    start_redundant = Math.abs(start_slice);
    start_slice = 0;
  }

  let end_slice = current + end_center + start_redundant;
  if (end_slice > total_indicator) {
    const end_redundant = total_indicator - end_slice;
    start_slice += end_redundant;
    end_slice = total_indicator;
  }

  const indicators = available_indicators.slice(start_slice, end_slice);

  return !total ? null : (
    <div className="paginator">
      <ul>
        {indicators.map((indicator, index) => (
          <li key={`indicator-${index}`}>{indicator}</li>
        ))}
      </ul>
    </div>
  );
}
