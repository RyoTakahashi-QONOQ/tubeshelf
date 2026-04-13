export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  thumbnail: string;
  views: number;
  publishedAt: string;
  duration: string;
  description: string;
  categorySlug: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  videos: Video[];
}
