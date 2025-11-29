import { Given, When, Then } from '@cucumber/cucumber';
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


