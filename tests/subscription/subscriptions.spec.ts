import { test } from "../../fixtures/test.fixture"; 
import { NavItem } from "../../pages/components/navigation.component";

test.describe('footer subscription', () => {

    test('user can subscribe from main page', async({mainPage, footer}) => {
        await mainPage.expectLoaded()
        await footer.subscribe()
    })


    test('user can subscribe from cart page', async({mainPage, footer, navigation}) => {
        await mainPage.expectLoaded()
        await navigation.redirectTo(NavItem.Cart)
        await footer.subscribe()
    })
})


