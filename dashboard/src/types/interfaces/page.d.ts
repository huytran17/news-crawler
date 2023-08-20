export {};

declare global {
  interface IPage {
    _id: string;
    url: string;
    category: string;
    title: string;
    description: string;
    thumbnail_url: string;
    site: SiteType;
    created_at: Date;
  }
}
