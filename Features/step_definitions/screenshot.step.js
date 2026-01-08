import { Given, When, Then } from '@cucumber/cucumber';
import { ScreenshotManager } from '../../utils/ScreenshotManager.js';
import { expect } from '@playwright/test';

const screenshotManager = new ScreenshotManager();

When('User takes screenshot for cucumber report', async function () {
  const pageName = this.currentPageName || 'UnknownPage';
  const result = await screenshotManager.captureAndAttachToCucumber(
    this.page, 
    pageName, 
    'user_requested_screenshot', 
    this
  );
  
  // Verify screenshot was captured and attached
  expect(result.filePath).toBeTruthy();
  expect(result.screenshot).toBeTruthy();
  console.log('✅ Screenshot captured and attached to report');
});