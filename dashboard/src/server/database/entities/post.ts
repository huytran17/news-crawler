import IPost from "../interfaces/post";

export default class Post implements IPost {
  public readonly _id: string;
  public readonly title: string;
  public readonly slug: string;
  public readonly description?: string;
  public readonly thumbnail_url?: string;
  public readonly url: string;
  public readonly created_at: Date;
  constructor({
    _id,
    title,
    slug,
    description,
    thumbnail_url,
    url,
    created_at,
  }: {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    thumbnail_url?: string;
    url: string;
    created_at: Date;
  }) {
    this._id = _id;
    this.title = title;
    this.slug = slug;
    this.description = description;
    this.thumbnail_url = thumbnail_url;
    this.url = url;
    this.created_at = created_at;
  }
}
