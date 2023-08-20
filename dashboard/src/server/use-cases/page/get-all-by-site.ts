import IPageDb from "@/server/data-access/interfaces/page";
import { SiteType } from "@/config/enums";

export type GetAllBySite = ({
  site,
}: {
  site: SiteType;
}) => Promise<IPage[] | null>;

export default function makeGetAllBySite({
  pageDb,
}: {
  pageDb: IPageDb;
}): GetAllBySite {
  return async function getAllBySite({
    site,
  }: {
    site: SiteType;
  }): Promise<IPage[] | null> {
    const pages = await pageDb.findAllBySite({ site });
    return pages;
  };
}
