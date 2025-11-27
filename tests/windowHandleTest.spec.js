import { test, expect } from '@playwright/test'

test("Window Handle Test", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage(); //Create a new page using broeser fixture

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const inpUserName = page.locator("#username");
    const lnkDocuments = page.locator("a[href *= 'documents-request']");

    //Promise will make sure all the arguments in the array are complete and if there are anything to return then it will
    const [newPage] = await Promise.all(

        [
            context.waitForEvent('page'),
            lnkDocuments.click()
        ]
    )
    const txtEmailMessage = await newPage.locator(".red").textContent();

    //Extract username from messageß
    const userName = txtEmailMessage.split('@')[1].split(' ')[0];
    await inpUserName.fill(userName);

    //await page.pause();
})