"use client";
import { FunctionComponent } from "react";
import { usePathname } from "next/navigation";
import db from "@/data/db.json";

import styles from "@/styles/components/category-post-list.module.scss";
import { metadata } from "@/types";
import Link from "next/link";

type CategoryPostListItem = {} & CategoryPost;

type CategoryPost = {
  id: string;
  title: string;
};

function getCategoryPostList({
  category,
  categories,
  dictionary,
}: {
  category: string;
  categories: { [key: string]: string[] };
  dictionary: { [key: string]: metadata };
}): CategoryPost[] {
  const postIdList = categories[category];

  if (!postIdList) {
    return [];
  }

  return postIdList.map((postId) => ({
    title: dictionary[postId].title,
    id: postId,
  }));
}

const CategoryPostListItem: FunctionComponent<CategoryPostListItem> = ({
  title,
  id,
}) => {
  return (
    <li className={styles["category-post-list-item"]}>
      <Link href={`/post/${id}`}>{title}</Link>
    </li>
  );
};

const CategoryPostList: FunctionComponent = () => {
  const { categories, dictionary }: any = db;

  const pathname = usePathname();

  const regExp = new RegExp(`^\/[^\/\s]+`);

  return (
    <ul className={`${styles["category-post-list"]}`}>
      {(regExp.test(pathname)
        ? getCategoryPostList({
            category: pathname.replace("/", ""),
            categories,
            dictionary,
          })
        : []
      ).map(({ id, title }) => (
        <CategoryPostListItem key={id} id={id} title={title} />
      ))}
    </ul>
  );
};

export default CategoryPostList;
