import { test } from "../../fixtures/test.fixture";

test('user can add recommended items to cart', async({mainPage, cartPage}) => {
    await mainPage.addRecommendedItemAndRedirectToCart()
    await cartPage.expectLoaded()
})