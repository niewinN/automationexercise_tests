import { expect, Page, Locator } from '@playwright/test';
import { RegisterUser } from '../utils/user-factory';
import { BasePage } from './base.page';


export class LoginPage extends BasePage {
    readonly signupTitle: Locator;
    readonly loginTitle: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page)

        this.signupTitle = page.getByText('New User Signup!'); 
        this.loginTitle = page.getByText('Login to your account')
        this.errorMessage = page.getByText('Your email or password is incorrect!')
    }

    async expectLoginSection(): Promise<void> {
        await expect(this.loginTitle).toBeVisible()
    }

    async expectSignupSection(): Promise<void> {
        await expect(this.signupTitle).toBeVisible()
    }

    async expectLoaded(): Promise<void> {
        await this.expectLoginSection()
        await this.expectSignupSection()
    }

    async startRegistration(user: RegisterUser): Promise<void> {
        await this.byQa('signup-name').fill(user.name)
        await this.byQa('signup-email').fill(user.email)
        await this.byQa('signup-button').click()
    }

    async loginUser(user: RegisterUser): Promise<void> {
        await this.byQa('login-email').fill(user.email)
        await this.byQa('login-password').fill(user.password)
        await this.byQa('login-button').click()
    }

    async expectErrorMessage(): Promise<void> {
        await expect(this.errorMessage).toBeVisible()
    }
}