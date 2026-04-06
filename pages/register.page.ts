import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { RegisterUser } from '../utils/user-factory';


export class RegisterPage extends BasePage {
    readonly page: Page;
    readonly title: Locator;
    readonly newsletterCheckbox: Locator;
    readonly optinCheckbox: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.title = page.getByText('Enter Account Information')
        this.newsletterCheckbox = page.locator('#newsletter')
        this.optinCheckbox = page.locator('#optin')
    }

    async expectLoaded(): Promise<void> {
        await expect(this.title).toBeVisible()
    }

    async completePersonalDetails(user: RegisterUser): Promise<void> {
        await this.byQa('title').first().check()
        await this.byQa('name').fill(user.name)
        await this.byQa('password').fill(user.password)
        await this.byQa('days').selectOption(user.day)
        await this.byQa('months').selectOption(user.month)
        await this.byQa('years').selectOption(user.year)
        await this.newsletterCheckbox.check()
        await this.optinCheckbox.check()
    }

    async completeAddressDetails(user: RegisterUser): Promise<void> {
        await this.byQa('first_name').fill(user.name)
        await this.byQa('last_name').fill(user.surname)
        await this.byQa('company').fill(user.surname)
        await this.byQa('address').fill(user.street)
        await this.byQa('address2').fill(user.street)
        await this.byQa('state').fill(user.state)
        await this.byQa('city').fill(user.city)
        await this.byQa('zipcode').fill(user.zipCode)
        await this.byQa('mobile_number').fill(user.phone)
    }

    async completeRegistration(user: RegisterUser): Promise<void> {
        await this.completePersonalDetails(user)
        await this.completeAddressDetails(user)
        await this.byQa('create-account').click()
    }
}