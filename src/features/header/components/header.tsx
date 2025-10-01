import styles from "./header.module.css";
import { logo, icon_units, icon_dropdown } from "#frontend/assets/images";
import { Button } from "#frontend/components/primitives/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "#frontend/components/primitives/dropdown";
import { Image } from "#frontend/components/primitives/image";

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
    </header>
  );
}
