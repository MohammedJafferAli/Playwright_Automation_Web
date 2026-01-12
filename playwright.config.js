// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration following SOLID principles
 * Uses ConfigManager for centralized configuration
 */

let ConfigManager;
let browserConfig;
let reportingConfig;
let timeouts;

try {
  // Dynamic import with error handling
  const configModule = await import('./utils/ConfigManager.js');
  ConfigManager = configModule.default;
  
  // Validate configuration on startup
  const configErrors = ConfigManager.validateConfig();
  if (configErrors.length > 0) {
    console.error('Configuration validation errors:');
    configErrors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  }
  
  browserConfig = ConfigManager.getBrowserConfig();
  reportingConfig = ConfigManager.getReportingConfig();
  timeouts = ConfigManager.getTimeout('navigation');
  
} catch (error) {
  console.warn('ConfigManager not available, using fallback configuration:', error.message);
  
  // Fallback configuration
  browserConfig = {
    headless: process.env.HEADLESS !== 'false',
    viewport: { width: 1280, height: 720 }
  };
  reportingConfig = {
    screenshots: true,
    videos: false,
    trace: true
  };
  timeouts = 60000;
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Global test timeout */
  timeout: timeouts,
  
  /* Expect timeout for assertions */
  expect: {
    timeout: ConfigManager?.getTimeout('medium') || 15000
  },
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? (ConfigManager?.getRetryConfig().maxAttempts || 3) : 1,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter configuration */
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: process.env.CI ? 'never' : 'on-failure'
    }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  
  /* Global test settings */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: ConfigManager?.getUrl('base') || 'https://rahulshettyacademy.com/client/#/',
    
    /* Browser options */
    headless: browserConfig.headless,
    viewport: browserConfig.viewport,
    
    /* Collect trace when retrying the failed test */
    trace: reportingConfig.trace ? 'on-first-retry' : 'off',
    
    /* Take screenshot only on failure */
    screenshot: reportingConfig.screenshots ? 'only-on-failure' : 'off',
    
    /* Record video on failure */
    video: reportingConfig.videos ? 'retain-on-failure' : 'off',
    
    /* Action timeout */
    actionTimeout: ConfigManager?.getTimeout('medium') || 15000,
    
    /* Navigation timeout */
    navigationTimeout: ConfigManager?.getTimeout('navigation') || 60000,
    
    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.(js|ts)/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: browserConfig.headless,
        launchOptions: {
          args: [
            '--start-maximized',
            '--deny-permission-prompts',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
          ]
        }
      },
      dependencies: ['setup']
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: browserConfig.headless
      },
      dependencies: ['setup']
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        headless: browserConfig.headless
      },
      dependencies: ['setup']
    },
    /* Mobile testing */
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        headless: browserConfig.headless
      },
      dependencies: ['setup']
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        headless: browserConfig.headless
      },
      dependencies: ['setup']
    }
  ],

  /* Output directories */
  outputDir: 'test-results/',
  
  /* Global setup and teardown */
  globalSetup: './tests/global.setup.js',
  globalTeardown: './tests/global.teardown.js',
});

