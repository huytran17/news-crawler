export default interface IPost {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail_url?: string;
  url: string;
  created_at: Date;
}
