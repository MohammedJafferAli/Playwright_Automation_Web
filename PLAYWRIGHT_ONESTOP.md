# 🎭 Playwright OneStop Guide - Complete Reference

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [30-Day Learning Plan](#30-day-learning-plan)
4. [Project Setup & Installation](#project-setup--installation)
5. [TypeScript Basics](#typescript-basics)
6. [Core Playwright Methods](#core-playwright-methods)
7. [Advanced Playwright Features](#advanced-playwright-features)
8. [Fixtures & Hooks](#fixtures--hooks)
9. [Page Object Model](#page-object-model)
10. [API Testing](#api-testing)
11. [Cucumber + BDD Integration](#cucumber--bdd-integration)
12. [Allure Reporting](#allure-reporting)
13. [CI/CD Integration](#cicd-integration)
14. [Docker Integration](#docker-integration)
15. [AI in Test Automation](#ai-in-test-automation)
16. [Best Practices](#best-practices)
17. [Framework Architecture](#framework-architecture)
18. [Debugging & Troubleshooting](#debugging--troubleshooting)
19. [Interview Preparation](#interview-preparation)
20. [Appendix](#appendix)

---

## 🎯 Introduction

Modern QA automation requires more than writing simple scripts. Companies expect SDET Leads to design scalable frameworks, integrate CI/CD, implement BDD, and leverage AI for intelligent testing.

### Why Playwright + TypeScript?

- ✅ **Cross-browser testing** - Chromium, Firefox, WebKit
- ✅ **Built-in parallel execution** - Faster test runs
- ✅ **Auto-wait mechanism** - No manual waits needed
- ✅ **API testing support** - Test backend and frontend
- ✅ **TypeScript type safety** - Robust and maintainable code
- ✅ **Tracing & debugging** - Built-in developer tools
- ✅ **Mobile emulation** - Test responsive designs

---

## 🛠️ Prerequisites

### Required Software

| Tool | Version | Download Link |
|------|---------|---------------|
| **Node.js** | v18+ LTS | [nodejs.org](https://nodejs.org/) |
| **npm/yarn** | Latest | Comes with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **VS Code** | Latest | [code.visualstudio.com](https://code.visualstudio.com/) |

### TypeScript Basics to Know

```typescript
// Types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Interfaces
interface User {
  email: string;
  password: string;
}

// Classes
class LoginPage {
  constructor(private page: Page) {}
  
  async login(user: User): Promise<void> {
    await this.page.fill('#email', user.email);
    await this.page.fill('#password', user.password);
  }
}

// Inheritance
class BasePage {
  constructor(protected page: Page) {}
  
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
```

---

## 📅 30-Day Learning Plan

### Week 1: TypeScript Basics + Playwright Setup
- **Day 1-2**: TypeScript fundamentals (types, interfaces, classes)
- **Day 3-4**: Playwright installation and first test
- **Day 5-6**: Locators and element interactions
- **Day 7**: Practice exercises and mini-project

### Week 2: Advanced Playwright Features
- **Day 8-9**: Fixtures, hooks, and test organization
- **Day 10-11**: Page Object Model implementation
- **Day 12-13**: API testing with Playwright
- **Day 14**: UI Mode, HAR replay, and tracing

### Week 3: Cucumber + BDD Integration
- **Day 15-16**: Cucumber setup and Gherkin syntax
- **Day 17-18**: Step definitions and scenario outlines
- **Day 19-20**: Integrating Cucumber with Playwright
- **Day 21**: BDD best practices and patterns

### Week 4: CI/CD, Reporting, AI & Interview Prep
- **Day 22-23**: GitLab CI/CD and Docker integration
- **Day 24-25**: Allure reporting setup
- **Day 26-27**: AI integration with OpenAI API
- **Day 28-29**: Framework best practices and scalability
- **Day 30**: Interview preparation and mock interviews

---

## 🚀 Project Setup & Installation

### Initialize Playwright Project

```bash
# Create new project
npm init playwright@latest

# Choose options:
# - TypeScript (recommended)
# - tests folder
# - GitHub Actions workflow
# - Install browsers

# Project structure created:
# ├── tests/
# ├── playwright.config.ts
# ├── package.json
# └── .github/workflows/playwright.yml
```

### Install Additional Dependencies

```bash
# Cucumber for BDD
npm install @cucumber/cucumber --save-dev

# Allure reporting
npm install allure-playwright --save-dev

# Environment variables
npm install dotenv --save-dev

# Excel/JSON data handling
npm install exceljs --save-dev

# OpenAI for AI integration
npm install openai --save-dev

# Install all browsers
npx playwright install

# Install with system dependencies
npx playwright install --with-deps
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node", "@playwright/test"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 📘 TypeScript Basics

### Type Annotations

```typescript
// Primitive types
let username: string = "testuser";
let age: number = 25;
let isLoggedIn: boolean = false;
let data: any = "flexible type";

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Tuples
let user: [string, number] = ["John", 30];

// Enums
enum Environment {
  DEV = "dev",
  QA = "qa",
  PROD = "prod"
}

// Union types
let id: string | number = "123";

// Type aliases
type UserCredentials = {
  email: string;
  password: string;
};
```

### Interfaces

```typescript
// Basic interface
interface LoginCredentials {
  email: string;
  password: string;
}

// Optional properties
interface User {
  name: string;
  email: string;
  phone?: string; // Optional
}

// Readonly properties
interface Config {
  readonly baseUrl: string;
  readonly timeout: number;
}

// Extending interfaces
interface Admin extends User {
  role: string;
  permissions: string[];
}

// Function interfaces
interface LoginFunction {
  (email: string, password: string): Promise<void>;
}
```

### Classes & Inheritance

```typescript
// Base class
class BasePage {
  constructor(protected page: Page) {}
  
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }
  
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}

// Inheritance
class LoginPage extends BasePage {
  private emailInput = '#email';
  private passwordInput = '#password';
  private loginButton = '#loginBtn';
  
  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}

// Abstract classes
abstract class AbstractPage {
  constructor(protected page: Page) {}
  
  abstract getPageUrl(): string;
  
  async navigateToPage(): Promise<void> {
    await this.page.goto(this.getPageUrl());
  }
}
```

### Generics

```typescript
// Generic function
function getElement<T>(selector: string): T {
  return document.querySelector(selector) as T;
}

// Generic class
class DataStore<T> {
  private data: T[] = [];
  
  add(item: T): void {
    this.data.push(item);
  }
  
  get(index: number): T {
    return this.data[index];
  }
}

// Usage
const userStore = new DataStore<User>();
userStore.add({ name: "John", email: "john@test.com" });
```

---

## 🎯 Core Playwright Methods

### Element Locators (Detailed)

```javascript
// ===== RECOMMENDED LOCATORS =====

// 1. By Role (Most Accessible)
await page.getByRole('button', { name: 'Submit' });
await page.getByRole('textbox', { name: 'Email' });
await page.getByRole('checkbox', { name: 'Accept terms' });
await page.getByRole('link', { name: 'Sign up' });
await page.getByRole('heading', { name: 'Welcome' });

// 2. By Label (Form elements)
await page.getByLabel('Email address');
await page.getByLabel('Password');

// 3. By Placeholder
await page.getByPlaceholder('Enter your email');
await page.getByPlaceholder('Search...');

// 4. By Text (Exact and partial)
await page.getByText('Submit');
await page.getByText('Submit', { exact: true });
await page.getByText(/submit/i); // Case insensitive

// 5. By Test ID (Best for testing)
await page.getByTestId('submit-button');
await page.getByTestId('user-profile');

// ===== CSS SELECTORS =====

// By ID
await page.locator('#username');
await page.locator('#submit-btn');

// By Class
await page.locator('.btn-primary');
await page.locator('.error-message');

// By Attribute
await page.locator('[data-test="login-btn"]');
await page.locator('[type="email"]');
await page.locator('[name="username"]');

// Combined selectors
await page.locator('input[type="email"]');
await page.locator('button.btn-primary');
await page.locator('div.container > button');

// Nth element
await page.locator('.item').nth(0); // First
await page.locator('.item').nth(2); // Third
await page.locator('.item').first();
await page.locator('.item').last();

// ===== XPATH SELECTORS =====

await page.locator('//button[@id="submit"]');
await page.locator('//input[@type="email"]');
await page.locator('//div[contains(@class, "error")]');
await page.locator('//button[text()="Submit"]');

// ===== CHAINING & FILTERING =====

// Filter by text
await page.locator('.item').filter({ hasText: 'Active' });

// Filter by another locator
await page.locator('.card').filter({ has: page.locator('.badge') });

// Get by (chaining)
await page.locator('.container').getByRole('button', { name: 'Submit' });

// ===== HANDLING MULTIPLE ELEMENTS =====

// Count elements
const count = await page.locator('.item').count();

// Loop through elements
const items = await page.locator('.item').all();
for (const item of items) {
  console.log(await item.textContent());
}

// Get all text contents
const texts = await page.locator('.item').allTextContents();
```

### Text Input Elements (Detailed)

```javascript
// ===== BASIC INPUT =====

// Fill (clears then types)
await page.fill('#username', 'testuser');
await page.getByLabel('Email').fill('test@example.com');

// Type (types character by character)
await page.type('#password', 'secret123');
await page.type('#search', 'playwright', { delay: 100 }); // Slow typing

// Clear input
await page.fill('#username', '');
await page.locator('#username').clear();

// ===== KEYBOARD INTERACTIONS =====

// Press single key
await page.press('#search', 'Enter');
await page.press('#input', 'Tab');
await page.press('#input', 'Escape');

// Keyboard shortcuts
await page.keyboard.press('Control+A'); // Select all
await page.keyboard.press('Control+C'); // Copy
await page.keyboard.press('Control+V'); // Paste
await page.keyboard.press('Meta+A'); // Mac Command+A

// Type with keyboard
await page.keyboard.type('Hello World');

// Press multiple keys
await page.keyboard.down('Shift');
await page.keyboard.press('A');
await page.keyboard.up('Shift');

// ===== SPECIAL SCENARIOS =====

// Upload file to input
await page.setInputFiles('#fileUpload', 'path/to/file.pdf');

// Multiple files
await page.setInputFiles('#multiUpload', [
  'file1.pdf',
  'file2.jpg'
]);

// Remove uploaded files
await page.setInputFiles('#fileUpload', []);

// Handle contenteditable
await page.locator('[contenteditable]').fill('Editable content');

// Handle input with validation
await page.fill('#email', 'invalid-email');
await page.blur('#email'); // Trigger validation
await expect(page.locator('.error')).toBeVisible();
```

### Button Interactions (Detailed)

```javascript
// ===== CLICK VARIATIONS =====

// Basic click
await page.click('#submitBtn');
await page.getByRole('button', { name: 'Submit' }).click();

// Click with options
await page.click('#btn', {
  button: 'left',    // 'left' | 'right' | 'middle'
  clickCount: 1,     // Number of clicks
  delay: 100,        // Delay between mousedown and mouseup
  force: false,      // Skip actionability checks
  modifiers: ['Control'], // Modifier keys
  position: { x: 10, y: 10 }, // Click position
  timeout: 30000     // Custom timeout
});

// Double click
await page.dblclick('#element');

// Right click (context menu)
await page.click('#element', { button: 'right' });

// Force click (bypass checks)
await page.click('#hiddenBtn', { force: true });

// Click with modifier keys
await page.click('#link', { modifiers: ['Control'] }); // Ctrl+Click
await page.click('#link', { modifiers: ['Meta'] });    // Cmd+Click (Mac)

// ===== CLICK SCENARIOS =====

// Click and wait for navigation
await Promise.all([
  page.waitForNavigation(),
  page.click('#submitBtn')
]);

// Click and wait for response
await Promise.all([
  page.waitForResponse('**/api/submit'),
  page.click('#submitBtn')
]);

// Click if visible
if (await page.locator('#closeBtn').isVisible()) {
  await page.click('#closeBtn');
}

// Click with retry
for (let i = 0; i < 3; i++) {
  try {
    await page.click('#dynamicBtn', { timeout: 5000 });
    break;
  } catch (e) {
    if (i === 2) throw e;
  }
}

// ===== HOVER & FOCUS =====

// Hover over element
await page.hover('#menuItem');
await page.locator('#dropdown').hover();

// Focus element
await page.focus('#input');

// Blur element
await page.blur('#input');
```

### Checkbox & Radio Buttons (Detailed)

```javascript
// ===== CHECKBOX OPERATIONS =====

// Check checkbox
await page.check('#agreeTerms');
await page.getByRole('checkbox', { name: 'Subscribe' }).check();

// Uncheck checkbox
await page.uncheck('#newsletter');

// Toggle checkbox
const isChecked = await page.isChecked('#terms');
if (isChecked) {
  await page.uncheck('#terms');
} else {
  await page.check('#terms');
}

// Check with force
await page.check('#hidden', { force: true });

// ===== RADIO BUTTONS =====

// Select radio button
await page.check('#genderMale');
await page.check('input[value="option1"]');

// Select by label
await page.getByLabel('Male').check();

// ===== VERIFICATION =====

// Check if checked
const isChecked = await page.isChecked('#terms');
expect(isChecked).toBeTruthy();

// Assert checked state
await expect(page.locator('#terms')).toBeChecked();
await expect(page.locator('#terms')).not.toBeChecked();

// ===== MULTIPLE CHECKBOXES =====

// Check all checkboxes
const checkboxes = await page.locator('input[type="checkbox"]').all();
for (const checkbox of checkboxes) {
  await checkbox.check();
}

// Check specific checkboxes
const options = ['option1', 'option3', 'option5'];
for (const option of options) {
  await page.check(`#${option}`);
}

// Get all checked values
const checkedValues = await page.locator('input[type="checkbox"]:checked').allTextContents();
```

### Dropdown/Select Elements (Detailed)

```javascript
// ===== SELECT BY VALUE =====

await page.selectOption('#country', 'US');
await page.selectOption('#country', { value: 'US' });

// ===== SELECT BY LABEL =====

await page.selectOption('#country', { label: 'United States' });
await page.selectOption('#country', { label: /United/ }); // Regex

// ===== SELECT BY INDEX =====

await page.selectOption('#country', { index: 2 });

// ===== MULTIPLE SELECTION =====

await page.selectOption('#skills', ['JavaScript', 'Python', 'Java']);
await page.selectOption('#skills', [
  { label: 'JavaScript' },
  { value: 'python' },
  { index: 3 }
]);

// ===== CUSTOM DROPDOWNS (Non-select) =====

// Click to open dropdown
await page.click('#customDropdown');

// Select option from list
await page.click('li:has-text("Option 1")');

// Search and select
await page.click('#searchableDropdown');
await page.fill('#dropdownSearch', 'United');
await page.click('li:has-text("United States")');

// ===== VERIFICATION =====

// Get selected value
const selectedValue = await page.locator('#country').inputValue();
expect(selectedValue).toBe('US');

// Get selected text
const selectedText = await page.locator('#country option:checked').textContent();

// Get all options
const options = await page.locator('#country option').allTextContents();

// Assert selected option
await expect(page.locator('#country')).toHaveValue('US');
```

### Calendar/Date Handling (Detailed)

```javascript
// ===== SIMPLE DATE INPUT =====

// Set date directly
await page.fill('#dateInput', '2024-12-25');
await page.fill('input[type="date"]', '2024-12-25');

// ===== DATE PICKER INTERACTIONS =====

// Open date picker
await page.click('#datePicker');

// Select specific date
await page.click('text=25');
await page.click('[data-date="2024-12-25"]');

// Navigate months
await page.click('[aria-label="Next month"]');
await page.click('[aria-label="Previous month"]');
await page.click('.next-month');

// Navigate years
await page.selectOption('.year-dropdown', '2024');

// ===== COMPLEX DATE PICKER =====

async function selectDate(page, targetDate) {
  await page.click('#datePicker');
  
  const [year, month, day] = targetDate.split('-');
  
  // Select year
  await page.selectOption('.year-select', year);
  
  // Select month
  await page.selectOption('.month-select', month);
  
  // Select day
  await page.click(`[data-day="${day}"]`);
}

await selectDate(page, '2024-12-25');

// ===== DATE RANGE PICKER =====

async function selectDateRange(page, startDate, endDate) {
  await page.click('#dateRangePicker');
  
  // Select start date
  await page.click(`[data-date="${startDate}"]`);
  
  // Select end date
  await page.click(`[data-date="${endDate}"]`);
  
  // Apply selection
  await page.click('button:has-text("Apply")');
}

await selectDateRange(page, '2024-12-01', '2024-12-31');

// ===== TIME PICKER =====

// Set time
await page.fill('#timeInput', '14:30');

// Select from time picker
await page.click('#timePicker');
await page.selectOption('.hour-select', '14');
await page.selectOption('.minute-select', '30');

// ===== DATETIME PICKER =====

await page.fill('#datetimeInput', '2024-12-25T14:30');

// ===== VERIFICATION =====

// Get selected date
const selectedDate = await page.inputValue('#dateInput');
expect(selectedDate).toBe('2024-12-25');

// Assert date value
await expect(page.locator('#dateInput')).toHaveValue('2024-12-25');
```

---

### File Upload & Download (Detailed)

```javascript
// ===== FILE UPLOAD =====

// Single file
await page.setInputFiles('#fileInput', 'path/to/file.pdf');

// Multiple files
await page.setInputFiles('#multipleFiles', [
  'file1.pdf',
  'file2.jpg',
  'file3.docx'
]);

// Upload from buffer
await page.setInputFiles('#fileInput', {
  name: 'test.txt',
  mimeType: 'text/plain',
  buffer: Buffer.from('File content')
});

// Remove files
await page.setInputFiles('#fileInput', []);

// Drag and drop file
const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
await page.dispatchEvent('#dropZone', 'drop', { dataTransfer });

// ===== FILE DOWNLOAD =====

// Wait for download
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.click('#downloadBtn')
]);

// Get download details
const fileName = download.suggestedFilename();
const filePath = await download.path();

// Save to specific location
await download.saveAs('/path/to/save/file.pdf');

// Get download stream
const stream = await download.createReadStream();

// ===== VERIFICATION =====

// Verify file uploaded
await expect(page.locator('.file-name')).toHaveText('file.pdf');

// Verify download started
expect(fileName).toBe('report.pdf');
```

### Window & Tab Handling (Detailed)

```javascript
// ===== NEW WINDOW/TAB =====

// Handle new page
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.click('#openNewTab')
]);

// Wait for new page to load
await newPage.waitForLoadState();

// Interact with new page
await newPage.fill('#input', 'value');

// Close new page
await newPage.close();

// ===== MULTIPLE WINDOWS =====

// Get all pages
const pages = context.pages();
console.log(`Total pages: ${pages.length}`);

// Switch between pages
await pages[0].bringToFront();
await pages[1].bringToFront();

// Close all except first
for (let i = 1; i < pages.length; i++) {
  await pages[i].close();
}

// ===== POPUP HANDLING =====

// Handle popup window
page.on('popup', async popup => {
  await popup.waitForLoadState();
  console.log(await popup.title());
  await popup.close();
});

await page.click('#openPopup');

// ===== IFRAME HANDLING =====

// Get frame by name
const frame = page.frame('frameName');
await frame.click('#elementInFrame');

// Get frame by URL
const frame2 = page.frame({ url: /iframe-url/ });

// Get frame by selector
const frameElement = page.frameLocator('#myFrame');
await frameElement.locator('#button').click();

// Nested frames
const childFrame = frame.childFrames()[0];

// ===== DIALOG HANDLING =====

// Accept alert
page.on('dialog', dialog => dialog.accept());
await page.click('#alertBtn');

// Dismiss confirm
page.on('dialog', dialog => dialog.dismiss());
await page.click('#confirmBtn');

// Handle prompt
page.on('dialog', dialog => dialog.accept('User input'));
await page.click('#promptBtn');

// Get dialog message
page.on('dialog', dialog => {
  console.log(dialog.message());
  dialog.accept();
});
```

---

## ⏳ Waits & Assertions (Detailed)

### Wait Methods (Comprehensive)

```javascript
// ===== ELEMENT WAITS =====

// Wait for selector
await page.waitForSelector('#element');
await page.waitForSelector('#element', { state: 'visible' });
await page.waitForSelector('#element', { state: 'hidden' });
await page.waitForSelector('#element', { state: 'attached' });
await page.waitForSelector('#element', { state: 'detached' });

// Wait with timeout
await page.waitForSelector('#element', { timeout: 10000 });

// Wait for multiple selectors
await Promise.all([
  page.waitForSelector('#element1'),
  page.waitForSelector('#element2'),
  page.waitForSelector('#element3')
]);

// ===== NAVIGATION WAITS =====

// Wait for navigation
await page.waitForNavigation();
await page.waitForNavigation({ waitUntil: 'load' });
await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
await page.waitForNavigation({ waitUntil: 'networkidle' });

// Wait for URL
await page.waitForURL('**/dashboard');
await page.waitForURL(/dashboard/);
await page.waitForURL(url => url.pathname === '/dashboard');

// ===== LOAD STATE WAITS =====

// Wait for load state
await page.waitForLoadState('load');
await page.waitForLoadState('domcontentloaded');
await page.waitForLoadState('networkidle');

// ===== FUNCTION WAITS =====

// Wait for function
await page.waitForFunction(() => document.title === 'Expected Title');
await page.waitForFunction(() => document.querySelectorAll('.item').length > 5);

// Wait with arguments
await page.waitForFunction(
  (minCount) => document.querySelectorAll('.item').length >= minCount,
  10
);

// ===== TIMEOUT WAITS =====

// Simple timeout
await page.waitForTimeout(3000); // Not recommended

// Better alternative - wait for specific condition
await page.waitForFunction(() => {
  const element = document.querySelector('#dynamic');
  return element && element.textContent.includes('Loaded');
});

// ===== REQUEST/RESPONSE WAITS =====

// Wait for request
const request = await page.waitForRequest('**/api/data');
console.log(request.url());

// Wait for response
const response = await page.waitForResponse('**/api/data');
console.log(await response.json());

// Wait for specific response
await page.waitForResponse(
  response => response.url().includes('/api/') && response.status() === 200
);

// ===== EVENT WAITS =====

// Wait for download
const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.click('#downloadBtn')
]);

// Wait for popup
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.click('#openPopup')
]);

// Wait for console message
const [message] = await Promise.all([
  page.waitForEvent('console'),
  page.click('#logBtn')
]);

// ===== CUSTOM WAITS =====

// Wait for element to be stable
async function waitForStable(locator, timeout = 5000) {
  const start = Date.now();
  let previousBox = await locator.boundingBox();
  
  while (Date.now() - start < timeout) {
    await page.waitForTimeout(100);
    const currentBox = await locator.boundingBox();
    
    if (JSON.stringify(previousBox) === JSON.stringify(currentBox)) {
      return;
    }
    previousBox = currentBox;
  }
}

// Wait for element count
async function waitForElementCount(selector, count, timeout = 5000) {
  await page.waitForFunction(
    ({ selector, count }) => document.querySelectorAll(selector).length === count,
    { selector, count },
    { timeout }
  );
}
```

### Assertions (Comprehensive)

```javascript
// ===== ELEMENT ASSERTIONS =====

// Visibility
await expect(page.locator('#element')).toBeVisible();
await expect(page.locator('#element')).toBeHidden();
await expect(page.locator('#element')).not.toBeVisible();

// Enabled/Disabled
await expect(page.locator('#button')).toBeEnabled();
await expect(page.locator('#button')).toBeDisabled();

// Checked state
await expect(page.locator('#checkbox')).toBeChecked();
await expect(page.locator('#checkbox')).not.toBeChecked();

// Editable
await expect(page.locator('#input')).toBeEditable();
await expect(page.locator('#input')).not.toBeEditable();

// Empty
await expect(page.locator('#input')).toBeEmpty();
await expect(page.locator('#input')).not.toBeEmpty();

// Focused
await expect(page.locator('#input')).toBeFocused();

// ===== TEXT ASSERTIONS =====

// Exact text
await expect(page.locator('#element')).toHaveText('Expected Text');

// Partial text
await expect(page.locator('#element')).toContainText('Partial');

// Regex text
await expect(page.locator('#element')).toHaveText(/pattern/i);

// Array of texts
await expect(page.locator('.item')).toHaveText(['Item 1', 'Item 2', 'Item 3']);

// ===== VALUE ASSERTIONS =====

// Input value
await expect(page.locator('#input')).toHaveValue('expected value');
await expect(page.locator('#input')).toHaveValue(/pattern/);

// ===== ATTRIBUTE ASSERTIONS =====

// Has attribute
await expect(page.locator('#element')).toHaveAttribute('data-test', 'value');
await expect(page.locator('#element')).toHaveAttribute('href', /pattern/);

// Has class
await expect(page.locator('#element')).toHaveClass('active');
await expect(page.locator('#element')).toHaveClass(/btn-/);

// Has ID
await expect(page.locator('#element')).toHaveId('myElement');

// ===== COUNT ASSERTIONS =====

// Element count
await expect(page.locator('.item')).toHaveCount(5);
await expect(page.locator('.item')).toHaveCount(0); // No elements

// ===== PAGE ASSERTIONS =====

// Page title
await expect(page).toHaveTitle('Expected Title');
await expect(page).toHaveTitle(/Title Pattern/);

// Page URL
await expect(page).toHaveURL('https://example.com/page');
await expect(page).toHaveURL(/\/page$/);

// ===== SCREENSHOT ASSERTIONS =====

// Visual comparison
await expect(page).toHaveScreenshot('homepage.png');
await expect(page.locator('#element')).toHaveScreenshot('element.png');

// With options
await expect(page).toHaveScreenshot('page.png', {
  maxDiffPixels: 100,
  threshold: 0.2
});

// ===== CUSTOM ASSERTIONS =====

// Custom matcher
expect.extend({
  async toHaveLoadedSuccessfully(page) {
    const isLoaded = await page.evaluate(() => document.readyState === 'complete');
    return {
      pass: isLoaded,
      message: () => 'Page did not load successfully'
    };
  }
});

await expect(page).toHaveLoadedSuccessfully();

// ===== SOFT ASSERTIONS =====

// Continue on failure
await expect.soft(page.locator('#element1')).toBeVisible();
await expect.soft(page.locator('#element2')).toBeVisible();
await expect.soft(page.locator('#element3')).toBeVisible();

// ===== POLLING ASSERTIONS =====

// Wait until condition is met
await expect(async () => {
  const count = await page.locator('.item').count();
  expect(count).toBeGreaterThan(5);
}).toPass();

// With custom timeout
await expect(async () => {
  const text = await page.locator('#status').textContent();
  expect(text).toBe('Complete');
}).toPass({ timeout: 10000 });
```

---

## 🔧 Advanced Playwright Features

### Fixtures & Hooks

```typescript
// ===== BASIC FIXTURES =====

import { test as base } from '@playwright/test';

// Extend base test with custom fixture
const test = base.extend({
  // Simple fixture
  userName: 'testuser',
  
  // Async fixture
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('#loginBtn');
    await use(page);
  }
});

// Use fixture in test
test('dashboard test', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/dashboard');
  // Test code
});

// ===== WORKER-SCOPED FIXTURES =====

const test = base.extend({
  // Runs once per worker
  apiToken: [async ({}, use) => {
    const token = await getAuthToken();
    await use(token);
  }, { scope: 'worker' }],
});

// ===== AUTO FIXTURES =====

const test = base.extend({
  // Automatically used in every test
  autoLogin: [async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#email', process.env.USER_EMAIL);
    await page.fill('#password', process.env.USER_PASSWORD);
    await page.click('#loginBtn');
    await use();
  }, { auto: true }],
});

// ===== HOOKS =====

// Before each test
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  console.log('Test started');
});

// After each test
test.afterEach(async ({ page }, testInfo) => {
  console.log(`Test ${testInfo.title} finished`);
  if (testInfo.status !== 'passed') {
    await page.screenshot({ path: `failure-${testInfo.title}.png` });
  }
});

// Before all tests in file
test.beforeAll(async () => {
  console.log('Starting test suite');
});

// After all tests in file
test.afterAll(async () => {
  console.log('Test suite completed');
});

// ===== DESCRIBE BLOCKS =====

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });
  
  test('valid login', async ({ page }) => {
    // Test code
  });
  
  test('invalid login', async ({ page }) => {
    // Test code
  });
});

// ===== CONDITIONAL HOOKS =====

test.beforeEach(async ({ page, browserName }) => {
  if (browserName === 'chromium') {
    // Chromium-specific setup
  }
});
```

### Page Object Model (Comprehensive)

```typescript
// ===== BASE PAGE =====

// BasePage.ts
export class BasePage {
  constructor(protected page: Page) {}
  
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }
  
  async getTitle(): Promise<string> {
    return await this.page.title();
  }
  
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
  
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}

// ===== LOGIN PAGE =====

// LoginPage.ts
export class LoginPage extends BasePage {
  // Locators
  private readonly emailInput = '#email';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#loginBtn';
  private readonly errorMessage = '.error-message';
  
  // Actions
  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
  
  async getErrorMessage(): Promise<string> {
    return await this.page.textContent(this.errorMessage);
  }
  
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.page.isEnabled(this.loginButton);
  }
}

