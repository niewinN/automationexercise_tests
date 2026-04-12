import { test } from "../../fixtures/test.fixture";
import { NavItem } from "../../pages/components/navigation.component";


test('user can filter products', async({mainPage, productsPage, navigation}) => {
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Products)
    await productsPage.expectLoaded()
    await productsPage.enterProductNameAndSearch('blue')
    await productsPage.expectFilteredProducts('blue')
})