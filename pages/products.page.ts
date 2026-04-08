import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
    readonly title: Locator;
    readonly productsContainer: Locator;
    readonly productCards: Locator;
    readonly viewProductLink: Locator;
    readonly searchProductInput: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page)

        this.title = page.locator('.title')
        this.productsContainer = page.locator('.features_items')
        this.productCards = page.locator('.product-image-wrapper')
        this.viewProductLink = page.getByText('View Product').first()
        this.searchProductInput = page.getByRole('textbox', {name: 'Search Product'})
        this.searchButton = page.locator('#submit_search')
    }

    async expectLoaded(): Promise<void> {
        await expect(this.title).toBeVisible()
    }

    async expectProductListLoaded(): Promise<void> {
        await expect(this.productsContainer).toBeVisible()
        const count = await this.productCards.count()
        expect(count).toBeGreaterThan(0)
    }

    async redirectToProductDetails(): Promise<void> {
        await this.viewProductLink.click()
    }

    async openFirstProductAndGetData(): Promise<{name: string, price: string}> {
        const firstProduct = this.productCards.first()

        const name = await firstProduct.locator('.single-products .productinfo p').textContent()
        const price = await firstProduct.locator('.single-products .productinfo h2').textContent()

        expect(name).not.toBeNull()
        expect(price).not.toBeNull()

        const productData = {
            name: name!.trim(),
            price: price!.trim()
        }

        await this.redirectToProductDetails()

        return productData;
    }

    async enterProductNameAndSearch(name: string): Promise<void> {
        await expect(this.searchProductInput).toBeVisible()
        await this.searchProductInput.fill(name)
        await this.searchButton.click()
    }

    async expectFilteredProducts(name: string): Promise<void> {
        await this.expectProductListLoaded()
        const titles = await this.productCards.locator('.single-products .productinfo p').allTextContents()

        expect(titles.length).toBeGreaterThan(0)

        for (const title of titles) {
            expect(title.toLowerCase()).toContain(name.toLowerCase())
        }  
    }
}