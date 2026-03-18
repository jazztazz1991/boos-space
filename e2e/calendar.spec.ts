import { test, expect } from "@playwright/test";

async function login(page: import("@playwright/test").Page) {
  await page.goto("/login");
  await page.getByLabel("Username").fill("boo");
  await page.getByLabel("Password").fill("boo2026");
  await page.getByRole("button", { name: "Enter the Garden" }).click();
  await page.waitForURL("/calendar");
}

test.describe("Calendar Page", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("displays calendar with month name and year", async ({ page }) => {
    await expect(page.getByText("Boo's Garden")).toBeVisible();

    // Should show current month name
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const currentMonth = monthNames[new Date().getMonth()];
    await expect(page.getByText(currentMonth)).toBeVisible();
  });

  test("displays weekday headers", async ({ page }) => {
    for (const day of ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) {
      await expect(page.getByText(day)).toBeVisible();
    }
  });

  test("can navigate between months", async ({ page }) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const currentMonth = new Date().getMonth();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    await page.getByLabel("Previous month").click();
    await expect(page.getByText(monthNames[prevMonth])).toBeVisible();

    await page.getByLabel("Next month").click();
    await expect(page.getByText(monthNames[currentMonth])).toBeVisible();
  });

  test("displays legend", async ({ page }) => {
    await expect(page.getByText("Good day")).toBeVisible();
    await expect(page.getByText("Tough day")).toBeVisible();
    await expect(page.getByText("Not logged")).toBeVisible();
  });
});
