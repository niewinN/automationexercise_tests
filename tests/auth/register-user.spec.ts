import {test} from "../../fixtures/test.fixture"
import { NavItem } from "../../pages/components/navigation.component";
import { createUser } from "../../utils/user-factory";

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