// ===== DASHBOARD PAGE =====

// DashboardPage.ts
export class DashboardPage extends BasePage {
  private readonly welcomeMessage = '#welcome';
  private readonly logoutButton = '#logout';
  private readonly menuItems = '.menu-item';
  
  async getWelcomeMessage(): Promise<string> {
    return await this.page.textContent(this.welcomeMessage);
  }
  
  async logout(): Promise<void> {
    await this.page.click(this.logoutButton);
  }
  
  async getMenuItemsCount(): Promise<number> {
    return await this.page.locator(this.menuItems).count();
  }
  
  async clickMenuItem(itemName: string): Promise<void> {
    await this.page.click(`${this.menuItems}:has-text("${itemName}")`);
  }
}

// ===== PAGE OBJECT MANAGER =====

// PageObjectManager.ts
export class PageObjectManager {
  private loginPage: LoginPage;
  private dashboardPage: DashboardPage;
  
  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
  }
  
  getLoginPage(): LoginPage {
    return this.loginPage;
  }
  
  getDashboardPage(): DashboardPage {
    return this.dashboardPage;
  }
}

// ===== USAGE IN TESTS =====

test('login test with POM', async ({ page }) => {
  const pom = new PageObjectManager(page);
  const loginPage = pom.getLoginPage();
  const dashboardPage = pom.getDashboardPage();
  
  await loginPage.navigate('/login');
  await loginPage.login('test@example.com', 'password123');
  
  const welcomeMsg = await dashboardPage.getWelcomeMessage();
  expect(welcomeMsg).toContain('Welcome');
});

