export default interface IPage {
  _id: string;
  url: string;
  site: SiteType;
  created_at: Date;
}

export enum SiteType {
  VNEXPRESS = "vnexpress",
}
