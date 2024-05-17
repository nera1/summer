import { FunctionComponent } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { readFileSync } from "fs";
import { join } from "path";

import CategoryList from "@/components/category-list/category-list";

import db from "@/data/db.json";

import "@/styles/globals.scss";
import styles from "@/styles/home.module.scss";

export const metadata: Metadata = {
  title: "Nera",
  description: "Nera",
};

type CategoryItem = {
  category: string;
  iconFilename?: string;
  selected?: boolean;
};

const CategoryItem: FunctionComponent<CategoryItem> = (props) => {
  const { category, iconFilename } = props;
  return (
    <li className={styles["category-item"]}>
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = db.categories;
  const link: {
    [key: string]: string;
  } = JSON.parse(
    readFileSync(
      join(process.cwd(), "src", "data", "icon_link.json")
    ).toString()
  );
  return (
    <html lang="en">
      <body className={styles["home"]}>
        <header></header>
        <main>
          <aside>
            <nav>
              <CategoryList list={Object.keys(categories)} iconLink={link} />
            </nav>
          </aside>
          <div className={styles["container"]}>{children}</div>
        </main>
      </body>
    </html>
  );
}
