import { useQuery } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import styles from "./searchbar.module.css";
import { icon_search } from "#frontend/assets/images";
import { fetchData } from "#frontend/shared/api/client";
import { useDebounce } from "#frontend/shared/hooks/use-debounce";
import { Button } from "#frontend/shared/primitives/button";
import { Image } from "#frontend/shared/primitives/image";
import { geocodingSchema } from "#frontend/shared/types/geocoding";

const geocodingParams = {
  name: "",
  count: 10,
  language: "en",
  format: "json",
};

export function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const { data } = useQuery({
    queryKey: ["autocomplete", searchInput],
    queryFn: async ({ signal }) => {
      const url = import.meta.env.VITE_METEO_GEOCODING_BASE_URL;
      const queryString = new URLSearchParams(
        Object.entries(geocodingParams)
          .map((pair) => pair.join("="))
          .join("&"),
      );
      queryString.set("name", searchInput);

      const data = await fetchData(`${url}?${queryString.toString()}`, {
        signal,
      });

      const validatedData = geocodingSchema.safeParse(data);

      if (!validatedData.success) {
        throw new Error("Geocoding api schema does not match expectations");
      }

      return validatedData.data;
    },
    retry: (count, error) => {
      console.log("retry", count, error);
      return true;
    },
    select: (data) => {},
    enabled: !!searchInput,
  });

  const handleInput = useDebounce((event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  });

  return (
    <div className={styles.layout}>
      <div className={styles["search-input"]}>
        <Image src={icon_search} alt="search icon"></Image>
        <input
          type="text"
          placeholder="Search for a place..."
          onChange={handleInput}
        />
      </div>
      <Button variant="search">Search</Button>
    </div>
  );
}
