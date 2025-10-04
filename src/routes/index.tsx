import { createFileRoute } from "@tanstack/react-router";
import styles from "./index.module.css";
import { Board } from "#frontend/features/board/components/board";
import { Header } from "#frontend/features/header/components/header";
import { SearchBar } from "#frontend/features/searchbar/components/searchbar";
import { fetchData } from "#frontend/lib/client";

const baseWeatherParamsInMetric = {
  latitude: 52.52,
  longitude: 13.41,
  daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
  hourly: [
    "temperature_2m",
    "apparent_temperature",
    "wind_speed_10m",
    "relative_humidity_2m",
    "precipitation",
    "weather_code",
  ],
  current: [
    "temperature_2m",
    "precipitation",
    "relative_humidity_2m",
    "apparent_temperature",
    "weather_code",
    "wind_speed_10m",
  ],
  timezone: "auto",
};

const baseWeatherParamsInImperial = {
  ...baseWeatherParamsInMetric,
  wind_speed_unit: "mph",
  temperature_unit: "fahrenheit",
  precipitation_unit: "inch",
};

type BaseWeatherParamsKeys = keyof typeof baseWeatherParamsInMetric;

export const Route = createFileRoute("/")({
  component: Index,
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: ["default"],
      queryFn: async () => {
        const url = import.meta.env.VITE_METEO_FORECAST_BASE_URL;
        const metricQueryString: Partial<
          Record<BaseWeatherParamsKeys, string>
        > = {};
        const imperialQueryString: Partial<
          Record<BaseWeatherParamsKeys, string>
        > = {};

        for (const key of Object.keys(
          baseWeatherParamsInMetric,
        ) as BaseWeatherParamsKeys[]) {
          metricQueryString[key] = Array.isArray(baseWeatherParamsInMetric[key])
            ? baseWeatherParamsInMetric[key].join(",")
            : String(baseWeatherParamsInMetric[key]);
        }

        for (const key of Object.keys(
          baseWeatherParamsInImperial,
        ) as BaseWeatherParamsKeys[]) {
          imperialQueryString[key] = Array.isArray(
            baseWeatherParamsInImperial[key],
          )
            ? baseWeatherParamsInImperial[key].join(",")
            : String(baseWeatherParamsInImperial[key]);
        }

        const [metric, imperial] = await Promise.all([
          fetchData(
            `${url}?${new URLSearchParams(metricQueryString).toString()}`,
          ),
          fetchData(
            `${url}?${new URLSearchParams(imperialQueryString).toString()}`,
          ),
        ]);

        return { metric, imperial };
      },
    }),
});

function Index() {
  return (
    <main className={styles.layout}>
      <Header />
      <SearchBar />
      <Board />
    </main>
  );
}
