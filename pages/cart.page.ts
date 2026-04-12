import { test, expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { Product } from '../models/product';


export class CartPage extends BasePage {
    readonly cartRows: Locator;

    constructor(page: Page) {
        super(page)

        this.cartRows = page.locator('#cart_info_table tbody tr')
    }

    private rowByProductName(name: string): Locator {
        return this.cartRows.filter({
            has: this.page.locator(`.cart_description h4 a:text-is("${name}")`),
        });
    }

    private parsePrice(priceText: string): number {
        return Number(priceText.replace(/[^\d.]/g, ''));
    }

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/view_cart/);
        await expect(this.cartRows.first()).toBeVisible();
    }

    async expectProductsAdded(products: Product[]): Promise<void> {
        await expect(this.cartRows).toHaveCount(products.length);
    }

    async expectProductName(product: Product): Promise<void> {
        const row = this.rowByProductName(product.name)
        await expect(row.locator('.cart_description h4 a')).toHaveText(product.name)
    }

    async expectProductPrice(product: Product): Promise<void> {
        const row = this.rowByProductName(product.name);
        await expect(row.locator('.cart_price p')).toHaveText(product.priceText);
    }

    async expectProductQuantity(product: Product): Promise<void> {
        const row = this.rowByProductName(product.name);
        await expect(row.locator('.cart_quantity button'))
        .toHaveText(String(product.quantity));
    }

    async expectProductTotalPrice(product: Product): Promise<void> {
        const row = this.rowByProductName(product.name);
        const totalText = await row.locator('.cart_total p').textContent();

        expect(totalText).toBeTruthy();

        const totalValue = this.parsePrice(totalText!.trim());
        const expectedTotal = product.priceValue * product.quantity;

        expect(totalValue).toBe(expectedTotal);
    }

    async expectCartGrandTotal(products: Product[]) {
        const expectedGrandTotal = products.reduce(
            (sum, product) => sum + product.priceValue * product.quantity,
            0
        );

        const totalTexts = await this.cartRows.locator('.cart_total p').allTextContents();

        const actualGrandTotal = totalTexts.reduce(
            (sum, text) => sum + this.parsePrice(text.trim()),
            0
        );

        expect(actualGrandTotal).toBe(expectedGrandTotal);
    }

    async expectProducts(products: Product[]): Promise<void> {
        await this.expectLoaded();
        await this.expectProductsAdded(products);

        for (const product of products) {
            await this.expectProductName(product);
            await this.expectProductPrice(product);
            await this.expectProductQuantity(product);
            await this.expectProductTotalPrice(product);
        }

        await this.expectCartGrandTotal(products)
    }

    async expectSingleProductQuantity(quantity: number): Promise<void> {
        await expect(this.cartRows).toHaveCount(1)
        await expect(this.cartRows.first().locator('.cart_quantity button')).toHaveText(String(quantity))
    }


}