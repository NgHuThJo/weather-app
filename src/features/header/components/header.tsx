import type { MouseEvent } from "react";
import { useShallow } from "zustand/shallow";
import styles from "./header.module.css";
import { logo, icon_units, icon_dropdown } from "#frontend/assets/images";
import { SearchBar } from "#frontend/features/searchbar/components/searchbar";
import { Button } from "#frontend/shared/primitives/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "#frontend/shared/primitives/dropdown";
import { Image } from "#frontend/shared/primitives/image";
import {
  useCurrentUnits,
  useCurrentSystem,
  useUnitStore,
} from "#frontend/shared/store/unit";

export function Header() {
  const currentSystem = useCurrentSystem();
  const currentUnits = useCurrentUnits();
  const setUnits = useUnitStore(
    useShallow((state) => {
      const { currentUnits, currentSystem, ...rest } = state;

      return rest;
    }),
  );

  const handleClickDelegation = (event: MouseEvent) => {
    const action = (event.target as HTMLElement)
      .closest("[data-action")
      ?.getAttribute("data-action");

    if (!action) {
      console.log("action target not found");
      return;
    }

    switch (action) {
      case "celsius": {
        break;
      }
      case "fahrenheit": {
        break;
      }
      case "km/h": {
        break;
      }
      case "mph": {
        break;
      }
      case "mm": {
        break;
      }
      case "in": {
        break;
      }
    }
  };

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
          <DropdownMenuContent onClick={handleClickDelegation}>
            <DropdownMenuItem asChild>
              <Button>
                {`Switch to ${currentSystem === "metric" ? "imperial" : currentSystem}`}
              </Button>
            </DropdownMenuItem>
            <DropdownMenuLabel>Temperature</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={currentUnits.temperature === "°C"}
              data-action="celsius"
            >
              Celsius (°C)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={currentUnits.temperature === "°F"}
              data-action="fahrenheit"
            >
              Fahrenheit (°F)
            </DropdownMenuCheckboxItem>
            <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={currentUnits.wind_speed === "km/h"}
              data-action="km/h"
            >
              km/h
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={currentUnits.wind_speed === "mph"}
              data-action="mph"
            >
              mph
            </DropdownMenuCheckboxItem>
            <DropdownMenuLabel>Precipitation</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={currentUnits.precipitation === "mm"}
              data-action="mm"
            >
              Millimeters (mm)
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={currentUnits.precipitation === "in"}
              data-action="in"
            >
              Inches (in)
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h1 className={styles.heading}>How's the sky looking today?</h1>
      <div className={styles["header-bottom"]}>
        <SearchBar />
      </div>
    </header>
  );
}
