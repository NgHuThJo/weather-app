// import type { WeatherCodeNumber, IsDay } from "#frontend/shared/app/icons";

// // Open Meteo types
// export interface WeatherResponse {
//   metric: WeatherData;
//   imperial: WeatherData;
// }

// export interface WeatherData {
//   latitude: number;
//   longitude: number;
//   generationtime_ms: number;
//   utc_offset_seconds: number;
//   timezone: string;
//   timezone_abbreviation: string;
//   elevation: number;
//   current_units: CurrentUnits;
//   current: CurrentWeather;
//   hourly_units: HourlyUnits;
//   hourly: HourlyWeather;
//   daily_units: DailyUnits;
//   daily: DailyWeather;
// }

// export interface CurrentUnits {
//   time: string; // "iso8601"
//   interval: string; // "seconds"
//   temperature_2m: string; // "°C" or "°F"
//   precipitation: string; // "mm" or "inch"
//   relative_humidity_2m: string; // "%"
//   apparent_temperature: string; // "°C" or "°F"
//   weather_code: string; // "wmocode"
//   wind_speed_10m: string; // "km/h" or "mp/h"
//   is_day: string; // ""
// }

// export interface CurrentWeather {
//   time: string; // ISO timestamp
//   interval: number;
//   temperature_2m: number;
//   precipitation: number;
//   relative_humidity_2m: number;
//   apparent_temperature: number;
//   weather_code: WeatherCodeNumber;
//   wind_speed_10m: number;
//   is_day: IsDay;
// }

// export interface HourlyUnits {
//   time: string;
//   temperature_2m: string;
//   apparent_temperature: string;
//   wind_speed_10m: string;
//   relative_humidity_2m: string;
//   precipitation: string;
//   weather_code: string;
//   is_day: string;
// }

// export interface HourlyWeather {
//   time: string[];
//   temperature_2m: number[];
//   apparent_temperature: number[];
//   wind_speed_10m: number[];
//   relative_humidity_2m: number[];
//   precipitation: number[];
//   weather_code: WeatherCodeNumber[];
//   is_day: IsDay[]; // 1 if day, 0 if night
// }

// export interface DailyUnits {
//   time: string;
//   temperature_2m_max: string;
//   temperature_2m_min: string;
//   weather_code: string;
// }

// export interface DailyWeather {
//   time: string[];
//   temperature_2m_max: number[];
//   temperature_2m_min: number[];
//   weather_code: WeatherCodeNumber[];
// }
