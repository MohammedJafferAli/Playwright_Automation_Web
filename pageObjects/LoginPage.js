import BasePage from './BasePage.js';

/**
 * Login Page implementing Page Object Model with proper encapsulation
 * Follows Single Responsibility and Interface Segregation Principles
 */
export default class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this._initializeSelectors();
    }

    /**
     * Initialize selectors following Single Responsibility Principle
     * @private
     */
    _initializeSelectors() {
        this.selectors = Object.freeze({
            email: { role: 'textbox', name: 'email@example.com' },
            password: { role: 'textbox', name: 'enter your passsword' },
            loginBtn: { role: 'button', name: 'Login' },
            errorMessage: '[role="alert"], .toast-error, .error-message',
            successMessage: '[role="alert"], .toast-success, .success-message',
            loadingSpinner: '.loading, .spinner'
        });
    }

    /**
     * Validate login credentials
     * @param {string} username - User email
     * @param {string} password - User password
     * @throws {Error} If credentials are invalid
     * @private
     */
    _validateCredentials(username, password) {
        if (!username || typeof username !== 'string') {
            throw new Error('Username must be a non-empty string');
        }
        if (!password || typeof password !== 'string') {
            throw new Error('Password must be a non-empty string');
        }
        if (!this._isValidEmail(username)) {
            throw new Error('Username must be a valid email address');
        }
    }

    /**
     * Validate email format only
     * @param {string} email - Email to validate
     * @throws {Error} If email is invalid
     * @private
     */
    _validateEmail(email) {
        if (!email || typeof email !== 'string') {
            throw new Error('Email must be a non-empty string');
        }
        if (!this._isValidEmail(email)) {
            throw new Error('Email must be a valid email address');
        }
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if email is valid
     * @private
     */
    _isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Fill email field with validation
     * @param {string} email - Email address
     */
    async fillEmail(email) {
        this._validateEmail(email);
        await this.page.getByRole('textbox', this.selectors.email).fill(email);
    }

    /**
     * Fill password field with validation
     * @param {string} password - Password
     */
    async fillPassword(password) {
        if (!password || typeof password !== 'string') {
            throw new Error('Password must be a non-empty string');
        }
        await this.page.getByRole('textbox', this.selectors.password).fill(password);
    }

    /**
     * Click login button
     */
    async clickLoginButton() {
        await this.page.getByRole('button', this.selectors.loginBtn).click();
    }

    /**
     * Main login method with comprehensive error handling
     * @param {string} username - User email
     * @param {string} password - User password
     * @param {Object} options - Login options
     */
    async login(username, password, options = {}) {
        const { waitForNavigation = true, timeout = 30000 } = options;
        
        try {
            // Validate inputs
            this._validateCredentials(username, password);
            
            // Perform login steps
            await this.fillEmail(username);
            await this.fillPassword(password);
            
            // Wait for any loading to complete before clicking
            await this._waitForLoadingToComplete();
            
            await this.clickLoginButton();
            
            if (waitForNavigation) {
                await this.waitForNetworkIdle();
                await this._waitForLoginResult(timeout);
            }
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    /**
     * Wait for loading spinner to disappear
     * @private
     */
    async _waitForLoadingToComplete() {
        try {
            await this.page.locator(this.selectors.loadingSpinner).waitFor({ 
                state: 'hidden', 
                timeout: 5000 
            });
        } catch {
            // No loading spinner present, continue
        }
    }

    /**
     * Wait for login result (success or error)
     * @param {number} timeout - Timeout in milliseconds
     * @private
     */
    async _waitForLoginResult(timeout) {
        try {
            // Wait for either success or error message
            await Promise.race([
                this.page.locator(this.selectors.successMessage).waitFor({ 
                    state: 'visible', 
                    timeout 
                }),
                this.page.locator(this.selectors.errorMessage).waitFor({ 
                    state: 'visible', 
                    timeout 
                })
            ]);
        } catch {
            // No message appeared, assume navigation occurred
        }
    }

    /**
     * Check if login was successful
     * @returns {Promise<boolean>} True if login was successful
     */
    async isLoginSuccessful() {
        try {
            const successMessage = await this.page.locator(this.selectors.successMessage).count();
            const errorMessage = await this.page.locator(this.selectors.errorMessage).count();
            
            return successMessage > 0 && errorMessage === 0;
        } catch {
            return false;
        }
    }

    /**
     * Get login error message if present
     * @returns {Promise<string|null>} Error message or null
     */
    async getErrorMessage() {
        try {
            const errorElement = this.page.locator(this.selectors.errorMessage).first();
            await errorElement.waitFor({ state: 'visible', timeout: 5000 });
            return await errorElement.textContent();
        } catch {
            return null;
        }
    }

    /**
     * Wait for success message to disappear
     */
    async waitForSuccessMessageToDisappear() {
        try {
            await this.page.locator(this.selectors.successMessage).waitFor({ 
                state: 'hidden', 
                timeout: 10000 
            });
        } catch {
            // Message already disappeared or never appeared
        }
    }

    /**
     * Clear login form
     */
    async clearForm() {
        await this.page.getByRole('textbox', this.selectors.email).clear();
        await this.page.getByRole('textbox', this.selectors.password).clear();
    }
}