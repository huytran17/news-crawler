import { Paging } from "../../config/enums";

export default function Paginator({
  total,
  current = 1,
}: {
  total: number;
  current: number;
}) {
  let current_page = current;
  current > total && (current_page = total);
  current < 1 && (current_page = 1);

  const available_indicators: number[] = Array.from(
    Array(total).keys(),
    (_, index) => index + 1
  );

  const start_half = Math.ceil(Paging.LIMIT_SHOWING / 2);
  const end_half = Math.floor(Paging.LIMIT_SHOWING / 2);

  let start_slice = current_page - start_half;
  let end_slice = current_page + end_half;

  if (start_slice < 0) {
    start_slice = 0;
    end_slice = Paging.LIMIT_SHOWING;
  }

  if (end_slice > total) {
    start_slice = total - Paging.LIMIT_SHOWING;
    end_slice = total;
  }

  const indicators = available_indicators.slice(start_slice, end_slice);

  if (!total) {
    return null;
  }

  return (
    <div className="paginator">
      <ul className="paginator-list">
        <li className="paginator-item prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </li>

        {indicators.map((indicator, index) => (
          <li
            className={`paginator-item ${
              current_page === indicator ? "active" : ""
            }`}
            key={`indicator-${index}`}
          >
            <a href={`?page=${indicator}`}>{indicator}</a>
          </li>
        ))}

        <li className="paginator-item next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </li>
      </ul>
    </div>
  );
}
