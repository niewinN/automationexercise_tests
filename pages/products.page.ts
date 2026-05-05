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
    readonly categoryPanel: Locator;
    readonly womenCategory: Locator;
    readonly dressCategory: Locator;
    readonly womenDressHeading: Locator;
    readonly menCategory: Locator;
    readonly jeansCategory: Locator;
    readonly menJeansHeading: Locator;
    readonly brandsPanel: Locator;
    readonly poloBrand: Locator;
    readonly poloHeading: Locator;
    readonly bibaBrand: Locator;
    readonly bibaHeading: Locator;
    readonly addToCartBtn: Locator;

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
        this.categoryPanel = page.locator('#accordian')
        this.womenCategory = page.getByRole('link', {name: 'Women'})
        this.dressCategory = page.getByRole('link', {name: 'Dress'})
        this.womenDressHeading = page.getByRole('heading', {name: 'Women - Dress Products'})
        this.menCategory = page.locator('a[href="#Men"]')
        this.jeansCategory = page.getByRole('link', {name: 'Jeans'})
        this.menJeansHeading = page.getByRole('heading', {name: 'Men - Jeans Products'})
        this.brandsPanel = page.locator('.brands_products')
        this.poloBrand = page.locator('a[href="/brand_products/Polo"]')
        this.bibaBrand = page.locator('a[href="/brand_products/Biba"]')
        this.poloHeading = page.getByRole('heading', {name: 'Brand - Polo Products'})
        this.bibaHeading = page.getByRole('heading', {name: 'Brand - Biba Products'})
        this.addToCartBtn = page.locator('.productinfo .add-to-cart')
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

    async addAllFilteredProducts(): Promise<number> {
        const count = await this.addToCartBtn.count()
        expect(count).toBeGreaterThan(0)

        for (let i = 0; i < count; i++) {
            await this.addToCartBtn.nth(i).scrollIntoViewIfNeeded()
            await this.addToCartBtn.nth(i).click({ force: true })
            await this.continueShopping()
        }

        return count
    }

    async viewCart(): Promise<void> {
        await this.viewCartButton.click();
    }

    async addTwoProductsAndContinue(): Promise<void> {
        await this.addProductToCartByIndex(0)
        await this.continueShopping()
        await this.addProductToCartByIndex(1)
        await this.continueShopping()
    }

    async expectCategoryPanelLoaded(): Promise<void> {
        await expect(this.categoryPanel).toBeVisible()
    }

    async filterToDress(): Promise<void> {
        await this.womenCategory.click()
        await this.dressCategory.click()
    }

    async expectWomenDressCategoryLoaded(): Promise<void> {
        await expect(this.womenDressHeading).toBeVisible()
    }

    async filterToJeans(): Promise<void> {
        await this.menCategory.click()
        await this.jeansCategory.click()
    }

    async expectMenJeansCategoryLoaded(): Promise<void> {
        await expect(this.menJeansHeading).toBeVisible()
    }

    async expectBrandsLoaded(): Promise<void> {
        await expect(this.brandsPanel).toBeVisible()
    }

    async clickBrandsAndLoadedPage(): Promise<void> {
        await this.poloBrand.click()
        await expect(this.poloHeading).toBeVisible()
        await this.bibaBrand.click()
        await expect(this.bibaHeading).toBeVisible()
    }
}