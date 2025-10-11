import { createFileRoute } from "@tanstack/react-router";
import styles from "./index.module.css";
import { Board } from "#frontend/features/board/components/board";
import { Header } from "#frontend/features/header/components/header";
import { SearchBar } from "#frontend/features/searchbar/components/searchbar";
import { fetchData } from "#frontend/lib/client";
import { UnitStoreProvider } from "#frontend/store/unit";
import type {
  DailyWeather,
  HourlyWeather,
  WeatherData,
} from "#frontend/types/custom/custom";
import { assignValue } from "#frontend/utils/object";

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

function transformDailyData(obj: DailyWeather) {
  const daily = [...Array(obj.time.length)].map((_, i) => {
    const temp = {} as {
      [K in keyof DailyWeather]: DailyWeather[K][number];
    };

    for (const key of Object.keys(obj) as (keyof DailyWeather)[]) {
      if (!(i in obj[key]) || obj[key][i] === undefined) {
        throw new Error("Index does not exist");
      }

      assignValue(temp, key, obj[key][i]);
    }
    return temp;
  });

  return daily;
}

function transformHourlyData(obj: HourlyWeather) {
  const hourly = [...Array(obj.time.length)].map((_, i) => {
    const temp = {} as {
      [K in keyof HourlyWeather]: HourlyWeather[K][number];
    };

    for (const key of Object.keys(obj) as (keyof HourlyWeather)[]) {
      if (!(i in obj[key]) || obj[key][i] === undefined) {
        throw new Error("Index does not exist");
      }

      assignValue(temp, key, obj[key][i]);
    }

    return temp;
  });

  return hourly;
}

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
            continent: metric.timezone.split("/")[0],
            city: metric.timezone.split("/")[1],
            current: metric.current,
            current_units: metric.current_units,
            daily: transformDailyData(metricDaily),
            daily_units: metric.current_units,
            hourly: transformHourlyData(metricHourly),
          },
          imperial: {
            ...imperial,
            continent: metric.timezone.split("/")[0],
            city: metric.timezone.split("/")[1],
            current: imperial.current,
            current_units: imperial.current_units,
            daily: transformDailyData(imperialDaily),
            daily_units: imperial.current_units,
            hourly: transformHourlyData(imperialHourly),
            hourly_units: imperial.current_units,
          },
        };

        console.log(projectedData);

        return projectedData;
      },
    }),
});

function Index() {
  return (
    <main className={styles.layout}>
      <UnitStoreProvider>
        <Header />
        <SearchBar />
        <Board />
      </UnitStoreProvider>
    </main>
  );
}
