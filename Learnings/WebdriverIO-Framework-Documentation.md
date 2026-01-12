# WebdriverIO EE App - Comprehensive Framework Documentation

## Table of Contents
1. [Framework Structure](#framework-structure)
2. [SOLID Principles](#solid-principles)
3. [Design Patterns](#design-patterns)
4. [WDIO Methods](#wdio-methods)
5. [Cucumber BDD Implementation](#cucumber-bdd-implementation)
6. [Reporting](#reporting)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [OOP Concepts](#oop-concepts)
9. [Other Features](#other-features)

---

## Framework Structure

### Overall Architecture

The WebdriverIO EE App follows a **layered architecture** with clear separation of concerns:

```
webdriverio-ee-app/
├── features/                 # Cucumber feature files (BDD scenarios)
├── model/                    # Page objects and business logic
├── step-definitions/         # Cucumber step implementations
├── utils/                    # Helper utilities and gestures
├── resources/               # Test data and configuration files
├── reports/                 # Generated test reports
├── screenshots/             # Test execution screenshots
└── Configuration files      # WDIO configuration for different environments
```

### Folder Organization

#### 1. Features Directory
```
features/
├── GETBBAQ/                 # Broadband acquisition journeys
├── TV/                      # Television service tests
├── ILAO/                    # In-life account operations
├── appshop/                 # App shop functionality
├── renewBBApp/              # Broadband renewal flows
└── local_run/               # Local development tests
```

#### 2. Model Directory (Page Objects)
```
model/
├── pages/
│   ├── appomnishop/         # EE app page objects
│   └── pagesMap.ts          # Page factory mapping
├── modules/                 # Reusable UI components
└── missions/                # Business logic encapsulation
```

#### 3. Step Definitions
```
step-definitions/
├── omnishop/                # Feature-specific step definitions
├── support/
│   └── hooks.ts             # Test lifecycle hooks
└── manageStepDefs.ts        # Shared step definitions
```

### Entry Points and Execution Flow

**Main Configuration Entry Point:**
```typescript
// shared.wdio.conf.ts
export const configShared: Omit<Options.Testrunner, 'capabilities'> = {
    specs: ['./features/appshop/appshop.feature'],
    logLevel: 'trace',
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    cucumberOpts: {
        timeout: 600000,
        require: ['./step-definitions/**/*.ts'],
    }
};
```

**Environment-Specific Configurations:**
```typescript
// wdio.android.local.conf.ts
const configLocal: Options.Testrunner = {
    ...configShared,
    hostname: '127.0.0.1',
    port: 4723,
    capabilities: [{
        platformName: "Android",
        maxInstances: 1,
        ...appiumOptions
    }],
};
```

---

## SOLID Principles

### Single Responsibility Principle (SRP)

Each class has a single, well-defined responsibility:

```typescript
// model/pages/appomnishop/homePage.ts - Only handles Home page interactions
export default class HomePage extends Page {
    get shop() {
        return this.element(resolveLocator('~Shop, tab, 2 of 5', '~Shop, tab, 2 of 5'))
    }
    
    async clickShoplink() {
        await this.shop.click()
    }
    
    async atPageVerification(): Promise<void> {
        await browser.waitUntil(async () => {
            return await this.title.isDisplayed()
        });
    }
}
```

```typescript
// utils/gestures.ts - Only handles gesture operations
export async function swipeUp(percentage = 1) {
    await swipeOnPercentage(
        calculateXY(SWIPE_DIRECTION.up.start, percentage),
        calculateXY(SWIPE_DIRECTION.up.end, percentage)
    );
}
```

### Open/Closed Principle (OCP)

The framework is open for extension but closed for modification:

```typescript
// model/pages/pagesMap.ts - Easy to extend with new pages
export const pagesMap = new Map<string, () => Page>([
    ['login', () => new LoginPage()],
    ['home', () => new HomePage()],
    ['appShop', () => new AppShopPage()],
    // New pages can be added without modifying existing code
]);
```

### Liskov Substitution Principle (LSP)

All page objects inherit from base `Page` class and can be substituted:

```typescript
// All page objects extend the same base class
export default class HomePage extends Page {
    // Can be used wherever Page is expected
}

export default class AppShopPage extends Page {
    // Can be used wherever Page is expected
}
```

### Interface Segregation Principle (ISP)

Specific interfaces for different concerns:

```typescript
// utils/helpers.ts - Specific helper functions
export async function clickElementWithSwipeUp(element: any) {
    await checkIfDisplayedWithSwipeUp(element, 30, 0);
    await element.click();
}

export async function enterTextValue(element: any, enter_value: any) {
    await element.click();
    await element.clearValue();
    await element.setValue(enter_value);
}
```

### Dependency Inversion Principle (DIP)

High-level modules depend on abstractions:

```typescript
// step-definitions use page abstractions through getPage()
const homePage = getPage('home') as HomePage;
const appshopPage = getPage('appShop') as AppShopPage;

// Pages are injected through the pagesMap factory
```

---

## Design Patterns

### Page Object Model (POM)

**Implementation:**
```typescript
// model/pages/appomnishop/homePage.ts
export default class HomePage extends Page {
    // Locators as getters
    get shop() {
        return this.element(resolveLocator('~Shop, tab, 2 of 5', '~Shop, tab, 2 of 5'))
    }
    
    get manageTab() {
        return this.element(resolveLocator('//android.widget.Button[@content-desc="Manage, tab, 3 of 5"]', '~Manage, tab, 3 of 5'))
    }
    
    // Actions as methods
    async clickShoplink() {
        await this.shop.click()
    }
    
    async clickManageLink() {
        await waituntillElementisClickable(this.manageTab)
    }
}
```

**Benefits:**
- Encapsulates page-specific logic
- Reduces code duplication
- Improves maintainability

### Factory Pattern

**Page Factory Implementation:**
```typescript
// model/pages/pagesMap.ts
export const pagesMap = new Map<string, () => Page>([
    ['login', () => new LoginPage()],
    ['home', () => new HomePage()],
    ['appShop', () => new AppShopPage()],
    ['eligibility', () => new eligibilityPage()],
]);

// Usage in step definitions
const homePage = getPage('home') as HomePage;
```

### Strategy Pattern

**Cross-platform locator resolution:**
```typescript
// utils/helpers.ts
export function resolveLocator(androidLocator: string, iOsLocator: string): string {
    return driver.isIOS ? iOsLocator : androidLocator;
}

// Usage in page objects
get shop() {
    return this.element(resolveLocator(
        '~Shop, tab, 2 of 5',     // Android strategy
        '~Shop, tab, 2 of 5'      // iOS strategy
    ))
}
```

### Command Pattern

**Gesture commands encapsulation:**
```typescript
// utils/gestures.ts
export async function checkIfDisplayedWithSwipeUp(element: any, maxScrolls: any, amount = 0) {
    if ((!(await element.isDisplayed()) || !(await element.isEnabled())) && amount <= maxScrolls) {
        await swipeUp(0.30);
        await checkIfDisplayedWithSwipeUp(element, maxScrolls, amount + 1);
    }
}
```

---

## WDIO Methods

### Element Interaction Methods

```typescript
// Basic element interactions from the repo
await element.click()                    // Click element
await element.setValue(text)             // Enter text
await element.clearValue()               // Clear input field
await element.isDisplayed()              // Check visibility
await element.isEnabled()                // Check if enabled
await element.waitForDisplayed()         // Wait for element
```

### Driver Methods

```typescript
// Driver operations used in the framework
await driver.pause(2000)                 // Hard wait (not recommended)
await driver.activateApp(bundleId)       // Launch app
await driver.terminateApp(bundleId)      // Close app
await driver.getContexts()               // Get available contexts
await driver.switchContext(context)      // Switch context
await driver.saveScreenshot(path)        // Take screenshot
```

### Browser Methods

```typescript
// Browser-level operations
await browser.waitUntil(condition, options)  // Smart wait
await browser.url(url)                       // Navigate to URL
await browser.getWindowRect()                // Get screen dimensions
```

### Custom Helper Methods

```typescript
// utils/helpers.ts - Custom WDIO extensions
export async function clickElementWithSwipeUp(element: any) {
    await checkIfDisplayedWithSwipeUp(element, 30, 0);
    await element.click();
}

export async function enterTextWithSwipeUp(element: any, enter_value: any) {
    await checkIfDisplayedWithSwipeUp(element, 20, 0);
    await swipeUp(0.20);
    await element.click();
    await element.clearValue();
    await element.setValue(enter_value);
}
```

---

## Cucumber BDD Implementation

### Feature File Structure

```gherkin
# features/GETBBAQ/getbb.feature
Feature: Get Broadband E2E Functional Regression

@FAXRAY-14621
Scenario: New provide of FTTP with new ONT
    Given I have logged into MyEE app as a "EE_Mobile" Existing user
    When I click on Shop Menu
    And the user is at "AppShop" page
    When I click on broadband tiles for getbb
    Then user to wait for page load
    And the user is at "eligibility" page
```

### Step Definitions Implementation

```typescript
// step-definitions/omnishop/appshop/appshopThenStepDef.ts
import { Then } from '@wdio/cucumber-framework';

Then('the user navigate to home security title page', async () => {
    await driver.pause(10000);
    await appshopPage.validatehomeSecurityTitle();
});

Then('the user clicks the element {string} in BB Sub Hub', async function (expectedText: any) {
    const element = getElement(expectedText, true);
    await browser.waitUntil(
        async () => await element.isDisplayed(),
        { timeout: 10000, timeoutMsg: `Element "${expectedText}" not visible` }
    );
    await clickElementWithSwipeUp(element);
});
```

### Hooks Implementation

```typescript
// step-definitions/support/hooks.ts
import { After, Before } from "@wdio/cucumber-framework";

Before(async function () {
    if (channel_type.includes('browserstack')) {
        await driver.pause(20000);
        await runApp()
    } else {
        await uninstallApp()
        await installApp()
        await runApp()
    }
});

After(async function () {
    if (channel_type.includes('browserstack')) {
        await terminateApp()
    } else {
        await uninstallApp()
    }
});
```

### Cucumber Configuration

```typescript
// shared.wdio.conf.ts
cucumberOpts: {
    retry: 0,
    timeout: 600000,
    strict: false,
    ignoreUndefinedDefinitions: false,
    require: ['./step-definitions/**/*.ts'],
}
```

---

## Reporting

### Allure Reporting Setup

```typescript
// package.json - Allure integration
{
    "scripts": {
        "report": "allure generate allure-results --allure open"
    },
    "devDependencies": {
        "@wdio/allure-reporter": "^8.16.7",
        "allure-commandline": "^2.30.0"
    }
}
```

### Report Configuration

```typescript
// Configuration includes Allure reporter
reporters: [
    'spec',
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]
]
```

### CI/CD Report Generation

```yaml
# .gitlab-ci.yml
after_script:
  - npx allure generate reports/allure

artifacts:
  when: always
  paths:
    - reports/cucumber/html/
    - allure-report/
  expire_in: 7 days
```

### Screenshot Integration

```typescript
// utils/helpers.ts
export async function createScreenshot(title, filename) {
    var rx = /FAXRAY-[0-9]+/g;
    var directory = "./screenshots/" + rx.exec(title);
    
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
    
    await driver.saveScreenshot(directory + filename);
}
```

---

## CI/CD Pipeline

### GitLab CI/CD Configuration

```yaml
# .gitlab-ci.yml
stages:
  - install
  - test

variables:
  ENV_TYPE: "bf1"
  SQUAD_NAME: "GETBB"
  TAG_NAME: "Enter tag name"

install_wdio:
  stage: install
  script:
    - npm install
    - npm install --save-dev allure-commandline
  artifacts:
    paths:
      - node_modules
    expire_in: 1 week

android_integration_tests:
  stage: test
  timeout: 5 hour
  tags:
    - android-prod-automation
  script:
    - npm run android.browserstack.tag.app -- --envType $ENV_TYPE
  artifacts:
    when: always
    paths:
      - reports/cucumber/html/
      - allure-report/
```

### Environment-Based Execution

```bash
# package.json scripts for different environments
{
    "scripts": {
        "android.local.app": "wdio run wdio.android.local.conf.ts",
        "android.browserstack.app": "wdio run wdio.android.browserstack.conf.ts",
        "ios.browserstack.app": "wdio run wdio.ios.browserstack.conf.ts"
    }
}
```

### Dynamic Test Execution

```yaml
# Conditional execution based on parameters
script:
  - |-
    if [[ $TAG_NAME != 'NA' && $WDIO_SUITE == 'NA' ]];then
      npm run android.browserstack.tag.app -- --envType $ENV_TYPE --cucumberOpts.tags=@$TAG_NAME
    elif [[ $TAG_NAME == 'NA' && $WDIO_SUITE != 'NA' ]];then
      npm run android.browserstack.tag.app -- --envType $ENV_TYPE --suite $WDIO_SUITE
    fi
```

---

## OOP Concepts

### Inheritance

```typescript
// Base Page class
import Page from "@qa/taf-core/dist/model/ui/page";

// All page objects inherit from base Page
export default class HomePage extends Page {
    // Inherits element() method and other base functionality
    get title() {
        return this.element('~Home')
    }
}

export default class AppShopPage extends Page {
    // Inherits same base functionality
    get shopTitle() {
        return this.element('~Shop')
    }
}
```

### Encapsulation

```typescript
// model/pages/appomnishop/homePage.ts
export default class HomePage extends Page {
    // Private-like properties (getters)
    get closepopupWindow() {
        return this.element(resolveLocator('~close', '~close'))
    }
    
    // Public methods
    async clickClosePopupWindow() {
        await waituntillElementisClickable(this.closepopupWindow)
    }
    
    // Internal validation logic
    async atPageVerification(): Promise<void> {
        await browser.waitUntil(async () => {
            return await this.title.isDisplayed()
        });
    }
}
```

### Abstraction

```typescript
// Abstract gesture operations
// utils/gestures.ts
export async function checkIfDisplayedWithSwipeUp(element: any, maxScrolls: any, amount = 0) {
    // Abstract implementation details of scrolling and element detection
    if ((!(await element.isDisplayed()) || !(await element.isEnabled())) && amount <= maxScrolls) {
        await swipeUp(0.30);
        await checkIfDisplayedWithSwipeUp(element, maxScrolls, amount + 1);
    }
}
```

### Polymorphism

```typescript
// Different page objects can be used interchangeably
const getPageInstance = (pageName: string): Page => {
    return pagesMap.get(pageName)();
}

// All pages implement the same interface but behave differently
const homePage = getPageInstance('home');
const shopPage = getPageInstance('appShop');

// Both can call atPageVerification() but with different implementations
await homePage.atPageVerification();
await shopPage.atPageVerification();
```

---

## Other Features

### Cross-Platform Support

```typescript
// utils/helpers.ts - Platform abstraction
export function resolveLocator(androidLocator: string, iOsLocator: string): string {
    return driver.isIOS ? iOsLocator : androidLocator;
}

// Usage across the framework
get acceptAllCookies() {
    return this.element(resolveLocator(
        '(//android.widget.Button[contains(@text,"Accept all")])[1]',
        '(//XCUIElementTypeStaticText[@name="Accept all"])[1]'
    ))
}
```

### Deep Link Testing

```typescript
// utils/helpers.ts
export async function openDeepLinkUrl(url) {
    const prefix = "eeflutter://";
    
    if (driver.isIOS) {
        await driver.execute("mobile: launchApp", {
            bundleId: "com.apple.mobilesafari",
        });
        // iOS-specific deep link handling
    } else {
        // Android deep link handling
        return driver.execute("mobile:deepLink", {
            url: `${prefix}${url}`,
            package: driver.capabilities.appPackage,
        });
    }
}
```

### Context Switching (Hybrid Apps)

```typescript
// utils/helpers.ts - WebView context management
export async function switchToContext(context: any, title = "") {
    if (driver.capabilities.fullContextList == true) {
        if (title != "") {
            await driver.switchContext(
                (await getCurrentContexts()).filter(function (n) {
                    return n.title == title;
                })[0].id
            );
        }
    }
}

export async function waitForWebsiteLoaded() {
    await waitForWebViewContextLoaded();
    await switchToContext(CONTEXT_REF.WEBVIEW);
    await waitForDocumentFullyLoaded();
    await switchToContext(CONTEXT_REF.NATIVE);
}
```

### Test Data Management

```json
// resources/prod-data.json
{
    "EE_Mobile": {
        "userType": "",
        "username": "",
        "password": ""
    },
    "FF500Essentials": {
        "broadbandpromotionname": ""
    }
}
```

### Custom Wait Utilities

```typescript
// utils/helpers.ts
export async function waituntillElementisDisplayed(element: any) {
    for (let i = 0; i < 30; i++) {
        if (await element.isDisplayed() || await element.isEnabled()) {
            break;
        } else {
            driver.pause(1000)
        }
    }
}

export async function validateElementVisibility(element: any) {
    await checkIfDisplayedWithSwipeUp(element, 25, 0);
}
```

### Multi-Environment Configuration

The framework supports multiple execution environments:

- **Local Development**: `wdio.android.local.conf.ts`
- **BrowserStack Cloud**: `wdio.android.browserstack.conf.ts`
- **Perfecto Cloud**: `wdio.android.perfecto.conf.ts`
- **HeadSpin**: `wdio.android.headspin.conf.ts`

Each configuration extends the base `shared.wdio.conf.ts` and provides environment-specific capabilities and services.

---

## Conclusion

This WebdriverIO framework demonstrates a well-structured, maintainable approach to mobile test automation with:

- **Clear separation of concerns** through layered architecture
- **SOLID principles** implementation for maintainable code
- **Design patterns** for reusability and extensibility
- **Comprehensive BDD implementation** with Cucumber
- **Robust reporting** with Allure integration
- **CI/CD pipeline** support for automated execution
- **Cross-platform capabilities** for iOS and Android testing

The framework provides a solid foundation for scaling mobile test automation across multiple teams and environments.