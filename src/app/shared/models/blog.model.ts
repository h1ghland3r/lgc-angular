export interface Post {
  id: number;
  title: string;
  author: string;
  publish_date: string;
  slug: string;
  description: string;
  content: string;
}

export interface Comment {
  id: number;
  postId: number;
  parent_id: number;
  user: string;
  date: string;
  content: string;
}
