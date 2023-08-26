export {};

declare global {
  interface IPage {
    _id: string;
    url: string;
    slug: string;
    category: string;
    title: string;
    description: string;
    thumbnail_url: string;
    site: SiteType;
    created_at: Date;
  }

  interface IPagePaginated {
    pagination: {
      from: number | null;
      to: number | null;
      page: number;
      entries_per_page: number;
      total: number;
    };
    data: IPage[];
  }
}
