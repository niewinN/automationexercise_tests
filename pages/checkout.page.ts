import {expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
    readonly addressHeading: Locator;
    readonly reviewHeading: Locator;
    readonly commentTextarea: Locator;
    readonly placeOrderBtn: Locator;

    constructor(page: Page) {
        super(page)

        this.addressHeading = page.getByRole('heading', {name: 'Address Details'});
        this.reviewHeading = page.getByRole('heading', {name: 'Review Your Order'})
        this.commentTextarea = page.locator('.form-control')
        this.placeOrderBtn = page.getByRole('link', {name: 'Place Order'})
    }

    async expectAddressLoaded(): Promise<void> {
        await expect(this.addressHeading).toBeVisible()
    }

    async expectReviewLoaded(): Promise<void> {
        await expect(this.reviewHeading).toBeVisible()
    }

    async expectSectionsLoaded(): Promise<void> {
        await this.expectAddressLoaded()
        await this.expectReviewLoaded()
    }

    async addComment(desc: string): Promise<void> {
        await this.commentTextarea.fill(desc)
    }

    async clickPlaceOrder(): Promise<void> {
        await this.placeOrderBtn.click()
    }

    async addCommentAndPlaceOrder(desc: string): Promise<void> {
        await this.addComment(desc)
        await this.clickPlaceOrder()
    }

    async addCommentAfterLoaded(desc: string): Promise<void> {
        await this.expectSectionsLoaded()
        await this.addCommentAndPlaceOrder(desc)
    }
}