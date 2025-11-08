import type { MouseEvent } from "react";
import { useShallow } from "zustand/shallow";
import styles from "./header.module.css";
import { logo, icon_units, icon_dropdown } from "#frontend/assets/images";
import { SearchBar } from "#frontend/features/header/components/searchbar";
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
  const {
    setCurrentSystem,
    setCurrentUnits,
    setImperialUnits,
    setMetricUnits,
  } = useUnitStore(
    useShallow((state) => {
      const { currentUnits, currentSystem, ...rest } = state;

      return rest;
    }),
  );

  const handleUnitSelection = (event: MouseEvent) => {
    const action = (event.target as HTMLElement)
      .closest("[data-action]")
      ?.getAttribute("data-action") as
      | "system"
      | "celsius"
      | "fahrenheit"
      | "km/h"
      | "mph"
      | "mm"
      | "in"
      | null;

    if (!action) {
      console.error("action target not found");
      return;
    }

    switch (action) {
      case "system": {
        if (currentSystem === "metric") {
          setCurrentSystem("imperial");
          setImperialUnits();
        } else {
          setCurrentSystem("metric");
          setMetricUnits();
        }

        break;
      }
      case "celsius": {
        setCurrentUnits({ temperature: "°C" });
        break;
      }
      case "fahrenheit": {
        setCurrentUnits({ temperature: "°F" });
        break;
      }
      case "km/h": {
        setCurrentUnits({ wind_speed: "km/h" });
        break;
      }
      case "mph": {
        setCurrentUnits({ wind_speed: "mph" });
        break;
      }
      case "mm": {
        setCurrentUnits({ precipitation: "mm" });
        break;
      }
      case "in": {
        setCurrentUnits({ precipitation: "in" });
        break;
      }
      default: {
        console.error("Action in dropdown does not match any unit");
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
          <DropdownMenuContent onClick={handleUnitSelection}>
            <DropdownMenuItem asChild data-action="system">
              <Button>
                {`Switch to ${currentSystem === "metric" ? "Imperial" : "Metric"}`}
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
