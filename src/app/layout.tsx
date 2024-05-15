import type { Metadata } from "next";
import Image from "next/image";

import db from "@/app/db.json";
import iconLink from "@/app/icon_link.json";

import "@/styles/globals.css";
import styles from "@/styles/home.module.scss";
import { readFileSync } from "fs";
import { join } from "path";

export const metadata: Metadata = {
  title: "Nera",
  description: "Nera",
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
    readFileSync(join(process.cwd(), "src", "app", "icon_link.json")).toString()
  );

  return (
    <html lang="en">
      <body className={styles["home"]}>
        <aside>
          <nav>
            <ul className={styles["category-list"]}>
              {Object.keys(categories).map((category) => (
                <li className={styles["category-item"]} key={category}>
                  <Image
                    src={`icons/${link[category]}`}
                    alt={category}
                    width={20}
                    height={20}
                  />
                  {category}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main></main>
      </body>
    </html>
  );
}
