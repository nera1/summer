import db from "@/data/db.json";
import Contents from "./contents";

export function generateStaticParams() {
  const tags: { [key: string]: string[] } = db.tags;
  const params: { tag: string }[] = Object.keys(tags).map((item: string) => ({
    tag: decodeURIComponent(item),
  }));
  return params;
}

export default function Page({ params: { tag } }: { params: { tag: string } }) {
  return <Contents tag={tag} />;
}
