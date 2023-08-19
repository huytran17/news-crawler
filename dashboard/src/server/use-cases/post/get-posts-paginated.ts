import IPost from "@/server/database/interfaces/post";
import IPostDb, { IPostPaginated } from "@/server/data-access/interfaces/post";

export type GetPostsPaginated = ({
  page,
  entries_per_page,
  query,
}: {
  page: number;
  entries_per_page: number;
  query: string;
}) => Promise<IPostPaginated | null>;

export default function makeGetPostsPaginated({
  postDb,
}: {
  postDb: IPostDb;
}): GetPostsPaginated {
  return async function getPostsPaginated({
    page,
    entries_per_page,
    query,
  }: {
    page: number;
    entries_per_page: number;
    query: string;
  }): Promise<IPostPaginated | null> {
    const posts = await postDb.findAllPaginated({
      page,
      entries_per_page,
      query,
    });

    return posts;
  };
}
