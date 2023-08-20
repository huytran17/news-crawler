import { api_config } from "@/config/common/api-config";
import { SiteType } from "@/config/enums";
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

  const fetchData = async () => {
    const payload = {
      url: `${domain}/${category}`,
      category,
      total_page,
    };

    await fetch("/api/vnexpress/fetch", {
      ...api_config,
      body: JSON.stringify(payload),
    });
  };

  const crawl = async () => {
    const payload = {
      site,
    };

    await fetch("/api/vnexpress/crawl", {
      ...api_config,
      body: JSON.stringify(payload),
    });
  };

  return (
    <>
      <td>{category}</td>
      <td>
        <input
          type="number"
          className="appearance-none rounded w-full py-2 px-4 leading-tight border-2 border-gray-200 focus:outline-none focus:border-purple-500"
          min={1}
          value={total_page}
          onChange={(e) => setTotalPage(e.target.valueAsNumber)}
        />
      </td>
      <td className="flex justify-center my-2 gap-4 ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3"
          onClick={fetchData}
        >
          Fetch
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white py-1 px-3"
          onClick={crawl}
        >
          Crawl
        </button>
      </td>
    </>
  );
}
