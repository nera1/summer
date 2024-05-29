import { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";

import { dateString } from "@/util";

import { Post, IconLink } from "@/types";

import { Tag as TagIcon } from "../icon";

import styles from "@/styles/home.module.scss";

export type RecentPostListItemProps = {
  iconLink: IconLink;
} & Post;

export const RecentPostListItem: FunctionComponent<RecentPostListItemProps> = (
  props
) => {
  const { id, title, category, iconLink, created, tags } = props;

  return (
    <li className={styles["recent-post-list-item"]}>
      <span className={styles["top"]}>
        <Link className={styles["category"]} href={`/${category}`}>
          <Image
            className={styles["icon"]}
            src={`/icons/${
              iconLink[encodeURIComponent(category || "") || "default"]
            }`}
            width={18}
            height={18}
            style={{ width: 18, height: 18 }}
            alt={category || ""}
          />
          <span className={styles["category-name"]}>{category}</span>
        </Link>
        <span className={styles["date"]}>
          <span className={styles["created"]}>{dateString(created)}</span>
        </span>
      </span>
      <Link href={`/${category}/${id}`} className={styles["title-link"]}>
        <span className={styles["title"]}>{title}</span>
      </Link>
      <span className={styles["tag"]}>
        <TagIcon />
        {tags.map((tag) => (
          <Link
            className={styles["tag-badge"]}
            href={`/tag/${tag}`}
            key={`${id}_${tag}`}
          >
            {tag}
          </Link>
        ))}
      </span>
    </li>
  );
};
