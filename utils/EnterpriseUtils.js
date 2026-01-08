export class TestLogger {
  constructor(testName) {
    this.testName = testName;
    this.startTime = Date.now();
  }

  info(message, data = {}) {
    console.log(`[INFO] ${this.testName}: ${message}`, data);
  }

  error(message, error = {}) {
    console.error(`[ERROR] ${this.testName}: ${message}`, error);
  }

  step(stepName, action) {
    const stepStart = Date.now();
    console.log(`[STEP] ${stepName} - Started`);
    
    return async (...args) => {
      try {
        const result = await action(...args);
        const duration = Date.now() - stepStart;
        console.log(`[STEP] ${stepName} - Completed (${duration}ms)`);
        return result;
      } catch (error) {
        const duration = Date.now() - stepStart;
        console.error(`[STEP] ${stepName} - Failed (${duration}ms)`, error);
        throw error;
      }
    };
  }
}

export class ElementValidator {
  static async validateElement(page, selector, options = {}) {
    const element = page.locator(selector);
    
    if (options.shouldExist !== false) {
      await element.waitFor({ state: 'visible', timeout: 10000 });
    }
    
    if (options.shouldBeEnabled) {
      await expect(element).toBeEnabled();
    }
    
    if (options.text) {
      await expect(element).toContainText(options.text);
    }
    
    return element;
  }

  static sanitizeInput(input) {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
}

export class TestContext {
  constructor() {
    this.data = new Map();
    this.screenshots = [];
  }

  set(key, value) {
    this.data.set(key, value);
  }

  get(key) {
    return this.data.get(key);
  }

  async captureScreenshot(page, name) {
    const screenshot = await page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
    this.screenshots.push(screenshot);
    return screenshot;
  }
}