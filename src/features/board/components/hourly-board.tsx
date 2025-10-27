import { useState } from "react";
import { mapHourlyWeatherToUI } from "#frontend/features/board/model/mapping";
import { MAX_HOURLY_ENTRIES } from "#frontend/shared/app/constants";
import { getWeatherIcon } from "#frontend/shared/app/icons";
import { Button } from "#frontend/shared/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#frontend/shared/primitives/dropdown";
import { Image } from "#frontend/shared/primitives/image";
import type {
  HourlyUnits,
  HourlyWeatherValues,
} from "#frontend/shared/types/schema";
import { getDayFromDate } from "#frontend/shared/utils/intl";

type HourlyBoardProps = {
  data: HourlyWeatherValues[];
  units: HourlyUnits;
};

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function HourlyBoard({ data, units }: HourlyBoardProps) {
  const [currentDay, setCurrentDay] = useState(() =>
    getDayFromDate({
      date: new Date(),
      options: {
        weekday: "long",
      },
    }),
  );

  const hourlyDataArray = mapHourlyWeatherToUI({ data, units })
    .filter((data) => data.day === currentDay)
    .slice(0, MAX_HOURLY_ENTRIES);

  const handleChooseWeekDay = (day: string) => {
    setCurrentDay(day);
  };

  return (
    <div>
      <div>
        <h2>Hourly forecast</h2>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button">{currentDay}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ul>
            {weekDays.map((day) => (
              <DropdownMenuItem onSelect={() => handleChooseWeekDay(day)}>
                {day}
              </DropdownMenuItem>
            ))}
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
      <ul>
        {hourlyDataArray.map(
          ({ hour, weather_code, temperature, isDay }, index) => (
            <li key={index}>
              <Image src={getWeatherIcon(weather_code, isDay).image}></Image>
              <span>{hour}</span>
              <span>{temperature}</span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
