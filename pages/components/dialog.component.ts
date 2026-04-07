import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class Dialog extends BasePage {
  readonly consentButton: Locator;
  readonly consentButtonInFrame: Locator;

  constructor(page: Page) {
    super(page)

    this.consentButton = page.getByRole('button', { name: /consent|accept|agree/i });
    this.consentButtonInFrame = page
      .frameLocator('iframe')
      .getByRole('button', { name: /Consent|accept|agree/i });
    }

    async closeDialog(): Promise<void> {
        const timeout = 5000;

        try {
            await this.consentButton.first().waitFor({ state: 'visible', timeout });
            await this.consentButton.first().click();
            return;
        } catch {}

        try {
            await this.consentButtonInFrame.first().waitFor({ state: 'visible', timeout });
            await this.consentButtonInFrame.first().click();
            return;
        } catch {}
    }
}