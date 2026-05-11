import { test } from "../../fixtures/test.fixture";
import { Footer } from "../../pages/components/footer.component";
import { MainPage } from "../../pages/main.page";

async function expectScrollToTopWorks(scrollUpAction: () => Promise<void>, pages: {mainPage: MainPage, footer: Footer}) {
        await pages.mainPage.scrollToBottom()
        await pages.footer.expectSubscriptionSectionLoaded()
        await scrollUpAction()
        await pages.mainPage.expectPageScrolledUp()
        await pages.mainPage.expectTitleVisible()
}

test.describe('Scroll behaviour', () => {

    test('user can scroll up using arrow button and scroll down', async({mainPage, footer}) => {
        await expectScrollToTopWorks(
            async () => {
                await mainPage.scrollUpByArrow()
            },
            {mainPage, footer}
        )
    })

    test('user can scroll up and down without button', async({mainPage, footer}) => {
        await expectScrollToTopWorks(
            async () => {
                await mainPage.scrollToTop()
            },
            {mainPage, footer}
        )
    })
})

