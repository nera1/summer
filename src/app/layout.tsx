import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import Header from "@/components/header/header";

import CategoryList from "@/components/category-list/category-list";

import db from "@/data/db.json";

import "@/styles/globals.scss";

import styles from "@/styles/home.module.scss";

export const metadata: Metadata = {
  title: "Sumr",
  description: "Sumr",
  icons: {
    icon: "/favicon/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoryList = Object.keys(db.categories);
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
        <Header list={categoryList} iconLink={link} />
        <main>
          <aside className={styles["category"]}>
            <nav className={styles["category-list-wrapper"]}>
              <CategoryList list={categoryList} iconLink={link} />
            </nav>
          </aside>
          <div className={styles["container"]}>{children}</div>
        </main>
      </body>
    </html>
  );
}
