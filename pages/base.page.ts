import { Page, Locator } from "@playwright/test";
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected byQa(value: string): Locator {
        return this.page.locator(`[data-qa="${value}"]`)
    }

    protected getAssetPath(fileName: string): string {
        return path.resolve(__dirname, '../assets', fileName)
    }
}