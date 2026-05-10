import { test } from "../../fixtures/test.fixture";
import { registerUserFlow } from "../../flows/registration.flow";
import { NavItem } from "../../pages/components/navigation.component";
import { createUser } from "../../utils/user-factory";

test('correct address details are displayed in checkout page', async({mainPage, navigation, loginPage, registerPage, successPage, cartPage, checkoutPage}) => {
    const user = createUser()
    
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Login)
    await registerUserFlow(user, {loginPage, registerPage, successPage})
    await mainPage.expectUserLogged(user)
    await mainPage.addRecommendedItemAndRedirectToCart()
    await cartPage.expectLoaded()
    await cartPage.proceedToCheckout()
    await checkoutPage.expectDeliveryAddress(user)
    await checkoutPage.expectBillingAddress(user)
    await navigation.redirectTo(NavItem.Delete)
    await successPage.successAndContinue('Account deleted!')
})