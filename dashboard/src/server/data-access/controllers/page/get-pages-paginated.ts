import { HttpStatus } from "@/config/enums";
import { GetPagesPaginated } from "@/server/use-cases/page/get-pages-paginated";
import makeDb from "../../make-db";

export default function makeGetPagesPaginated({
  findPagesPaginated,
}: {
  findPagesPaginated: GetPagesPaginated;
}) {
  return async function getPagesPaginated({
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

      const data = await findPagesPaginated({ page, entries_per_page, query });

      return {
        status: HttpStatus.OK,
        body: {
          data,
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
