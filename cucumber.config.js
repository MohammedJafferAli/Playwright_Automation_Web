import { setWorldConstructor, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import PageObjectManager from './pageObjects/PageObjectManager.js';
import { ScreenshotManager } from './utils/ScreenshotManager.js';

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.pom = null;
    this.screenshotManager = new ScreenshotManager();
    this.currentPageName = 'DefaultPage';
  }

  async setCurrentPage(pageName) {
    this.currentPageName = pageName;
  }

  async captureScreenshot(stepName) {
    return await this.screenshotManager.captureAndAttachToCucumber(
      this.page,
      this.currentPageName,
      stepName,
      this
    );
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.pom = new PageObjectManager(this.page);
});

After(async function (scenario) {
  // Capture screenshot on failure
  if (scenario.result.status === 'FAILED') {
    await this.captureScreenshot('failure_screenshot');
  }
  
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});