"use client";

import { useFavorites } from "@/lib/favorites-context";

export default function FavoriteButton({
  videoId,
  size = "sm",
}: {
  videoId: string;
  size?: "sm" | "md";
}) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const active = isFavorite(videoId);

  const dim = size === "md" ? "w-6 h-6" : "w-4 h-4";
  const pad = size === "md" ? "p-2" : "p-1.5";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(videoId);
      }}
      className={`${pad} rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
        active
          ? "text-red-500 hover:text-red-400"
          : "text-white/70 hover:text-white"
      }`}
      aria-label={active ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <svg
        className={`${dim} transition-transform duration-200 ${active ? "scale-110" : ""}`}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        />
      </svg>
    </button>
  );
}