// ===== ADVANCED POM WITH COMPONENTS =====

// Component.ts
export class Component {
  constructor(protected page: Page, protected selector: string) {}
  
  async isVisible(): Promise<boolean> {
    return await this.page.locator(this.selector).isVisible();
  }
}

// HeaderComponent.ts
export class HeaderComponent extends Component {
  private readonly logo = `${this.selector} .logo`;
  private readonly searchBox = `${this.selector} #search`;
  private readonly userMenu = `${this.selector} .user-menu`;
  
  async search(query: string): Promise<void> {
    await this.page.fill(this.searchBox, query);
    await this.page.press(this.searchBox, 'Enter');
  }
  
  async openUserMenu(): Promise<void> {
    await this.page.click(this.userMenu);
  }
}

// Page with components
export class HomePage extends BasePage {
  private header: HeaderComponent;
  
  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page, 'header');
  }
  
  getHeader(): HeaderComponent {
    return this.header;
  }
}
```

---

## 🌐 API Testing with Playwright

### Basic API Testing

```typescript
import { test, expect } from '@playwright/test';

// ===== GET REQUEST =====

test('GET request', async ({ request }) => {
  const response = await request.get('https://api.example.com/users');
  
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  
  const data = await response.json();
  expect(data.users).toHaveLength(10);
});

