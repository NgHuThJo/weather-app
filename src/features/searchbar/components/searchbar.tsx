import styles from "./searchbar.module.css";
import { icon_search } from "#frontend/assets/images";
import { Button } from "#frontend/shared/primitives/button";
import { Image } from "#frontend/shared/primitives/image";

export function SearchBar() {
  return (
    <div className={styles.layout}>
      <div className={styles["search-input"]}>
        <Image src={icon_search} alt="search icon"></Image>
        <input type="text" placeholder="Search for a place..." />
      </div>
      <Button variant="search">Search</Button>
    </div>
  );
}
