import { test } from "../../fixtures/test.fixture";
import { NavItem } from "../../pages/components/navigation.component";

test('user can navigate to test cases page', async({mainPage, testCasesPage, navigation}) => {
    await mainPage.expectLoaded()
    await navigation.redirectTo(NavItem.TestCases)
    await testCasesPage.expectLoaded()
})