import { readFileSync } from "fs";
import { join } from "path";
import { remark } from "remark";
import html from "remark-html";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

import db from "@/data/db.json";

import styles from "@/styles/post/post.module.scss";

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
  const { value } = await remark()
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(file);
  return (
    <div
      className={`${styles["post"]} markdown`}
      dangerouslySetInnerHTML={{ __html: value }}
    ></div>
  );
}
