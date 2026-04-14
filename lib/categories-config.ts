export interface CategoryConfig {
  slug: string;
  name: string;
  icon: string;
  query: string;
}

export const categoriesConfig: CategoryConfig[] = [
  { slug: "tech", name: "テクノロジー", icon: "💻", query: "テクノロジー 最新 IT" },
  { slug: "gaming", name: "ゲーム", icon: "🎮", query: "ゲーム 実況 攻略" },
  { slug: "music", name: "音楽", icon: "🎵", query: "音楽 J-POP MV" },
  { slug: "cooking", name: "料理", icon: "🍳", query: "料理 レシピ 作り方" },
  { slug: "fitness", name: "フィットネス", icon: "💪", query: "フィットネス 筋トレ ダイエット" },
  { slug: "entertainment", name: "エンタメ", icon: "🎭", query: "エンタメ 映画 ドラマ" },
  { slug: "education", name: "教育・学習", icon: "📚", query: "教育 学習 勉強" },
  { slug: "travel", name: "旅行", icon: "✈️", query: "旅行 観光 おすすめ" },
  { slug: "business", name: "ビジネス", icon: "💼", query: "ビジネス 起業 投資" },
  { slug: "lifestyle", name: "ライフスタイル", icon: "🏠", query: "ライフスタイル 暮らし ルーティン" },
];
