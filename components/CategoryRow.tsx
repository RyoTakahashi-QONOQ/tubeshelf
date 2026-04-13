import Link from "next/link";
import { Category } from "@/lib/types";
import VideoCard from "./VideoCard";

export default function CategoryRow({ category }: { category: Category }) {
  return (
    <section className="py-5">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </h2>
          <Link
            href={`/category/${category.slug}`}
            className="text-sm text-primary hover:text-primary-hover transition-colors"
          >
            もっと見る →
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 hide-scrollbar">
          {category.videos.slice(0, 8).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
