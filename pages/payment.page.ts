import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { Card } from '../models/card';

export class PaymentPage extends BasePage {
    readonly nameOnCardInput: Locator
    readonly cardNumberInput: Locator;
    readonly cvcInput: Locator;
    readonly expirationMonthInput: Locator;
    readonly expirationYearInput: Locator;
    readonly payBtn: Locator;


    constructor(page: Page) {
        super(page)
        this.nameOnCardInput = this.byQa('name-on-card')
        this.cardNumberInput = this.byQa('card-number')
        this.cvcInput = this.byQa('cvc')
        this.expirationMonthInput = this.byQa('expiry-month')
        this.expirationYearInput = this.byQa('expiry-year')
        this.payBtn = this.byQa('pay-button')
    }

    async completePaymentFormAndPay(card: Card): Promise<void> {
        await this.nameOnCardInput.fill(card.name)
        await this.cardNumberInput.fill(card.number)
        await this.cvcInput.fill(card.cvc)
        await this.expirationMonthInput.fill(card.month)
        await this.expirationYearInput.fill(card.year)
        await this.payBtn.click()
    }
}