import styles from "./header.module.css";
import { logo, icon_units, icon_dropdown } from "#frontend/assets/images";
import { SearchBar } from "#frontend/features/searchbar/components/searchbar";
import { Button } from "#frontend/shared/primitives/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "#frontend/shared/primitives/dropdown";
import { Image } from "#frontend/shared/primitives/image";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["header-top"]}>
        <Image src={logo} alt="logo" className="logo" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="unit">
              <Image src={icon_units} alt="unit icon" />
              Units
              <Image src={icon_dropdown} alt="dropdown icon"></Image>
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
      <h1 className={styles.heading}>How's the sky looking today?</h1>
      <div className={styles["header-bottom"]}>
        <SearchBar />
      </div>
    </header>
  );
}
