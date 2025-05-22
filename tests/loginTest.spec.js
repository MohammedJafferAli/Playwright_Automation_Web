import { test, expect } from "@playwright/test";

test("Invalid login error validation", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshetty");
    await page.locator("#password").fill("learning");
    await page.locator("input[value='Sign In']").click();

    const warnMessage = await page.locator("[style*='block']").textContent();
    console.log(warnMessage);
})


test("Log-in to application", async ({ page }) => {
    // Launch the app
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // Define locators
    const inpUserName = page.locator("#username");
    const inpPassword = page.locator("#password");
    const btnSignIn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-title");

    // Wait for input fields to be visible
    await expect(inpUserName).toBeVisible();
    await expect(inpPassword).toBeVisible();

    // Enter invalid credentials
    await inpUserName.fill("rahulshetty");
    await inpPassword.fill("learning");
    await btnSignIn.click();

    // Wait for error message or page to remain (optional)

    // Clear and enter valid credentials
    await inpUserName.fill("rahulshettyacademy");
    await inpPassword.fill("learning");

    // Ensure Sign In button is visible and enabled before clicking
    await expect(btnSignIn).toBeVisible();
    await expect(btnSignIn).toBeEnabled();
    await btnSignIn.click();

    // Wait for card titles to appear
    await expect(cardTitle.first()).toBeVisible();

    // Log the title of the first product
    console.log("First product title:", await cardTitle.first().textContent());

    // Log the title of the third product (index 2)
    console.log("Third product title:", await cardTitle.nth(2).textContent());

    // Log all product titles
    const titles = await cardTitle.allTextContents();
    const cleanedTitles = titles.map(title=>title.trim())
    console.log("All product titles:", cleanedTitles);
});


test.only("Wait for network idle", async({page})=>{

await page.goto("https://rahulshettyacademy.com/client");
const inpUserEmail = page.locator("#userEmail")
const inpPassword = page.locator("#userPassword");
const btnLogin = page.locator("#login");
const eleProductTitles = page.locator(".card-body h5 b");

await inpUserEmail.fill("JafTester1@gmail.com");
await inpPassword.fill("Pl@y1234");
await btnLogin.click();

// await expect(productTitles).toBeVisible(); There is an alternate

await page.waitForLoadState("networkidle"); //Wait the API to give the complete response
const listProductTitles = await eleProductTitles.allTextContents();
console.log(listProductTitles);
})