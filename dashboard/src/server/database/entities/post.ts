export default class Post implements IPost {
  public readonly _id: string;
  public readonly title: string;
  public readonly description?: string;
  public readonly content: string;
  public readonly category: string;
  public readonly created_at: Date;
  constructor({
    _id,
    title,
    description,
    content,
    category,
    created_at,
  }: {
    _id: string;
    title: string;
    description?: string;
    content: string;
    category: string;
    created_at: Date;
  }) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.content = content;
    this.category = category;
    this.created_at = created_at;
  }
}
