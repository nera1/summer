import Contents from "./contents";
import db from "@/data/db.json";

export function generateStaticParams() {
  const categories: any = db.categories;
  const params: { category: string }[] = Object.keys(categories).map(
    (item: string) => {
      let categoryValue = item;
      if (process.env.NODE_ENV === "production") {
        categoryValue = decodeURIComponent(categoryValue);
      }
      return { category: categoryValue };
    }
  );
  return params;
}

export default function Page({
  params: { category },
}: {
  params: { category: string };
}) {
  return <Contents category={category} />;
}
