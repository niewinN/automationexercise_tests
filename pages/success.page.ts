import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import path from 'path';

export class SuccessPage extends BasePage {
    readonly continueButton: Locator;
    readonly downloadInvoiceBtn: Locator;

    constructor(page: Page) {
        super(page)

        this.continueButton = this.byQa('continue-button')
        this.downloadInvoiceBtn = page.getByRole('link', {name: 'Download Invoice'})
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

    async downloadInvoice(): Promise<void> {
        const downloadPromise = this.page.waitForEvent('download')

        await this.downloadInvoiceBtn.click()

        const download = await downloadPromise
        await download.saveAs(path.join('test-results', 'invoice.txt'))
        expect(await download.failure()).toBeNull()
    }

}