import { test } from "../../fixtures/test.fixture";
import { loginUserFlow } from "../../flows/login.flow";
import { NavItem } from "../../pages/components/navigation.component";
import { createUser } from "../../utils/user-factory";


test('user can search products and view cart after login', async({mainPage, navigation, productsPage, cartPage, loginPage}) => {
    const user = createUser()

    await navigation.redirectTo(NavItem.Products)
    await productsPage.expectLoaded()
    await productsPage.enterProductNameAndSearch('blue')
    await productsPage.expectFilteredProducts('blue')
    const addedProductsCount = await productsPage.addAllFilteredProducts()
    await navigation.redirectTo(NavItem.Cart)
    await cartPage.expectProductsCount(addedProductsCount)
    await loginUserFlow(user, {loginPage, navigation, mainPage}, false)
    await navigation.redirectTo(NavItem.Cart)
    await cartPage.expectProductsCount(addedProductsCount)

})