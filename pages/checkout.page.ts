import {expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { RegisterUser } from '../utils/user-factory';

export class CheckoutPage extends BasePage {
    readonly addressHeading: Locator;
    readonly reviewHeading: Locator;
    readonly commentTextarea: Locator;
    readonly placeOrderBtn: Locator;
    readonly deliveryAddress: Locator;
    readonly billingAddress: Locator;

    constructor(page: Page) {
        super(page)

        this.addressHeading = page.getByRole('heading', {name: 'Address Details'});
        this.reviewHeading = page.getByRole('heading', {name: 'Review Your Order'})
        this.commentTextarea = page.locator('.form-control')
        this.placeOrderBtn = page.getByRole('link', {name: 'Place Order'})
        this.deliveryAddress = page.locator('#address_delivery')
        this.billingAddress = page.locator('#address_invoice')
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

    async expectDeliveryAddress(user: RegisterUser): Promise<void> {
        await expect(this.deliveryAddress).toContainText(`Mr. ${user.firstName} ${user.lastName}`)
        await expect(this.deliveryAddress).toContainText(user.company);
        await expect(this.deliveryAddress).toContainText(user.street);
        await expect(this.deliveryAddress).toContainText(user.city);
        await expect(this.deliveryAddress).toContainText(user.state);
        await expect(this.deliveryAddress).toContainText(user.zipCode);
        await expect(this.deliveryAddress).toContainText(user.phone);
    }

    async expectBillingAddress(user: RegisterUser): Promise<void> {
        await expect(this.billingAddress).toContainText(`${user.firstName} ${user.lastName}`);
        await expect(this.billingAddress).toContainText(user.company);
        await expect(this.billingAddress).toContainText(user.street);
        await expect(this.billingAddress).toContainText(user.city);
        await expect(this.billingAddress).toContainText(user.state);
        await expect(this.billingAddress).toContainText(user.zipCode);
        await expect(this.billingAddress).toContainText(user.phone);
    }
}