export default class Post implements IPost {
  public readonly _id: string;
  public readonly url: string;
  public readonly slug: string;
  public readonly title: string;
  public readonly description?: string;
  public readonly content: string;
  public readonly category: string;
  public readonly created_at: Date;
  constructor({
    _id,
    url,
    slug,
    title,
    description,
    content,
    category,
    created_at,
  }: {
    _id: string;
    url: string;
    slug: string;
    title: string;
    description?: string;
    content: string;
    category: string;
    created_at: Date;
  }) {
    this._id = _id;
    this.url = url;
    this.slug = slug;
    this.title = title;
    this.description = description;
    this.content = content;
    this.category = category;
    this.created_at = created_at;
  }
}
