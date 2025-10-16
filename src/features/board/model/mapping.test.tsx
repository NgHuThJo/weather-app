import { mapCurrentWeatherForUI } from "#frontend/features/board/model/mapping";
import type {
  CurrentUnits,
  CurrentWeather,
} from "#frontend/shared/types/weather";

export const sampleData = {
  time: "2025-10-16T12:00:00Z",
  interval: 3600,
  temperature_2m: 18.5,
  precipitation: 0.2,
  relative_humidity_2m: 65,
  apparent_temperature: 18,
  weather_code: 0,
  wind_speed_10m: 10,
  is_day: 0,
} satisfies CurrentWeather;

export const sampleUnits = {
  time: "iso8601",
  interval: "seconds",
  temperature_2m: "°C",
  precipitation: "mm",
  relative_humidity_2m: "%",
  apparent_temperature: "°C",
  weather_code: "wmocode",
  wind_speed_10m: "km/h",
  is_day: "",
} satisfies CurrentUnits;

describe("mapCurrentWeatherForUI", () => {
  it("should return the correct mapped object", () => {
    const mappedData = mapCurrentWeatherForUI({
      data: sampleData,
      units: sampleUnits,
    });

    mappedData.forEach(([_, obj]) => {
      expect(obj).toEqual(
        expect.objectContaining({
          separator: expect.any(String),
          value: expect.any(Number),
          unit: expect.any(String),
        }),
      );
    });
  });
});
