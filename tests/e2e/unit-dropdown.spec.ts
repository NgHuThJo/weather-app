import { test, expect } from "@playwright/test";

test.describe("unit dropdown", () => {
  test("change main weather units", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await expect(
      page.getByRole("paragraph").filter({ hasText: "°C" }),
    ).toBeVisible();

    const unitButton = page.getByRole("button", {
      name: "unit icon Units dropdown icon",
    });
    await unitButton.click();

    const metricSwitchButton = page.getByRole("menuitem", {
      name: "Switch to Imperial",
    });
    await metricSwitchButton.click();

    await expect(
      page.getByRole("paragraph").filter({ hasText: "°F" }),
    ).toBeVisible();
  });

  test("change individual units", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await expect(
      page.getByRole("paragraph").filter({ hasText: "°C" }),
    ).toBeVisible();

    await page
      .getByRole("button", { name: "unit icon Units dropdown icon" })
      .click();
    await page
      .getByRole("menuitemcheckbox", { name: "Fahrenheit (°F)" })
      .click();

    await expect(
      page.getByRole("paragraph").filter({ hasText: "°F" }),
    ).toBeVisible();
  });
});
