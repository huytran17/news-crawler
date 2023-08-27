import { HttpStatus } from "@/config/enums";
import { GetPostBySlug } from "@/server/use-cases/post/get-post-by-slug";
import makeDb from "../../make-db";

export default function makeGetPostBySlug({
  findPostBySlug,
}: {
  findPostBySlug: GetPostBySlug;
}) {
  return async function getPostBySlug({ slug }: { slug: string }) {
    try {
      await makeDb();

      const post = await findPostBySlug({ slug: `/${slug}` });

      return {
        status: HttpStatus.OK,
        body: {
          data: post,
        },
      };
    } catch (error: any) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}
