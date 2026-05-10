import { faker } from "@faker-js/faker";
import { test } from "../../fixtures/test.fixture";
import { registerUserFlow } from "../../flows/registration.flow";
import { NavItem } from "../../pages/components/navigation.component";
import { createUser } from "../../utils/user-factory";
import { createCard } from "../../utils/card-factory";


test('user can download invoice after purchase order', async({mainPage, cartPage, registerPage, successPage, loginPage, navigation, checkoutPage, paymentPage, randomCard}) => {
    const user = createUser()
    const desc = faker.lorem.sentence()

    await mainPage.expectLoaded()
    await mainPage.addRecommendedItemAndRedirectToCart()
    await cartPage.expectLoaded()
    await cartPage.proceedAndRedirectToRegister()
    await registerUserFlow(user, {loginPage, registerPage, successPage})
    await mainPage.expectUserLogged(user)
    await navigation.redirectTo(NavItem.Cart)
    await cartPage.proceedToCheckout()
    await checkoutPage.expectSectionsLoaded()
    await checkoutPage.addCommentAndPlaceOrder(desc)
    await paymentPage.completePaymentFormAndPay(randomCard)
    await successPage.successMessageLoaded('Order Placed!')
    await successPage.downloadInvoice()
    await successPage.clickContinueButton()
    await navigation.redirectTo(NavItem.Delete)
    await successPage.successAndContinue('Account Deleted!')
})