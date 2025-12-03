// 部員の型定義
export interface Person {
  id: string;
  name: string; //名前
  classification: string; // 分類（学年・マネージャー・指導者役職）
  position?: string; // 役職（主将、副主将など）
  weight?: string; // 階級
  faculty?: string; // 学部
  image?: string;
  bio?: string;
  achievements?: string[];
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
