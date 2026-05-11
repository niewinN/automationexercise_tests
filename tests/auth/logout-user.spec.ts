import {test} from "../../fixtures/test.fixture"
import { loginUserFlow } from "../../flows/login.flow";
import { NavItem } from "../../pages/components/navigation.component";
import { createUser } from "../../utils/user-factory";

test('user can log out', async({mainPage, loginPage, userApi, navigation }) => {
    const user = createUser()

    await userApi.registerUser(user)
    await loginUserFlow(user, {navigation, loginPage, mainPage})
    await navigation.redirectTo(NavItem.Logout)
    await loginPage.expectLoaded()
})