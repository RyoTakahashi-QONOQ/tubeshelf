import { Category, Video } from "./types";
import { categoriesConfig } from "./categories-config";
import * as youtube from "./youtube";
import {
  categories as mockCategories,
  getCategoryBySlug as mockGetCategoryBySlug,
  getVideoById as mockGetVideoById,
  searchVideos as mockSearchVideos,
} from "@/data/mock";

async function fetchCategoryVideos(
  slug: string,
  query: string,
  icon: string,
  name: string
): Promise<Category> {
  const videoIds = await youtube.searchVideos(query, 15);
  if (videoIds.length === 0) {
    const mock = mockGetCategoryBySlug(slug);
    return mock ?? { slug, name, icon, videos: [] };
  }

  const videos = await youtube.getVideoDetails(videoIds, slug);
  if (videos.length === 0) {
    const mock = mockGetCategoryBySlug(slug);
    return mock ?? { slug, name, icon, videos: [] };
  }

  return { slug, name, icon, videos };
}

export async function getCategories(): Promise<Category[]> {
  if (!process.env.YOUTUBE_API_KEY) {
    return mockCategories;
  }

  try {
    const results = await Promise.all(
      categoriesConfig.map((c) =>
        fetchCategoryVideos(c.slug, c.query, c.icon, c.name)
      )
    );
    return results;
  } catch (e) {
    console.error("Failed to fetch from YouTube API, using mock data:", e);
    return mockCategories;
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  if (!process.env.YOUTUBE_API_KEY) {
    return mockGetCategoryBySlug(slug);
  }

  const config = categoriesConfig.find((c) => c.slug === slug);
  if (!config) return undefined;

  try {
    return await fetchCategoryVideos(config.slug, config.query, config.icon, config.name);
  } catch {
    return mockGetCategoryBySlug(slug);
  }
}

export async function getVideoById(
  id: string
): Promise<(Video & { category: Category }) | undefined> {
  // Mock IDs have format "slug-N" (e.g. "tech-1")
  const mockResult = mockGetVideoById(id);

  if (!process.env.YOUTUBE_API_KEY) {
    return mockResult;
  }

  // If it looks like a YouTube video ID (11 chars), fetch from API
  if (id.length === 11 && !id.includes("-")) {
    try {
      const video = await youtube.getVideoById(id);
      if (video) {
        // Try to find the category this video belongs to
        const config = video.categorySlug
          ? categoriesConfig.find((c) => c.slug === video.categorySlug)
          : undefined;
        const category: Category = config
          ? { slug: config.slug, name: config.name, icon: config.icon, videos: [] }
          : { slug: "unknown", name: "動画", icon: "🎬", videos: [] };
        return { ...video, category };
      }
    } catch {
      // fall through to mock
    }
  }

  // For API-generated IDs like "tech-AbCdEfGhIjK", extract the YouTube ID
  const dashIndex = id.indexOf("-");
  if (dashIndex > 0) {
    const possibleYoutubeId = id.slice(dashIndex + 1);
    if (possibleYoutubeId.length === 11) {
      try {
        const video = await youtube.getVideoById(possibleYoutubeId);
        if (video) {
          const slug = id.slice(0, dashIndex);
          const config = categoriesConfig.find((c) => c.slug === slug);
          const category: Category = config
            ? { slug: config.slug, name: config.name, icon: config.icon, videos: [] }
            : { slug: "unknown", name: "動画", icon: "🎬", videos: [] };
          return { ...video, id, category };
        }
      } catch {
        // fall through to mock
      }
    }
  }

  return mockResult;
}

export function searchLocalVideos(
  query: string,
  categories?: Category[]
) {
  if (!categories) {
    return mockSearchVideos(query);
  }

  const q = query.toLowerCase();
  const results: (Video & {
    categoryName: string;
    categorySlug: string;
    categoryIcon: string;
  })[] = [];
  for (const cat of categories) {
    for (const v of cat.videos) {
      if (
        v.title.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q)
      ) {
        results.push({
          ...v,
          categoryName: cat.name,
          categorySlug: cat.slug,
          categoryIcon: cat.icon,
        });
      }
    }
  }
  return results;
}
