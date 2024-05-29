import Contents from "./contents";
import db from "@/data/db.json";

export function generateStaticParams() {
  const categories: any = db.categories;
  const params: { category: string }[] = Object.keys(categories).map(
    (item: string) => ({ category: item })
  );
  return params;
}

export default function Page({
  params: { category },
}: {
  params: { category: string };
}) {
  return <Contents category={decodeURIComponent(category)} />;
}
