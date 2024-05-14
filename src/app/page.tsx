import { readFileSync } from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

import db from "@/app/db.json";

export default async function Home() {
  // const value = await remark().use(html).process(data);
  return (
    <main>
      <div className="markdown-body"></div>
    </main>
  );
}
