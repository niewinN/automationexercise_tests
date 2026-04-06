import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class SuccessPage extends BasePage {
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page)

        this.continueButton = this.byQa('continue-button')
    }

    async successMessageLoaded(message: string): Promise<void> {
        await expect(this.page.getByText(message).first()).toBeVisible()
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click()
    }

    async successAndContinue(message: string): Promise<void> {
        await this.successMessageLoaded(message)
        await this.clickContinueButton()
        await expect(this.page).toHaveURL('https://automationexercise.com/')
    }

}