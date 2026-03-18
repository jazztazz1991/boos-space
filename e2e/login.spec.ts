import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("displays login form with botanical theme", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByText("Boo's Garden")).toBeVisible();
    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Enter the Garden" })).toBeVisible();
  });

  test("shows error on invalid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Username").fill("wrong");
    await page.getByLabel("Password").fill("wrong");
    await page.getByRole("button", { name: "Enter the Garden" }).click();

    await expect(page.getByText("Invalid username or password")).toBeVisible();
  });

  test("redirects to calendar on successful login", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Username").fill("boo");
    await page.getByLabel("Password").fill("boo2026");
    await page.getByRole("button", { name: "Enter the Garden" }).click();

    await page.waitForURL("/calendar");
    await expect(page.getByText("Boo's Garden")).toBeVisible();
  });

  test("root page redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL("/login");
    await expect(page.getByLabel("Username")).toBeVisible();
  });
});
