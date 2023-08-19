import { pageDb } from "@/server/data-access";

import makeGetAllBySite from "./get-all-by-site";
import makeUpsertPage from "./upsert-page";

const getAllBySite = makeGetAllBySite({ pageDb });
const upsertPage = makeUpsertPage({ pageDb });

const pageServices = Object.freeze({
  getAllBySite,
  upsertPage,
});

export default pageServices;

export { getAllBySite, upsertPage };
