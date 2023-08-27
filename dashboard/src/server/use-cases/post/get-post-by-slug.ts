import IPostDb from "@/server/data-access/interfaces/post";

export type GetPostBySlug = ({
  slug,
}: {
  slug: string;
}) => Promise<IPost | null>;

export default function makeGetPostBySlug({
  postDb,
}: {
  postDb: IPostDb;
}): GetPostBySlug {
  return async function getPostBySlug({
    slug,
  }: {
    slug: string;
  }): Promise<IPost | null> {
    const post = await postDb.findBySlug({ slug });
    return post;
  };
}
