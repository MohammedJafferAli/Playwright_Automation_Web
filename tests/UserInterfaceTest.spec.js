import { test, expect } from '@playwright/test';

test("Verify user interfaces", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // Define locators
    const inpUserName = page.locator("#username");
    const inpPassword = page.locator("#password");
    const btnSignIn = page.locator("#signInBtn");
    const dropdownOccupasion = page.locator("select.form-control");
    const radioUserType = page.locator(".radiotextsty");
    const alertOkay = page.locator("#okayBtn");
    const checkBoxTerms = page.locator("#terms");

    // Enter valid credentials
    await inpUserName.fill("rahulshettyacademy");
    await inpPassword.fill("learning");

    //Select the value from dropdown
    await dropdownOccupasion.selectOption("teach");

    //Select "user" radio button
    await radioUserType.last().click();

    await alertOkay.click(); //Click okay in the web alert Note not a javascript alert
    await checkBoxTerms.click();
    expect(await checkBoxTerms.isChecked()).toBeTruthy();

    //Uncheck the Terms and check the state
    await checkBoxTerms.uncheck();
    expect(await checkBoxTerms.isChecked()).toBeFalsy();

    //await page.pause();
})