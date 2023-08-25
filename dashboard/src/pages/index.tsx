import NewsList from "@/components/news/NewsList";
import { GetServerSideProps } from "next";
import { api_config } from "@/config/common/api-config";
import { HttpMethod } from "@/config/enums";

interface IPayload<T> extends Record<string, T> {
  page: T;
  entries_per_page: T;
  query: T;
}

export const getServerSideProps: GetServerSideProps<{
  pages: IPage[];
}> = async (context) => {
  const page = context.query.page;
  const query = context.query.search;

  const payload: IPayload<number | string | string[] | undefined> = {
    page: page || 1,
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

  const pages = data.data;

  return { props: { pages } };
};

export default function Home({ pages }: { pages: IPage[] }) {
  return (
    <main>
      <NewsList pages={pages} />
    </main>
  );
}
