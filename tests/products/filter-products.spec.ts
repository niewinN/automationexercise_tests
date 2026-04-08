import { test } from "../../fixtures/test.fixture";


test('user can filter products', async({mainPage, productsPage}) => {
    await mainPage.expectLoaded()
    await mainPage.redirectToProductsPage()
    await productsPage.expectLoaded()
    await productsPage.enterProductNameAndSearch('blue')
    await productsPage.expectFilteredProducts('blue')
})