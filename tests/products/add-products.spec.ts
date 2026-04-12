import { test } from "../../fixtures/test.fixture";
import { NavItem } from "../../pages/components/navigation.component";


test('user can add products in cart', async({mainPage, productsPage, navigation, cartPage}) => {
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Products)
    const firstProduct = await productsPage.addProductToCartByIndex(0)
    await productsPage.continueShopping()
    const secondProduct = await productsPage.addProductToCartByIndex(1)
    await productsPage.viewCart()
    await cartPage.expectProducts([firstProduct, secondProduct])

})