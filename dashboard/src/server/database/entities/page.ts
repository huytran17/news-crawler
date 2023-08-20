import { SiteType } from "@/config/enums";

export default class Page implements IPage {
  public readonly _id: string;
  public readonly url: string;
  public readonly category: string;
  public readonly site: SiteType;
  public readonly created_at: Date;

  constructor({
    _id,
    url,
    category,
    site,
    created_at,
  }: {
    _id: string;
    url: string;
    category: string;
    site: SiteType;
    created_at: Date;
  }) {
    this._id = _id;
    this.url = url;
    this.category = category;
    this.site = site;
    this.created_at = created_at;
  }
}
