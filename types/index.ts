// 部員の型定義
export interface Person {
  id: number; // D1: INTEGER
  name: string; // D1: TEXT
  grade: string; // D1: TEXT ("1", "部長" etc)
  position: string | null; // D1: TEXT
  is_manager: number; // D1: BOOLEAN (0 or 1)
  weight_class: string | null; // D1: TEXT
  faculty: string | null; // D1: TEXT
  image_url: string | null; // D1: TEXT
  bio: string | null; // D1: TEXT
}

// ブログ投稿の型定義
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category?: string;
  image?: string;
  slug: string;
}

// Instagramの投稿型定義
export interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
}
