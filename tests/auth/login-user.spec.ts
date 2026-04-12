import {test} from "../../fixtures/test.fixture"
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