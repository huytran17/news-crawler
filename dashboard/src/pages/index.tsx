import NewsList from "@/components/news/NewsList";
import { GetServerSideProps } from "next";
import { api_config } from "@/config/common/api-config";

export const getServerSideProps: GetServerSideProps<{
  pages: IPage[];
}> = async (context) => {
  const page = context.query.page;
  const query = context.query.search;

  const payload = {
    page: page ?? 1,
    entries_per_page: 15,
    query,
  };

  const response = await fetch("/api/page/get-pages-paginated", {
    ...api_config,
    body: JSON.stringify(payload),
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
