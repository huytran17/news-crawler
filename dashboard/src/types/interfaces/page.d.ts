export {};

declare global {
  interface IPage {
    _id: string;
    url: string;
    site: SiteType;
    created_at: Date;
  }

  enum SiteType {
    VNEXPRESS = "vnexpress",
  }
}
