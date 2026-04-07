import {test} from "../../fixtures/test.fixture"
import { createUser } from "../../utils/user-factory";

test('user can register', async({mainPage, loginPage, registerPage, successPage}) => {
    const user = createUser()

    await mainPage.openLoginPage()
    await loginPage.expectLoaded()
    await loginPage.startRegistration(user)
    await registerPage.expectLoaded()
    await registerPage.completeRegistration(user)
    await successPage.successAndContinue('Account Created!')
    await mainPage.expectUserLogged(user)
    await mainPage.deleteAccount()
    await successPage.successAndContinue('Account Deleted!')
})

test('user cannot register with existing email', async({mainPage, loginPage, registeredUser}) => {
    await mainPage.openLoginPage()
    await loginPage.expectSignupSection()
    await loginPage.startRegistration(registeredUser)
    await loginPage.expectRegisterErrorMessage()

})