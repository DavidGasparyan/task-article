export interface Article {
  id: string | number;
  title: string;
  author: string;
  content: string;
  publishDate: number;
  createdAt?: number | null;
  updatedAt?: number | null;
}