// ===== POST REQUEST =====

test('POST request', async ({ request }) => {
  const response = await request.post('https://api.example.com/users', {
    data: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });
  
  expect(response.status()).toBe(201);
  
  const data = await response.json();
  expect(data.id).toBeDefined();
  expect(data.name).toBe('John Doe');
});

// ===== PUT REQUEST =====

test('PUT request', async ({ request }) => {
  const response = await request.put('https://api.example.com/users/1', {
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com'
    }
  });
  
  expect(response.status()).toBe(200);
});

// ===== DELETE REQUEST =====

test('DELETE request', async ({ request }) => {
  const response = await request.delete('https://api.example.com/users/1');
  expect(response.status()).toBe(204);
});

// ===== WITH HEADERS =====

test('Request with headers', async ({ request }) => {
  const response = await request.get('https://api.example.com/protected', {
    headers: {
      'Authorization': 'Bearer token123',
      'Content-Type': 'application/json'
    }
  });
  
  expect(response.status()).toBe(200);
});

// ===== WITH QUERY PARAMETERS =====

test('Request with query params', async ({ request }) => {
  const response = await request.get('https://api.example.com/users', {
    params: {
      page: 1,
      limit: 10,
      sort: 'name'
    }
  });
  
  expect(response.status()).toBe(200);
});

// ===== RESPONSE VALIDATION =====

test('Validate response', async ({ request }) => {
  const response = await request.get('https://api.example.com/user/1');
  
  // Status
  expect(response.status()).toBe(200);
  
  // Headers
  expect(response.headers()['content-type']).toContain('application/json');
  
  // Body
  const data = await response.json();
  expect(data).toMatchObject({
    id: 1,
    name: expect.any(String),
    email: expect.stringContaining('@')
  });
});

// ===== API CONTEXT =====

test.use({
  baseURL: 'https://api.example.com',
  extraHTTPHeaders: {
    'Authorization': 'Bearer token123'
  }
});

test('Using API context', async ({ request }) => {
  const response = await request.get('/users');
  expect(response.ok()).toBeTruthy();
});

// ===== COMBINING UI AND API =====

test('UI + API test', async ({ page, request }) => {
  // Create user via API
  const createResponse = await request.post('/users', {
    data: { name: 'Test User', email: 'test@example.com' }
  });
  const user = await createResponse.json();
  
  // Verify in UI
  await page.goto(`/users/${user.id}`);
  await expect(page.locator('h1')).toHaveText('Test User');
  
  // Cleanup via API
  await request.delete(`/users/${user.id}`);
});
```

### Advanced API Testing

```typescript
// ===== API HELPER CLASS =====

export class APIHelper {
  constructor(private request: APIRequestContext) {}
  
  async createUser(userData: any) {
    const response = await this.request.post('/users', { data: userData });
    return await response.json();
  }
  
  async getUser(userId: string) {
    const response = await this.request.get(`/users/${userId}`);
    return await response.json();
  }
  
  async updateUser(userId: string, userData: any) {
    const response = await this.request.put(`/users/${userId}`, { data: userData });
    return await response.json();
  }
  
  async deleteUser(userId: string) {
    await this.request.delete(`/users/${userId}`);
  }
}

// Usage
test('CRUD operations', async ({ request }) => {
  const api = new APIHelper(request);
  
  // Create
  const user = await api.createUser({ name: 'John', email: 'john@test.com' });
  expect(user.id).toBeDefined();
  
  // Read
  const fetchedUser = await api.getUser(user.id);
  expect(fetchedUser.name).toBe('John');
  
  // Update
  const updatedUser = await api.updateUser(user.id, { name: 'Jane' });
  expect(updatedUser.name).toBe('Jane');
  
  // Delete
  await api.deleteUser(user.id);
});

// ===== AUTHENTICATION =====

let authToken: string;

test.beforeAll(async ({ request }) => {
  const response = await request.post('/auth/login', {
    data: {
      email: 'test@example.com',
      password: 'password123'
    }
  });
  
  const data = await response.json();
  authToken = data.token;
});

test('Authenticated request', async ({ request }) => {
  const response = await request.get('/protected', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  
  expect(response.ok()).toBeTruthy();
});

// ===== SCHEMA VALIDATION =====

import Ajv from 'ajv';

const ajv = new Ajv();

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' }
  },
  required: ['id', 'name', 'email']
};

test('Validate response schema', async ({ request }) => {
  const response = await request.get('/users/1');
  const data = await response.json();
  
  const validate = ajv.compile(userSchema);
  const valid = validate(data);
  
  expect(valid).toBeTruthy();
});

// ===== MOCK API RESPONSES =====

test('Mock API response', async ({ page }) => {
  await page.route('**/api/users', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        users: [
          { id: 1, name: 'Mocked User' }
        ]
      })
    });
  });
  
  await page.goto('/users');
  await expect(page.locator('.user-name')).toHaveText('Mocked User');
});

// ===== INTERCEPT AND MODIFY =====

test('Intercept and modify request', async ({ page }) => {
  await page.route('**/api/users', async route => {
    const request = route.request();
    const postData = request.postDataJSON();
    
    // Modify request
    postData.modified = true;
    
    await route.continue({
      postData: JSON.stringify(postData)
    });
  });
  
  await page.goto('/create-user');
  await page.fill('#name', 'Test');
  await page.click('#submit');
});
```

---

*This is Part 1 of the comprehensive guide. Continue to next section...*

## 🥒 Cucumber + BDD Integration (Comprehensive)

### Installation & Setup

```bash
# Install Cucumber
npm install @cucumber/cucumber --save-dev

# Install Playwright
npm install @playwright/test --save-dev

# Project structure
mkdir -p Features/step_definitions
mkdir -p Features/support
```

### Gherkin Syntax

```gherkin
# ===== BASIC FEATURE =====

Feature: User Login
  As a user
  I want to login to the application
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see a welcome message

# ===== SCENARIO OUTLINE =====

Feature: Login Error Validation
  
  Scenario Outline: Display error for invalid credentials
    Given I am on the login page
    When I enter email "<email>"
    And I enter password "<password>"
    And I click the login button
    Then I should see error message "<error>"

    Examples:
      | email              | password    | error                          |
      | invalid@test.com   | wrongpass   | Incorrect email or password.   |
      | test@invalid.org   | 12345       | Incorrect email or password.   |
      | user@fake.net      | password    | Incorrect email or password.   |

# ===== BACKGROUND =====

Feature: E-commerce Shopping
  
  Background:
    Given I am on the e-commerce application
    And I am logged in as a customer

  Scenario: Add product to cart
    When I search for "iPhone"
    And I add the first product to cart
    Then the cart count should be 1

  Scenario: Remove product from cart
    When I navigate to the cart
    And I remove the first product
    Then the cart should be empty

# ===== TAGS =====

Feature: User Management
  
  @smoke @critical
  Scenario: Create new user
    Given I am on the admin panel
    When I create a new user
    Then the user should be created successfully

  @regression
  Scenario: Delete user
    Given I am on the admin panel
    When I delete an existing user
    Then the user should be removed

  @skip
  Scenario: Update user
    # This scenario is skipped
    Given I am on the admin panel

# ===== DATA TABLES =====

Feature: User Registration
  
  Scenario: Register with complete details
    Given I am on the registration page
    When I fill the form with following details:
      | Field      | Value              |
      | Name       | John Doe           |
      | Email      | john@example.com   |
      | Phone      | 1234567890         |
      | Address    | 123 Main St        |
    Then I should be registered successfully

# ===== DOC STRINGS =====

Feature: API Testing
  
  Scenario: Create user via API
    Given I have the API endpoint
    When I send a POST request with body:
      """
      {
        "name": "John Doe",
        "email": "john@example.com",
        "role": "admin"
      }
      """
    Then the response status should be 201
```

### Cucumber Configuration

```javascript
// cucumber.config.js
import { setWorldConstructor, Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import PageObjectManager from './pageObjects/PageObjectManager.js';

// ===== CUSTOM WORLD =====

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.pom = null;
    this.testData = {};
  }
  
  // Helper methods
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
  
  async saveTestData(key, value) {
    this.testData[key] = value;
  }
  
  getTestData(key) {
    return this.testData[key];
  }
}

setWorldConstructor(CustomWorld);

// ===== HOOKS =====

// Before all scenarios
BeforeAll(async function() {
  console.log('Starting test execution');
});

// Before each scenario
Before(async function({ pickle }) {
  console.log(`Starting scenario: ${pickle.name}`);
  
  // Browser selection based on environment
  const browserType = process.env.BROWSER || 'chromium';
  
  switch(browserType) {
    case 'firefox':
      this.browser = await firefox.launch({ headless: false });
      break;
    case 'webkit':
      this.browser = await webkit.launch({ headless: false });
      break;
    default:
      this.browser = await chromium.launch({ headless: false });
  }
  
  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: 'videos/' }
  });
  
  this.page = await this.context.newPage();
  this.pom = new PageObjectManager(this.page);
});

// Before scenario with specific tag
Before({ tags: '@requiresAuth' }, async function() {
  // Perform authentication
  await this.page.goto('/login');
  await this.page.fill('#email', process.env.USER_EMAIL);
  await this.page.fill('#password', process.env.USER_PASSWORD);
  await this.page.click('#loginBtn');
});

