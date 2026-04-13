import { categories } from "@/data/mock";
import CategoryRow from "@/components/CategoryRow";
import CategoryTabs from "@/components/CategoryTabs";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <>
      {/* PC: vertical carousel rows */}
      <div className="hidden md:block py-4">
        {categories.map((cat, i) => (
          <div key={cat.slug}>
            <CategoryRow category={cat} />
            {(i + 1) % 3 === 0 && i < categories.length - 1 && <AdBanner />}
          </div>
        ))}
      </div>

      {/* SP: SmartNews-style tabs */}
      <div className="md:hidden">
        <CategoryTabs categories={categories} />
      </div>
    </>
  );
}
