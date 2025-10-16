import { getRouteApi } from "@tanstack/react-router";
import styles from "./board.module.css";
import { bg_today_large, bg_today_small } from "#frontend/assets/images";
import { CurrentCard } from "#frontend/features/board/components/current-card";
import { mapCurrentWeatherForUI } from "#frontend/features/board/model/mapping";
import {
  formatWeatherDateForUI,
  formatWeatherValue,
} from "#frontend/shared/app/formatting";
import { getWeatherIcon } from "#frontend/shared/app/icons";
import { Image } from "#frontend/shared/primitives/image";
import { useCurrentUnitId } from "#frontend/shared/store/unit";

export function Board() {
  const routeApi = getRouteApi("/");
  const currentUnit = useCurrentUnitId();
  const weatherData = routeApi.useLoaderData();

  const unitData =
    currentUnit === "metric" ? weatherData.metric : weatherData.imperial;

  const current = { data: unitData.current, unit: unitData.current_units };

  const currentDataArray = mapCurrentWeatherForUI(current);

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
    </div>
  );
}
