import { HttpMethod, SiteType } from "@/config/enums";
import { useState } from "react";

export default function CrawItem({
  category,
  total,
  domain,
  site,
}: {
  category: string;
  total: number;
  domain: string;
  site: SiteType;
}) {
  const [total_page, setTotalPage] = useState(total);

  const api_configs: RequestInit = {
    method: HttpMethod.POST,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  const fetchData = async () => {
    const payload = {
      url: `${domain}/${category}`,
      category,
      total_page,
    };

    await fetch("/api/vnexpress/fetch", {
      ...api_configs,
      body: JSON.stringify(payload),
    });
  };

  const crawl = async () => {
    const payload = {
      site,
    };

    await fetch("/api/vnexpress/crawl", {
      ...api_configs,
      body: JSON.stringify(payload),
    });
  };

  return (
    <>
      <td>{category}</td>
      <td>
        <input
          type="number"
          className="appearance-none rounded w-full py-2 px-4 text-gray-700 leading-tight focus:border-purple-500"
          min={1}
          value={total_page}
          onChange={(e) => setTotalPage(e.target.valueAsNumber)}
        />
      </td>
      <td className="flex justify-center gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={fetchData}
        >
          Fetch
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={crawl}
        >
          Crawl
        </button>
      </td>
    </>
  );
}
