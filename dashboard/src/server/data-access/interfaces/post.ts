export default interface IPostDb {
  findAllPaginated: ({
    page,
    entries_per_page,
    query,
  }: {
    page: number;
    entries_per_page: number;
    query: string;
  }) => Promise<IPostPaginated | null>;

  upsert: ({
    postDetails,
  }: {
    postDetails: Omit<IPost, "_id" | "created_at">;
  }) => Promise<IPost | null>;
}

export interface IPostPaginated {
  pagination: {
    from: number | null;
    to: number | null;
    page: number;
    entries_per_page: number;
    total: number;
  };
  data: IPost[];
}
