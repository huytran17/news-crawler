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

  insert: ({ postDetails }: { postDetails: IPost }) => Promise<IPost | null>;
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
