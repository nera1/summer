import { remark } from "remark";
import html from "remark-html";
import db from "@/app/db.json";
import { readFileSync } from "fs";
import { join } from "path";

export function generateStaticParams() {
  return db.list.map((item) => ({ id: item }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { dictionary }: any = db;
  const file = readFileSync(
    join(process.cwd(), "src", "md", dictionary[params.id]?.filename)
  ).toString();
  const value = await remark().use(html).process(file);
  return (
    <main>
      <div>{file}</div>
    </main>
  );
}
