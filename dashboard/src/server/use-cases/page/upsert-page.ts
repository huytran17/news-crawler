import IPageDb from "@/server/data-access/interfaces/page";

export type UpsertPage = ({
  pageDetails,
}: {
  pageDetails: Omit<IPage, "_id" | "created_at">;
}) => Promise<IPage | null>;

export default function makeUpsertPage({
  pageDb,
}: {
  pageDb: IPageDb;
}): UpsertPage {
  return async function upsertPage({
    pageDetails,
  }: {
    pageDetails: Omit<IPage, "_id" | "created_at">;
  }): Promise<IPage | null> {
    const upserted = await pageDb.upsert({ pageDetails });
    return upserted;
  };
}
