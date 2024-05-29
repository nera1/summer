"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
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
        <ScrollArea className="h-[70vh] w-[full]">
          <CategoryList list={list} iconLink={iconLink} closerRef={closeRef} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySheet;
