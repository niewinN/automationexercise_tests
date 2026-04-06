import {test} from "../../fixtures/test.fixture"
import { createUser } from "../../utils/user-factory"

test('user can log in', async({mainPage, loginPage, userApi, successPage}) => {
    const user = createUser()

    await userApi.registerUser(user)

    await mainPage.expectLoaded()
    await mainPage.redirectToLoginPage()
    await loginPage.expectLoaded()
    await loginPage.loginUser(user)
    await mainPage.expectUserLogged(user)
    await mainPage.deleteAccount()
    await successPage.successAndContinue('Account Deleted!')
})

test('user cannot log in with invalid credentials', async({mainPage, loginPage}) => {
    const user = createUser()
    await mainPage.expectLoaded()
    await mainPage.redirectToLoginPage()
    await loginPage.expectLoaded()
    await loginPage.loginUser(user)
    await loginPage.expectErrorMessage()
})