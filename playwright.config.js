// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration following SOLID principles
 * Uses ConfigManager for centralized configuration
 */

// Configuration with fallback values
const config = {
  browser: {
    headless: process.env.HEADLESS !== 'false',
    viewport: { width: 1280, height: 720 }
  },
  reporting: {
    screenshots: true,
    videos: false,
    trace: true
  },
  timeouts: {
    navigation: 60000,
    medium: 15000
  },
  retry: {
    maxAttempts: 3
  },
  urls: {
    base: 'https://rahulshettyacademy.com/client/#/'
  }
};

// Try to load ConfigManager with fallback
let ConfigManager;
try {
  const configModule = await import('./utils/ConfigManager.js');
  ConfigManager = configModule.default;
  
  // Validate configuration on startup
  const configErrors = ConfigManager.validateConfig();
  if (configErrors.length > 0) {
    console.error('Configuration validation errors:');
    configErrors.forEach(error => console.error(`  - ${error}`));
  }
} catch (error) {
  console.warn('ConfigManager not available, using fallback configuration:', error.message);
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Global test timeout */
  timeout: ConfigManager?.getTimeout('navigation') || config.timeouts.navigation,
  
  /* Expect timeout for assertions */
  expect: {
    timeout: ConfigManager?.getTimeout('medium') || config.timeouts.medium
  },
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? (ConfigManager?.getRetryConfig()?.maxAttempts || config.retry.maxAttempts) : 1,
  
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
    baseURL: ConfigManager?.getUrl('base') || config.urls.base,
    
    /* Browser options */
    headless: ConfigManager?.getBrowserConfig()?.headless || config.browser.headless,
    viewport: ConfigManager?.getBrowserConfig()?.viewport || config.browser.viewport,
    
    /* Collect trace when retrying the failed test */
    trace: ConfigManager?.getReportingConfig()?.trace ? 'on-first-retry' : 'off',
    
    /* Take screenshot only on failure */
    screenshot: ConfigManager?.getReportingConfig()?.screenshots ? 'only-on-failure' : 'off',
    
    /* Record video on failure */
    video: ConfigManager?.getReportingConfig()?.videos ? 'retain-on-failure' : 'off',
    
    /* Action timeout */
    actionTimeout: ConfigManager?.getTimeout('medium') || config.timeouts.medium,
    
    /* Navigation timeout */
    navigationTimeout: ConfigManager?.getTimeout('navigation') || config.timeouts.navigation,
    
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
        headless: ConfigManager?.getBrowserConfig()?.headless || config.browser.headless,
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
        headless: ConfigManager?.getBrowserConfig()?.headless || config.browser.headless
      },
      dependencies: ['setup']
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        headless: ConfigManager?.getBrowserConfig()?.headless || config.browser.headless
      },
      dependencies: ['setup']
    },
    /* Mobile testing */
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        headless: ConfigManager?.getBrowserConfig()?.headless || config.browser.headless
      },
      dependencies: ['setup']
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        headless: ConfigManager?.getBrowserConfig()?.headless || config.browser.headless
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

