import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { Product } from '../models/product';

export class ProductsPage extends BasePage {
    readonly title: Locator;
    readonly productsContainer: Locator;
    readonly productCards: Locator;
    readonly viewProductLink: Locator;
    readonly searchProductInput: Locator;
    readonly searchButton: Locator;
    readonly continueButton: Locator;
    readonly viewCartButton: Locator;

    constructor(page: Page) {
        super(page)

        this.title = page.locator('.title')
        this.productsContainer = page.locator('.features_items')
        this.productCards = page.locator('.product-image-wrapper')
        this.viewProductLink = page.getByText('View Product').first()
        this.searchProductInput = page.getByRole('textbox', {name: 'Search Product'})
        this.searchButton = page.locator('#submit_search')
        this.continueButton = page.getByRole('button', {name: 'Continue Shopping'})
        this.viewCartButton = page.getByRole('link', { name: 'View Cart' })
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

    private parsePrice(priceText: string): number {
        return Number(priceText.replace(/[^\d.]/g, ''));
    }

    async getProductDataByIndex(index: number): Promise<Product> {
        const card = this.productCards.nth(index)

        const name = await card.locator('.single-products .productinfo p').textContent()
        const priceText = await card.locator('.single-products .productinfo h2').textContent()

        expect(name).toBeTruthy();
        expect(priceText).toBeTruthy();

        const priceValue = this.parsePrice(priceText!);

        const productData = {
            name: name!.trim(),
            quantity: 1,
            priceText: priceText!,
            priceValue,

        }

        return productData
    }

    async addProductToCartByIndex(index: number): Promise<Product> {
        const card = this.productCards.nth(index)
        const product = this.getProductDataByIndex(index)

        await card.locator('.add-to-cart').first().click()

        return product
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

    async continueShopping(): Promise<void> {
        await this.continueButton.click()
    }

    async viewCart(): Promise<void> {
        await this.viewCartButton.click();
    }
}