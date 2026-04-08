import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class TestCasesPage extends BasePage {
    readonly title: Locator;

    constructor(page: Page) {
        super(page)

        this.title = page.locator('.title')
    }

    async expectLoaded(): Promise<void> {
        await expect(this.title).toBeVisible()
    }
}