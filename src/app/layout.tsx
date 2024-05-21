import { FunctionComponent } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { readFileSync } from "fs";
import { join } from "path";
import Header from "@/components/header/header";

import CategoryList from "@/components/category-list/category-list";

import db from "@/data/db.json";

import "@/styles/globals.scss";
import styles from "@/styles/home.module.scss";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Nera",
  description: "Nera",
};

type CategoryItem = {
  category: string;
  iconFilename?: string;
  selected?: boolean;
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
        <Header />
        <main>
          <aside className={styles["category"]}>
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
