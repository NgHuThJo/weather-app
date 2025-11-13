import { useQuery } from "@tanstack/react-query";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import styles from "./searchbar.module.css";
import { icon_search } from "#frontend/assets/images";
import { autocompleteOptions } from "#frontend/shared/api/query-options/autocomplete";
import { useDebouncedValue } from "#frontend/shared/hooks/use-debounced-value";
import { Button } from "#frontend/shared/primitives/button";
import { Image } from "#frontend/shared/primitives/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#frontend/shared/primitives/popover";
import { useLocationStore } from "#frontend/shared/store/location";
import { capitalizeFirstLetter } from "#frontend/shared/utils/string";

export function SearchBar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const setLocationData = useLocationStore((state) => state.setLocationData);
  const debouncedSearchInput = useDebouncedValue(searchInput);
  const { data, fetchStatus } = useQuery({
    ...autocompleteOptions.result(debouncedSearchInput),
    select: (data) => {
      return data.results;
    },
  });
  const currentLocationDataRef = useRef<{
    latitude: number;
    longitude: number;
  }>(null);

  useEffect(() => {
    if (fetchStatus !== "fetching") {
      setIsSearching(false);
    }
  }, [fetchStatus]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.currentTarget.value);
    setIsSearching(true);
    setIsPopoverOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentLocationDataRef.current) {
      return;
    }

    setLocationData(
      currentLocationDataRef.current.latitude,
      currentLocationDataRef.current.longitude,
    );
  };

  const handleAutoCompleteSelect = (
    event: MouseEvent<HTMLButtonElement>,
    latitude: number,
    longitude: number,
  ) => {
    setSearchInput(event.currentTarget.value);
    setIsPopoverOpen(false);
    currentLocationDataRef.current = {
      latitude,
      longitude,
    };
  };

  return (
    <form className={styles.layout} onSubmit={handleSubmit}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div
            className={styles["search-input"]}
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <Image src={icon_search} alt="search icon"></Image>
            <input
              type="text"
              placeholder="Search for a place..."
              name="locaation"
              value={searchInput}
              onChange={handleInput}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          {isSearching ? (
            <p className={styles["search-loader"]}>Searching</p>
          ) : !data ? (
            <p>No match found</p>
          ) : (
            data?.map(({ latitude, longitude, id, name }) => (
              <li key={id} className={styles["search-item"]}>
                <Button
                  onClick={(event) =>
                    handleAutoCompleteSelect(event, latitude, longitude)
                  }
                  value={name}
                >
                  {capitalizeFirstLetter(name)}
                </Button>
              </li>
            ))
          )}
        </PopoverContent>
      </Popover>
      <Button type="submit" variant="search">
        Search
      </Button>
    </form>
  );
}
