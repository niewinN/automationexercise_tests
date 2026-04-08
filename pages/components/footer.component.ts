import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { faker } from '@faker-js/faker';

export class Footer extends BasePage {
    readonly subscriptionTitle: Locator;
    readonly subscriptionInput: Locator;
    readonly subscriptionButton: Locator;
    readonly successSubcribe: Locator;

    constructor(page: Page) {
        super(page)

        this.subscriptionTitle = page.locator('#footer h2')
        this.subscriptionInput = page.locator('#susbscribe_email')
        this.subscriptionButton = page.locator('#subscribe')
        this.successSubcribe = page.locator('.alert-success')
    }

    async expectSubscriptionSectionLoaded(): Promise<void> {
        await expect(this.subscriptionTitle).toBeVisible()
    }

    async enterEmailToSubscribe(email = faker.internet.email()): Promise<string> {
        await this.subscriptionInput.fill(email)
        await this.subscriptionButton.click()
        return email;
    }

    async expectSubscriptionSucces(): Promise<void> {
        await expect(this.successSubcribe).toBeVisible()
        await expect(this.successSubcribe).toContainText('subscribed')
    }

    async subscribe(email = faker.internet.email()): Promise<void> {
        await this.expectSubscriptionSectionLoaded()
        await this.enterEmailToSubscribe(email)
        await this.expectSubscriptionSucces()
        // return email
    }
}