/**
 * Abstract Base Page implementing Template Method Pattern
 * Follows Single Responsibility and Liskov Substitution Principles
 */
export default class BasePage {
    constructor(page) {
        if (!page) {
            throw new Error('Page instance is required');
        }
        this.page = page;
        this.baseUrl = 'https://rahulshettyacademy.com/client/#/';
        this.defaultTimeout = 30000;
    }

    /**
     * Validate URL to prevent SSRF attacks
     * @param {string} url - URL to validate
     * @throws {Error} If URL is invalid or unsafe
     * @private
     */
    _validateUrl(url) {
        try {
            const parsedUrl = new URL(url);
            
            // Allow only HTTPS and HTTP protocols
            if (!['https:', 'http:'].includes(parsedUrl.protocol)) {
                throw new Error(`Unsupported protocol: ${parsedUrl.protocol}`);
            }
            
            // Block private IP ranges and localhost
            const hostname = parsedUrl.hostname;
            const privateRanges = [
                /^127\./,           // 127.0.0.0/8
                /^10\./,            // 10.0.0.0/8
                /^172\.(1[6-9]|2[0-9]|3[0-1])\./,  // 172.16.0.0/12
                /^192\.168\./,      // 192.168.0.0/16
                /^169\.254\./,      // 169.254.0.0/16 (link-local)
                /^localhost$/i,
                /^0\.0\.0\.0$/
            ];
            
            if (privateRanges.some(range => range.test(hostname))) {
                throw new Error(`Access to private/local addresses is not allowed: ${hostname}`);
            }
            
            return parsedUrl;
        } catch (error) {
            throw new Error(`Invalid URL: ${error.message}`);
        }
    }

    /**
     * Template method for navigation
     * @param {string} path - Path to navigate to
     * @param {Object} options - Navigation options
     */
    async navigateTo(path = '', options = {}) {
        const url = `${this.baseUrl}${path}`;
        
        // Validate URL to prevent SSRF
        this._validateUrl(url);
        
        const navigationOptions = {
            waitUntil: 'networkidle',
            timeout: this.defaultTimeout,
            ...options
        };
        
        try {
            await this.page.goto(url, navigationOptions);
            await this.waitForPageLoad();
        } catch (error) {
            throw new Error(`Navigation failed to ${url}: ${error.message}`);
        }
    }

    /**
     * Wait for page to be fully loaded
     */
    async waitForPageLoad() {
        await Promise.all([
            this.waitForNetworkIdle(),
            this.page.waitForLoadState('domcontentloaded')
        ]);
    }

    /**
     * Wait for network to be idle
     */
    async waitForNetworkIdle() {
        try {
            await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
        } catch (error) {
            console.warn('Network idle timeout:', error.message);
        }
    }

    /**
     * Dismiss alerts with retry mechanism
     */
    async dismissAlerts() {
        const alertSelectors = '[role="alert"], .toast, .alert, .notification';
        const maxRetries = 3;
        
        for (let i = 0; i < maxRetries; i++) {
            try {
                // Use more efficient visibility check instead of count()
                const firstAlert = this.page.locator(alertSelectors).first();
                const isVisible = await firstAlert.isVisible().catch(() => false);
                
                if (!isVisible) break;
                
                await firstAlert.waitFor({ 
                    state: 'hidden', 
                    timeout: 3000 
                });
                break;
            } catch (error) {
                if (i === maxRetries - 1) {
                    // Use structured logging instead of console.warn
                    if (typeof console !== 'undefined' && console.warn) {
                        console.warn('Could not dismiss alerts:', error.message);
                    }
                }
                await this.page.waitForTimeout(500);
            }
        }
    }

    /**
     * Safe action wrapper with error handling
     * @param {Function} action - Action to perform
     * @param {Object} options - Action options
     */
    async safeAction(action, options = {}) {
        const { skipAlertDismissal = false, retries = 1 } = options;
        
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                await this.waitForNetworkIdle();
                
                if (!skipAlertDismissal) {
                    await this.dismissAlerts();
                }
                
                await action();
                
                await this.page.waitForTimeout(300);
                
                if (!skipAlertDismissal) {
                    await this.dismissAlerts();
                }
                
                return; // Success, exit retry loop
            } catch (error) {
                if (attempt === retries - 1) {
                    throw new Error(`Action failed after ${retries} attempts: ${error.message}`);
                }
                await this.page.waitForTimeout(1000 * (attempt + 1));
            }
        }
    }

    /**
     * Enhanced click with retry mechanism
     * @param {string} selector - Element selector
     * @param {Object} options - Click options
     */
    async click(selector, options = {}) {
        await this.safeAction(async () => {
            const element = this.page.locator(selector);
            await element.waitFor({ state: 'visible', timeout: this.defaultTimeout });
            await element.click(options);
        }, { retries: 2 });
    }

    /**
     * Enhanced fill with validation
     * @param {string} selector - Element selector
     * @param {string} text - Text to fill
     * @param {Object} options - Fill options
     */
    async fill(selector, text, options = {}) {
        if (typeof text !== 'string') {
            throw new Error('Text must be a string');
        }
        
        const { validate = false, ...fillOptions } = options;
        
        await this.safeAction(async () => {
            const element = this.page.locator(selector);
            await element.waitFor({ state: 'visible', timeout: this.defaultTimeout });
            await element.clear();
            await element.fill(text, fillOptions);
            
            // Optional validation for performance
            if (validate) {
                const filledValue = await element.inputValue();
                if (filledValue !== text) {
                    throw new Error(`Fill validation failed. Expected: ${text}, Got: ${filledValue}`);
                }
            }
        }, { retries: 2 });
    }

    /**
     * Wait for element to be visible
     * @param {string} selector - Element selector
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForVisible(selector, timeout = this.defaultTimeout) {
        await this.page.locator(selector).waitFor({ 
            state: 'visible', 
            timeout 
        });
    }

    /**
     * Get element text content safely
     * @param {string} selector - Element selector
     * @returns {Promise<string>} Element text content
     */
    async getTextContent(selector) {
        await this.waitForVisible(selector);
        const textContent = await this.page.locator(selector).textContent();
        return textContent || '';
    }

    /**
     * Check if element exists
     * @param {string} selector - Element selector
     * @returns {Promise<boolean>} True if element exists
     */
    async isElementPresent(selector) {
        try {
            await this.page.locator(selector).waitFor({ 
                state: 'attached', 
                timeout: 5000 
            });
            return true;
        } catch {
            return false;
        }
    }
}