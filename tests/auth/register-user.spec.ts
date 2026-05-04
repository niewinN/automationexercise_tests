import { faker } from "@faker-js/faker";
import {test} from "../../fixtures/test.fixture"
import { NavItem } from "../../pages/components/navigation.component";
import { createUser } from "../../utils/user-factory";
import { registerUserFlow } from "../../flows/registration.flow";

test('user can register', async({mainPage, loginPage, registerPage, successPage, navigation}) => {
    const user = createUser()

    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Login)
    await loginPage.expectLoaded()
    await loginPage.startRegistration(user)
    await registerPage.expectLoaded()
    await registerPage.completeRegistration(user)
    await successPage.successAndContinue('Account Created!')
    await mainPage.expectUserLogged(user)
    await navigation.redirectTo(NavItem.Delete)
    await successPage.successAndContinue('Account Deleted!')
})

test('user cannot register with existing email', async({mainPage, loginPage, registeredUser, navigation}) => {
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Login)
    await loginPage.expectSignupSection()
    await loginPage.startRegistration(registeredUser)
    await loginPage.expectRegisterErrorMessage()
})

test('user can register while checkout', async({mainPage, navigation, productsPage, cartPage, loginPage, registerPage, registeredUser, successPage, checkoutPage, paymentPage, randomCard}) => {
    const user = createUser()
    const desc = faker.lorem.sentence()

    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Products)
    await productsPage.addTwoProductsAndContinue()
    await navigation.redirectTo(NavItem.Cart)
    await cartPage.proceedAndRedirectToRegister()
    await loginPage.startRegistration(user)
    await registerPage.completeRegistration(registeredUser)
    await successPage.successAndContinue('Account created!')
    await mainPage.expectUserLogged(registeredUser)
    await navigation.redirectTo(NavItem.Cart)
    await cartPage.proceedToCheckout()
    await checkoutPage.addCommentAfterLoaded(desc)
    await paymentPage.completePaymentFormAndPay(randomCard)
    await successPage.successAndContinue('Order Placed!')
    await navigation.redirectTo(NavItem.Delete)
    await successPage.successAndContinue('Account Deleted!')
})

test('user can register before checkout', async({mainPage, navigation, loginPage, registerPage, successPage, productsPage, cartPage, checkoutPage, paymentPage, randomCard}) => {
    const user = createUser()
    const desc = faker.lorem.sentence()

    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Login)
    await registerUserFlow(user, {loginPage, registerPage, successPage})
    await mainPage.expectUserLogged(user)
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