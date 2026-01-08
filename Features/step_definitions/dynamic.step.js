import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Dynamic element interaction steps
When('I click on element {string}', async function (selector) {
  await this.page.click(selector);
  console.log(`✅ Clicked on element: ${selector}`);
});

When('I type {string} into element {string}', async function (text, selector) {
  await this.page.fill(selector, text);
  console.log(`✅ Typed "${text}" into: ${selector}`);
});

When('I select {string} from dropdown {string}', async function (option, selector) {
  await this.page.selectOption(selector, option);
  console.log(`✅ Selected "${option}" from: ${selector}`);
});

When('I hover over element {string}', async function (selector) {
  await this.page.hover(selector);
  console.log(`✅ Hovered over: ${selector}`);
});

When('I double click on element {string}', async function (selector) {
  await this.page.dblclick(selector);
  console.log(`✅ Double clicked: ${selector}`);
});

When('I right click on element {string}', async function (selector) {
  await this.page.click(selector, { button: 'right' });
  console.log(`✅ Right clicked: ${selector}`);
});

When('I clear element {string}', async function (selector) {
  await this.page.fill(selector, '');
  console.log(`✅ Cleared: ${selector}`);
});

When('I press key {string}', async function (key) {
  await this.page.keyboard.press(key);
  console.log(`✅ Pressed key: ${key}`);
});

When('I wait for element {string} to be visible', async function (selector) {
  await this.page.waitForSelector(selector, { state: 'visible' });
  console.log(`✅ Element visible: ${selector}`);
});

When('I wait for element {string} to be hidden', async function (selector) {
  await this.page.waitForSelector(selector, { state: 'hidden' });
  console.log(`✅ Element hidden: ${selector}`);
});

When('I scroll to element {string}', async function (selector) {
  await this.page.locator(selector).scrollIntoViewIfNeeded();
  console.log(`✅ Scrolled to: ${selector}`);
});

When('I upload file {string} to element {string}', async function (filePath, selector) {
  await this.page.setInputFiles(selector, filePath);
  console.log(`✅ Uploaded file "${filePath}" to: ${selector}`);
});

// Dynamic verification steps
Then('element {string} should be visible', async function (selector) {
  await expect(this.page.locator(selector)).toBeVisible();
  console.log(`✅ Verified visible: ${selector}`);
});

Then('element {string} should be hidden', async function (selector) {
  await expect(this.page.locator(selector)).toBeHidden();
  console.log(`✅ Verified hidden: ${selector}`);
});

Then('element {string} should contain text {string}', async function (selector, text) {
  await expect(this.page.locator(selector)).toContainText(text);
  console.log(`✅ Verified text "${text}" in: ${selector}`);
});

Then('element {string} should have value {string}', async function (selector, value) {
  await expect(this.page.locator(selector)).toHaveValue(value);
  console.log(`✅ Verified value "${value}" in: ${selector}`);
});

Then('element {string} should be enabled', async function (selector) {
  await expect(this.page.locator(selector)).toBeEnabled();
  console.log(`✅ Verified enabled: ${selector}`);
});

Then('element {string} should be disabled', async function (selector) {
  await expect(this.page.locator(selector)).toBeDisabled();
  console.log(`✅ Verified disabled: ${selector}`);
});

Then('page should have title {string}', async function (title) {
  await expect(this.page).toHaveTitle(title);
  console.log(`✅ Verified page title: ${title}`);
});

Then('page should have URL {string}', async function (url) {
  await expect(this.page).toHaveURL(url);
  console.log(`✅ Verified page URL: ${url}`);
});

// Dynamic navigation steps
Given('I navigate to {string}', async function (url) {
  await this.page.goto(url);
  console.log(`✅ Navigated to: ${url}`);
});

Given('I reload the page', async function () {
  await this.page.reload();
  console.log(`✅ Page reloaded`);
});

Given('I go back in browser', async function () {
  await this.page.goBack();
  console.log(`✅ Went back in browser`);
});

Given('I go forward in browser', async function () {
  await this.page.goForward();
  console.log(`✅ Went forward in browser`);
});

// Dynamic wait steps
When('I wait for {int} seconds', async function (seconds) {
  await this.page.waitForTimeout(seconds * 1000);
  console.log(`✅ Waited for ${seconds} seconds`);
});

When('I wait for page to load', async function () {
  await this.page.waitForLoadState('networkidle');
  console.log(`✅ Page loaded completely`);
});