// After each scenario
After(async function({ pickle, result }) {
  console.log(`Scenario ${pickle.name} - Status: ${result.status}`);
  
  // Take screenshot on failure
  if (result.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  
  // Cleanup
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});

// After all scenarios
AfterAll(async function() {
  console.log('Test execution completed');
});
```

### Step Definitions (Comprehensive)

```javascript
// loginPage.step.js
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

// Set default timeout
setDefaultTimeout(60000);

// ===== NAVIGATION STEPS =====

Given('I am on the e-commerce application', async function() {
  await this.page.goto('https://rahulshettyacademy.com/client/');
});

Given('I navigate to the login page', async function() {
  await this.pom.getLoginPage().navigateTo('auth/login');
});

Given('I am on the {string} page', async function(pageName) {
  const urls = {
    'login': '/login',
    'dashboard': '/dashboard',
    'profile': '/profile'
  };
  await this.page.goto(urls[pageName]);
});

// ===== LOGIN STEPS =====

When('I login with valid credentials', async function() {
  await this.pom.getLoginPage().login(
    process.env.USER_EMAIL,
    process.env.USER_PASSWORD
  );
});

When('I enter email {string}', async function(email) {
  await this.page.getByRole('textbox', { name: 'email@example.com' }).fill(email);
});

When('I enter password {string}', async function(password) {
  await this.page.getByRole('textbox', { name: 'enter your passsword' }).fill(password);
});

When('I click the login button', async function() {
  await this.page.getByRole('button', { name: 'Login' }).click();
});

When('I login with credentials:', async function(dataTable) {
  const credentials = dataTable.rowsHash();
  await this.page.fill('#email', credentials.Email);
  await this.page.fill('#password', credentials.Password);
  await this.page.click('#loginBtn');
});

// ===== ASSERTION STEPS =====

Then('I should be redirected to the dashboard', async function() {
  await this.pom.getDashboardPage().checkDashboardUrl();
});

Then('I should see error message {string}', async function(errorMessage) {
  await expect(this.page.getByRole('alert', { name: errorMessage })).toBeVisible();
});

Then('I should see {string}', async function(text) {
  await expect(this.page.getByText(text)).toBeVisible();
});

Then('the page title should be {string}', async function(title) {
  await expect(this.page).toHaveTitle(title);
});

Then('the URL should contain {string}', async function(urlPart) {
  await expect(this.page).toHaveURL(new RegExp(urlPart));
});

// ===== SHOPPING STEPS =====

When('I add {string} to the cart', async function(productName) {
  await this.pom.getDashboardPage().addProductToCart(productName);
  this.saveTestData('productName', productName);
});

When('I navigate to the cart page', async function() {
  await this.pom.getDashboardPage().navigateToCart();
});

When('I proceed to checkout', async function() {
  await this.pom.getCartPage().proceedToCheckout();
});

When('I complete the payment with default details', async function() {
  await this.pom.getPaymentPage().completePayment();
});

Then('I should receive a valid order confirmation', async function() {
  const orderId = await this.pom.getOrderPage().getOrderId();
  expect(orderId).toBeTruthy();
  this.saveTestData('orderId', orderId);
});

Then('the order ID should be generated successfully', async function() {
  const orderId = this.getTestData('orderId');
  expect(orderId).toMatch(/^[A-Z0-9]+$/);
});

// ===== PARAMETERIZED STEPS =====

When('I wait for {int} seconds', async function(seconds) {
  await this.page.waitForTimeout(seconds * 1000);
});

When('I click on element with selector {string}', async function(selector) {
  await this.page.click(selector);
});

Then('element {string} should be visible', async function(selector) {
  await expect(this.page.locator(selector)).toBeVisible();
});

Then('element {string} should have text {string}', async function(selector, text) {
  await expect(this.page.locator(selector)).toHaveText(text);
});
```

### Running Cucumber Tests

```bash
# ===== BASIC EXECUTION =====

# Run all features
npm run test:cucumber

# Run specific feature
npx cucumber-js Features/login.feature

# Run specific scenario by line number
npx cucumber-js Features/login.feature:10

# ===== TAG-BASED EXECUTION =====

# Run tests with specific tag
npx cucumber-js --tags '@smoke'
npx cucumber-js --tags '@regression'

# Run tests with multiple tags (AND)
npx cucumber-js --tags '@smoke and @critical'

# Run tests with multiple tags (OR)
npx cucumber-js --tags '@smoke or @regression'

# Exclude tests with tag
npx cucumber-js --tags 'not @skip'

# Complex tag expressions
npx cucumber-js --tags '(@smoke or @regression) and not @skip'

# ===== PARALLEL EXECUTION =====

# Run in parallel (2 workers)
npx cucumber-js --parallel 2

# Run in parallel (4 workers)
npx cucumber-js --parallel 4

# Parallel with tags
npx cucumber-js --parallel 2 --tags '@regression'

# ===== RETRY ON FAILURE =====

# Retry failed scenarios once
npx cucumber-js --retry 1

# Retry failed scenarios twice
npx cucumber-js --retry 2

# Retry with parallel
npx cucumber-js --parallel 2 --retry 1

# ===== REPORTING =====

# JSON report
npx cucumber-js --format json:cucumber-report.json

# HTML report
npx cucumber-js --format html:cucumber-report.html

# Multiple formats
npx cucumber-js --format json:report.json --format html:report.html

# Progress format
npx cucumber-js --format progress

# ===== COMBINED OPTIONS =====

# Full command with all options
npx cucumber-js Features/**/*.feature \
  --require cucumber.config.js \
  --require Features/step_definitions/**/*.js \
  --tags '@regression' \
  --parallel 2 \
  --retry 1 \
  --format json:reports/cucumber-report.json

# ===== ENVIRONMENT VARIABLES =====

# Run with specific browser
BROWSER=firefox npx cucumber-js

# Run with environment
ENV=qa npx cucumber-js

# Multiple environment variables
BROWSER=chromium ENV=qa npx cucumber-js --tags '@smoke'
```

### Package.json Scripts

```json
{
  "scripts": {
    "test:cucumber": "npx cucumber-js Features/**/*.feature --require cucumber.config.js --require Features/step_definitions/**/*.js",
    "test:cucumber:tags": "npx cucumber-js Features/**/*.feature --require cucumber.config.js --require Features/step_definitions/**/*.js --tags",
    "test:cucumber:parallel": "npx cucumber-js Features/**/*.feature --require cucumber.config.js --require Features/step_definitions/**/*.js --parallel 2",
    "test:cucumber:smoke": "npx cucumber-js Features/**/*.feature --require cucumber.config.js --require Features/step_definitions/**/*.js --tags '@smoke'",
    "test:cucumber:regression": "npx cucumber-js Features/**/*.feature --require cucumber.config.js --require Features/step_definitions/**/*.js --tags '@regression' --parallel 2",
    "test:cucumber:report": "npx cucumber-js Features/**/*.feature --require cucumber.config.js --require Features/step_definitions/**/*.js --format json:reports/cucumber-report.json"
  }
}
```

---

## 📊 Allure Reporting (Comprehensive)

### Installation & Setup

```bash
# Install Allure Playwright reporter
npm install allure-playwright --save-dev

# Install Allure command line (optional)
npm install -g allure-commandline
```

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  workers: process.env.CI ? 2 : undefined,
  
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      categories: [
        {
          name: 'Critical Tests',
          matchedStatuses: ['failed'],
          messageRegex: '.*critical.*'
        }
      ],
      environmentInfo: {
        'Environment': process.env.ENV || 'QA',
        'Browser': 'Chromium',
        'Node Version': process.version
      }
    }]
  ],
  
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  }
});
```

### Allure Annotations in Tests

```typescript
import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

// ===== BASIC ANNOTATIONS =====

test('Login test with Allure', async ({ page }) => {
  await allure.epic('Authentication');
  await allure.feature('Login');
  await allure.story('Valid Login');
  await allure.owner('QA Team');
  await allure.severity('critical');
  await allure.tag('smoke');
  await allure.tag('regression');
  
  await allure.step('Navigate to login page', async () => {
    await page.goto('/login');
  });
  
  await allure.step('Enter credentials', async () => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
  });
  
  await allure.step('Click login button', async () => {
    await page.click('#loginBtn');
  });
  
  await allure.step('Verify dashboard', async () => {
    await expect(page).toHaveURL(/dashboard/);
  });
});

// ===== NESTED STEPS =====

test('E2E Shopping', async ({ page }) => {
  await allure.epic('E-commerce');
  await allure.feature('Shopping');
  
  await allure.step('Login', async () => {
    await allure.step('Navigate to login', async () => {
      await page.goto('/login');
    });
    
    await allure.step('Submit credentials', async () => {
      await page.fill('#email', 'test@example.com');
      await page.fill('#password', 'password123');
      await page.click('#loginBtn');
    });
  });
  
  await allure.step('Add product to cart', async () => {
    await page.click('.product:first-child .add-to-cart');
  });
  
  await allure.step('Checkout', async () => {
    await page.click('#cartIcon');
    await page.click('#checkoutBtn');
  });
});

// ===== ATTACHMENTS =====

test('Test with attachments', async ({ page }) => {
  await page.goto('/');
  
  // Attach screenshot
  const screenshot = await page.screenshot();
  await allure.attachment('Homepage Screenshot', screenshot, 'image/png');
  
  // Attach text
  await allure.attachment('Test Data', JSON.stringify({
    user: 'testuser',
    timestamp: new Date().toISOString()
  }), 'application/json');
  
  // Attach HTML
  const html = await page.content();
  await allure.attachment('Page HTML', html, 'text/html');
});

// ===== PARAMETERS =====

test('Parameterized test', async ({ page }) => {
  const testData = {
    email: 'test@example.com',
    password: 'password123',
    environment: 'QA'
  };
  
  await allure.parameter('Email', testData.email);
  await allure.parameter('Password', '***');
  await allure.parameter('Environment', testData.environment);
  
  // Test code
});

// ===== LINKS =====

test('Test with links', async ({ page }) => {
  await allure.link('https://jira.example.com/TEST-123', 'JIRA Ticket');
  await allure.issue('TEST-123', 'https://jira.example.com/TEST-123');
  await allure.tms('TMS-456', 'https://tms.example.com/TMS-456');
  
  // Test code
});

// ===== DESCRIPTION =====

test('Test with description', async ({ page }) => {
  await allure.description('This test verifies the login functionality with valid credentials');
  await allure.descriptionHtml(`
    <h3>Test Description</h3>
    <p>This test performs the following:</p>
    <ul>
      <li>Navigate to login page</li>
      <li>Enter valid credentials</li>
      <li>Verify successful login</li>
    </ul>
  `);
  
  // Test code
});
```

### Generate & View Reports

```bash
# ===== RUN TESTS =====

# Run tests with Allure reporter
npx playwright test

# Run specific tests
npx playwright test login.spec.ts

# ===== GENERATE REPORT =====

# Generate Allure report
npx allure generate allure-results --clean -o allure-report

# Generate and open
npx allure generate allure-results --clean -o allure-report && npx allure open allure-report

# ===== SERVE REPORT =====

# Open existing report
npx allure open allure-report

# Serve on specific port
npx allure open allure-report -p 8080

# ===== CLEAN RESULTS =====

# Clean previous results
rm -rf allure-results allure-report

# Clean and run
rm -rf allure-results && npx playwright test
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:allure": "npx playwright test --reporter=allure-playwright",
    "allure:generate": "npx allure generate allure-results --clean -o allure-report",
    "allure:open": "npx allure open allure-report",
    "allure:report": "npm run allure:generate && npm run allure:open",
    "test:report": "npm run test:allure && npm run allure:report",
    "clean:allure": "rm -rf allure-results allure-report"
  }
}
```

### Allure Categories

```json
// allure-results/categories.json
[
  {
    "name": "Product Defects",
    "matchedStatuses": ["failed"],
    "messageRegex": ".*AssertionError.*"
  },
  {
    "name": "Test Defects",
    "matchedStatuses": ["broken"],
    "messageRegex": ".*Error.*"
  },
  {
    "name": "Ignored Tests",
    "matchedStatuses": ["skipped"]
  },
  {
    "name": "Infrastructure Problems",
    "matchedStatuses": ["broken", "failed"],
    "messageRegex": ".*timeout.*"
  }
]
```

---

*Continue to Part 3 for CI/CD, Docker, AI Integration, and Interview Prep...*

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:  # Manual trigger

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
        shard: [1, 2, 3, 4]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps ${{ matrix.browser }}
      
      - name: Run Playwright tests
        run: npx playwright test --project=${{ matrix.browser }} --shard=${{ matrix.shard }}/4
        env:
          USER_EMAIL: ${{ secrets.USER_EMAIL }}
          USER_PASSWORD: ${{ secrets.USER_PASSWORD }}
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report-${{ matrix.browser }}-${{ matrix.shard }}
          path: playwright-report/
          retention-days: 30
      
      - name: Upload Allure results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: allure-results-${{ matrix.browser }}-${{ matrix.shard }}
          path: allure-results/
          retention-days: 30
  
  report:
    needs: test
    if: always()
    runs-on: ubuntu-latest
    
    steps:
      - name: Download Allure results
        uses: actions/download-artifact@v3
        with:
          path: allure-results
      
      - name: Generate Allure Report
        uses: simple-elf/allure-report-action@master
        with:
          allure_results: allure-results
          allure_history: allure-history
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: allure-history
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
  - test
  - report
  - deploy

variables:
  PLAYWRIGHT_BROWSERS_PATH: $CI_PROJECT_DIR/.cache/ms-playwright

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .cache/ms-playwright/

# ===== TEST JOBS =====

.test_template:
  stage: test
  image: mcr.microsoft.com/playwright:v1.40.0-focal
  before_script:
    - npm ci
    - npx playwright install
  artifacts:
    when: always
    paths:
      - playwright-report/
      - allure-results/
      - test-results/
    expire_in: 1 week
  retry:
    max: 2
    when:
      - runner_system_failure
      - stuck_or_timeout_failure

test:chromium:
  extends: .test_template
  script:
    - npx playwright test --project=chromium
  parallel: 4

test:firefox:
  extends: .test_template
  script:
    - npx playwright test --project=firefox
  parallel: 2

test:webkit:
  extends: .test_template
  script:
    - npx playwright test --project=webkit
  parallel: 2

# ===== SMOKE TESTS =====

test:smoke:
  extends: .test_template
  script:
    - npx playwright test --grep @smoke
  only:
    - merge_requests
    - main

# ===== CUCUMBER TESTS =====

test:cucumber:
  extends: .test_template
  script:
    - npm run test:cucumber:regression
  parallel: 2

# ===== REPORT GENERATION =====

generate_report:
  stage: report
  image: node:18
  dependencies:
    - test:chromium
    - test:firefox
    - test:webkit
  script:
    - npm install -g allure-commandline
    - allure generate allure-results --clean -o allure-report
  artifacts:
    paths:
      - allure-report/
    expire_in: 1 month

# ===== DEPLOY REPORT =====

pages:
  stage: deploy
  dependencies:
    - generate_report
  script:
    - mkdir public
    - cp -r allure-report/* public/
  artifacts:
    paths:
      - public
  only:
    - main
```

### Jenkins Pipeline

```groovy
// Jenkinsfile
pipeline {
    agent any
    
    parameters {
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit', 'all'], description: 'Browser to run tests')
        choice(name: 'ENV', choices: ['dev', 'qa', 'staging', 'prod'], description: 'Environment')
        string(name: 'TAGS', defaultValue: '@regression', description: 'Cucumber tags')
    }
    
    environment {
        NODE_VERSION = '18'
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.cache/ms-playwright"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npm ci
                    npx playwright install --with-deps
                '''
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Playwright Tests') {
                    when {
                        expression { params.BROWSER != 'none' }
                    }
                    steps {
                        script {
                            if (params.BROWSER == 'all') {
                                sh 'npx playwright test'
                            } else {
                                sh "npx playwright test --project=${params.BROWSER}"
                            }
                        }
                    }
                }
                
                stage('Cucumber Tests') {
                    steps {
                        sh "npm run test:cucumber:tags '${params.TAGS}'"
                    }
                }
            }
        }
        
        stage('Generate Report') {
            steps {
                sh '''
                    npm install -g allure-commandline
                    allure generate allure-results --clean -o allure-report
                '''
            }
        }
    }
    
    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
            
            junit 'test-results/**/*.xml'
        }
        
        failure {
            emailext(
                subject: "Test Failure: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Tests failed. Check console output at ${env.BUILD_URL}",
                to: 'qa-team@example.com'
            )
        }
    }
}
```

---

## 🐳 Docker Integration

### Dockerfile

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Set environment variables
ENV NODE_ENV=production
ENV HEADLESS=true

# Run tests
CMD ["npx", "playwright", "test"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  playwright-tests:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      - USER_EMAIL=${USER_EMAIL}
      - USER_PASSWORD=${USER_PASSWORD}
      - ENV=${ENV:-qa}
      - BROWSER=${BROWSER:-chromium}
    volumes:
      - ./test-results:/app/test-results
      - ./playwright-report:/app/playwright-report
      - ./allure-results:/app/allure-results
    command: npx playwright test --project=${BROWSER:-chromium}
  
  cucumber-tests:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      - USER_EMAIL=${USER_EMAIL}
      - USER_PASSWORD=${USER_PASSWORD}
    volumes:
      - ./test-results:/app/test-results
      - ./cucumber-report:/app/cucumber-report
    command: npm run test:cucumber:regression
  
  allure-report:
    image: frankescobar/allure-docker-service
    ports:
      - "5050:5050"
    volumes:
      - ./allure-results:/app/allure-results
      - ./allure-reports:/app/allure-reports
```

