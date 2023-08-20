import { SiteType } from "@/config/enums";

export default class Page implements IPage {
  public readonly _id: string;
  public readonly url: string;
  public readonly category: string;
  public readonly title: string;
  public readonly description: string;
  public readonly thumbnail_url: string;
  public readonly site: SiteType;
  public readonly created_at: Date;

  constructor({
    _id,
    url,
    category,
    title,
    description,
    thumbnail_url,
    site,
    created_at,
  }: {
    _id: string;
    url: string;
    category: string;
    title: string;
    description: string;
    thumbnail_url: string;
    site: SiteType;
    created_at: Date;
  }) {
    this._id = _id;
    this.url = url;
    this.category = category;
    this.title = title;
    this.description = description;
    this.thumbnail_url = thumbnail_url;
    this.site = site;
    this.created_at = created_at;
  }
}
