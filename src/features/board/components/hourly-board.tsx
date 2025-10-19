import { useState } from "react";
import { mapHourlyWeatherToUI } from "#frontend/features/board/model/mapping";
import { getWeatherIcon } from "#frontend/shared/app/icons";
import { Image } from "#frontend/shared/primitives/image";

type HourlyBoardProps = {
  data: ReturnType<typeof mapHourlyWeatherToUI>;
};

export function HourlyBoard({ data }: HourlyBoardProps) {
  const [currentDay, setCurrentDay] = useState(() => {});

  return (
    <div>
      <div>
        <h2>Hourly forecast</h2>
      </div>
      <ul>
        {data.map(({ hour, weather_code, temperature, isDay }, index) => (
          <li key={index}>
            <Image src={getWeatherIcon(weather_code, isDay).image}></Image>
            <span>{hour}</span>
            <span>{temperature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
