"user client";

import { useRouter } from "next/navigation";
import { KeyboardEventHandler, MouseEventHandler, useRef } from "react";

import SearchIcon from "@/components/icon/search";

import styles from "@/styles/components/search.module.scss";

const Search = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeypressInput: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { key } = event;
    if (key === "Enter") {
      const value = event.currentTarget.value.trim();
      if (value) {
        router.push(`/search?q=${value}`);
      }
    }
  };

  const onClickIcon: MouseEventHandler<SVGSVGElement> = (event) => {
    if (inputRef) {
      const keyPressEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
      });
      inputRef.current?.dispatchEvent(keyPressEvent);
    }
  };

  return (
    <div className={styles["search"]}>
      <SearchIcon onClick={onClickIcon} />
      <input
        type="text"
        ref={inputRef}
        placeholder="제목 검색"
        onKeyDown={onKeypressInput}
      />
    </div>
  );
};

export default Search;
