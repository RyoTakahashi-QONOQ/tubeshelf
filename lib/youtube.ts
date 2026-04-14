import { Video } from "./types";

const API_BASE = "https://www.googleapis.com/youtube/v3";

interface SearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: { medium: { url: string } };
  };
}

interface VideoItem {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    description: string;
    thumbnails: { medium: { url: string } };
  };
  contentDetails: { duration: string };
  statistics: { viewCount: string };
}

function parseDuration(iso: string): string {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "0:00";
  const h = m[1] ? parseInt(m[1]) : 0;
  const min = m[2] ? parseInt(m[2]) : 0;
  const sec = m[3] ? parseInt(m[3]) : 0;
  if (h > 0) return `${h}:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${min}:${String(sec).padStart(2, "0")}`;
}

export async function searchVideos(
  query: string,
  maxResults: number = 15
): Promise<string[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return [];

  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    type: "video",
    maxResults: String(maxResults),
    relevanceLanguage: "ja",
    key,
  });

  const res = await fetch(`${API_BASE}/search?${params}`);
  if (!res.ok) {
    console.error(`YouTube Search API error: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return (data.items as SearchItem[]).map((item) => item.id.videoId);
}

export async function getVideoDetails(
  videoIds: string[],
  categorySlug: string
): Promise<Video[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key || videoIds.length === 0) return [];

  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    id: videoIds.join(","),
    key,
  });

  const res = await fetch(`${API_BASE}/videos?${params}`);
  if (!res.ok) {
    console.error(`YouTube Videos API error: ${res.status}`);
    return [];
  }

  const data = await res.json();
  return (data.items as VideoItem[]).map((item) => ({
    id: `${categorySlug}-${item.id}`,
    youtubeId: item.id,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: `https://img.youtube.com/vi/${item.id}/mqdefault.jpg`,
    views: parseInt(item.statistics.viewCount) || 0,
    publishedAt: item.snippet.publishedAt.split("T")[0],
    duration: parseDuration(item.contentDetails.duration),
    description: item.snippet.description.slice(0, 200),
    categorySlug,
  }));
}

export async function getVideoById(videoId: string): Promise<Video | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return null;

  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    id: videoId,
    key,
  });

  const res = await fetch(`${API_BASE}/videos?${params}`);
  if (!res.ok) return null;

  const data = await res.json();
  const items = data.items as VideoItem[];
  if (items.length === 0) return null;

  const item = items[0];
  return {
    id: item.id,
    youtubeId: item.id,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: `https://img.youtube.com/vi/${item.id}/mqdefault.jpg`,
    views: parseInt(item.statistics.viewCount) || 0,
    publishedAt: item.snippet.publishedAt.split("T")[0],
    duration: parseDuration(item.contentDetails.duration),
    description: item.snippet.description.slice(0, 200),
    categorySlug: "",
  };
}
