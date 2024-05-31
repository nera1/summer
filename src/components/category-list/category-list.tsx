"use client";
import {
  FunctionComponent,
  MouseEventHandler,
  RefObject,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";

import db from "@/data/db.json";

import { CategoryOrigins } from "@/types";

import styles from "@/styles/components/category-list.module.scss";

type CategoryListItem = {
  category: string;
  iconFilename?: string;
  selected?: boolean;
  className?: string;
  closerRef?: RefObject<HTMLButtonElement>;
  categoryOrigins: CategoryOrigins;
};

export type CategoryList = {
  list: string[];
  iconLink: {
    [key: string]: string;
  };
  closerRef?: RefObject<HTMLButtonElement>;
};

type PostListItem = {
  id: string;
  title: string;
};

const CategoryListItem: FunctionComponent<CategoryListItem> = ({
  category,
  iconFilename,
  className,
  closerRef,
  categoryOrigins,
}) => {
  const originalCategoryName = decodeURIComponent(category);

  const [postList, setPostList] = useState<PostListItem[]>([]);

  const onClickTrigger: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (postList.length) {
      return;
    }
    const categories: any = db.categories;
    const dictionary: any = db.dictionary;
    const pl: PostListItem[] = categories[category].map(
      (item: string | number) => ({
        id: item,
        title: dictionary[item].title,
      })
    );
    setPostList(pl);
  };

  const onClickLink: MouseEventHandler<HTMLAnchorElement> = (event) => {
    closerRef?.current?.click();
  };

  return (
    <li className={`${styles["category-item"]} ${className || ""}`}>
      <Accordion type="single" collapsible className={styles["accordion"]}>
        <AccordionItem value="item-1" className={styles["item"]}>
          <AccordionTrigger
            className={styles["trigger"]}
            onClick={onClickTrigger}
          >
            <Image
              className={styles["icon"]}
              src={iconFilename || ""}
              alt={originalCategoryName}
              width={16}
              height={16}
              style={{ width: 16, height: 16 }}
            />
            <label className={styles["name"]}>
              {categoryOrigins[originalCategoryName]}
            </label>
          </AccordionTrigger>
          {postList.map(({ id, title }) => (
            <AccordionContent className={styles["content"]} key={id}>
              <Link
                href={`/${originalCategoryName}/${id}`}
                onClick={onClickLink}
              >
                {title}
              </Link>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </li>
  );
};

const CategoryList: FunctionComponent<CategoryList> = ({
  list,
  iconLink,
  closerRef,
}) => {
  list = list.sort((prev, next) => {
    if (next < prev) {
      return 1;
    } else {
      return -1;
    }
  });
  const categoryOrigins: CategoryOrigins = db["categoryOrigins"];
  const pathname = usePathname();
  const { category } = useParams();
  const [selected, setSelected] = useState<string>(
    (typeof category === "object" ? category[0] : category) || ""
  );

  const [iconPath, setIconPath] = useState<string>(pathname === "/" ? "" : "/");

  useEffect(() => {
    const value = typeof category === "object" ? category[0] : category;
    setSelected(value);
  }, [category]);

  useEffect(() => {
    setIconPath(pathname === "/" ? "" : "/");
  }, [pathname]);

  return (
    <ul className={styles["category-list"]}>
      <li className={`${styles["category-item"]} ${styles["home"]}`}>
        <Accordion type="single" collapsible className={styles["accordion"]}>
          <AccordionItem value="item-1" className={styles["item"]}>
            <Link
              href={"/"}
              onClick={(event) => {
                closerRef?.current?.click();
              }}
            >
              <label className={styles["name"]}>전체 글</label>
            </Link>
          </AccordionItem>
        </Accordion>
      </li>
      {list.map((category) => (
        <CategoryListItem
          category={category}
          categoryOrigins={categoryOrigins}
          iconFilename={`/icons/${iconLink[category]}`}
          key={category}
          closerRef={closerRef}
        />
      ))}
    </ul>
  );
};

export default CategoryList;
