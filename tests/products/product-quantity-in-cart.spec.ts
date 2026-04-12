import { test } from "../../fixtures/test.fixture";

test('user can see correct quantity in cart', async({mainPage, productDetailsPage, cartPage}) => {
    await mainPage.expectLoaded()
    await mainPage.viewProduct()
    await productDetailsPage.expectLoaded()
    await productDetailsPage.increaseQuantityAndAddProductToCart(4)
    await cartPage.expectSingleProductQuantity(4)
})