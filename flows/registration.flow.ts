import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { SuccessPage } from '../pages/success.page';
import { RegisterUser } from '../utils/user-factory';

export async function registerUserFlow(
    user: RegisterUser, 
    pages: { loginPage: LoginPage, registerPage: RegisterPage, successPage: SuccessPage }
) {
    await pages.loginPage.startRegistration(user);
    await pages.registerPage.expectLoaded();
    await pages.registerPage.completeRegistration(user);
    await pages.successPage.successAndContinue('Account Created!');
}