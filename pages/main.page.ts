import { expect, Page, Locator } from '@playwright/test';
import { Dialog } from './components/dialog.component';
import { RegisterUser } from '../utils/user-factory';
import { BasePage } from './base.page';

export class MainPage extends BasePage {
    readonly title: Locator;
    readonly dialog: Dialog;
    readonly viewProductLinks: Locator;
    readonly recommendedItemsBox: Locator;
    readonly recommendedAddToCartBtn: Locator;
    readonly viewCartBtn: Locator;
    readonly scrollUpBtn: Locator;

    constructor(page: Page) {
        super(page)

        this.title = page.getByText('Full-Fledged practice website for Automation Engineers').first()
        this.dialog = new Dialog(page)
        this.viewProductLinks = page.getByRole('link', {name: 'View Product'})
        this.recommendedItemsBox = page.locator('.recommended_items')
        this.recommendedAddToCartBtn = this.recommendedItemsBox.locator('.item.active .add-to-cart').first()
        this.viewCartBtn = page.getByRole('link', {name: 'View Cart'})
        this.scrollUpBtn = page.locator('#scrollUp')
        
    }

    async expectLoaded(): Promise<void> {
        await this.page.goto('https://automationexercise.com/')
        await this.dialog.closeDialog()
        await expect(this.title).toBeVisible()
    }

    async expectTitleVisible(): Promise<void> {
        await expect(this.title).toBeVisible()
    }


    async expectUserLogged(user: RegisterUser): Promise<void> {
        const loggedText = this.page.getByText(`Logged in as ${user.name}`)
        await expect(loggedText).toBeVisible()
    }

    async viewProduct(): Promise<void> {
        await this.viewProductLinks.first().click()
    }

    async scrollToRecommendedItems(): Promise<void> {
        await this.recommendedItemsBox.scrollIntoViewIfNeeded()
    }

    async expectRecommendedItemsLoaded(): Promise<void> {
        await expect(this.recommendedItemsBox).toBeVisible()
    }

    async addToCartRecommendedItem(): Promise<void> {
        await this.recommendedAddToCartBtn.click()
    }

    async redirectToCartAfterAddedProduct(): Promise<void> {
        await this.viewCartBtn.click()
    }

    async addRecommendedItemAndRedirectToCart(): Promise<void> {
        await this.scrollToRecommendedItems()
        await this.expectRecommendedItemsLoaded()
        await this.addToCartRecommendedItem()
        await this.redirectToCartAfterAddedProduct()
    }

    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(()=> {
            window.scrollTo(0, document.body.scrollHeight)
        })
    }

    async scrollUpByArrow(): Promise<void> {
        await this.scrollUpBtn.click()
    }

    async expectPageScrolledUp(): Promise<void> {
        await expect.poll(async () => {
            return await this.page.evaluate(() => window.scrollY)
        }).toBe(0)
    }

    async scrollToTop(): Promise<void> {
        await this.page.evaluate(() => {
            window.scrollTo(0,0)
        })
    }
}