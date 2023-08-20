export {};

declare global {
  interface IPost {
    _id: string;
    title: string;
    description?: string;
    content: string;
    category: string;
    thumbnail_url?: string;
    url: string;
    created_at: Date;
  }
}
