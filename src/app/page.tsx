"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { RecentPostListItem } from "@/components/recent-post-list-item/recent-post-list-item";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/spinner/spinner";
import { throttle } from "lodash";

import db from "@/data/db.json";
import iconLink from "@/data/icon_link.json";
import config from "@/config/config.json";

import { Post } from "@/types/post";

import styles from "@/styles/home.module.scss";

import { IconLink as ILink } from "@/types";

export type IconLink = { [key: string]: string };

export type RecentPostListItemProps = {
  iconLink: IconLink;
} & Post;

type getRecentPostListParam = {
  limit: number;
  list: Post[];
  dictionary: { [key: string]: Post };
  offset: number;
  postIdList: string[];
};

function getRecentPostList({
  limit,
  list,
  dictionary,
  offset,
  postIdList,
}: getRecentPostListParam) {
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

function RecentPostList() {
  const {
    dictionary,
    list,
    rList,
  }: { dictionary: { [key: string]: Post }; list: string[]; rList: string[] } =
    db;

  const {
    limit: { totalList },
  } = config;

  const iLink: ILink = iconLink;

  const [info, setInfo] = useState<{
    list: Post[];
    offset: number;
  }>({ list: [], offset: -1 });

  const throttler = throttle(() => {
    setInfo((prev) =>
      getRecentPostList({
        limit: totalList,
        ...prev,
        dictionary,
        postIdList: rList,
      })
    );
  }, 1000);

  const nexter = useCallback(throttler, [throttler]);

  useEffect(() => {
    setInfo((prev) =>
      getRecentPostList({
        limit: totalList,
        ...prev,
        dictionary,
        postIdList: rList,
      })
    );
  }, [totalList, dictionary, rList]);

  const next = () => {
    nexter();
  };

  return (
    <InfiniteScroll
      dataLength={info.list.length}
      next={next}
      hasMore={info.list.length < rList.length}
      loader={<Spinner />}
    >
      <ul className={styles["recent-post-list"]}>
        {info.list.map((post) => (
          <RecentPostListItem {...post} iconLink={iLink} key={post.id} />
        ))}
      </ul>
    </InfiniteScroll>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <RecentPostList />
    </Suspense>
  );
}
