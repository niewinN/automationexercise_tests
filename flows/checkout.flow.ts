import { Card } from "../models/card";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { Navigation, NavItem } from "../pages/components/navigation.component";
import { PaymentPage } from "../pages/payment.page";
import { SuccessPage } from "../pages/success.page";

type CheckoutFlowPages = {
    navigation: Navigation
    cartPage: CartPage
    checkoutPage: CheckoutPage
    paymentPage: PaymentPage
    successPage: SuccessPage
}


export async function completeCheckoutFlow(desc: string, card: Card, pages: CheckoutFlowPages, continueAfterSuccess = true) {
    await pages.navigation.redirectTo(NavItem.Cart)
    await pages.cartPage.proceedToCheckout()
    await pages.checkoutPage.expectSectionsLoaded()
    await pages.checkoutPage.addCommentAfterLoaded(desc)
    await pages.paymentPage.completePaymentFormAndPay(card)

    if (continueAfterSuccess) {
        await pages.successPage.successAndContinue('Order Placed!')
    } else {
        await pages.successPage.successMessageLoaded('Order Placed!')
    }
    
}