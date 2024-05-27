"use client";

import { FunctionComponent, MouseEventHandler, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Search from "../search/search";
import CategorySheet from "../category-sheet/category-sheet";

import { CategoryList } from "../category-list/category-list";

import { Menu } from "../icon";

import styles from "@/styles/components/header.module.scss";

type Header = CategoryList & {};

const Header: FunctionComponent<Header> = ({ list, iconLink }) => {
  const categorySheetRef = useRef<HTMLButtonElement>(null);

  const onClickMenu: MouseEventHandler<HTMLButtonElement> = (event) => {
    categorySheetRef?.current?.click();
  };

  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["container"]}>
          <div className={styles["left"]}>
            <Button
              variant={"outline"}
              size="icon"
              className={`${styles["menu"]} ${styles["btn"]}`}
              onClick={onClickMenu}
            >
              <Menu className={styles["icon"]} />
            </Button>
          </div>
          <div className={styles["center"]}></div>
          <div className={styles["right"]}>
            <Search />
            <Button
              variant={"outline"}
              size="icon"
              className={`${styles["github"]} ${styles["btn"]}`}
            >
              <Link href="https://github.com/nera1/sumr">
                <Image
                  src={`/icons/github.svg`}
                  alt={"github"}
                  width="16"
                  height="15"
                  style={{ width: 16, height: 15 }}
                  className={styles["icon"]}
                />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <CategorySheet
        iconLink={iconLink}
        list={list}
        triggerRef={categorySheetRef}
      />
    </>
  );
};

export default Header;
