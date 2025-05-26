import { test, expect } from '@playwright/test'

test.only("End to End Automation of e-commerce application", async ({ page }) => {

    //Launch APplication 
    await page.goto("https://rahulshettyacademy.com/client");

    //Login Page ELemenets
    const inpUserName = page.locator("#userEmail");
    const inpPassword = page.locator("#userPassword");
    const btnLogin = page.locator("#login");
    const btnCart = page.locator("button[routerlink='/dashboard/cart']");

    const btnCheckout = page.locator("text=Checkout");

    //dashboard page elements
    const productCards = page.locator(".card-body");

    const productName = "ZARA COAT 3";

    await inpUserName.fill("JafTester1@gmail.com");
    await inpPassword.fill("Pl@y1234");
    await btnLogin.click();

    await page.waitForLoadState('networkidle');

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //Extract the product name & match with expected productName then add it to the cart

    const count = await productCards.count();

    for (var itr = 0; itr < count; itr++) {

        if (await productCards.nth(itr).locator("b").textContent() === productName) {
            await productCards.nth(itr).locator("text=Add To Cart").click(); //use text to locate the element
        }
    }

    await btnCart.click();
    await btnCheckout.click();

    // page.pause();








})