export default interface IPost {
  _id: string;
  title: string;
  description?: string;
  content: string;
  thumbnail_url?: string;
  url: string;
  created_at: Date;
}
