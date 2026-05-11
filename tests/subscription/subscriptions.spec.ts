import { test } from "../../fixtures/test.fixture"; 
import { NavItem } from "../../pages/components/navigation.component";

test.describe('Footer subscription', () => {

    test('user can subscribe from main page', async({footer}) => {
        await footer.subscribe()
    })

    test('user can subscribe from cart page', async({footer, navigation}) => {
        await navigation.redirectTo(NavItem.Cart)
        await footer.subscribe()
    })
})


