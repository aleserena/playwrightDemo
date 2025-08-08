import { test as setup, expect } from "@playwright/test";
import { users } from "../src/fixtures/users.js";

setup(
  "authenticate as standard user @Desktop @Setup @SauceDemo",
  async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto("/");
    await page.getByPlaceholder("Username").fill(users.standard_user.name);
    await page.getByPlaceholder("Password").fill(users.standard_user.password);
    await page.getByRole("button", { name: "Login" }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL("https://www.saucedemo.com/inventory.html");
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(
      page.getByText("Products"),
      "Inventory page should be visible",
    ).toBeVisible();

    // End of authentication steps.

    await page
      .context()
      .storageState({ path: users.standard_user.storageState });
  },
);

setup(
  "authenticate as problem user @Desktop @Setup @SauceDemo",
  async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto("/");
    await page.getByPlaceholder("Username").fill(users.problem_user.name);
    await page.getByPlaceholder("Password").fill(users.problem_user.password);
    await page.getByRole("button", { name: "Login" }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL("https://www.saucedemo.com/inventory.html");
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(
      page.getByText("Products"),
      "Inventory page should be visible",
    ).toBeVisible();

    // End of authentication steps.

    await page
      .context()
      .storageState({ path: users.problem_user.storageState });
  },
);

setup(
  "authenticate as performance glitch user @Desktop @Setup @SauceDemo",
  async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto("/");
    await page
      .getByPlaceholder("Username")
      .fill(users.performance_glitch_user.name);
    await page
      .getByPlaceholder("Password")
      .fill(users.performance_glitch_user.password);
    await page.getByRole("button", { name: "Login" }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL("https://www.saucedemo.com/inventory.html");
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(
      page.getByText("Products"),
      "Inventory page should be visible",
    ).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({
      path: users.performance_glitch_user.storageState,
    });
  },
);

setup(
  "authenticate as error user @Desktop @Setup @SauceDemo",
  async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto("/");
    await page.getByPlaceholder("Username").fill(users.error_user.name);
    await page.getByPlaceholder("Password").fill(users.error_user.password);
    await page.getByRole("button", { name: "Login" }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL("https://www.saucedemo.com/inventory.html");
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(
      page.getByText("Products"),
      "Inventory page should be visible",
    ).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: users.error_user.storageState });
  },
);

setup(
  "authenticate as visual user @Desktop @Setup @SauceDemo",
  async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto("/");
    await page.getByPlaceholder("Username").fill(users.visual_user.name);
    await page.getByPlaceholder("Password").fill(users.visual_user.password);
    await page.getByRole("button", { name: "Login" }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL("https://www.saucedemo.com/inventory.html");
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(
      page.getByText("Products"),
      "Inventory page should be visible",
    ).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: users.visual_user.storageState });
  },
);
