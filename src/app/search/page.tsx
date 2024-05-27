"use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

import {
  RecentPostListItem,
  RecentPostListItemProps,
  IconLink as IconLinkType,
} from "../page";

import db from "@/data/db.json";
//import iconLink from "@/data/icon_link.json";

import { title } from "@/types";

import styles from "@/styles/search/search.module.scss";

type SearchPostListItem = RecentPostListItemProps;

// const LIMIT = 10;

// function getSearchList({
//   list,
//   titles,
//   search,
//   offset,
//   dictionary,
// }: {
//   list: SearchPostListItem[];
//   titles: title[];
//   search: string;
//   offset: number;
//   dictionary: { [key: string]: SearchPostListItem };
// }): { list: SearchPostListItem[]; offset: number } {
//   const newList: SearchPostListItem[] = [];
//   let newOffset = offset;
//   for (let i = offset + 1; i < titles.length; i++) {
//     if (!titles.length) {
//       break;
//     }

//     const { title, id } = titles[i];

//     if (newList.length >= LIMIT) {
//       break;
//     }

//     if (title.toLocaleLowerCase().includes(search)) {
//       newList.push(dictionary[id]);
//       newOffset = i;
//     }
//   }
//   return {
//     list: list.concat(newList),
//     offset: newOffset,
//   };
// }

export default function Page() {
  const {
    dictionary,
    titles,
  }: {
    dictionary: { [key: string]: SearchPostListItem };
    titles: title[];
  } = db;

  // const query = useSearchParams();
  // const search = String(query.get("q") || "").toLowerCase();
  // const iLink: IconLinkType = iconLink;

  // const [info, setInfo] = useState<{
  //   list: SearchPostListItem[];
  //   offset: number;
  // }>({ list: [], offset: -1 });

  // useEffect(() => {
  //   setInfo(getSearchList({ ...info, titles, search, dictionary }));
  // }, []);

  // useEffect(() => {
  //   setInfo(
  //     getSearchList({ list: [], offset: -1, titles, search, dictionary })
  //   );
  // }, [search]);

  return (
    <>
      <h1 className={styles["head"]}>{`"${""}"에 대한 검색 결과`}</h1>
      <ul className={styles["list"]}>
        {/* {info.list.map((item) => (
          <RecentPostListItem key={item.id} {...item} iconLink={iLink} />
        ))} */}
      </ul>
    </>
  );
}
