import db from "@/data/db.json";
import Contents from "./contents";

export function generateStaticParams() {
  const tags: { [key: string]: string[] } = db.tags;
  const params: { tag: string }[] = Object.keys(tags).map((item: string) => {
    let tagValue = item;
    if (process.env.NODE_ENV === "production") {
      tagValue = decodeURIComponent(tagValue);
    }
    return {
      tag: tagValue,
    };
  });
  return params;
}

export default function Page({ params }: { params: { tag: string } }) {
  return <Contents tag={params.tag} />;
}
