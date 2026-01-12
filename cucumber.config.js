import { setWorldConstructor, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import PageObjectManager from './pageObjects/PageObjectManager.js';

/**
 * Browser configuration following Single Responsibility Principle
 */
class BrowserConfig {
  static getDefaultOptions() {
    return {
      headless: process.env.HEADLESS !== 'false',
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true
    };
  }
}

/**
 * Resource manager following Single Responsibility Principle
 */
class ResourceManager {
  static async cleanup(resources) {
    const { page, context, browser } = resources;
    try {
      if (page && !page.isClosed()) await page.close();
      if (context) await context.close();
      if (browser && browser.isConnected()) await browser.close();
    } catch (error) {
      console.warn('Cleanup warning:', error.message);
    }
  }
}

/**
 * Custom World class following Dependency Inversion Principle
 */
class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.pom = null;
  }

  async initializeBrowser() {
    try {
      this.browser = await chromium.launch(BrowserConfig.getDefaultOptions());
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
      this.pom = new PageObjectManager(this.page);
    } catch (error) {
      await this.cleanup();
      throw new Error(`Browser initialization failed: ${error.message}`);
    }
  }

  async cleanup() {
    await ResourceManager.cleanup({
      page: this.page,
      context: this.context,
      browser: this.browser
    });
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.initializeBrowser();
});

After(async function () {
  await this.cleanup();
});