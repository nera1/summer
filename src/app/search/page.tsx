"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import db from "@/data/db.json";

import iconLink from "@/data/icon_link.json";

import { IconLink, Post, title } from "@/types";

import { RecentPostListItem } from "@/components/recent-post-list-item/recent-post-list-item";

import styles from "@/styles/search/search.module.scss";

const LIMIT = 10;

function getSearchList({
  list,
  titles,
  search,
  offset,
  dictionary,
}: {
  list: Post[];
  titles: title[];
  search: string;
  offset: number;
  dictionary: { [key: string]: Post };
}): { list: Post[]; offset: number } {
  const newList: Post[] = [];
  let newOffset = offset;
  for (let i = offset + 1; i < titles.length; i++) {
    if (!titles.length) {
      break;
    }

    const { title, id } = titles[i];

    if (newList.length >= LIMIT) {
      break;
    }

    if (title.toLocaleLowerCase().includes(search)) {
      newList.push(dictionary[id]);
      newOffset = i;
    }
  }
  return {
    list: list.concat(newList),
    offset: newOffset,
  };
}

function SearchContents() {
  const query = useSearchParams();
  const search = String(query.get("q") || "").toLowerCase();
  const iLink: IconLink = iconLink;

  const { titles, dictionary } = db;

  const [info, setInfo] = useState<{
    list: Post[];
    offset: number;
  }>({ list: [], offset: -1 });

  useEffect(() => {
    setInfo(getSearchList({ ...info, titles, search, dictionary }));
  }, []);

  useEffect(() => {
    setInfo(
      getSearchList({ list: [], offset: -1, titles, search, dictionary })
    );
  }, [search, titles, dictionary]);

  return (
    <>
      <h1 className={styles["head"]}>{`"${search}"에 대한 검색 결과`}</h1>
      <ul className={styles["list"]}>
        {info.list.map((item) => (
          <RecentPostListItem key={item.id} {...item} iconLink={iLink} />
        ))}
      </ul>
    </>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className={styles["spinner-wrapper"]}>
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <SearchContents />
    </Suspense>
  );
}