### Docker Commands

```bash
# ===== BUILD IMAGE =====

# Build Docker image
docker build -t playwright-tests .

# Build with specific tag
docker build -t playwright-tests:v1.0 .

# ===== RUN CONTAINER =====

# Run tests in container
docker run --rm playwright-tests

# Run with environment variables
docker run --rm \
  -e USER_EMAIL=test@example.com \
  -e USER_PASSWORD=password123 \
  playwright-tests

# Run with volume mount
docker run --rm \
  -v $(pwd)/test-results:/app/test-results \
  playwright-tests

# Run specific browser
docker run --rm \
  -e BROWSER=firefox \
  playwright-tests npx playwright test --project=firefox

# ===== DOCKER COMPOSE =====

# Run all services
docker-compose up

# Run specific service
docker-compose up playwright-tests

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up
docker-compose down -v

# ===== DEBUGGING =====

# Run interactive shell
docker run -it --rm playwright-tests /bin/bash

# Run with headed mode
docker run --rm \
  -e HEADLESS=false \
  -e DISPLAY=$DISPLAY \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  playwright-tests
```

---

## 🤖 AI in Test Automation

### OpenAI Integration

```typescript
// aiHelper.ts
import OpenAI from 'openai';

export class AITestHelper {
  private client: OpenAI;
  
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  
  // ===== GENERATE TEST CASES =====
  
  async generateTestCase(requirement: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a QA automation expert. Generate Playwright test cases.'
        },
        {
          role: 'user',
          content: `Generate a Playwright test for: ${requirement}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });
    
    return response.choices[0].message.content;
  }
  
  // ===== GENERATE LOCATORS =====
  
  async suggestLocator(elementDescription: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a Playwright expert. Suggest the best locator strategy.'
        },
        {
          role: 'user',
          content: `Suggest a Playwright locator for: ${elementDescription}`
        }
      ]
    });
    
    return response.choices[0].message.content;
  }
  
  // ===== ANALYZE TEST FAILURES =====
  
  async analyzeFailure(errorMessage: string, screenshot: Buffer): Promise<string> {
    const base64Image = screenshot.toString('base64');
    
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this test failure: ${errorMessage}`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });
    
    return response.choices[0].message.content;
  }
  
  // ===== GENERATE TEST DATA =====
  
  async generateTestData(schema: string): Promise<any> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Generate realistic test data in JSON format.'
        },
        {
          role: 'user',
          content: `Generate test data for schema: ${schema}`
        }
      ]
    });
    
    return JSON.parse(response.choices[0].message.content);
  }
  
  // ===== SMART ASSERTIONS =====
  
  async suggestAssertions(testContext: string): Promise<string[]> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Suggest comprehensive assertions for test scenarios.'
        },
        {
          role: 'user',
          content: `Suggest assertions for: ${testContext}`
        }
      ]
    });
    
    const content = response.choices[0].message.content;
    return content.split('\n').filter(line => line.trim());
  }
}

// ===== USAGE IN TESTS =====

import { test } from '@playwright/test';
import { AITestHelper } from './aiHelper';

test('AI-powered test generation', async ({ page }) => {
  const ai = new AITestHelper();
  
  // Generate test case
  const testCode = await ai.generateTestCase('Login with valid credentials');
  console.log('Generated test:', testCode);
  
  // Suggest locator
  const locator = await ai.suggestLocator('Submit button on login form');
  console.log('Suggested locator:', locator);
  
  // Generate test data
  const testData = await ai.generateTestData(`{
    "user": {
      "name": "string",
      "email": "string",
      "age": "number"
    }
  }`);
  console.log('Generated data:', testData);
});

test('AI failure analysis', async ({ page }) => {
  const ai = new AITestHelper();
  
  try {
    await page.goto('/login');
    await page.click('#nonExistentButton');
  } catch (error) {
    const screenshot = await page.screenshot();
    const analysis = await ai.analyzeFailure(error.message, screenshot);
    console.log('AI Analysis:', analysis);
  }
});
```

### AI-Powered Visual Testing

```typescript
// visualAI.ts
import OpenAI from 'openai';

export class VisualAITester {
  private client: OpenAI;
  
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  
  async compareScreenshots(
    baseline: Buffer,
    current: Buffer
  ): Promise<{ match: boolean; differences: string }> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Compare these two screenshots and identify visual differences.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${baseline.toString('base64')}`
              }
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${current.toString('base64')}`
              }
            }
          ]
        }
      ]
    });
    
    const analysis = response.choices[0].message.content;
    const match = !analysis.toLowerCase().includes('difference');
    
    return { match, differences: analysis };
  }
  
  async detectUIIssues(screenshot: Buffer): Promise<string[]> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this UI screenshot for accessibility, layout, and design issues.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${screenshot.toString('base64')}`
              }
            }
          ]
        }
      ]
    });
    
    return response.choices[0].message.content.split('\n').filter(line => line.trim());
  }
}
```

---

## 🎯 Best Practices for Scalable Frameworks

### Framework Architecture

```
automation-framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── src/
│   ├── tests/
│   │   ├── ui/
│   │   │   ├── login.spec.ts
│   │   │   ├── dashboard.spec.ts
│   │   │   └── checkout.spec.ts
│   │   ├── api/
│   │   │   ├── users.spec.ts
│   │   │   └── products.spec.ts
│   │   └── e2e/
│   │       └── shopping.spec.ts
│   │
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   └── PageObjectManager.ts
│   │
│   ├── components/
│   │   ├── HeaderComponent.ts
│   │   ├── FooterComponent.ts
│   │   └── SidebarComponent.ts
│   │
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── dataGenerator.ts
│   │   ├── apiHelper.ts
│   │   └── dateHelper.ts
│   │
│   ├── config/
│   │   ├── environments/
│   │   │   ├── dev.json
│   │   │   ├── qa.json
│   │   │   └── prod.json
│   │   └── testData/
│   │       ├── users.json
│   │       └── products.json
│   │
│   ├── fixtures/
│   │   ├── authFixture.ts
│   │   └── dataFixture.ts
│   │
│   └── helpers/
│       ├── aiHelper.ts
│       └── visualAI.ts
│
├── Features/
│   ├── step_definitions/
│   │   ├── loginPage.step.js
│   │   └── dashboard.step.js
│   ├── support/
│   │   └── hooks.js
│   └── *.feature
│
├── reports/
│   ├── playwright-report/
│   ├── allure-results/
│   └── cucumber-report/
│
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── playwright.config.ts
├── cucumber.config.js
├── tsconfig.json
└── package.json
```

### Design Patterns

```typescript
// ===== SINGLETON PATTERN =====

