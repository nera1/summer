"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Spinner from "@/components/spinner/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { throttle } from "lodash";

import { RecentPostListItem } from "@/components/recent-post-list-item/recent-post-list-item";

import { IconLink, Post } from "@/types";

import db from "@/data/db.json";
import iconLink from "@/data/icon_link.json";
import config from "@/config/config.json";

import ScrollTop from "@/components/scroll-top/scroll-top";

import styles from "@/styles/category/category.module.scss";

type CategoryPostListContents = {
  category: string;
};

type Contents = {
  category: string;
};

function getCategoryPostList({
  list,
  postIdList,
  offset,
  dictionary,
  limit,
}: {
  list: Post[];
  postIdList: string[];
  offset: number;
  dictionary: { [key: string]: Post };
  limit: number;
}): { list: Post[]; offset: number } {
  const newList: Post[] = [];
  let newOffset = offset;

  for (let i = offset + 1; i < postIdList.length; i++) {
    if (!postIdList.length) {
      break;
    }
    if (newList.length >= limit) {
      break;
    }
    newList.push(dictionary[postIdList[i]]);
    newOffset = i;
  }

  return {
    list: list.concat(newList),
    offset: newOffset,
  };
}

function CategoryPostListContents({ category }: CategoryPostListContents) {
  const categoryOriginalName = decodeURIComponent(category);

  const iLink: IconLink = iconLink;

  const {
    dictionary,
    categories,
  }: {
    dictionary: { [key: string]: Post };
    categories: { [key: string]: string[] };
  } = db;

  const {
    limit: { categoryPostList },
  } = config;

  const postIdList: string[] = categories[category];

  const [info, setInfo] = useState<{
    list: Post[];
    offset: number;
  }>({ list: [], offset: -1 });

  const throttler = throttle(() => {
    setInfo((prev) =>
      getCategoryPostList({
        ...prev,
        dictionary,
        postIdList,
        limit: categoryPostList,
      })
    );
  }, 1000);

  const nexter = useCallback(throttler, [throttler]);

  const next = () => {
    nexter();
  };

  useEffect(() => {
    setInfo((prev) =>
      getCategoryPostList({
        ...prev,
        dictionary,
        postIdList,
        limit: categoryPostList,
      })
    );
  }, [postIdList, dictionary, categoryPostList]);

  return (
    <>
      <h1
        className={styles["head"]}
      >{`"${categoryOriginalName}" 카테고리의 포스트`}</h1>
      <InfiniteScroll
        dataLength={info.list.length}
        next={next}
        hasMore={info.list.length < postIdList.length}
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

export default function Contents({ category }: Contents) {
  return (
    <Suspense fallback={<Spinner />}>
      <CategoryPostListContents category={category} />
    </Suspense>
  );
}
