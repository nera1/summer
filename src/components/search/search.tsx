import SearchIcon from "@/components/icon/search";
import styles from "@/styles/components/search.module.scss";

const Search = () => {
  return (
    <div className={styles["search"]}>
      <SearchIcon />
      <input type="text" placeholder="제목 검색" />
    </div>
  );
};

export default Search;
