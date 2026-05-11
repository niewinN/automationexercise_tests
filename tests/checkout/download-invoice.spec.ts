import { faker } from "@faker-js/faker";
import { test } from "../../fixtures/test.fixture";
import { registerUserFlow } from "../../flows/registration.flow";
import { createUser } from "../../utils/user-factory";
import { completeCheckoutFlow } from "../../flows/checkout.flow";
import { deleteAccountFlow } from "../../flows/delete-account.flow";


test('user can download invoice after purchase order', async({mainPage, cartPage, registerPage, successPage, loginPage, navigation, checkoutPage, paymentPage, randomCard}) => {
    const user = createUser()
    const desc = faker.lorem.sentence()

    await mainPage.addRecommendedItemAndRedirectToCart()
    await cartPage.expectLoaded()
    await cartPage.proceedAndRedirectToRegister()
    await registerUserFlow(user, {loginPage, registerPage, successPage, mainPage})
    await completeCheckoutFlow(desc, randomCard, {navigation, cartPage, checkoutPage, paymentPage, successPage}, false)
    await successPage.downloadInvoice()
    await successPage.clickContinueButton()
    await deleteAccountFlow({navigation, successPage})
})