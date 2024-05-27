"use client";

import { useEffect, useState } from "react";

import db from "@/data/db.json";
import iconLink from "@/data/icon_link.json";

import { RecentPostListItem } from "@/components/recent-post-list-item/recent-post-list-item";

import { Post } from "@/types/post";

import styles from "@/styles/home.module.scss";

export type IconLink = { [key: string]: string };

export type RecentPostListItemProps = {
  iconLink: IconLink;
} & Post;

export default function RecentPostList() {
  const { dictionary }: { dictionary: { [key: string]: Post } } = db;

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
