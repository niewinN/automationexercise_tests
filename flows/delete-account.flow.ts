import { Navigation, NavItem } from "../pages/components/navigation.component";
import { SuccessPage } from "../pages/success.page";

export async function deleteAccountFlow(pages: {navigation: Navigation, successPage: SuccessPage}) {
    await pages.navigation.redirectTo(NavItem.Delete)
    await pages.successPage.successAndContinue('Account Deleted!')
}