"use client";

import { useSettings } from "@/lib/settings-context";
import { formatRelativeDate } from "@/data/mock";

export default function DateDisplay({ date }: { date: string }) {
  const { settings } = useSettings();
  return <>{settings.dateFormat === "relative" ? formatRelativeDate(date) : date}</>;
}
