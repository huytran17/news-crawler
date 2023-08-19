import IPost from "@/server/database/interfaces/post";
import IPostDb from "@/server/data-access/interfaces/post";

export type PostData = ({
  postDetails,
}: {
  postDetails: IPost;
}) => Promise<IPost | null>;

export default function makeCreatePost({
  postDb,
}: {
  postDb: IPostDb;
}): PostData {
  return async function createPost({
    postDetails,
  }: {
    postDetails: IPost;
  }): Promise<IPost | null> {
    const created_post = await postDb.insert({ postDetails });
    return created_post;
  };
}
