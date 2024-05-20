import db from "@/data/db.json";

import styles from "@/styles/category/category.module.scss";

export function generateStaticParams() {
  const categories = Object.keys(db.categories).map((category) => ({
    category,
  }));
  return categories;
}

// Adjust the component to use the correct dynamic parameter name
export default function Page({ params }: { params: { category: string } }) {
  return <div className={styles["category"]}>Category: {params.category}</div>;
}
