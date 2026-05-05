import { test } from "../../fixtures/test.fixture";
import { NavItem } from "../../pages/components/navigation.component";
import { createUser } from "../../utils/user-factory";


test('user can search products and view cart after login', async({mainPage, navigation, productsPage, cartPage, loginPage}) => {
    const user = createUser()

    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Products)
    await productsPage.expectLoaded()
    await productsPage.enterProductNameAndSearch('blue')
    await productsPage.expectFilteredProducts('blue')
    const addedProductsCount = await productsPage.addAllFilteredProducts()
    await navigation.redirectTo(NavItem.Cart)
    await cartPage.expectProductsCount(addedProductsCount)
    await navigation.redirectTo(NavItem.Login)
    await loginPage.loginUser(user)
    await navigation.redirectTo(NavItem.Cart)
    await cartPage.expectProductsCount(addedProductsCount)

})