import { faker } from "@faker-js/faker"
import {test} from "../../fixtures/test.fixture"
import { loginUserFlow } from "../../flows/login.flow"
import { NavItem } from "../../pages/components/navigation.component"
import { createUser } from "../../utils/user-factory"
import { deleteAccountFlow } from "../../flows/delete-account.flow"

test.describe('Login user tests', () => {
    test('user can log in', async({mainPage, loginPage, successPage, registeredUser, navigation}) => {
        await loginUserFlow(registeredUser, {loginPage, navigation, mainPage})
        await deleteAccountFlow({navigation, successPage})
    })

    test('user cannot log in with invalid credentials', async({mainPage, loginPage, navigation}) => {
        const user = createUser()
        await loginUserFlow(user, {loginPage, navigation, mainPage}, false)
        await loginPage.expectLoginErrorMessage()
    })

    test('user can login before checkout', async({registeredUser, mainPage, loginPage, navigation, productsPage, cartPage, checkoutPage, paymentPage, successPage, randomCard}) => {
        const desc = faker.lorem.sentence()

        await loginUserFlow(registeredUser, {mainPage, loginPage, navigation})
        await navigation.redirectTo(NavItem.Products)
        await productsPage.addTwoProductsAndContinue()
        await navigation.redirectTo(NavItem.Cart)
        await cartPage.proceedToCheckout()
        await checkoutPage.addCommentAfterLoaded(desc)
        await paymentPage.completePaymentFormAndPay(randomCard)
        await successPage.successAndContinue('Order Placed!')
        await deleteAccountFlow({navigation, successPage})
    })
})
