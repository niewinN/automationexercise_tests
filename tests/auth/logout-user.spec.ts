import {test} from "../../fixtures/test.fixture"
import { NavItem } from "../../pages/components/navigation.component";
import { createUser } from "../../utils/user-factory";

test('user can log out', async({mainPage, loginPage, userApi, navigation }) => {
    const user = createUser()

    await userApi.registerUser(user)
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Login)
    await loginPage.expectLoaded()
    await loginPage.loginUser(user)
    await mainPage.expectUserLogged(user)
    await navigation.redirectTo(NavItem.Logout)
    await loginPage.expectLoaded()
})