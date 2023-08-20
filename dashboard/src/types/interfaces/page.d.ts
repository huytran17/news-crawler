export {};

declare global {
  interface IPage {
    _id: string;
    url: string;
    category: string;
    site: SiteType;
    created_at: Date;
  }
}
