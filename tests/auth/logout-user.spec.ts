import {test} from "../../fixtures/test.fixture"
import { createUser } from "../../utils/user-factory";

test('user can log out', async({mainPage, loginPage, userApi }) => {
    const user = createUser()

    await userApi.registerUser(user)
    await mainPage.openLoginPage()
    await loginPage.expectLoaded()
    await loginPage.loginUser(user)
    await mainPage.expectUserLogged(user)
    await mainPage.logoutUser()
    await loginPage.expectLoaded()
})