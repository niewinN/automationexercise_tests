import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { faker } from '@faker-js/faker';

export class ContactPage extends BasePage {
    readonly title: Locator;
    readonly fileInput: Locator;
    readonly homeButton: Locator;
    readonly successText: Locator;

    constructor(page: Page) {
        super(page)

        this.title = page.getByText('Get In Touch')
        this.fileInput = page.locator('input[name="upload_file"]')
        this.homeButton = page.locator('.btn-success')
        this.successText = page.getByText('Success! Your details have been submitted successfully.')
    }

    async expectLoaded(): Promise<void> {
        await expect(this.title).toBeVisible()
    }

    async completeContactUsForm(): Promise<void> {
        const name = faker.person.firstName()
        const email = faker.internet.email()
        const subject = faker.lorem.sentence(3)
        const message = faker.lorem.paragraph()

        await this.byQa('name').fill(name)
        await this.byQa('email').fill(email)
        await this.byQa('subject').fill(subject)
        await this.byQa('message').fill(message)
    }

    async selectFile(): Promise<void> {
        const fullPath = this.getAssetPath('random_file.jpg')
        await this.fileInput.setInputFiles(fullPath)
    }

    async submitContactForm(): Promise<void> {
        await this.byQa('submit-button').click()
    }

    async completeAndSubmitContactForm(): Promise<void> {
        await this.completeContactUsForm()
        await this.selectFile()
        await this.submitContactForm()
    }

    async expectSuccess(): Promise<void> {
        await expect(this.successText).toBeVisible
    }

    async redirectToHomePage(): Promise<void> {
        await this.homeButton.click()
        expect(this.page).toHaveURL('https://automationexercise.com/')
    }

    async successAndRedirect(): Promise<void> {
        await this.expectSuccess()
        await this.redirectToHomePage()
    }
}