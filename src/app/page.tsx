"use client";

import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import db from "@/data/db.json";
import iconLink from "@/data/icon_link.json";

import styles from "@/styles/home.module.scss";

import Tag from "@/components/icon/tag";

import { dateString } from "@/util";

export type RecentPostListItemProps = {
  filename: string;
  created: string;
  modified: string;
  tags: string[];
  category?: string;
  author?: string;
  title?: string;
  id: string;
};

export type IconLink = { [key: string]: string };

export const RecentPostListItem: FunctionComponent<
  RecentPostListItemProps & { iconLink: IconLink }
> = (props) => {
  const { id, title, category, iconLink, created, tags } = props;
  return (
    <li className={styles["recent-post-list-item"]}>
      <span className={styles["top"]}>
        <span className={styles["category"]}>
          <Image
            className={styles["icon"]}
            src={`/icons/${iconLink[category || "markdown.svg"]}`}
            width={18}
            height={18}
            style={{ width: 18, height: 18 }}
            alt={category || "nothing"}
          />
          <span className={styles["category-name"]}>{category}</span>
        </span>
        <span className={styles["date"]}>
          <span className={styles["created"]}>{dateString(created)}</span>
        </span>
      </span>
      <Link href={`/${category}/${id}`} className={styles["title-link"]}>
        <span className={styles["title"]}>{title}</span>
      </Link>
      <span className={styles["tag"]}>
        <Tag />
        {tags.map((tag) => (
          <Link className={styles["tag-badge"]} href={`/`} key={`${id}_${tag}`}>
            {tag}
          </Link>
        ))}
      </span>
    </li>
  );
};

export default function RecentPostList() {
  const {
    dictionary,
  }: { dictionary: { [key: string]: RecentPostListItemProps } } = db;

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
