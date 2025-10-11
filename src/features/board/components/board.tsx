import { getRouteApi } from "@tanstack/react-router";
import styles from "./board.module.css";
import { bg_today_large, bg_today_small } from "#frontend/assets/images";
import { Image } from "#frontend/shared/primitives/image";
import { useCurrentUnitId } from "#frontend/shared/store/unit";

export function Board() {
  const routeApi = getRouteApi("/");
  const currentUnit = useCurrentUnitId();
  const weatherData = routeApi.useLoaderData();

  const unitData =
    currentUnit === "metric" ? weatherData.metric : weatherData.imperial;

  return (
    <div className={styles.stack}>
      <Image
        src={bg_today_small}
        srcSet={`${bg_today_small} 343w, ${bg_today_large} 800w`}
        sizes="(width < 768px) 343px, 800px"
      />
      <div>
        <h2>{`${unitData.city}, ${unitData.continent}`}</h2>
        {/* <p>{`${unitData.}, ${unitData.continent}`}</p> */}
      </div>
      <div></div>
    </div>
  );
}
