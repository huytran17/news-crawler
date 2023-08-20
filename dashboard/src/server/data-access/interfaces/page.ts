export default interface IPageDb {
  findAllBySite: ({ site }: { site: SiteType }) => Promise<IPage[] | null>;
  upsert: ({
    pageDetails,
  }: {
    pageDetails: Omit<IPage, "_id" | "created_at">;
  }) => Promise<IPage | null>;
}
