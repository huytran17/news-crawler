import { getPagesPaginated as findPagesPaginated } from "@/server/use-cases/page";
import makeGetPagesPaginated from "./get-pages-paginated";

const getPagesPaginated = makeGetPagesPaginated({ findPagesPaginated });

const pageServices = Object.freeze({
  getPagesPaginated,
});

export default pageServices;

export { getPagesPaginated };
