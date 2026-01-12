import { chromium } from '@playwright/test';
import ConfigManager from '../utils/ConfigManager.js';
import Logger from '../utils/Logger.js';

/**
 * Global setup for Playwright tests
 * Follows Single Responsibility Principle
 */
async function globalSetup() {
  const logger = Logger.child({ module: 'GlobalSetup' });
  
  try {
    logger.info('Starting global setup');
    
    // Validate configuration
    const configErrors = ConfigManager.validateConfig();
    if (configErrors.length > 0) {
      logger.error('Configuration validation failed', { errors: configErrors });
      throw new Error('Invalid configuration');
    }
    
    // Create test results directory
    const fs = await import('fs');
    const path = await import('path');
    
    const testResultsDir = path.resolve('test-results');
    if (!fs.existsSync(testResultsDir)) {
      fs.mkdirSync(testResultsDir, { recursive: true });
      logger.info('Created test results directory', { path: testResultsDir });
    }
    
    // Verify browser installation
    const browserConfig = ConfigManager.getBrowserConfig();
    const browser = await chromium.launch({
      headless: true,
      timeout: 30000
    });
    
    await browser.close();
    logger.info('Browser verification successful');
    
    // Setup authentication if needed
    await setupAuthentication();
    
    logger.info('Global setup completed successfully');
    
  } catch (error) {
    logger.error('Global setup failed', { error: error.message });
    throw error;
  }
}

/**
 * Setup authentication state
 */
async function setupAuthentication() {
  const logger = Logger.child({ module: 'AuthSetup' });
  
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Navigate to login page
    const loginUrl = ConfigManager.getUrl('login');
    await page.goto(loginUrl);
    
    // Perform login with valid credentials
    const validUser = ConfigManager.getTestData('validUser');
    
    // This is a placeholder - adjust selectors based on actual login page
    try {
      await page.fill('#userEmail', validUser.email);
      await page.fill('#userPassword', validUser.password);
      await page.click('#login');
      
      // Wait for successful login
      await page.waitForURL('**/dashboard', { timeout: 10000 });
      
      // Save authentication state
      await context.storageState({ path: 'test-results/auth.json' });
      
      logger.info('Authentication state saved successfully');
    } catch (authError) {
      logger.warn('Authentication setup failed, tests will run without pre-auth', { 
        error: authError.message 
      });
    }
    
    await browser.close();
    
  } catch (error) {
    logger.error('Authentication setup error', { error: error.message });
    // Don't throw here as auth setup is optional
  }
}

export default globalSetup;