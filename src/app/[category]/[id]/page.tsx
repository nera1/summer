import { readFileSync } from "fs";
import { join } from "path";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";

import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Footer from "@/components/footer/footer";
import ScrollTop from "@/components/scroll-top/scroll-top";

import db from "@/data/db.json";

import { Post } from "@/types";

import { Tag as TagIcon } from "@/components/icon";

import styles from "@/styles/post/post.module.scss";
import Link from "next/link";

dayjs.extend(utc);
dayjs.locale("ko");
dayjs.extend(relativeTime);

function dateString(date: string) {
  return dayjs().to(dayjs(date).utc().format("YYYY-MM-DD HH:mm:ss"));
}

export function generateStaticParams() {
  const categories: any = db.categories;
  const params: { category: string; id: string }[] = [];
  for (const category in categories) {
    const ids: string[] = categories[category] as unknown as string[];
    let categoryValue = category;
    if (process.env.NODE_ENV === "production") {
      categoryValue = decodeURIComponent(categoryValue);
    }
    for (const id of ids) {
      params.push({
        id,
        category: categoryValue,
      });
    }
  }
  return params;
}

export default async function Page({
  params,
}: {
  params: { id: string; category: string };
}) {
  const { dictionary }: { dictionary: { [key: string]: Post } } = db;

  const { title, category, created, modified, tags } = dictionary[params.id];

  const yamlPattern = /^---[\s\S]+?---/;

  const file = readFileSync(
    join(process.cwd(), "src", "md", dictionary[params.id]?.filename)
  )
    .toString()
    .replace(yamlPattern, "");

  const { value } = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode)
    .use(rehypeStringify)
    .process(file);

  return (
    <>
      <div className={styles["post-info"]}>
        <Breadcrumb className={styles["breadcrumb"]}>
          <BreadcrumbList>
            <BreadcrumbItem className={styles["category"]}>
              <BreadcrumbLink href={`/${category}`}>{category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className={styles["title"]}>
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {title}
        </h1>
        <span className={styles["date"]}>{dateString(created)}</span>
      </div>
      <div
        className={`${styles["post"]} ${styles["markdown"]}`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
      <div className={styles["tags"]}>
        <TagIcon />
        {tags.map((tag) => (
          <Link
            className={styles["tag-badge"]}
            href={`/tag/${tag}`}
            key={`${params.id}_${tag}`}
          >
            {tag}
          </Link>
        ))}
      </div>
      <Footer />
      <ScrollTop />
    </>
  );
}