class ConfigManager {
  private static instance: ConfigManager;
  private config: any;
  
  private constructor() {
    this.loadConfig();
  }
  
  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
  
  private loadConfig() {
    const env = process.env.ENV || 'qa';
    this.config = require(`./config/environments/${env}.json`);
  }
  
  get(key: string): any {
    return this.config[key];
  }
}

// ===== FACTORY PATTERN =====

class PageFactory {
  static createPage(pageName: string, page: Page): BasePage {
    switch(pageName) {
      case 'login':
        return new LoginPage(page);
      case 'dashboard':
        return new DashboardPage(page);
      case 'profile':
        return new ProfilePage(page);
      default:
        throw new Error(`Unknown page: ${pageName}`);
    }
  }
}

// ===== BUILDER PATTERN =====

class UserBuilder {
  private user: any = {};
  
  setName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }
  
  setEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }
  
  setAge(age: number): UserBuilder {
    this.user.age = age;
    return this;
  }
  
  build(): any {
    return this.user;
  }
}

// Usage
const user = new UserBuilder()
  .setName('John Doe')
  .setEmail('john@example.com')
  .setAge(30)
  .build();

// ===== STRATEGY PATTERN =====

interface BrowserStrategy {
  launch(): Promise<Browser>;
}

class ChromiumStrategy implements BrowserStrategy {
  async launch(): Promise<Browser> {
    return await chromium.launch({ headless: true });
  }
}

class FirefoxStrategy implements BrowserStrategy {
  async launch(): Promise<Browser> {
    return await firefox.launch({ headless: true });
  }
}

class BrowserContext {
  constructor(private strategy: BrowserStrategy) {}
  
  async getBrowser(): Promise<Browser> {
    return await this.strategy.launch();
  }
}
```

### Code Quality

```typescript
// ===== LOGGING =====

import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Usage
logger.info('Test started');
logger.error('Test failed', { error: error.message });

// ===== ERROR HANDLING =====

class TestError extends Error {
  constructor(message: string, public readonly screenshot?: Buffer) {
    super(message);
    this.name = 'TestError';
  }
}

async function safeClick(page: Page, selector: string) {
  try {
    await page.click(selector, { timeout: 5000 });
  } catch (error) {
    const screenshot = await page.screenshot();
    logger.error(`Failed to click ${selector}`, { error });
    throw new TestError(`Failed to click ${selector}`, screenshot);
  }
}

// ===== RETRY MECHANISM =====

async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}

// Usage
await retryOperation(async () => {
  await page.click('#dynamicButton');
}, 3, 2000);
```

---

*Continue to final section for Interview Preparation and Appendix...*

## 📚 Interview Preparation

### Common Technical Questions

#### 1. What is Playwright and why use it?

**Answer:**
Playwright is a modern end-to-end testing framework developed by Microsoft. Key advantages:
- **Cross-browser support**: Chromium, Firefox, WebKit
- **Auto-wait mechanism**: Automatically waits for elements to be ready
- **Parallel execution**: Built-in support for running tests in parallel
- **API testing**: Can test both UI and APIs
- **Network interception**: Mock and modify network requests
- **Multiple contexts**: Test different scenarios simultaneously
- **TypeScript support**: First-class TypeScript support

#### 2. Playwright vs Selenium - Key Differences

| Feature | Playwright | Selenium |
|---------|-----------|----------|
| **Architecture** | Direct browser protocol | WebDriver protocol |
| **Speed** | Faster | Slower |
| **Auto-wait** | Built-in | Manual waits needed |
| **Browser support** | Chromium, Firefox, WebKit | All major browsers |
| **API testing** | Native support | Requires additional tools |
| **Mobile testing** | Device emulation | Requires Appium |
| **Parallel execution** | Built-in | Requires Grid setup |
| **Network interception** | Native | Complex setup |

#### 3. Explain Playwright's Auto-wait Mechanism

**Answer:**
Playwright automatically waits for elements to be actionable before performing actions:
- **Attached**: Element is attached to DOM
- **Visible**: Element is visible
- **Stable**: Element is not animating
- **Receives events**: Element can receive pointer events
- **Enabled**: Element is not disabled

```typescript
// No explicit waits needed
await page.click('#button'); // Waits automatically

// Custom timeout if needed
await page.click('#button', { timeout: 10000 });
```

#### 4. How do you handle flaky tests?

**Answer:**
```typescript
// 1. Use proper waits
await page.waitForLoadState('networkidle');

// 2. Wait for specific conditions
await page.waitForFunction(() => document.readyState === 'complete');

// 3. Use retry mechanism
test.describe.configure({ retries: 2 });

// 4. Implement custom waits
async function waitForStable(locator) {
  let previousBox = await locator.boundingBox();
  await page.waitForTimeout(100);
  let currentBox = await locator.boundingBox();
  
  while (JSON.stringify(previousBox) !== JSON.stringify(currentBox)) {
    previousBox = currentBox;
    await page.waitForTimeout(100);
    currentBox = await locator.boundingBox();
  }
}

// 5. Use soft assertions
await expect.soft(page.locator('#element')).toBeVisible();
```

#### 5. Explain Page Object Model

**Answer:**
POM is a design pattern that creates an object repository for web elements:

```typescript
// BasePage.ts
export class BasePage {
  constructor(protected page: Page) {}
  
  async navigate(url: string) {
    await this.page.goto(url);
  }
}

// LoginPage.ts
export class LoginPage extends BasePage {
  private emailInput = '#email';
  private passwordInput = '#password';
  private loginButton = '#loginBtn';
  
  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}

// Usage
const loginPage = new LoginPage(page);
await loginPage.login('test@example.com', 'password');
```

**Benefits:**
- Code reusability
- Easy maintenance
- Separation of concerns
- Improved readability

#### 6. How do you handle dynamic elements?

**Answer:**
```typescript
// 1. Wait for element to appear
await page.waitForSelector('#dynamicElement');

// 2. Wait for specific state
await page.waitForSelector('#element', { state: 'visible' });

// 3. Wait for function
await page.waitForFunction(() => {
  const element = document.querySelector('#dynamic');
  return element && element.textContent.includes('Loaded');
});

// 4. Use retry logic
await retryOperation(async () => {
  await page.click('#dynamicButton');
}, 3);

// 5. Wait for network idle
await page.waitForLoadState('networkidle');
```

#### 7. Explain test fixtures in Playwright

**Answer:**
Fixtures are used to establish test environment and provide reusable setup:

```typescript
import { test as base } from '@playwright/test';

const test = base.extend({
  // Simple fixture
  userName: 'testuser',
  
  // Async fixture
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password');
    await page.click('#loginBtn');
    await use(page);
  },
  
  // Worker-scoped fixture
  apiToken: [async ({}, use) => {
    const token = await getAuthToken();
    await use(token);
  }, { scope: 'worker' }]
});

// Usage
test('dashboard test', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/dashboard');
});
```

#### 8. How do you implement parallel execution?

**Answer:**
```typescript
// playwright.config.ts
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});

// Run tests in parallel
npx playwright test --workers=4

// Shard tests across machines
npx playwright test --shard=1/4
npx playwright test --shard=2/4
```

#### 9. How do you handle authentication?

**Answer:**
```typescript
// 1. Using storage state
test.use({
  storageState: 'auth.json'
});

// Setup authentication
const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('/login');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'password');
  await page.click('#loginBtn');
  
  await context.storageState({ path: 'auth.json' });
  await browser.close();
})();

// 2. Using fixtures
const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Login logic
    await use(page);
  }
});

// 3. Using API
test.beforeEach(async ({ page, request }) => {
  const response = await request.post('/api/login', {
    data: { email: 'test@example.com', password: 'password' }
  });
  const { token } = await response.json();
  
  await page.goto('/', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
});
```

#### 10. Explain network interception

**Answer:**
```typescript
// Mock API response
await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ users: [{ id: 1, name: 'Mock User' }] })
  });
});

// Intercept and modify request
await page.route('**/api/users', async route => {
  const request = route.request();
  const postData = request.postDataJSON();
  postData.modified = true;
  
  await route.continue({
    postData: JSON.stringify(postData)
  });
});

// Block resources
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());

// Wait for specific response
const response = await page.waitForResponse('**/api/users');
const data = await response.json();
```

### Coding Challenges

#### Challenge 1: Login Test with POM

```typescript
// Task: Implement login test using Page Object Model

