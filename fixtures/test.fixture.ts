import {test as base, expect} from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { SuccessPage } from '../pages/success.page';
import { UserApi } from '../api/user.api';
import { createUser, RegisterUser } from '../utils/user-factory';
import { ContactPage } from '../pages/contact.page';


type Fixtures = {
    mainPage: MainPage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    successPage: SuccessPage;
    userApi: UserApi;
    registeredUser: RegisterUser;
    contactPage: ContactPage;
}

export const test = base.extend<Fixtures>({
    mainPage: async ({page}, use) => {
        await use(new MainPage(page))
    },

    loginPage: async ({page}, use) => {
        await use(new LoginPage(page))
    },

    registerPage: async({page}, use) => {
        await use(new RegisterPage(page))
    },

    successPage: async({page}, use) => {
        await use(new SuccessPage(page))
    },

    userApi: async({request}, use) => {
        await use(new UserApi(request))
    },

    registeredUser: async({userApi}, use) => {
        const user = createUser()
        await userApi.registerUser(user)

        try {
            await use(user)
        } finally {
            await userApi.deleteUserIfExists(user)
        }
    },

    contactPage: async({page}, use) => {
        await use(new ContactPage(page))
    }
})

export {expect};