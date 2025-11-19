import { test as base, BrowserContext, Page } from "@playwright/test";
import { zocker } from "zocker";
import {
  currentUnitsSchema,
  currentWeatherSchema,
  dailyUnitsSchema,
  dailyWeatherValuesSchema,
  hourlyUnitsSchema,
  hourlyWeatherValuesSchema,
} from "../../src/shared/types/schema";

type MockWeatherApi = {
  context: BrowserContext;
  page: Page;
};

export const test = base.extend<MockWeatherApi>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();

    await context.route("https://api.open-meteo.com/v1/forecast**", (route) => {
      route.fulfill({
        json: {
          currentWeatherMockData: zocker(currentWeatherSchema).generate(),
          currentUnitsMockData: zocker(currentUnitsSchema).generate(),
          dailyWeatherMockData: zocker(dailyWeatherValuesSchema)
            .supply(dailyWeatherValuesSchema.shape.time, "2025-10-21T00:00:00Z")
            .generateMany(8),
          dailyUnitsMockData: zocker(dailyUnitsSchema).generate(),
          hourlyWeatherMockData: zocker(hourlyWeatherValuesSchema)
            .supply(
              hourlyWeatherValuesSchema.shape.time,
              "2025-10-21T00:00:00Z",
            )
            .generateMany(8),
          hourlyUnitsMockData: zocker(hourlyUnitsSchema).generate(),
        },
      });
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(context);

    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);

    await page.close();
  },
});
