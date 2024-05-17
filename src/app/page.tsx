"use client";

import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import db from "@/data/db.json";
import iconLink from "@/data/icon_link.json";

import styles from "@/styles/home.module.scss";
import { createDateString } from "@/util";

type RecentPostListItem = {
  filename: string;
  created: string;
  modified: string;
  tags: string[];
  category?: string;
  author?: string;
  title?: string;
  id: string;
};

type IconLink = { [key: string]: string };

const RecentPostListItem: FunctionComponent<
  RecentPostListItem & { iconLink: IconLink }
> = (props) => {
  const { id, title, category, iconLink, created, tags } = props;
  return (
    <li className={styles["recent-post-list-item"]}>
      <Link href={`/post/${id}`}>
        <span className={styles["category"]}>
          <img
            className={styles["icon"]}
            src={`/icons/${iconLink[category || "markdown.svg"]}`}
            width={18}
            height={18}
            alt={category || "nothing"}
          />
          <span className={styles["category-name"]}>{category}</span>
        </span>
        <span className={styles["title"]}>{title}</span>
        <span className={styles["date"]}>
          <span className={styles["created"]}>{createDateString(created)}</span>
        </span>
        <span className={styles["tag"]}>
          {tags.map((tag) => (
            <Link
              className={styles["tag-badge"]}
              href={`/`}
              key={`${id}_${tag}`}
            >
              {tag}
            </Link>
          ))}
        </span>
      </Link>
    </li>
  );
};

export default function RecentPostList() {
  const { dictionary }: { dictionary: { [key: string]: RecentPostListItem } } =
    db;

  const [list, setList] = useState<string[]>([]);

  const iLink: IconLink = iconLink;

  useEffect(() => {
    setList(db.list.reverse());
  }, []);

  return (
    <ul className={styles["recent-post-list"]}>
      {list.map((id) => (
        <RecentPostListItem {...dictionary[id]} iconLink={iLink} key={id} />
      ))}
    </ul>
  );
}
