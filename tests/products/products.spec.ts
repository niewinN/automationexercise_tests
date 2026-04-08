import { test } from "../../fixtures/test.fixture";

test('user can navigate to products page and product details page', async({mainPage, productsPage, productDetailsPage}) => {
    await mainPage.expectLoaded()
    await mainPage.redirectToProductsPage()
    await productsPage.expectLoaded()
    await productsPage.expectProductListLoaded()
    const productData = await productsPage.openFirstProductAndGetData()
    await productDetailsPage.expectLoaded()
    await productDetailsPage.expectProductDetails(productData)
})
