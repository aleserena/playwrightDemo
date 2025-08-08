import { test, expect } from "@playwright/test";
import { users } from "../src/fixtures/users.js";

for (const user in users) {
  if (user === "locked_out_user") {
    continue;
  }

  test.use({ storageState: users[user].storageState });

  test.describe(`${users[user].displayName}`, () => {
    test(
      `Should be able to add a product to cart with a ${users[user].displayName}`,
      {
        tag: ["@Desktop", "@Inventory", "@SauceDemo", `@${users[user].name}`],
        annotation: {
          type: "test",
          description: `Add product to cart with a ${users[user].displayName}`,
        },
      },

      async ({ page }) => {
        await page.goto("/inventory.html");

        await expect(page.getByText("Products")).toBeVisible();

        await page
          .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
          .click();
        await expect(
          page.locator('[data-test="shopping-cart-badge"]'),
          "1 item should be present in the cart",
        ).toContainText("1");
      },
    );

    test(
      `Should be able to add multiple products to cart with a ${users[user].displayName}`,
      {
        tag: ["@Desktop", "@Inventory", "@SauceDemo", `@${users[user].name}`],
        annotation: {
          type: "test",
          description: `Add 2 products to cart with a ${users[user].displayName}`,
        },
      },

      async ({ page }) => {
        await page.goto("/inventory.html");

        await expect(page.getByText("Products")).toBeVisible();

        await page
          .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
          .click();
        await page
          .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
          .click();

        await expect(
          page.locator('[data-test="shopping-cart-badge"]'),
          "2 items should be present in the cart",
        ).toContainText("2");
      },
    );
    test(
      `Should be able to enter the PDP with a ${users[user].displayName}`,
      {
        tag: ["@Desktop", "@Inventory", "@SauceDemo", `@${users[user].name}`],
        annotation: {
          type: "test",
          description: `Enter the Product page with a ${users[user].displayName}`,
        },
      },

      async ({ page }) => {
        await page.goto("/inventory.html");

        await expect(
          page.locator(
            '[data-test="item-4-title-link"] [data-test="inventory-item-name"]',
          ),
        ).toContainText("Sauce Labs Backpack");
        await page.locator('[data-test="item-4-title-link"]').click();
        await expect(
          page.locator('[data-test="inventory-item-name"]'),
        ).toContainText("Sauce Labs Backpack");
      },
    );
  });
}
