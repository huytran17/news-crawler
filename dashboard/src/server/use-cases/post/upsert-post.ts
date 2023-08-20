import IPostDb from "@/server/data-access/interfaces/post";

export type UpsertPost = ({
  postDetails,
}: {
  postDetails: Omit<IPost, "_id" | "created_at">;
}) => Promise<IPost | null>;

export default function makeUpsertPost({
  postDb,
}: {
  postDb: IPostDb;
}): UpsertPost {
  return async function upsertPost({
    postDetails,
  }: {
    postDetails: Omit<IPost, "_id" | "created_at">;
  }): Promise<IPost | null> {
    const created_post = await postDb.upsert({ postDetails });
    return created_post;
  };
}
