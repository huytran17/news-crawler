import { SiteType } from "@/config/enums";

export default interface IPageDb {
  findAllPaginated: ({
    page,
    entries_per_page,
    query,
  }: {
    page: number;
    entries_per_page: number;
    query: string;
  }) => Promise<IPagePaginated | null>;
  findAllBySite: ({ site }: { site: SiteType }) => Promise<IPage[] | null>;
  upsert: ({
    pageDetails,
  }: {
    pageDetails: Omit<IPage, "_id" | "created_at">;
  }) => Promise<IPage | null>;
}

export interface IPagePaginated {
  pagination: {
    from: number | null;
    to: number | null;
    page: number;
    entries_per_page: number;
    total: number;
  };
  data: IPage[];
}
