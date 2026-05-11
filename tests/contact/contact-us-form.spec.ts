import { test } from "../../fixtures/test.fixture"
import { NavItem } from "../../pages/components/navigation.component";

test('user can complete contact us form', async({contactPage, page, navigation}) => {
    await navigation.redirectTo(NavItem.Contact)

    let dialogMessage = '';

    page.once('dialog', async dialog => {
        dialogMessage = dialog.message();
        await dialog.accept();
    });

    await contactPage.completeAndSubmitContactForm();
    await contactPage.successAndRedirect()
})