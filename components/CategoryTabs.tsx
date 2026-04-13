"use client";

import { useState, useRef } from "react";
import { Category } from "@/lib/types";
import { VideoCardVertical } from "./VideoCard";

export default function CategoryTabs({
  categories,
}: {
  categories: Category[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const active = categories[activeIndex];

  return (
    <div>
      <div
        ref={tabsRef}
        className="sticky top-14 z-40 bg-background border-b border-border overflow-x-auto hide-scrollbar"
      >
        <div className="flex">
          {categories.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                i === activeIndex
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div className="px-2 py-3">
        <div className="flex flex-col gap-1">
          {active.videos.map((video) => (
            <VideoCardVertical key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
