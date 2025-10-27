import { getRouteApi } from "@tanstack/react-router";
import styles from "./board.module.css";
import { bg_today_large, bg_today_small } from "#frontend/assets/images";
import { CurrentCard } from "#frontend/features/board/components/current-card";
import { HourlyBoard } from "#frontend/features/board/components/hourly-board";
import {
  mapCurrentWeatherToUI,
  mapDailyWeatherToUI,
} from "#frontend/features/board/model/mapping";
import {
  formatWeatherDateForUI,
  formatWeatherValue,
} from "#frontend/shared/app/formatting";
import { getWeatherIcon } from "#frontend/shared/app/icons";
import { Image } from "#frontend/shared/primitives/image";
import { useCurrentSystem, useCurrentUnits } from "#frontend/shared/store/unit";

export function Board() {
  const routeApi = getRouteApi("/");
  const currentSystem = useCurrentSystem();
  const currentUnits = useCurrentUnits();
  const weatherData = routeApi.useLoaderData();

  const unitData =
    currentSystem === "metric" ? weatherData.metric : weatherData.imperial;

  const currentUnit = {
    ...unitData.current_units,
    temperature_2m: currentUnits.temperature,
    wind_speed: currentUnits.wind_speed,
    precipitation: currentUnits.precipitation,
  };
  const dailyUnit = {
    ...unitData.daily_units,
    temperature_max: currentUnits.temperature,
    temperature_min: currentUnits.temperature,
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
            className="bg"
            src={bg_today_small}
            srcSet={`${bg_today_small} 343w, ${bg_today_large} 800w`}
            sizes="(width < 768px) 343px, 800px"
          />
          <div className={styles.current}>
            <div className={styles.left}>
              <h2>{`${unitData.city}, ${unitData.continent}`}</h2>
              <p>{`${formatWeatherDateForUI(new Date(unitData.current.time))}`}</p>
            </div>
            <div className={styles.right}>
              <Image
                src={
                  getWeatherIcon(
                    unitData.current.weather_code,
                    unitData.current.is_day,
                  ).image
                }
              ></Image>
              <p>
                {formatWeatherValue(
                  unitData.current.temperature_2m,
                  unitData.current_units.temperature_2m,
                )}
              </p>
            </div>
          </div>
        </div>
        <div>
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
      <div>
        <h2>Daily forecast</h2>
        <ul>
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
              <li key={index}>
                <h3>{day}</h3>
                <Image src={getWeatherIcon(weather_code).image}></Image>
                <div>
                  <span>{`${maxTemp} ${maxUnit}`}</span>
                  <span>{`${minTemp} ${minUnit}`}</span>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
      <HourlyBoard data={hourly.data} units={hourly.units} />
    </div>
  );
}
