"use client";

import Link from "next/link";
import { useSettings } from "@/lib/settings-context";

export default function SettingsPage() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="max-w-[600px] mx-auto px-4 py-6">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-muted hover:text-primary transition-colors"
        >
          ← トップに戻る
        </Link>
        <h1 className="mt-2 text-2xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>設定</span>
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        {/* Date Format */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">日付の表示形式</h3>
              <p className="text-xs text-muted mt-1">
                動画の公開日を実際の日付で表示するか、相対的に表示するか選べます
              </p>
            </div>
            <select
              value={settings.dateFormat}
              onChange={(e) =>
                updateSetting("dateFormat", e.target.value as "absolute" | "relative")
              }
              className="bg-surface-hover border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="absolute">実際の日付</option>
              <option value="relative">相対表示</option>
            </select>
          </div>
          <div className="mt-3 text-xs text-muted bg-background rounded px-3 py-2">
            プレビュー：{settings.dateFormat === "absolute" ? "2025-01-15" : "3ヶ月前"}
          </div>
        </div>

        {/* Autoplay */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">自動再生</h3>
              <p className="text-xs text-muted mt-1">
                動画ページを開いたときに自動的に再生を開始します
              </p>
            </div>
            <button
              onClick={() => updateSetting("autoplay", !settings.autoplay)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.autoplay ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.autoplay ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Cards per Row */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">カテゴリ表示数</h3>
              <p className="text-xs text-muted mt-1">
                トップページの各カテゴリに表示する動画の数
              </p>
            </div>
            <select
              value={settings.cardsPerRow}
              onChange={(e) =>
                updateSetting("cardsPerRow", Number(e.target.value))
              }
              className="bg-surface-hover border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value={4}>4本</option>
              <option value={6}>6本</option>
              <option value={8}>8本</option>
              <option value={10}>10本</option>
              <option value={15}>すべて</option>
            </select>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted text-center">
        設定は自動的にこのブラウザに保存されます
      </p>
    </div>
  );
}
