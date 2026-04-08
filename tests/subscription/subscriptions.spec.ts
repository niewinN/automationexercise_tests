import { test } from "../../fixtures/test.fixture"; 

test.describe('footer subscription', () => {

    test('user can subscribe from main page', async({mainPage, footer}) => {
        await mainPage.expectLoaded()
        await footer.subscribe()
    })


    test('user can subscribe from cart page', async({mainPage, footer}) => {
        await mainPage.expectLoaded()
        await mainPage.redirectToCartPage()
        await footer.subscribe()
    })
})


