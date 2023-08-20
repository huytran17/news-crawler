export {};

declare global {
  interface IPost {
    _id: string;
    url: string;
    title: string;
    description?: string;
    content: string;
    category: string;
    created_at: Date;
  }
}
