import { pageDb } from "@/server/data-access";

import makeGetAllBySite from "./get-all-by-site";
import makeUpsertPage from "./upsert-page";
import makeGetPagesPaginated from "./get-pages-paginated";

const getAllBySite = makeGetAllBySite({ pageDb });
const upsertPage = makeUpsertPage({ pageDb });
const getPagesPaginated = makeGetPagesPaginated({ pageDb });

const pageServices = Object.freeze({
  getAllBySite,
  upsertPage,
  getPagesPaginated,
});

export default pageServices;

export { getAllBySite, upsertPage, getPagesPaginated };
