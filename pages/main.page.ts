import { expect, Page, Locator } from '@playwright/test';
import { Dialog } from './components/dialog.component';
import { RegisterUser } from '../utils/user-factory';
import { BasePage } from './base.page';

export class MainPage extends BasePage {
    readonly title: Locator;
    readonly dialog: Dialog;
    readonly loginLink: Locator;
    readonly deleteButton: Locator;
    readonly logoutLink: Locator;
    readonly contactUsLink: Locator;
    readonly testCasesLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        super(page)

        this.title = page.getByText('Full-Fledged practice website for Automation Engineers').first()
        this.dialog = new Dialog(page)
        this.loginLink = page.getByRole('link', {name: 'Signup / Login'})
        this.deleteButton = page.getByRole('link', {name: 'Delete Account'})
        this.logoutLink = page.getByRole('link', {name: ' Logout'})
        this.contactUsLink = page.getByRole('link', {name: ' Contact us'})
        this.testCasesLink = page.getByRole('link', {name: ' Test Cases'}).first()
        this.productsLink = page.getByRole('link', {name: ' Products'})
        this.cartLink = page.getByRole('link', {name: ' Cart'})
        
    }

    async expectLoaded(): Promise<void> {
        await this.page.goto('https://automationexercise.com/')
        await this.dialog.closeDialog()
        await expect(this.title).toBeVisible()
    }

    async redirectToLoginPage(): Promise<void> {
        await this.loginLink.click()
        await expect(this.page).toHaveURL(/\/login$/)
    }

    async expectUserLogged(user: RegisterUser): Promise<void> {
        const loggedText = this.page.getByText(`Logged in as ${user.name}`)
        await expect(loggedText).toBeVisible()
    }

    async deleteAccount(): Promise<void> {
        await this.deleteButton.click()
    }

    async logoutUser(): Promise<void> {
        await this.logoutLink.click()
    }

    async openLoginPage(): Promise<void> {
        await this.expectLoaded()
        await this.redirectToLoginPage()
    }

    async redirectToContactPage(): Promise<void> {
        await this.contactUsLink.click()
    }

    async redirectToTestCasesPage(): Promise<void> {
        await this.testCasesLink.click()
    }

    async redirectToProductsPage(): Promise<void> {
        await this.productsLink.click()
    }

    async redirectToCartPage(): Promise<void> {
        await this.cartLink.click()
    }
}