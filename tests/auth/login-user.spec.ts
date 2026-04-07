import {test} from "../../fixtures/test.fixture"
import { createUser } from "../../utils/user-factory"

test('user can log in', async({mainPage, loginPage, successPage, registeredUser}) => {
    await mainPage.openLoginPage()
    await loginPage.expectLoaded()
    await loginPage.loginUser(registeredUser)
    await mainPage.expectUserLogged(registeredUser)
    await mainPage.deleteAccount()
    await successPage.successAndContinue('Account Deleted!')
})

test('user cannot log in with invalid credentials', async({mainPage, loginPage}) => {
    const user = createUser()
    await mainPage.openLoginPage()
    await loginPage.expectLoaded()
    await loginPage.loginUser(user)
    await loginPage.expectLoginErrorMessage()
})