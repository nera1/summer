export type Post = {
  filename: string;
  created: string;
  modified?: string;
  tags: string[];
  category?: string;
  author?: string;
  title: string;
  id: string;
};
