import NewsList from "@/components/news/NewsList";
import type { GetServerSideProps } from "next";
import { api_config } from "@/config/common/api-config";
import { HttpMethod } from "@/config/enums";
import Paginator from "../components/paging/Paginator";

interface IPayload<T> extends Record<string, T> {
  page: T;
  entries_per_page: T;
  query: T;
}

export const getServerSideProps: GetServerSideProps<{
  pages: IPage[];
}> = async (context) => {
  const { page = 1, query } = context.query;

  const payload: IPayload<number | string | string[] | undefined> = {
    page,
    entries_per_page: "15",
    query,
  };

  const url_query = new URLSearchParams();

  for (const key in payload) {
    if (!payload[key]) {
      continue;
    }

    url_query.set(key, (payload[key] || "").toString());
  }

  const url = `${
    process.env.BASE_URL
  }/api/page/get-pages-paginated?${url_query.toString()}`;

  const response = await fetch(url, {
    ...api_config,
    method: HttpMethod.GET,
  });

  const data: IPagePaginated = await response.json();

  const pages: IPage[] = data.data;
  const pagination = data.pagination;

  const total = pagination.total;
  const entries_per_page = pagination.entries_per_page;

  return { props: { pages, page: Number(page), entries_per_page, total } };
};

export default function Home({
  pages,
  page,
  total,
  entries_per_page,
}: {
  pages: IPage[];
  page: number;
  total: number;
  entries_per_page: number;
}) {
  const total_pages = Math.ceil(total / entries_per_page);

  return (
    <main>
      <NewsList pages={pages} />
      <Paginator current={page} total={total_pages} />
    </main>
  );
}
