import { test } from "../../fixtures/test.fixture";
import { NavItem } from "../../pages/components/navigation.component";


test('user can filter products', async({mainPage, productsPage, navigation}) => {
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Products)
    await productsPage.expectLoaded()
    await productsPage.enterProductNameAndSearch('blue')
    await productsPage.expectFilteredProducts('blue')
})

test('user can filter products by category', async({mainPage, productsPage, navigation}) => {
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Products)
    await productsPage.expectCategoryPanelLoaded()
    await productsPage.filterToDress()
    await productsPage.expectWomenDressCategoryLoaded()
    await productsPage.filterToJeans()
    await productsPage.expectMenJeansCategoryLoaded()
})

test('user can filter products by branch', async({mainPage, navigation, productsPage}) => {
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.Products)
    await productsPage.expectBrandsLoaded()
    await productsPage.clickBrandsAndLoadedPage()
})