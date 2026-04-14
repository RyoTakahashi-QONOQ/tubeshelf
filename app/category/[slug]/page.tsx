import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug } from "@/lib/data";
import { formatViews } from "@/lib/utils";
import FavoriteButton from "@/components/FavoriteButton";
import DateDisplay from "@/components/DateDisplay";

export const revalidate = 21600;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "カテゴリが見つかりません" };
  return {
    title: `${category.icon} ${category.name} | TubeShelf`,
    description: `${category.name}カテゴリの動画一覧`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-muted hover:text-primary transition-colors"
        >
          ← トップに戻る
        </Link>
        <h1 className="mt-2 text-2xl font-bold flex items-center gap-2">
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </h1>
        <p className="mt-1 text-sm text-muted">
          {category.videos.length}本の動画
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {category.videos.map((video) => (
          <div key={video.id} className="group relative">
            <Link href={`/video/${video.id}`} className="block">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-surface border border-border card-glow">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="play-overlay">
                  <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="mt-2.5">
                <h3 className="text-sm font-medium leading-5 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="mt-1 text-xs text-muted">{video.channel}</p>
                <p className="text-xs text-muted">
                  {formatViews(video.views)} ・ <DateDisplay date={video.publishedAt} />
                </p>
              </div>
            </Link>
            <div className="absolute top-1.5 right-1.5">
              <FavoriteButton videoId={video.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
