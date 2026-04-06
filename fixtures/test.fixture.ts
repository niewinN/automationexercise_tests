import {test as base, expect} from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { SuccessPage } from '../pages/success.page';
import { UserApi } from '../api/user.api';


type Fixtures = {
    mainPage: MainPage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    successPage: SuccessPage;
    userApi: UserApi;
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
    }
})

export {expect};