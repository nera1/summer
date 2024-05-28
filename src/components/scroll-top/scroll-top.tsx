"use client";

import { useEffect } from "react";

const ScrollTop = () => {
  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return <></>;
};

export default ScrollTop;
