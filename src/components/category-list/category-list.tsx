"use client";
import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import styles from "@/styles/components/category-list.module.scss";

type CategoryListItem = {
  category: string;
  iconFilename?: string;
  selected?: boolean;
  className?: string;
};

type CategoryList = {
  list: string[];
  iconLink: {
    [key: string]: string;
  };
};

const CategoryListItem: FunctionComponent<CategoryListItem> = ({
  category,
  iconFilename,
  className,
}) => {
  return (
    <li className={`${styles["category-item"]} ${className || ""}`}>
      <Link className={styles["link"]} href={`/${category}`}>
        <Image
          className={styles["icon"]}
          src={iconFilename || ""}
          alt={category}
          width={20}
          height={20}
        />
      </Link>
    </li>
  );
};

const CategoryList: FunctionComponent<CategoryList> = ({ list, iconLink }) => {
  list = list.sort((prev, next) => {
    if (next < prev) {
      return 1;
    } else {
      return -1;
    }
  });
  const { category } = useParams();
  const [selected, setSelected] = useState<string>(
    (typeof category === "object" ? category[0] : category) || ""
  );

  useEffect(() => {
    setSelected(typeof category === "object" ? category[0] : category);
  }, [category]);

  return (
    <ul className={styles["category-list"]}>
      {list.map((category) => (
        <CategoryListItem
          className={selected === category ? styles["selected"] : ""}
          category={category}
          iconFilename={`icons/${iconLink[category]}`}
          key={category}
        />
      ))}
    </ul>
  );
};

export default CategoryList;
