import { expect, test } from "../../fixtures/test.fixture"
import { NavItem } from "../../pages/components/navigation.component";

test('user can complete contact us form', async({mainPage, contactPage, page, navigation}) => {
    await mainPage.expectLoaded();
    await navigation.redirectTo(NavItem.Contact)

    let dialogMessage = '';

    page.once('dialog', async dialog => {
        dialogMessage = dialog.message();
        await dialog.accept();
    });

    await contactPage.completeAndSubmitContactForm();

    // expect(dialogMessage).toContain('Press OK to proceed!');

    await contactPage.successAndRedirect()
})