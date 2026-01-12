import { test, expect } from "@playwright/test";
import ConfigManager from '../utils/ConfigManager.js';
import Logger from '../utils/Logger.js';
import TestDataManager from '../utils/TestDataManager.js';

/**
 * Login Test Suite following SOLID principles
 * Uses Page Object Model and proper test organization
 */

// Test data from configuration
const validUser = ConfigManager.getTestData('validUser');
const invalidUser = ConfigManager.getTestData('invalidUser');
const loginUrl = ConfigManager.getUrl('login');
const logger = Logger.child({ module: 'LoginTests' });

// Test group for login functionality
test.describe('Login Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    logger.info('Starting login test');
    await page.goto(loginUrl);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      logger.error('Test failed', { 
        testName: testInfo.title,
        error: testInfo.error?.message 
      });
    } else {
      logger.info('Test completed', { testName: testInfo.title });
    }
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const testLogger = logger.child({ test: 'invalid-login' });
    
    try {
      // Use proper selectors with validation
      const usernameField = page.locator("#username");
      const passwordField = page.locator("#password");
      const signInButton = page.locator("input[value='Sign In']");
      const errorMessage = page.locator("[style*='block']");
      
      // Validate elements are present
      await expect(usernameField).toBeVisible();
      await expect(passwordField).toBeVisible();
      await expect(signInButton).toBeVisible();
      
      // Perform login with invalid credentials
      await usernameField.fill(invalidUser.email);
      await passwordField.fill(invalidUser.password);
      await signInButton.click();
      
      // Validate error message appears
      await expect(errorMessage).toBeVisible();
      const errorText = await errorMessage.textContent();
      
      expect(errorText).toBeTruthy();
      testLogger.info('Invalid login test passed', { errorMessage: errorText });
      
    } catch (error) {
      testLogger.error('Invalid login test failed', { error: error.message });
      throw error;
    }
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const testLogger = logger.child({ test: 'valid-login' });
    
    try {
      // Get practice credentials from test data
      const practiceCredentials = await TestDataManager.getData('credentials.practice.valid');
      
      // Define locators with proper naming
      const usernameField = page.locator("#username");
      const passwordField = page.locator("#password");
      const signInButton = page.locator("#signInBtn");
      const productCards = page.locator(".card-title");
      
      // Validate form elements
      await expect(usernameField).toBeVisible();
      await expect(passwordField).toBeVisible();
      await expect(signInButton).toBeVisible();
      await expect(signInButton).toBeEnabled();
      
      // Perform login with credentials from configuration
      await usernameField.fill(practiceCredentials.username);
      await passwordField.fill(practiceCredentials.password);
      await signInButton.click();
      
      // Wait for successful navigation
      await expect(productCards.first()).toBeVisible({ timeout: 15000 });
      
      // Validate products are loaded
      const productCount = await productCards.count();
      expect(productCount).toBeGreaterThan(0);
      
      // Log product information
      const firstProductTitle = await productCards.first().textContent();
      testLogger.info('Login successful', { 
        productCount,
        firstProduct: firstProductTitle?.trim()
      });
      
      // Validate specific products if needed
      if (productCount >= 3) {
        const thirdProductTitle = await productCards.nth(2).textContent();
        testLogger.debug('Third product found', { title: thirdProductTitle?.trim() });
      }
      
      // Get all product titles for validation
      const allTitles = await productCards.allTextContents();
      const cleanedTitles = allTitles.map(title => title.trim()).filter(title => title);
      
      expect(cleanedTitles.length).toBeGreaterThan(0);
      testLogger.info('All products loaded', { count: cleanedTitles.length });
      
    } catch (error) {
      testLogger.error('Valid login test failed', { error: error.message });
      throw error;
    }
  });
});

// Test group for E-commerce application login
test.describe('E-commerce Application Login', () => {
  
  test('should login to e-commerce app and load products', async ({ page }) => {
    const testLogger = logger.child({ test: 'ecommerce-login' });
    
    try {
      // Navigate to e-commerce application
      await page.goto(ConfigManager.getUrl('base'));
      
      // Define locators
      const emailField = page.locator("#userEmail");
      const passwordField = page.locator("#userPassword");
      const loginButton = page.locator("#login");
      const productTitles = page.locator(".card-body h5 b");
      
      // Validate login form
      await expect(emailField).toBeVisible();
      await expect(passwordField).toBeVisible();
      await expect(loginButton).toBeVisible();
      
      // Perform login
      await emailField.fill(validUser.email);
      await passwordField.fill(validUser.password);
      await loginButton.click();
      
      // Wait for network to be idle (products loaded)
      await page.waitForLoadState("networkidle");
      
      // Validate products are loaded
      await expect(productTitles.first()).toBeVisible({ timeout: 15000 });
      
      const productList = await productTitles.allTextContents();
      const cleanedProductList = productList.map(title => title.trim()).filter(title => title);
      
      expect(cleanedProductList.length).toBeGreaterThan(0);
      testLogger.info('E-commerce login successful', { 
        productCount: cleanedProductList.length,
        products: cleanedProductList.slice(0, 3) // Log first 3 products
      });
      
    } catch (error) {
      testLogger.error('E-commerce login test failed', { error: error.message });
      throw error;
    }
  });
});