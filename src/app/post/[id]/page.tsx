import db from "@/app/db.json";
import { readFileSync } from "fs";
import { join } from "path";

export function generateStaticParams() {
  return db.list.map((item) => ({ id: item }));
}

export default function Page({ params }: { params: { id: string } }) {
  // const value = await remark().use(html).process(data);
  const { dictionary }: any = db;
  const file = readFileSync(
    join(process.cwd(), "src", "md", dictionary[params.id]?.filename)
  ).toString();
  return (
    <main>
      <div>{file}</div>
    </main>
  );
}
