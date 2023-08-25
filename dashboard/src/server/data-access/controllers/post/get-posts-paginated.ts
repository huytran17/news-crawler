import { HttpStatus } from "@/config/enums";
import { GetPostsPaginated } from "@/server/use-cases/post/get-posts-paginated";
import makeDb from "../../make-db";

export default function makeGetPostsPaginated({
  findPostsPaginated,
}: {
  findPostsPaginated: GetPostsPaginated;
}) {
  return async function getPostsPaginated({
    page,
    entries_per_page,
    query,
  }: {
    page: number;
    entries_per_page: number;
    query: string;
  }) {
    try {
      await makeDb();

      const posts = await findPostsPaginated({ page, entries_per_page, query });

      return {
        status: HttpStatus.OK,
        body: {
          data: posts,
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
