"use client";

import { dateString } from "@/util";

const PostDate = ({ children }: { children: string }) => {
  return <>{dateString(children)}</>;
};

export default PostDate;
