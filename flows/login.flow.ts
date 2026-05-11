import { LoginPage } from "../pages/login.page";
import { RegisterUser } from "../utils/user-factory";
import { Navigation, NavItem } from "../pages/components/navigation.component";
import { MainPage } from "../pages/main.page";


export async function loginUserFlow(user: RegisterUser, pages: {loginPage: LoginPage, navigation: Navigation, mainPage: MainPage}, checkUserLogged = true) {
    await pages.navigation.redirectTo(NavItem.Login)
    await pages.loginPage.expectLoaded()
    await pages.loginPage.loginUser(user)

    if (checkUserLogged) {
        await pages.mainPage.expectUserLogged(user)
    }
}