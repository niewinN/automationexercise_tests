import { expect, Page, Locator } from '@playwright/test';
import { Dialog } from './components/dialog.component';
import { RegisterUser } from '../utils/user-factory';
import { BasePage } from './base.page';

export class MainPage extends BasePage {
    readonly title: Locator;
    readonly dialog: Dialog;
    readonly viewProductLinks: Locator;

    constructor(page: Page) {
        super(page)

        this.title = page.getByText('Full-Fledged practice website for Automation Engineers').first()
        this.dialog = new Dialog(page)
        this.viewProductLinks = page.getByRole('link', {name: 'View Product'})
        
    }

    async expectLoaded(): Promise<void> {
        await this.page.goto('https://automationexercise.com/')
        await this.dialog.closeDialog()
        await expect(this.title).toBeVisible()
    }


    async expectUserLogged(user: RegisterUser): Promise<void> {
        const loggedText = this.page.getByText(`Logged in as ${user.name}`)
        await expect(loggedText).toBeVisible()
    }

    async viewProduct(): Promise<void> {
        await this.viewProductLinks.first().click()
    }
}