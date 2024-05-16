import db from "@/data/db.json";

export function generateStaticParams() {
  const categories = Object.keys(db.categories).map((category) => ({
    category,
  }));
  return categories;
}

// Adjust the component to use the correct dynamic parameter name
export default function Page({ params }: { params: { category: string } }) {
  return (
    <main>
      <div>Category: {params.category}</div>
    </main>
  );
}
