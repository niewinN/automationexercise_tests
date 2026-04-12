import { test } from "../../fixtures/test.fixture";
import { NavItem } from "../../pages/components/navigation.component";

test('user can navigate to products page and product details page', async({mainPage, productsPage, productDetailsPage, navigation}) => {
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Products)
    await productsPage.expectLoaded()
    await productsPage.expectProductListLoaded()
    const productData = await productsPage.addProductToCartByIndex(0)
    await productsPage.redirectToProductDetails()
    await productDetailsPage.expectLoaded()
    await productDetailsPage.expectProductDetails(productData)
})
