import { useSuspenseQuery } from "@tanstack/react-query";
import styles from "./board.module.css";
import { bg_today_large, bg_today_small } from "#frontend/assets/images";
import { CurrentCard } from "#frontend/features/board/components/current-card";
import { HourlyBoard } from "#frontend/features/board/components/hourly-board";
import {
  mapCurrentWeatherToUI,
  mapDailyWeatherToUI,
} from "#frontend/features/board/model/mapping";
import { weatherQueryOptions } from "#frontend/shared/api/query-options/weather";
import {
  formatWeatherDateForUI,
  formatWeatherValue,
} from "#frontend/shared/app/formatting";
import { getWeatherIcon } from "#frontend/shared/app/icons";
import { Image } from "#frontend/shared/primitives/image";
import { useLocationData } from "#frontend/shared/store/location";
import { useCurrentSystem, useCurrentUnits } from "#frontend/shared/store/unit";
import type { CurrentUnits, DailyUnits } from "#frontend/shared/types/schema";

export function Board() {
  const { latitude, longitude } = useLocationData();
  const currentSystem = useCurrentSystem();
  const currentUnits = useCurrentUnits();
  const { data: weatherData } = useSuspenseQuery(
    weatherQueryOptions.location(latitude, longitude),
  );

  const unitData =
    currentSystem === "metric" ? weatherData.metric : weatherData.imperial;

  console.table(weatherData);

  const currentUnit = {
    ...unitData.current_units,
    apparent_temperature: currentUnits.temperature,
    wind_speed_10m: currentUnits.wind_speed,
    precipitation: currentUnits.precipitation,
  } satisfies {
    [K in keyof CurrentUnits]: CurrentUnits[K];
  };
  const dailyUnit = {
    ...unitData.daily_units,
    temperature_max: currentUnits.temperature,
    temperature_min: currentUnits.temperature,
  } satisfies {
    [K in keyof DailyUnits]: DailyUnits[K];
  } & {
    temperature_max: string;
    temperature_min: string;
  };

  const current = { data: unitData.current, units: currentUnit };
  const daily = { data: unitData.daily, units: dailyUnit };
  const hourly = { data: unitData.hourly, units: unitData.hourly_units };

  const currentDataArray = mapCurrentWeatherToUI(current);
  const dailyDataArray = mapDailyWeatherToUI(daily);

  return (
    <div className={styles.board}>
      <div className={styles.current}>
        <div className={styles.stack}>
          <Image
            className="background"
            src={bg_today_small}
            srcSet={`${bg_today_small} 343w, ${bg_today_large} 800w`}
            sizes="(width < 768px) 343px, 800px"
          />
          <div className={styles["image-container"]}>
            <div className={styles["image-left"]}>
              <h2
                className={styles["image-heading"]}
              >{`${unitData.city}, ${unitData.country}`}</h2>
              <p
                className={styles["image-day"]}
              >{`${formatWeatherDateForUI(new Date(unitData.current.time))}`}</p>
            </div>
            <div className={styles["image-right"]}>
              <Image
                src={
                  getWeatherIcon(
                    unitData.current.weather_code,
                    unitData.current.is_day,
                  ).image
                }
                className="icon-bg"
              ></Image>
              <p className={styles["image-temperature"]}>
                {formatWeatherValue(
                  unitData.current.temperature_2m,
                  unitData.current_units.temperature_2m,
                )}
              </p>
            </div>
          </div>
        </div>
        <div className={styles["card-layout"]}>
          {currentDataArray.map(([description, { unit, value, separator }]) => (
            <CurrentCard
              text={description}
              value={value}
              unit={unit}
              separator={separator}
              key={description}
            ></CurrentCard>
          ))}
        </div>
      </div>
      <div className={styles.daily}>
        <h2>Daily forecast</h2>
        <ul className={styles["daily-list"]}>
          {dailyDataArray.map(
            (
              {
                day,
                max: [maxTemp, maxUnit],
                min: [minTemp, minUnit],
                weather_code,
              },
              index,
            ) => (
              <li key={index} className={styles["daily-card"]}>
                <h3 className={styles["daily-heading"]}>{day}</h3>
                <Image
                  src={getWeatherIcon(weather_code).image}
                  className="icon-md"
                ></Image>
                <div className={styles["daily-temperature"]}>
                  <span>{`${maxTemp} ${maxUnit}`}</span>
                  <span>{`${minTemp} ${minUnit}`}</span>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
      <div className={styles.hourly}>
        <HourlyBoard data={hourly.data} units={hourly.units} />
      </div>
    </div>
  );
}
