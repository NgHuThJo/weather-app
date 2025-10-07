import { createFileRoute } from "@tanstack/react-router";
import styles from "./index.module.css";
import { Board } from "#frontend/features/board/components/board";
import { Header } from "#frontend/features/header/components/header";
import { SearchBar } from "#frontend/features/searchbar/components/searchbar";
import { fetchData } from "#frontend/lib/client";
import type { Unpack, WeatherData } from "#frontend/types/custom/custom";

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

        const [metric, imperial]: [WeatherData, WeatherData] =
          await Promise.all([
            fetchData(
              `${url}?${new URLSearchParams(metricQueryString).toString()}`,
            ),
            fetchData(
              `${url}?${new URLSearchParams(imperialQueryString).toString()}`,
            ),
          ]);

        const metricDaily = metric.daily;
        const metricHourly = metric.hourly;
        const imperialDaily = imperial.daily;
        const imperialHourly = imperial.hourly;

        const projectedData = {
          metric: {
            ...metric,
            current: metric.current,
            current_units: metric.current_units,
            daily: [...Array(metric.daily.time.length)].map((_, i) => {
              const temp: Partial<
                Record<
                  string,
                  Unpack<(typeof metricDaily)[keyof typeof metricDaily]>
                >
              > = {};

              for (const [key, value] of Object.entries(metricDaily)) {
                temp[key] = value[i];
              }

              return temp;
            }),
            daily_units: metric.current_units,
            hourly: [...Array(metric.hourly.time.length)].map((_, i) => {
              const temp: Partial<
                Record<
                  string,
                  Unpack<(typeof metricHourly)[keyof typeof metricHourly]>
                >
              > = {};

              for (const [key, value] of Object.entries(metricHourly)) {
                temp[key] = value[i];
              }

              return temp;
            }),
            hourly_units: metric.current_units,
          },
          imperial: {
            ...imperial,
            current: imperial.current,
            current_units: imperial.current_units,
            daily: [...Array(imperial.daily.time.length)].map((_, i) => {
              const temp: Partial<
                Record<
                  string,
                  Unpack<(typeof imperialDaily)[keyof typeof imperialDaily]>
                >
              > = {};

              for (const [key, value] of Object.entries(imperialDaily)) {
                temp[key] = value[i];
              }

              return temp;
            }),
            daily_units: imperial.current_units,
            hourly: [...Array(imperial.hourly.time.length)].map((_, i) => {
              const temp: Partial<
                Record<
                  string,
                  Unpack<(typeof imperialHourly)[keyof typeof imperialHourly]>
                >
              > = {};

              for (const [key, value] of Object.entries(imperialHourly)) {
                temp[key] = value[i];
              }

              return temp;
            }),
            hourly_units: imperial.current_units,
          },
        };

        console.log(projectedData);

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
