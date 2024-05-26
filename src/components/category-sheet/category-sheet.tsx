"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { FunctionComponent, RefObject, useRef } from "react";

import CategoryList, {
  CategoryList as CategoryListType,
} from "../category-list/category-list";

import styles from "@/styles/components/category-sheet.module.scss";

type CategorySheet = {
  triggerRef: RefObject<HTMLButtonElement>;
} & CategoryListType;

const CategorySheet: FunctionComponent<CategorySheet> = ({
  triggerRef,
  list,
  iconLink,
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <Sheet>
      <SheetTrigger
        className={styles["trigger"]}
        ref={triggerRef}
      ></SheetTrigger>
      <SheetClose ref={closeRef} className={styles["closer"]}></SheetClose>
      <SheetContent side="left" className={`${styles["content"]}`}>
        <CategoryList list={list} iconLink={iconLink} closerRef={closeRef} />
      </SheetContent>
    </Sheet>
  );
};

export default CategorySheet;
