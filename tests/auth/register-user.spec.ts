import { faker } from "@faker-js/faker";
import {test} from "../../fixtures/test.fixture"
import { NavItem } from "../../pages/components/navigation.component";
import { createUser } from "../../utils/user-factory";
import { registerUserFlow } from "../../flows/registration.flow";
import { deleteAccountFlow } from "../../flows/delete-account.flow";
import { completeCheckoutFlow } from "../../flows/checkout.flow";

test.describe('Registration', () => {
    test('user can register', async({mainPage, loginPage, registerPage, successPage, navigation}) => {
        const user = createUser()

        await navigation.redirectTo(NavItem.Login)
        await loginPage.expectLoaded()
        await registerUserFlow(user, {loginPage, registerPage, successPage, mainPage})
        await deleteAccountFlow({navigation, successPage})
    })

    test('user cannot register with existing email', async({loginPage, registeredUser, navigation}) => {
        await navigation.redirectTo(NavItem.Login)
        await loginPage.expectSignupSection()
        await loginPage.startRegistration(registeredUser)
        await loginPage.expectRegisterErrorMessage()
    })

    test('user can register while checkout', async({mainPage, navigation, productsPage, cartPage, loginPage, registerPage, successPage, checkoutPage, paymentPage, randomCard}) => {
        const user = createUser()
        const desc = faker.lorem.sentence()

        await navigation.redirectTo(NavItem.Products)
        await productsPage.addTwoProductsAndContinue()
        await navigation.redirectTo(NavItem.Cart)
        await cartPage.proceedAndRedirectToRegister()
        await registerUserFlow(user, {loginPage, registerPage, successPage, mainPage})
        await completeCheckoutFlow(desc, randomCard, {navigation, cartPage, checkoutPage, paymentPage, successPage})
        await deleteAccountFlow({navigation, successPage})
    })

    test('user can register before checkout', async({mainPage, navigation, loginPage, registerPage, successPage, productsPage, cartPage, checkoutPage, paymentPage, randomCard}) => {
        const user = createUser()
        const desc = faker.lorem.sentence()

        await navigation.redirectTo(NavItem.Login)
        await registerUserFlow(user, {loginPage, registerPage, successPage, mainPage})
        await navigation.redirectTo(NavItem.Products)
        await productsPage.addTwoProductsAndContinue()
        await completeCheckoutFlow(desc, randomCard, {navigation, cartPage, checkoutPage, paymentPage, successPage})
        await deleteAccountFlow({navigation, successPage})
    })
})