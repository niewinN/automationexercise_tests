import { faker } from "@faker-js/faker"
import {test} from "../../fixtures/test.fixture"
import { loginUserFlow } from "../../flows/login.flow"
import { NavItem } from "../../pages/components/navigation.component"
import { createUser } from "../../utils/user-factory"

test('user can log in', async({mainPage, loginPage, successPage, registeredUser, navigation}) => {
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Login)
    await loginPage.expectLoaded()
    await loginPage.loginUser(registeredUser)
    await mainPage.expectUserLogged(registeredUser)
    await navigation.redirectTo(NavItem.Delete)
    await successPage.successAndContinue('Account Deleted!')
})

test('user cannot log in with invalid credentials', async({mainPage, loginPage, navigation}) => {
    const user = createUser()
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Login)
    await loginPage.expectLoaded()
    await loginPage.loginUser(user)
    await loginPage.expectLoginErrorMessage()
})

test('user can login before checkout', async({registeredUser, mainPage, loginPage, navigation, productsPage, cartPage, checkoutPage, paymentPage, successPage, randomCard}) => {
    const desc = faker.lorem.sentence()

    await mainPage.expectLoaded()
    await loginUserFlow(registeredUser, {mainPage, loginPage, navigation})
    await navigation.redirectTo(NavItem.Products)
    await productsPage.addTwoProductsAndContinue()
    await navigation.redirectTo(NavItem.Cart)
    await cartPage.proceedToCheckout()
    await checkoutPage.addCommentAfterLoaded(desc)
    await paymentPage.completePaymentFormAndPay(randomCard)
    await successPage.successAndContinue('Order Placed!')
    await navigation.redirectTo(NavItem.Delete)
    await successPage.successAndContinue('Account Deleted!')
})