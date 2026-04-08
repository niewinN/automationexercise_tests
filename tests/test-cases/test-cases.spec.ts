import { test } from "../../fixtures/test.fixture";

test('user can navigate to test cases page', async({mainPage, testCasesPage}) => {
    await mainPage.expectLoaded()
    await mainPage.redirectToTestCasesPage()
    await testCasesPage.expectLoaded()
})