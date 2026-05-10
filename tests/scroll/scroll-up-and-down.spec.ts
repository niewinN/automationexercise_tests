import { test } from "../../fixtures/test.fixture";


test('user can scroll up using arrow button and scroll down', async({mainPage, footer}) => {
    await mainPage.expectLoaded()
    await mainPage.scrollToBottom()
    await footer.expectSubscriptionSectionLoaded()
    await mainPage.scrollUpByArrow()
    await mainPage.expectPageScrolledUp()
    await mainPage.expectTitleVisible()
})


test('user can scroll up and down without button', async({mainPage, footer}) => {
    await mainPage.expectLoaded()
    await mainPage.scrollToBottom()
    await footer.expectSubscriptionSectionLoaded()
    await mainPage.scrollToTop()
    await mainPage.expectPageScrolledUp()
    await mainPage.expectTitleVisible()
})