// Solution:
// LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}
  
  private emailInput = '#email';
  private passwordInput = '#password';
  private loginButton = '#loginBtn';
  private errorMessage = '.error';
  
  async navigate() {
    await this.page.goto('/login');
  }
  
  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
  
  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}

// login.spec.ts
test('valid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('test@example.com', 'password123');
  await expect(page).toHaveURL(/dashboard/);
});

test('invalid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('invalid@test.com', 'wrong');
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Invalid credentials');
});
```

#### Challenge 2: E2E Shopping Flow

```typescript
// Task: Implement complete shopping flow

test('complete purchase', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'password');
  await page.click('#loginBtn');
  
  // Search product
  await page.fill('#search', 'iPhone');
  await page.press('#search', 'Enter');
  
  // Add to cart
  await page.click('.product:first-child .add-to-cart');
  await expect(page.locator('.cart-count')).toHaveText('1');
  
  // Go to cart
  await page.click('#cartIcon');
  await expect(page.locator('.cart-item')).toHaveCount(1);
  
  // Checkout
  await page.click('#checkoutBtn');
  await page.fill('#cardNumber', '4111111111111111');
  await page.fill('#cvv', '123');
  await page.selectOption('#expiryMonth', '12');
  await page.selectOption('#expiryYear', '2025');
  await page.click('#placeOrderBtn');
  
  // Verify order
  await expect(page.locator('.order-confirmation')).toBeVisible();
  const orderId = await page.textContent('.order-id');
  expect(orderId).toMatch(/^ORD-\d+$/);
});
```

#### Challenge 3: API + UI Integration

```typescript
// Task: Create user via API and verify in UI

test('create and verify user', async ({ page, request }) => {
  // Create user via API
  const response = await request.post('/api/users', {
    data: {
      name: 'Test User',
      email: 'testuser@example.com',
      role: 'admin'
    }
  });
  
  expect(response.status()).toBe(201);
  const user = await response.json();
  
  // Verify in UI
  await page.goto(`/users/${user.id}`);
  await expect(page.locator('h1')).toHaveText('Test User');
  await expect(page.locator('.email')).toHaveText('testuser@example.com');
  await expect(page.locator('.role')).toHaveText('admin');
  
  // Cleanup
  await request.delete(`/api/users/${user.id}`);
});
```

### System Design Questions

#### Question: Design a scalable automation framework

**Answer:**

```
1. Architecture Layers:
   - Test Layer (UI, API, E2E tests)
   - Page Object Layer (Pages, Components)
   - Service Layer (API helpers, Business logic)
   - Utility Layer (Common functions, Helpers)
   - Configuration Layer (Environment configs, Test data)

2. Key Components:
   - Page Object Model for UI elements
   - API Helper classes for backend testing
   - Custom fixtures for test setup
   - Centralized configuration management
   - Logging and reporting mechanism
   - CI/CD integration

3. Best Practices:
   - Separation of concerns
   - DRY principle
   - Single responsibility
   - Dependency injection
   - Error handling
   - Retry mechanisms

4. Scalability Features:
   - Parallel execution
   - Distributed testing
   - Cloud integration
   - Docker containerization
   - Dynamic test data generation
   - AI-powered test maintenance

5. Reporting & Monitoring:
   - Allure reports
   - Custom dashboards
   - Slack/Email notifications
   - Test metrics tracking
   - Failure analysis
```

### Behavioral Questions

#### 1. How do you handle disagreements with developers about bugs?

**Answer:**
- Provide clear reproduction steps
- Share screenshots/videos
- Reference requirements/specifications
- Demonstrate the issue in different environments
- Collaborate to find root cause
- Document everything
- Maintain professional communication

#### 2. How do you prioritize testing when time is limited?

**Answer:**
- Risk-based testing approach
- Focus on critical user journeys
- Prioritize high-impact features
- Run smoke tests first
- Automate regression tests
- Use test impact analysis
- Communicate with stakeholders

#### 3. Describe a challenging automation problem you solved

**Answer Structure:**
- **Situation**: Describe the problem
- **Task**: What needed to be done
- **Action**: Steps you took
- **Result**: Outcome and learnings

---

## 📖 Appendix

### Useful Commands

```bash
# ===== PLAYWRIGHT COMMANDS =====

# Run all tests
npx playwright test

# Run specific test file
npx playwright test login.spec.ts

# Run tests in headed mode
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Run tests with specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests with grep
npx playwright test --grep "login"
npx playwright test --grep "@smoke"

# Run tests in parallel
npx playwright test --workers=4

# Run tests with retries
npx playwright test --retries=2

# Generate code
npx playwright codegen https://example.com

# Show report
npx playwright show-report

# Show trace
npx playwright show-trace trace.zip

# Install browsers
npx playwright install
npx playwright install chromium
npx playwright install --with-deps

# Update Playwright
npm install @playwright/test@latest

# ===== CUCUMBER COMMANDS =====

# Run all features
npx cucumber-js

# Run specific feature
npx cucumber-js Features/login.feature

# Run with tags
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@smoke and @regression"
npx cucumber-js --tags "not @skip"

# Run in parallel
npx cucumber-js --parallel 2

# Run with retry
npx cucumber-js --retry 1

# Generate report
npx cucumber-js --format json:report.json

# ===== ALLURE COMMANDS =====

# Generate report
npx allure generate allure-results --clean

# Open report
npx allure open allure-report

# Serve report
npx allure serve allure-results

# Clean results
rm -rf allure-results allure-report

# ===== DOCKER COMMANDS =====

# Build image
docker build -t playwright-tests .

# Run container
docker run --rm playwright-tests

# Run with environment variables
docker run --rm -e USER_EMAIL=test@example.com playwright-tests

# Run with volume
docker run --rm -v $(pwd)/reports:/app/reports playwright-tests

# Docker compose
docker-compose up
docker-compose down
```

### Troubleshooting Tips

```typescript
// ===== TIMEOUT ISSUES =====

// Increase timeout globally
test.setTimeout(60000);

// Increase timeout for specific action
await page.click('#button', { timeout: 10000 });

// Wait for network idle
await page.waitForLoadState('networkidle');

// ===== ELEMENT NOT FOUND =====

// Wait for element
await page.waitForSelector('#element');

// Check if element exists
const exists = await page.locator('#element').count() > 0;

// Use multiple selectors
const element = await page.locator('#id, .class, [data-test="value"]');

// ===== FLAKY TESTS =====

// Use retry
test.describe.configure({ retries: 2 });

// Wait for stability
await page.waitForFunction(() => document.readyState === 'complete');

// Use soft assertions
await expect.soft(page.locator('#element')).toBeVisible();

// ===== SCREENSHOT ISSUES =====

// Full page screenshot
await page.screenshot({ path: 'screenshot.png', fullPage: true });

// Element screenshot
await page.locator('#element').screenshot({ path: 'element.png' });

// ===== DEBUGGING =====

// Pause execution
await page.pause();

// Console log
console.log(await page.textContent('#element'));

// Take screenshot
await page.screenshot({ path: 'debug.png' });

// Get HTML
const html = await page.content();
console.log(html);

// Enable verbose logging
DEBUG=pw:api npx playwright test
```

### Performance Optimization

```typescript
// ===== SPEED UP TESTS =====

// 1. Disable unnecessary resources
await page.route('**/*.{png,jpg,jpeg,gif,svg,css}', route => route.abort());

// 2. Use API for setup
test.beforeEach(async ({ request }) => {
  await request.post('/api/setup', { data: testData });
});

// 3. Reuse authentication
test.use({ storageState: 'auth.json' });

// 4. Parallel execution
fullyParallel: true,
workers: 4

// 5. Optimize waits
await page.waitForLoadState('domcontentloaded'); // Instead of networkidle

// 6. Use test.step for better organization
await test.step('Login', async () => {
  // Login code
});

// ===== REDUCE FLAKINESS =====

// 1. Proper waits
await page.waitForSelector('#element', { state: 'visible' });

// 2. Stable selectors
await page.getByRole('button', { name: 'Submit' }); // Better than CSS

// 3. Retry mechanism
test.describe.configure({ retries: 2 });

// 4. Soft assertions
await expect.soft(page.locator('#element')).toBeVisible();
```

### Resources & Links

- **Official Documentation**: [playwright.dev](https://playwright.dev)
- **GitHub Repository**: [github.com/microsoft/playwright](https://github.com/microsoft/playwright)
- **Discord Community**: [discord.gg/playwright](https://discord.gg/playwright)
- **Stack Overflow**: [stackoverflow.com/questions/tagged/playwright](https://stackoverflow.com/questions/tagged/playwright)
- **YouTube Tutorials**: Search "Playwright Tutorial"
- **Udemy Courses**: Playwright automation courses
- **Blog Posts**: Dev.to, Medium articles on Playwright

### Quick Reference Card

```
LOCATORS:
  page.locator('#id')
  page.getByRole('button', { name: 'Submit' })
  page.getByText('Text')
  page.getByLabel('Label')
  page.getByPlaceholder('Placeholder')
  page.getByTestId('test-id')

ACTIONS:
  await page.click('#button')
  await page.fill('#input', 'value')
  await page.selectOption('#select', 'option')
  await page.check('#checkbox')
  await page.press('#input', 'Enter')

ASSERTIONS:
  await expect(locator).toBeVisible()
  await expect(locator).toHaveText('text')
  await expect(locator).toHaveValue('value')
  await expect(page).toHaveURL('url')
  await expect(page).toHaveTitle('title')

WAITS:
  await page.waitForSelector('#element')
  await page.waitForLoadState('networkidle')
  await page.waitForNavigation()
  await page.waitForResponse('**/api/data')

NAVIGATION:
  await page.goto('url')
  await page.goBack()
  await page.goForward()
  await page.reload()
```

---

## 🎓 Conclusion

This comprehensive guide covers everything you need to master Playwright automation testing, from basics to advanced topics including:

✅ TypeScript fundamentals
✅ Core Playwright methods and advanced features
✅ Page Object Model implementation
✅ API testing integration
✅ Cucumber BDD framework
✅ Allure reporting
✅ CI/CD with GitHub Actions, GitLab, Jenkins
✅ Docker containerization
✅ AI-powered test automation
✅ Best practices and design patterns
✅ Interview preparation

**Next Steps:**
1. Practice daily with hands-on coding
2. Build a complete framework from scratch
3. Contribute to open-source projects
4. Join Playwright community
5. Stay updated with latest features
6. Prepare for interviews with mock sessions

**Remember:** Consistent practice and real-world project experience are key to mastering automation testing!

---

*Last Updated: 2024*
*Version: 1.0*
*Maintained by: QA Automation Team*

📧 For questions or contributions, please reach out to the team.

**Happy Testing! 🎭**
