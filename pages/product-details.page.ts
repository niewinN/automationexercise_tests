import { test, expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
    readonly productDetails: Locator;

    constructor(page: Page) {
        super(page)

        this.productDetails = page.locator('.product-information')
    }

    async expectLoaded(): Promise<void> {
        await expect(this.productDetails).toBeVisible()
    }

    async expectProductDetails(expected: {name: string, price: string}): Promise<void> {
        const detailName = await this.productDetails.locator('h2').textContent()
        expect(detailName).not.toBeNull()
        expect(detailName!.trim()).toBe(expected.name)
        await expect(this.productDetails).toContainText(expected.price)

        const detailsText = await this.productDetails.innerText()
        expect(detailsText).toMatch(/Category:\s*.+/);
        expect(detailsText).toMatch(/Availability:\s*.+/);
        expect(detailsText).toMatch(/Condition:\s*.+/);
        expect(detailsText).toMatch(/Brand:\s*.+/);
    }
}