import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
})

test.skip('Verify the hidden elements', async ({ page }) => {
    await page.locator('#hide-textbox').isVisible();
    await page.locator('#hide-textbox').click();
    await page.locator('#hide-textbox').isHidden();

})

test('Handling confirmation popup', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    // page.on('dialog', dialog => dialog.dismiss());
    await page.locator('#confirmbtn').click();

})

test('Handle Mouse Hover', async ({ page }) => {
    await page.locator('#mousehover').scrollIntoViewIfNeeded();
    await page.locator('#mousehover').hover();
    await page.locator('text=Top').click();
})

test('Handling the iframes', async ({ page }) => {

    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator('li a[href="lifetime-access"]:visible').click();
    const linkText = await framePage.locator('.text h2').textContent();
    console.log(linkText);
    const subscribersCount = linkText.split(" ")[1];
    console.log(subscribersCount);

})