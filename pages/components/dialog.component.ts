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
    try {
        if (await this.consentButton.first().isVisible({ timeout: 3000 })) {
        await this.consentButton.first().click();
        console.log('Consent dialog closed (main DOM)');
        return;
        }
    } catch (e) {
        console.log('Consent dialog not found or not clickable (main DOM)');
    }

    try {
        if (await this.consentButtonInFrame.first().isVisible({ timeout: 3000 })) {
        await this.consentButtonInFrame.first().click();
        console.log('Consent dialog closed (iframe)');
        return;
        }
    } catch (e) {
        console.log('Consent dialog not found or not clickable (iframe)');
    }

    console.log('No consent dialog found');
    }
}