import fs from 'fs';
import path from 'path';
import { allure } from 'allure-playwright';

export class ScreenshotManager {
  constructor() {
    this.screenshotDir = 'test-results/screenshots';
    this.ensureDirectoryExists();
  }

  ensureDirectoryExists() {
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }
  }

  generateFileName(pageName, stepName = '') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const cleanPageName = pageName.replace(/[^a-zA-Z0-9]/g, '_');
    const cleanStepName = stepName.replace(/[^a-zA-Z0-9]/g, '_');
    
    return `${cleanPageName}_${cleanStepName}_${timestamp}.png`;
  }

  async captureScreenshot(page, pageName, stepName = 'screenshot') {
    const fileName = this.generateFileName(pageName, stepName);
    const filePath = path.join(this.screenshotDir, fileName);
    
    const screenshot = await page.screenshot({
      path: filePath,
      fullPage: true
    });

    // Attach to Allure report
    await allure.attachment(
      `Screenshot: ${pageName} - ${stepName}`,
      screenshot,
      'image/png'
    );

    console.log(`📸 Screenshot captured: ${fileName}`);
    return { filePath, fileName, screenshot };
  }

  async captureAndAttachToCucumber(page, pageName, stepName, world) {
    const result = await this.captureScreenshot(page, pageName, stepName);
    
    // Attach to Cucumber World for reporting
    if (world && world.attach) {
      await world.attach(result.screenshot, 'image/png');
    }
    
    return result;
  }
}