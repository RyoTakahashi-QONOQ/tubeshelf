"use client";

import { useSettings } from "@/lib/settings-context";

export default function VideoPlayer({ youtubeId }: { youtubeId: string }) {
  const { settings } = useSettings();
  const autoplay = settings.autoplay ? 1 : 0;

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
