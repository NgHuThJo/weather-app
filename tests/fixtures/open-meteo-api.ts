import { test as base, BrowserContext, Page } from "@playwright/test";
import { zocker } from "zocker";
import { geocodingSchema } from "../../src/shared/types/geocoding";
import { reverseGeocodingResponseSchema } from "../../src/shared/types/reverse-geocoding";
import { weatherSchema } from "../../src/shared/types/weather";

type MockWeatherApi = {
  context: BrowserContext;
  page: Page;
};

export const test = base.extend<MockWeatherApi>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();

    await context.route("**api.open-meteo.com/v1/forecast**", (r) => {
      r.fulfill({
        json: { ...zocker(weatherSchema).generate() },
      });
    });
    await context.route("**/geocode/reverse**", (r) =>
      r.fulfill({
        json: {
          ...zocker(reverseGeocodingResponseSchema),
        },
      }),
    );
    await context.route("**/search**", (r) =>
      r.fulfill({
        json: {
          ...zocker(geocodingSchema),
        },
      }),
    );
    console.count("in context");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(context);

    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();

    page.on("request", (r) => console.log("REQ:", r.url()));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);

    await page.close();
  },
});
