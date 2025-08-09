import { expect } from '@playwright/test';

const firstItemInCartLocator = "#cart_contents_container > div > div.cart_list > div:nth-child(3)";

export class CartPage {

    // Methods
    constructor(page, numberOfItemsInCart) {
        this.page = page;
        this.itemsInCart = [];
        for (let i = 0; i < numberOfItemsInCart; i++) {
            this.itemsInCart.push(page.locator(`#cart_contents_container > div > div.cart_list > div:nth-child(${i + 3})`));
        }

        this.nthItemName = (itemNumber) => this.itemsInCart[itemNumber].locator('.inventory_item_name');
        this.nthItemPrice = (itemNumber) => this.itemsInCart[itemNumber].locator('.inventory_item_price');
        this.nthItemQuantity = (itemNumber) => this.itemsInCart[itemNumber].locator('.cart_quantity');
        this.nthItemDescription = (itemNumber) => this.itemsInCart[itemNumber].locator('.inventory_item_desc');
        this.nthItemRemoveButton = (itemNumber) => this.itemsInCart[itemNumber].locator('.btn.btn_secondary.btn_small.cart_button');

        this.checkoutButton = page.locator('.btn btn_action btn_medium checkout_button');
        this.continueShoppingButton = page.locator('.btn btn_secondary back btn_medium');
    }

    // Actions
    async goToCart() {
        await this.page.goto("/cart.html");
    }

    async removeItemFromCart(itemNumber) {
        await this.nthItemRemoveButton(itemNumber).click();
        this.itemsInCart.splice(itemNumber, 1);
    }

    // Assertions
    async expectProductInCart(product) {
        await expect(this.page.locator('html')).toContainText(product);
    }

    async expectProductNotInCart(product) {
        await expect(this.page.locator('html')).not.toContainText(product);
    }

    async expectNumberOfItemsInCart(expectedNumberOfItems) {
        expect(expectedNumberOfItems).toBe(this.itemsInCart.length);
    }
}