import { readFileSync } from "fs";
import { join } from "path";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

import db from "@/data/db.json";

import styles from "@/styles/post/post.module.scss";

export function generateStaticParams() {
  const categories: any = db.categories;
  const params: { category: string; id: string }[] = [];
  for (const category in categories) {
    const ids: string[] = categories[category] as unknown as string[];
    for (const id of ids) {
      params.push({
        id,
        category,
      });
    }
  }
  return params;
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
    .use(rehypePrettyCode) // 테마 설정 예제
    .use(rehypeStringify)
    .process(file);
  return (
    <>
      <div
        className={`${styles["post"]} markdown`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
      <div></div>
    </>
  );
}
