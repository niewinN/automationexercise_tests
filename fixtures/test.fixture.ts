import {test as base, expect} from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { SuccessPage } from '../pages/success.page';
import { UserApi } from '../api/user.api';
import { createUser, RegisterUser } from '../utils/user-factory';
import { ContactPage } from '../pages/contact.page';
import { TestCasesPage } from '../pages/test-cases.page';
import { ProductsPage } from '../pages/products.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import { Footer } from '../pages/components/footer.component';


type Fixtures = {
    mainPage: MainPage;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    successPage: SuccessPage;
    userApi: UserApi;
    registeredUser: RegisterUser;
    contactPage: ContactPage;
    testCasesPage: TestCasesPage;
    productsPage: ProductsPage;
    productDetailsPage: ProductDetailsPage;
    footer: Footer;
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
    },

    testCasesPage: async({page}, use) => {
        await use(new TestCasesPage(page))
    },

    productsPage: async({page}, use) => {
        await use(new ProductsPage(page))
    },

    productDetailsPage: async({page}, use) => {
        await use(new ProductDetailsPage(page))
    },

    footer: async({page}, use) => {
        await use(new Footer(page))
    }
})

export {expect};