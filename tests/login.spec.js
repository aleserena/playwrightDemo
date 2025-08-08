import { test, expect } from "@playwright/test";
import { users } from "../src/fixtures/users";

test.describe("Happy Path", () => {
  test(
    "Should be able to login into Sauce Demo",
    {
      tag: ["@Desktop", "@Login", "@SauceDemo", "@HappyPath", "@StandardUser"],
      annotation: {
        type: "test",
        description: "Login into Sauce Demo",
      },
    },
    async ({ page }) => {
      await test.step("Login into Sauce Demo", async () => {
        await page.goto("/", {
          waitUntil: "domcontentloaded",
        });

        await page.getByPlaceholder("Username").click();
        await page.getByPlaceholder("Username").fill(users.standard_user.name);
        await page.getByPlaceholder("Password").click();
        await page
          .getByPlaceholder("Password")
          .fill(users.standard_user.password);
        await page.getByRole("button", { name: "Login" }).click();

        await expect(
          page.getByText("Swag Labs"),
          "Title should be visible",
        ).toBeVisible();
        await expect(
          page.getByText("Products"),
          "Products label should be visible",
        ).toBeVisible();

        await expect(
          page.getByRole("button", { name: "Open Menu" }),
          "Menu button should be visible",
        ).toBeVisible();
        await expect(
          page.locator('[data-test="shopping-cart-link"]'),
          "Shopping cart link should be visible",
        ).toBeVisible();
      });
    },
  );
});

test.describe("Error Path", () => {
  test(
    "Should not be able to login into Sauce Demo with an invalid username",
    {
      tag: [
        "@Desktop",
        "@Login",
        "@SauceDemo",
        "@ErrorPath",
        "@InvalidUsername",
      ],
      annotation: {
        type: "test",
        description: "Login into Sauce Demo with an invalid username",
      },
    },
    async ({ page }) => {
      await page.goto("/", {
        waitUntil: "domcontentloaded",
      });

      await page.getByPlaceholder("Username").click();
      await page.getByPlaceholder("Username").fill("invalid_user");
      await page.getByPlaceholder("Password").click();
      await page
        .getByPlaceholder("Password")
        .fill(users.standard_user.password);
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.getByText(
          "Epic sadface: Username and password do not match any user in this service",
        ),
      ).toBeVisible();
    },
  );

  test(
    "Should not be able to login into Sauce Demo with an invalid password",
    {
      tag: [
        "@Desktop",
        "@Login",
        "@SauceDemo",
        "@ErrorPath",
        "@InvalidPassword",
      ],
      annotation: {
        type: "test",
        description: "Login into Sauce Demo with an invalid password",
      },
    },
    async ({ page }) => {
      await page.goto("/", {
        waitUntil: "domcontentloaded",
      });

      await page.getByPlaceholder("Username").click();
      await page.getByPlaceholder("Username").fill(users.standard_user.name);
      await page.getByPlaceholder("Password").click();
      await page.getByPlaceholder("Password").fill("invalid_password");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.getByText(
          "Epic sadface: Username and password do not match any user in this service",
        ),
      ).toBeVisible();
    },
  );

  test(
    "Should not be able to login into Sauce Demo with an empty username",
    {
      tag: ["@Desktop", "@Login", "@SauceDemo", "@ErrorPath", "@EmptyUsername"],
      annotation: {
        type: "test",
        description: "Login into Sauce Demo with an empty username",
      },
    },
    async ({ page }) => {
      await page.goto("/", {
        waitUntil: "domcontentloaded",
      });

      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.getByText("Epic sadface: Username is required"),
      ).toBeVisible();
    },
  );

  test(
    "Should not be able to login into Sauce Demo with an empty password",
    {
      tag: ["@Desktop", "@Login", "@SauceDemo", "@ErrorPath", "@EmptyPassword"],
      annotation: {
        type: "test",
        description: "Login into Sauce Demo with an empty password",
      },
    },
    async ({ page }) => {
      await page.goto("/", {
        waitUntil: "domcontentloaded",
      });

      await page.getByPlaceholder("Username").click();
      await page.getByPlaceholder("Username").fill(users.standard_user.name);
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.getByText("Epic sadface: Password is required"),
      ).toBeVisible();
    },
  );

  test(
    "Should not be able to login into Sauce Demo with a locked out user",
    {
      tag: ["@Desktop", "@Login", "@SauceDemo", "@ErrorPath", "@LockedOutUser"],
      annotation: {
        type: "test",
        description: "Login into Sauce Demo with a locked out user",
      },
    },
    async ({ page }) => {
      await page.goto("/", {
        waitUntil: "domcontentloaded",
      });

      await page.getByPlaceholder("Username").click();
      await page.getByPlaceholder("Username").fill(users.locked_out_user.name);
      await page.getByPlaceholder("Password").click();
      await page
        .getByPlaceholder("Password")
        .fill(users.locked_out_user.password);
      await page.getByRole("button", { name: "Login" }).click();

      await expect(
        page.getByText("Epic sadface: Sorry, this user has been locked out."),
      ).toBeVisible();
    },
  );
});
