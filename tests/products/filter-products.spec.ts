import { test } from "../../fixtures/test.fixture";
import { NavItem } from "../../pages/components/navigation.component";

test.describe('Product filtration', () => {

    test.beforeEach(async({navigation, productsPage}) => {
        await navigation.redirectTo(NavItem.Products)
        await productsPage.expectLoaded()
    })
    
    test('user can filter products', async({productsPage}) => {
        await productsPage.enterProductNameAndSearch('blue')
        await productsPage.expectFilteredProducts('blue')
    })

    test('user can filter products by category', async({productsPage}) => {
        await productsPage.expectCategoryPanelLoaded()
        await productsPage.filterToDress()
        await productsPage.expectWomenDressCategoryLoaded()
        await productsPage.filterToJeans()
        await productsPage.expectMenJeansCategoryLoaded()
    })

    test('user can filter products by branch', async({productsPage}) => {
        await productsPage.expectBrandsLoaded()
        await productsPage.clickBrandsAndLoadedPage()
    })
})

