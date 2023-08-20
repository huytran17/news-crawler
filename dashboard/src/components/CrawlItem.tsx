import { HttpMethod } from "@/config/enums/http-method";
import { useState } from "react";

export default function CrawItem({
  category,
  total,
  domain,
}: {
  category: string;
  total: number;
  domain: string;
}) {
  const [total_page, setTotalPage] = useState(total);

  const fetchURLs = async () => {
    const data = {
      url: `${domain}/${category}`,
      category,
      total_page,
    };

    await fetch(`/api/vnexpress/fetch`, {
      method: HttpMethod.POST,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
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
          onClick={fetchURLs}
        >
          Fetch
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Crawl
        </button>
      </td>
    </>
  );
}
