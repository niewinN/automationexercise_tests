import { expect, test } from "../../fixtures/test.fixture"

test('user can complete contact us form', async({mainPage, contactPage, page}) => {
    await mainPage.expectLoaded();
    await mainPage.redirectToContactPage();

    let dialogMessage = '';

    page.once('dialog', async dialog => {
        dialogMessage = dialog.message();
        await dialog.accept();
    });

    await contactPage.completeAndSubmitContactForm();

    expect(dialogMessage).toContain('Press OK to proceed!');

    await contactPage.successAndRedirect()
})