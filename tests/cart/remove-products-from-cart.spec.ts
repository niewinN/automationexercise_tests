import { test } from "../../fixtures/test.fixture";
import { NavItem } from "../../pages/components/navigation.component";


test('user can remove products from cart', async({navigation, productsPage, cartPage}) => {
    await navigation.redirectTo(NavItem.Products)
    await productsPage.addTwoProductsAndContinue()
    await navigation.redirectTo(NavItem.Cart)
    await cartPage.expectLoaded()
    await cartPage.expectProductRemovedFromCart()
})