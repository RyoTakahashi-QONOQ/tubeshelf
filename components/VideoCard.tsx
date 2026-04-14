import Link from "next/link";
import { Video } from "@/lib/types";
import { formatViews } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";
import DateDisplay from "./DateDisplay";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={`/video/${video.id}`}
      className="group block shrink-0 w-[280px] md:w-[300px]"
    >
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
        <div className="absolute top-1.5 right-1.5">
          <FavoriteButton videoId={video.id} />
        </div>
      </div>
      <div className="mt-2.5 pr-2">
        <h3 className="text-sm font-medium leading-5 line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-muted">{video.channel}</p>
        <p className="text-xs text-muted">
          {formatViews(video.views)} ・ <DateDisplay date={video.publishedAt} />
        </p>
      </div>
    </Link>
  );
}

export function VideoCardVertical({ video }: { video: Video }) {
  return (
    <Link
      href={`/video/${video.id}`}
      className="group flex gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors"
    >
      <div className="relative shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-surface border border-border">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="play-overlay">
          <svg className="w-8 h-8 text-white/90" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium leading-5 line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-muted">{video.channel}</p>
        <p className="text-xs text-muted">{formatViews(video.views)}</p>
      </div>
      <div className="shrink-0 self-start">
        <FavoriteButton videoId={video.id} />
      </div>
    </Link>
  );
}
