"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites-context";
import { getVideoById, formatViews, formatRelativeDate } from "@/data/mock";
import FavoriteButton from "@/components/FavoriteButton";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const videos = favorites
    .map((id) => getVideoById(id))
    .filter((v) => v !== undefined);

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
          <span className="text-red-400">♥</span>
          <span>お気に入り</span>
        </h1>
        <p className="mt-1 text-sm text-muted">
          {videos.length > 0
            ? `${videos.length}本の動画`
            : "お気に入りはまだありません"}
        </p>
      </div>

      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg
            className="w-16 h-16 text-muted/30 mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
            />
          </svg>
          <p className="text-muted text-lg">お気に入りはまだありません</p>
          <p className="text-muted/60 text-sm mt-1">
            動画のハートアイコンをクリックして追加しましょう
          </p>
          <Link
            href="/"
            className="mt-6 px-6 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            動画を探す
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {videos.map((result) => {
            const { category, ...video } = result;
            return (
              <div key={video.id} className="group relative">
                <Link href={`/video/${video.id}`} className="block">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-surface border border-border card-glow">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="play-overlay">
                      <svg
                        className="w-12 h-12 text-white/90"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
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
                      {formatViews(video.views)} ・ {formatRelativeDate(video.publishedAt)}
                    </p>
                  </div>
                </Link>
                <div className="absolute top-1.5 right-1.5">
                  <FavoriteButton videoId={video.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
