import { SiteType } from "@/config/enums";

export default class Page implements IPage {
  public readonly _id: string;
  public readonly url: string;
  public readonly site: SiteType;
  public readonly created_at: Date;

  constructor({
    _id,
    url,
    site,
    created_at,
  }: {
    _id: string;
    url: string;
    site: SiteType;
    created_at: Date;
  }) {
    this._id = _id;
    this.url = url;
    this.site = site;
    this.created_at = created_at;
  }
}
