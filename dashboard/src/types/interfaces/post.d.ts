export {};

declare global {
  interface IPost {
    _id: string;
    url: string;
    slug: string;
    title: string;
    description?: string;
    content: string;
    category: string;
    created_at: Date;
  }

  interface IPostPaginated {
    pagination: {
      from: number | null;
      to: number | null;
      page: number;
      entries_per_page: number;
      total: number;
    };
    data: IPost[];
  }
}
