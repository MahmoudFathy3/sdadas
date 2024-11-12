import styles from "./Search.module.css";
import { CiFilter, CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className={styles.Search}>
      <CiSearch className={styles.icon} />
      <input type="search" placeholder="بحث" />
      <CiFilter className={styles.icon} />
    </div>
  );
};

export default Search;
