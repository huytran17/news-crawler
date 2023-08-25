import IPageDb from "@/server/data-access/interfaces/page";

export type GetPagesPaginated = ({
  page,
  entries_per_page,
  query,
}: {
  page: number;
  entries_per_page: number;
  query: string;
}) => Promise<IPagePaginated | null>;

export default function makeGetPagesPaginated({
  pageDb,
}: {
  pageDb: IPageDb;
}): GetPagesPaginated {
  return async function getPagesPaginated({
    page = 1,
    entries_per_page = 15,
    query = "",
  }: {
    page: number;
    entries_per_page: number;
    query: string;
  }): Promise<IPagePaginated | null> {
    const pages = await pageDb.findAllPaginated({
      page,
      entries_per_page,
      query,
    });

    return pages;
  };
}
