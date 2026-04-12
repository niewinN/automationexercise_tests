import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export enum NavItem {
  Login = 'login',
  Delete = 'delete',
  Logout = 'logout',
  Contact = 'contact',
  TestCases = 'testCases',
  Products = 'products',
  Cart = 'cart',
}

export class Navigation extends BasePage {
    private readonly links: Record<NavItem, Locator>

    constructor(page: Page) {
        super(page)

        this.links = {
            [NavItem.Login]: page.getByRole('link', { name: 'Signup / Login' }),
            [NavItem.Delete]: page.getByRole('link', { name: 'Delete Account' }),
            [NavItem.Logout]: page.getByRole('link', { name: ' Logout' }),
            [NavItem.Contact]: page.getByRole('link', { name: ' Contact us' }),
            [NavItem.TestCases]: page.getByRole('link', { name: ' Test Cases' }).first(),
            [NavItem.Products]: page.getByRole('link', { name: ' Products' }),
            [NavItem.Cart]: page.getByRole('link', { name: ' Cart' }),
        };
    }

    async redirectTo(link: NavItem) {
        await this.links[link].click()
    }

}