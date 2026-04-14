"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { searchVideos, formatViews } from "@/data/mock";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = query.length >= 2 ? searchVideos(query).slice(0, 8) : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <input
        type="text"
        placeholder="動画を検索..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full h-9 pl-4 pr-10 rounded-full bg-surface border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
      />
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {open && query.length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted">
              「{query}」に一致する動画はありません
            </div>
          ) : (
            results.map((v) => (
              <Link
                key={v.id}
                href={`/video/${v.id}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="flex gap-3 p-2.5 hover:bg-surface-hover transition-colors"
              >
                <div className="relative shrink-0 w-28 aspect-video rounded overflow-hidden bg-background">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[9px] px-1 py-0.5 rounded">
                    {v.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium leading-5 line-clamp-2">
                    {v.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted">{v.channel}</p>
                  <p className="text-xs text-muted">
                    {v.categoryIcon} {v.categoryName} ・ {formatViews(v.views)}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
