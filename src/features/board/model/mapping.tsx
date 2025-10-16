import type { KeyValueTuple } from "#frontend/shared/types/miscellaneous";
import type {
  CurrentUnits,
  CurrentWeather,
} from "#frontend/shared/types/weather";

type CurrentWeatherMapper = {
  data: CurrentWeather;
  units: CurrentUnits;
};

export function mapCurrentWeatherForUI({ data, units }: CurrentWeatherMapper) {
  const currentData = {
    ["Feels Like"]: {
      unit: units.apparent_temperature,
      value: data.apparent_temperature,
      separator: "",
    },

    Humidity: {
      unit: units.relative_humidity_2m,
      value: data.relative_humidity_2m,
      separator: "",
    },
    Wind: {
      unit: units.wind_speed_10m,
      value: data.wind_speed_10m,
      separator: " ",
    },
    Precipitation: {
      unit: units.precipitation,
      value: data.precipitation,
      separator: " ",
    },
  };

  return Object.entries(currentData) as KeyValueTuple<typeof currentData>[];
}
