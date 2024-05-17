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
          width={24}
          height={24}
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
  const params = useParams();
  const [iconPath, setIconpath] = useState<string>(
    Object.keys(params).length ? "/" : ""
  );

  useEffect(() => {
    setSelected(typeof category === "object" ? category[0] : category);
  }, [category]);

  useEffect(() => {
    console.log(params);
  }, [params]);

  return (
    <ul className={styles["category-list"]}>
      <li
        className={`${styles["category-item"]} ${
          selected ? "" : styles["selected"]
        }`}
      >
        <Link className={styles["link"]} href={`/`}>
          <img
            src={`${iconPath}icons/nera.png`}
            alt="home"
            width={24}
            height={24}
          />
        </Link>
      </li>
      {list.map((category) => (
        <CategoryListItem
          className={selected === category ? styles["selected"] : ""}
          category={category}
          iconFilename={`${iconPath}icons/${iconLink[category]}`}
          key={category}
        />
      ))}
    </ul>
  );
};

export default CategoryList;
