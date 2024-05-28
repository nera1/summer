"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { throttle } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

import db from "@/data/db.json";

import iconLink from "@/data/icon_link.json";

import { IconLink, Post, title } from "@/types";

import { RecentPostListItem } from "@/components/recent-post-list-item/recent-post-list-item";
import ScrollTop from "@/components/scroll-top/scroll-top";
import Spinner from "@/components/spinner/spinner";

import config from "@/config/config.json";

import styles from "@/styles/search/search.module.scss";

function getSearchList({
  list,
  titles,
  search,
  offset,
  dictionary,
  limit,
}: {
  list: Post[];
  titles: title[];
  search: string;
  offset: number;
  dictionary: { [key: string]: Post };
  limit: number;
}): { list: Post[]; offset: number } {
  const newList: Post[] = [];
  let newOffset = offset;
  for (let i = offset + 1; i < titles.length; i++) {
    newOffset = i;
    if (!titles.length) {
      break;
    }

    const { title, id } = titles[i];

    if (newList.length >= limit) {
      break;
    }

    if (title.toLocaleLowerCase().includes(search)) {
      newList.push(dictionary[id]);
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

  const {
    limit: { searchPostList },
  } = config;

  const throttler = throttle(() => {
    setInfo((prev) =>
      getSearchList({
        ...prev,
        titles,
        search,
        dictionary,
        limit: searchPostList,
      })
    );
  }, 1000);

  const nexter = useCallback(throttler, [
    throttler,
    titles,
    search,
    dictionary,
    searchPostList,
  ]);

  const next = () => {
    nexter();
  };

  const [info, setInfo] = useState<{
    list: Post[];
    offset: number;
  }>({ list: [], offset: -1 });

  useEffect(() => {
    setInfo((prev) =>
      getSearchList({
        list: [],
        offset: -1,
        titles,
        search,
        dictionary,
        limit: searchPostList,
      })
    );
  }, [search, titles, dictionary, searchPostList]);

  return (
    <>
      <h1 className={styles["head"]}>{`"${search}" 에 대한 검색 결과`}</h1>
      <InfiniteScroll
        dataLength={info.list.length}
        hasMore={info.offset < titles.length - 1}
        next={next}
        loader={<Spinner />}
      >
        <ul className={styles["list"]}>
          {info.list.map((item) => (
            <RecentPostListItem key={item.id} {...item} iconLink={iLink} />
          ))}
        </ul>
      </InfiniteScroll>
      <ScrollTop />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchContents />
    </Suspense>
  );
}
