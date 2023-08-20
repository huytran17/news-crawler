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
