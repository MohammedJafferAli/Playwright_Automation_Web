import { test, expect } from '@playwright/test'
import PageObjectManager from '../pageObjects/PageObjectManager.js';
import 'dotenv/config'; // For environment variables


test("End to End Automation of e-commerce application with Page Object Model", async ({ page }) => {


    const pom = new PageObjectManager(page);

    await pom.getLoginPage().navigateTo('auth/login');
    await pom.getLoginPage().login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    await pom.getDashboardPage().addProductToCart('ADIDAS ORIGINAL');
    await pom.getDashboardPage().goToCart();
    

    await pom.getCartPage().checkout();
    await page.waitForLoadState('networkidle');
 
    await pom.getPaymentPage().completePayment({
        cardDetails: { cvv: '123', nameOnCard: 'John Doe' },
        country: 'India'
    });

    const orderId = await pom.getOrdersPage().getOrderId();
    console.log('Order ID:', orderId);

    expect(orderId).not.toBeNull();

})


