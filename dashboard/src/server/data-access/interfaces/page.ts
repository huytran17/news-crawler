import IPage from "@/server/database/interfaces/page";
import { SiteType } from "@/server/database/interfaces/page";

export default interface IPageDb {
  findAllBySite: ({ site }: { site: SiteType }) => Promise<IPage[] | null>;
  upsert: ({ pageDetails }: { pageDetails: IPage }) => Promise<IPage | null>;
}
