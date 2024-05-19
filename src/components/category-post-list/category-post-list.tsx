"use client";
import { usePathname } from "next/navigation";

const CategoryPostList = () => {
  const pathname = usePathname();
  console.log(pathname);
  return <ul></ul>;
};

export default CategoryPostList;
