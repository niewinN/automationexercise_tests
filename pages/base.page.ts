import { Page, Locator } from "@playwright/test";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected byQa(value: string): Locator {
        return this.page.locator(`[data-qa="${value}"]`)
    }
}