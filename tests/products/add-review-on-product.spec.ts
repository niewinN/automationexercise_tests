import { faker } from "@faker-js/faker";
import { test } from "../../fixtures/test.fixture";
import { NavItem } from "../../pages/components/navigation.component";
import { createUser } from "../../utils/user-factory";



test('user can add review on product', async({navigation, productsPage, productDetailsPage}) => {
    const user = createUser()
    const review = faker.lorem.sentence()
    
    await navigation.redirectTo(NavItem.Products)
    await productsPage.clickOnFirstViewProductLink()
    await productDetailsPage.expectReviewTitleLoaded()
    await productDetailsPage.completeReviewForm(user.name, user.email, review)
    await productDetailsPage.expectReviewAdded()
})