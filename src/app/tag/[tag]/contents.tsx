"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { throttle } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

import Spinner from "@/components/spinner/spinner";
import { RecentPostListItem } from "@/components/recent-post-list-item/recent-post-list-item";

import { IconLink, Post } from "@/types";

import db from "@/data/db.json";
import iconLink from "@/data/icon_link.json";
import config from "@/config/config.json";

import styles from "@/styles/tag/tag.module.scss";

type Contents = {
  tag: string;
};

function getTagPostList({
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

function TagPostList({ tag }: { tag: string }) {
  const iLink: IconLink = iconLink;

  const {
    limit: { tagPostList },
  } = config;

  const {
    dictionary,
    tags,
  }: {
    dictionary: { [key: string]: Post };
    tags: { [key: string]: string[] };
  } = db;

  const postIdList: string[] = tags[tag];

  const throttler = throttle(() => {
    setInfo((prev) =>
      getTagPostList({
        ...prev,
        dictionary,
        postIdList,
        limit: tagPostList,
      })
    );
  }, 1000);

  const nexter = useCallback(throttler, [throttler]);

  const next = () => {
    nexter();
  };

  const [info, setInfo] = useState<{
    list: Post[];
    offset: number;
  }>({ list: [], offset: -1 });

  useEffect(() => {
    setInfo((prev) =>
      getTagPostList({
        ...prev,
        dictionary,
        postIdList,
        limit: tagPostList,
      })
    );
    window?.scrollTo({ top: 0, behavior: "instant" });
  }, [postIdList, dictionary, tagPostList]);

  return (
    <>
      <h1 className={styles["head"]}>{`"${decodeURIComponent(
        tag
      )}" 태그의 포스트`}</h1>
      <InfiniteScroll
        next={next}
        dataLength={info.list.length}
        hasMore={info.list.length < postIdList.length}
        loader={<Spinner />}
      >
        <ul className={styles["list"]}>
          {info.list.map((item) => (
            <RecentPostListItem key={item.id} {...item} iconLink={iLink} />
          ))}
        </ul>
      </InfiniteScroll>
    </>
  );
}

export default function Contents({ tag }: Contents) {
  return (
    <Suspense fallback={<Spinner />}>
      <TagPostList tag={tag} />
    </Suspense>
  );
}
