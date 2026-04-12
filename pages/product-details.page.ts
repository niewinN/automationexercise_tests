import { test, expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
    readonly productDetails: Locator;
    readonly quantity: Locator;
    readonly addToCartButton: Locator;
    readonly viewCartButton: Locator;

    constructor(page: Page) {
        super(page)

        this.productDetails = page.locator('.product-information')
        this.quantity = page.locator('#quantity')
        this.addToCartButton = page.getByRole('button', {name: 'Add to cart'})
        this.viewCartButton = page.getByRole('link', {name: 'View Cart'})
    }

    async expectLoaded(): Promise<void> {
        await expect(this.productDetails).toBeVisible()
    }

    async expectProductDetails(expected: {name: string, priceText: string}): Promise<void> {
        const detailName = await this.productDetails.locator('h2').textContent()
        expect(detailName).not.toBeNull()
        expect(detailName!.trim()).toBe(expected.name)
        await expect(this.productDetails).toContainText(expected.priceText)

        const detailsText = await this.productDetails.innerText()
        expect(detailsText).toMatch(/Category:\s*.+/);
        expect(detailsText).toMatch(/Availability:\s*.+/);
        expect(detailsText).toMatch(/Condition:\s*.+/);
        expect(detailsText).toMatch(/Brand:\s*.+/);
    }

    async increaseQuantity(quantity: number): Promise<void> {
        await this.quantity.fill(String(quantity))
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click()
    }

    async viewCart(): Promise<void> {
        await this.viewCartButton.click()
    }

    async increaseQuantityAndAddProductToCart(quantity: number): Promise<number> {
        await this.increaseQuantity(quantity)
        await this.addToCart()
        await this.viewCart()

        return quantity
    }
}

