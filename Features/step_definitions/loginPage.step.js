import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

Given('I am on the e-commerce application', async function () {
  await this.page.goto('https://rahulshettyacademy.com/client/');
});

Given('I navigate to the login page', async function () {
  await this.pom.getLoginPage().navigateTo('auth/login');
});

When('I login with valid credentials', async function () {
  await this.pom.getLoginPage().login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
});

Then('I should be redirected to the dashboard', async function () {
  await this.pom.getDashboardPage().checkDashboardUrl();
});

When('I enter invalid email {string}', async function (email) {
  await this.page.getByRole('textbox', { name: 'email@example.com' }).fill(email);
});

When('I enter invalid password {string}', async function (password) {
  await this.page.getByRole('textbox', { name: 'enter your passsword' }).fill(password);
});

When('I click the login button', async function () {
  await this.page.getByRole('button', { name: 'Login' }).click();
});

Then('I should see error message {string}', async function (errorMessage) {
  await expect(this.page.getByRole('alert', { name: errorMessage })).toBeVisible();
});


