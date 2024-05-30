import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import Header from "@/components/header/header";
import { ScrollArea } from "@/components/ui/scroll-area";

import CategoryList from "@/components/category-list/category-list";

import db from "@/data/db.json";

import "@/styles/globals.scss";

import styles from "@/styles/home.module.scss";

export const metadata: Metadata = {
  title: "Sumr",
  description:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
  icons: {
    icon: [
      "/favicon/favicon.ico",
      "/favicon/android-chrome-192x192.png",
      "/favicon/android-chrome-256x256.png",
    ],
    apple: ["/favicon/apple-touch-icon.png"],
    shortcut: [
      "/favicon/android-chrome-192x192.png",
      "/favicon/android-chrome-256x256.png",
    ],
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
              <ScrollArea className="h-[70vh] w-[full]">
                <CategoryList list={categoryList} iconLink={link} />
              </ScrollArea>
            </nav>
          </aside>
          <div className={styles["container"]}>{children}</div>
        </main>
      </body>
    </html>
  );
}
