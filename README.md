# Playwright & JavaScript Testing Framework

🚀 Welcome to the Playwright Test Automation Project! This repository is designed for efficient end-to-end testing using **Playwright** with **JavaScript**, ensuring robust and scalable automation.

Learn more about the playwright from the official document - https://playwright.dev/docs/intro

## 📌 Project Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- npm or yarn (Comes with Node.js)
- Playwright (`npm install -D @playwright/test`)


### Important commands 

1. npm install → Installs all required dependencies.
2. npx playwright install → Installs Playwright browsers.
3. npx playwright test → Runs all Playwright tests.
4. npx playwright test --headed → Executes tests with a visible browser window.
5. npx playwright test tests/example.spec.js → Runs a specific test file.
6. npx playwright test --debug → Opens Playwright in debug mode.
7. npx playwright codegen <URL> → Generates test code by recording user interactions.
8. await page.screenshot({ path: 'screenshot.png' }); → Captures a screenshot of the webpage.
9. await browser.newContext({ recordVideo: { dir: 'videos/' } }); → Records a video of test execution.
10. npx playwright show-report -> To open last HTML report run