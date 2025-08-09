import { test as setup, test, expect } from "@playwright/test";
import { users } from "../src/fixtures/users.js";
import { CartPage } from "../src/modules/cartPage.js";

test.describe("Cart Page", () => {

    test.use({ storageState: users["standard_user"].storageState });

    setup.beforeEach("Add items to cart", async ({ page }) => {
        await page.goto("/inventory.html");
        await page.locator("#add-to-cart-sauce-labs-backpack").click();
        await page.locator("#add-to-cart-sauce-labs-bike-light").click();
    });

    test("Should be able to remove an item from the cart",
        {
            tag: ["@Desktop", "@Cart", "@SauceDemo", "@StandardUser"],
        },
        async ({ page }) => {
            const cartPage = new CartPage(page, 2);
            await cartPage.goToCart();
            await cartPage.expectNumberOfItemsInCart(2);
            await cartPage.removeItemFromCart(0);
            await cartPage.expectNumberOfItemsInCart(1);
            await cartPage.expectProductInCart("Sauce Labs Bike Light");
            await cartPage.expectProductNotInCart("Sauce Labs Backpack");
        }
    );
});

