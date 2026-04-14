"use client";

import { useSettings } from "@/lib/settings-context";
import { formatRelativeDate } from "@/lib/utils";

export default function DateDisplay({ date }: { date: string }) {
  const { settings } = useSettings();
  return <>{settings.dateFormat === "relative" ? formatRelativeDate(date) : date}</>;
}
