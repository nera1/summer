import { readFileSync } from "fs";
import { join } from "path";
import { remark } from "remark";
import html from "remark-html";

import db from "@/data/db.json";

export function generateStaticParams() {
  return db.list.map((item) => ({ id: item }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { dictionary }: any = db;
  const yamlPattern = /^---[\s\S]+?---/;
  const file = readFileSync(
    join(process.cwd(), "src", "md", dictionary[params.id]?.filename)
  )
    .toString()
    .replace(yamlPattern, "");
  const { value } = await remark().use(html).process(file);
  return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
}
