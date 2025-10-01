import styles from "./searchbar.module.css";
import { icon_search } from "#frontend/assets/images";
import { Button } from "#frontend/components/primitives/button";
import { Image } from "#frontend/components/primitives/image";

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
