import { test, expect } from "@playwright/test";

async function login(page: import("@playwright/test").Page) {
  await page.goto("/login");
  await page.getByLabel("Username").fill("boo");
  await page.getByLabel("Password").fill("boo2026");
  await page.getByRole("button", { name: "Enter the Garden" }).click();
  await page.waitForURL("/calendar");
}

test.describe("Entry Flow", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("can open day modal by clicking a day", async ({ page }) => {
    // Click on day 1
    await page.getByRole("button", { name: /Not logged - 1$/ }).click();

    await expect(page.getByText("Garden Log")).toBeVisible();
    await expect(page.getByText("Good Day")).toBeVisible();
    await expect(page.getByText("Tough Day")).toBeVisible();
    await expect(page.getByText("Extra Self Care")).toBeVisible();
  });

  test("can log a good day with notes", async ({ page }) => {
    await page.getByRole("button", { name: /Not logged - 1$/ }).click();

    // Good Day is selected by default
    await page.getByPlaceholder(/How are you feeling/).fill("Wonderful day in the garden");
    await page.getByRole("button", { name: "Save Entry" }).click();

    // Modal should close and day should show green leaf
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("can log a tough day", async ({ page }) => {
    await page.getByRole("button", { name: /Not logged - 2$/ }).click();

    await page.getByText("Tough Day").click();
    await page.getByPlaceholder(/How are you feeling/).fill("Rough day");
    await page.getByRole("button", { name: "Save Entry" }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("can log a self care day", async ({ page }) => {
    await page.getByRole("button", { name: /Not logged - 3$/ }).click();

    await page.getByText("Extra Self Care").click();

    // Should show encouragement text
    await expect(page.getByText("You deserve this")).toBeVisible();

    // Should show self care placeholder
    await expect(page.getByPlaceholder(/take care of yourself/)).toBeVisible();

    await page.getByPlaceholder(/take care of yourself/).fill("Bath and journaling");
    await page.getByRole("button", { name: "Save Entry" }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("can close modal with Cancel", async ({ page }) => {
    await page.getByRole("button", { name: /Not logged - 4$/ }).click();
    await expect(page.getByText("Garden Log")).toBeVisible();

    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("can close modal with X button", async ({ page }) => {
    await page.getByRole("button", { name: /Not logged - 5$/ }).click();
    await expect(page.getByText("Garden Log")).toBeVisible();

    await page.getByLabel("Close").click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("shows character count in notes", async ({ page }) => {
    await page.getByRole("button", { name: /Not logged - 6$/ }).click();

    await expect(page.getByText("0/1000")).toBeVisible();
    await page.getByPlaceholder(/How are you feeling/).fill("Hello");
    await expect(page.getByText("5/1000")).toBeVisible();
  });

  test("does not show Remove Entry for unlogged days", async ({ page }) => {
    await page.getByRole("button", { name: /Not logged - 7$/ }).click();
    await expect(page.getByText("Garden Log")).toBeVisible();
    await expect(page.getByText("Remove Entry")).not.toBeVisible();
  });

  test("can remove a previously logged entry", async ({ page }) => {
    // First log a day
    await page.getByRole("button", { name: /Not logged - 8$/ }).click();
    await page.getByRole("button", { name: "Save Entry" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Re-open the same day — should now show Remove Entry
    await page.getByRole("button", { name: /Good day - 8$/ }).click();
    await expect(page.getByText("Remove Entry")).toBeVisible();

    // Click Remove Entry
    await page.getByText("Remove Entry").click();
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Day should be back to unlogged
    await expect(page.getByRole("button", { name: /Not logged - 8$/ })).toBeVisible();
  });
});
