import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

class SmartElementFinder {
  constructor(page) {
    this.page = page;
  }

  async findElement(text, elementType = 'any', context = '') {
    const strategies = [
      // Button strategies
      () => this.page.getByRole('button', { name: new RegExp(text, 'i') }),
      () => this.page.locator(`button:has-text("${text}")`),
      () => this.page.locator(`input[type="submit"][value*="${text}" i]`),
      () => this.page.locator(`input[type="button"][value*="${text}" i]`),
      () => this.page.locator(`[role="button"]:has-text("${text}")`),
      
      // Input strategies
      () => this.page.getByLabel(new RegExp(text, 'i')),
      () => this.page.getByPlaceholder(new RegExp(text, 'i')),
      () => this.page.locator(`input[name*="${text}" i]`),
      () => this.page.locator(`input[id*="${text}" i]`),
      () => this.page.locator(`textarea[name*="${text}" i]`),
      
      // Link strategies
      () => this.page.getByRole('link', { name: new RegExp(text, 'i') }),
      () => this.page.locator(`a:has-text("${text}")`),
      
      // Generic text-based strategies
      () => this.page.locator(`*:has-text("${text}"):not(:has(*:has-text("${text}")))`),
      () => this.page.locator(`[aria-label*="${text}" i]`),
      () => this.page.locator(`[title*="${text}" i]`),
      () => this.page.locator(`[alt*="${text}" i]`)
    ];

    // Try each strategy until one works
    for (const strategy of strategies) {
      try {
        const element = strategy();
        await element.waitFor({ timeout: 2000 });
        const count = await element.count();
        if (count > 0) {
          return element.first();
        }
      } catch (e) {
        // Continue to next strategy
      }
    }

    throw new Error(`Could not find element with text "${text}" on page`);
  }

  async findInputField(text) {
    const strategies = [
      () => this.page.getByLabel(new RegExp(text, 'i')),
      () => this.page.getByPlaceholder(new RegExp(text, 'i')),
      () => this.page.locator(`input[name*="${text}" i]`),
      () => this.page.locator(`input[id*="${text}" i]`),
      () => this.page.locator(`textarea[name*="${text}" i]`),
      () => this.page.locator(`input[type="text"][placeholder*="${text}" i]`),
      () => this.page.locator(`input[type="email"][placeholder*="${text}" i]`),
      () => this.page.locator(`input[type="password"][placeholder*="${text}" i]`)
    ];

    for (const strategy of strategies) {
      try {
        const element = strategy();
        await element.waitFor({ timeout: 2000 });
        if (await element.count() > 0) {
          return element.first();
        }
      } catch (e) {
        // Continue
      }
    }

    throw new Error(`Could not find input field for "${text}"`);
  }

  async findDropdown(text) {
    const strategies = [
      () => this.page.locator(`select[name*="${text}" i]`),
      () => this.page.locator(`select[id*="${text}" i]`),
      () => this.page.getByLabel(new RegExp(text, 'i')).filter('select'),
      () => this.page.locator(`[role="combobox"][aria-label*="${text}" i]`),
      () => this.page.locator(`[role="listbox"][aria-label*="${text}" i]`)
    ];

    for (const strategy of strategies) {
      try {
        const element = strategy();
        await element.waitFor({ timeout: 2000 });
        if (await element.count() > 0) {
          return element.first();
        }
      } catch (e) {
        // Continue
      }
    }

    throw new Error(`Could not find dropdown for "${text}"`);
  }
}

// Smart interaction steps
When('I click {string}', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await element.click();
  console.log(`✅ Clicked on: ${text}`);
});

When('I click {string} in {string}', async function (elementText, pageContext) {
  this.setCurrentPage(pageContext);
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(elementText);
  await element.click();
  console.log(`✅ Clicked "${elementText}" in ${pageContext}`);
});

When('I type {string} in {string}', async function (text, fieldName) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findInputField(fieldName);
  await element.fill(text);
  console.log(`✅ Typed "${text}" in ${fieldName} field`);
});

When('I enter {string} into {string}', async function (text, fieldName) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findInputField(fieldName);
  await element.fill(text);
  console.log(`✅ Entered "${text}" into ${fieldName}`);
});

When('I select {string} from {string}', async function (option, dropdownName) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findDropdown(dropdownName);
  await element.selectOption({ label: option });
  console.log(`✅ Selected "${option}" from ${dropdownName}`);
});

When('I hover over {string}', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await element.hover();
  console.log(`✅ Hovered over: ${text}`);
});

When('I double click {string}', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await element.dblclick();
  console.log(`✅ Double clicked: ${text}`);
});

When('I right click {string}', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await element.click({ button: 'right' });
  console.log(`✅ Right clicked: ${text}`);
});

When('I clear {string}', async function (fieldName) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findInputField(fieldName);
  await element.fill('');
  console.log(`✅ Cleared: ${fieldName}`);
});

// Smart verification steps
Then('I should see {string}', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await expect(element).toBeVisible();
  console.log(`✅ Verified visible: ${text}`);
});

Then('{string} should be visible', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await expect(element).toBeVisible();
  console.log(`✅ Verified "${text}" is visible`);
});

Then('{string} should be hidden', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await expect(element).toBeHidden();
  console.log(`✅ Verified "${text}" is hidden`);
});

Then('{string} should contain {string}', async function (elementText, expectedText) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(elementText);
  await expect(element).toContainText(expectedText);
  console.log(`✅ Verified "${elementText}" contains "${expectedText}"`);
});

Then('{string} should be enabled', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await expect(element).toBeEnabled();
  console.log(`✅ Verified "${text}" is enabled`);
});

Then('{string} should be disabled', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await expect(element).toBeDisabled();
  console.log(`✅ Verified "${text}" is disabled`);
});

// Smart wait steps
When('I wait for {string} to appear', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await element.waitFor({ state: 'visible' });
  console.log(`✅ Waited for "${text}" to appear`);
});

When('I wait for {string} to disappear', async function (text) {
  const finder = new SmartElementFinder(this.page);
  const element = await finder.findElement(text);
  await element.waitFor({ state: 'hidden' });
  console.log(`✅ Waited for "${text}" to disappear`);
});