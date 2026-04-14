import Link from "next/link";
import { notFound } from "next/navigation";
import { getVideoById, formatViews, formatRelativeDate } from "@/data/mock";
import VideoPlayer from "@/components/VideoPlayer";
import FavoriteButton from "@/components/FavoriteButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = getVideoById(id);
  if (!result) return { title: "動画が見つかりません" };
  return {
    title: `${result.title} | TubeShelf`,
    description: result.description,
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = getVideoById(id);
  if (!result) notFound();

  const { category, ...video } = result;
  const related = category.videos.filter((v) => v.id !== video.id).slice(0, 8);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <Link
        href={`/category/${category.slug}`}
        className="text-sm text-muted hover:text-primary transition-colors"
      >
        ← {category.icon} {category.name}に戻る
      </Link>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoPlayer youtubeId={video.youtubeId} />
          <div className="mt-4">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl font-bold leading-7">{video.title}</h1>
              <FavoriteButton videoId={video.id} size="md" />
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm text-muted">
              <span>{video.channel}</span>
              <span>・</span>
              <span>{formatViews(video.views)}</span>
              <span>・</span>
              <span>{formatRelativeDate(video.publishedAt)}</span>
            </div>
            <p className="mt-4 text-sm text-muted leading-6 border-t border-border pt-4">
              {video.description}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold mb-3">関連動画</h2>
          <div className="flex flex-col gap-3">
            {related.map((v) => (
              <Link
                key={v.id}
                href={`/video/${v.id}`}
                className="group flex gap-3 rounded-lg hover:bg-surface-hover p-1.5 transition-colors"
              >
                <div className="relative shrink-0 w-36 aspect-video rounded overflow-hidden bg-surface">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 py-0.5 rounded">
                    {v.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium leading-5 line-clamp-2 group-hover:text-primary transition-colors">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{v.channel}</p>
                  <p className="text-xs text-muted">{formatViews(v.views)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
