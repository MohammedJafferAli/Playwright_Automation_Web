import {test, expect} from "@playwright/test";

test("Launch browser with browser context",async ({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
console.log(await page.title());
})

test("Launch browser with page fixture", async({page})=>{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
})