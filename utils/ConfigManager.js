/**
 * Configuration Manager implementing Singleton Pattern
 * Follows Single Responsibility and Dependency Inversion Principles
 */
class ConfigManager {
    constructor() {
        if (ConfigManager.instance) {
            return ConfigManager.instance;
        }
        
        this._config = this._loadConfiguration();
        ConfigManager.instance = this;
    }

    /**
     * Load configuration from environment variables and defaults
     * @private
     */
    _loadConfiguration() {
        return {
            // Browser Configuration
            browser: {
                headless: process.env.HEADLESS !== 'false',
                slowMo: parseInt(process.env.SLOW_MO) || 0,
                timeout: parseInt(process.env.TIMEOUT) || 30000,
                viewport: {
                    width: parseInt(process.env.VIEWPORT_WIDTH) || 1280,
                    height: parseInt(process.env.VIEWPORT_HEIGHT) || 720
                }
            },
            
            // Application URLs
            urls: {
                base: process.env.BASE_URL || 'https://rahulshettyacademy.com/client/#/',
                login: process.env.LOGIN_URL || 'https://rahulshettyacademy.com/loginpagePractise/',
                api: process.env.API_URL || 'https://rahulshettyacademy.com/api'
            },
            
            // Test Data
            testData: {
                validUser: {
                    email: process.env.VALID_EMAIL || 'JafTester1@gmail.com',
                    password: process.env.VALID_PASSWORD || 'Pl@y1234'
                },
                invalidUser: {
                    email: process.env.INVALID_EMAIL || 'invalid@test.com',
                    password: process.env.INVALID_PASSWORD || 'wrongpass'
                }
            },
            
            // Timeouts
            timeouts: {
                short: 5000,
                medium: 15000,
                long: 30000,
                navigation: 60000
            },
            
            // Retry Configuration
            retry: {
                maxAttempts: parseInt(process.env.MAX_RETRY_ATTEMPTS) || 3,
                delay: parseInt(process.env.RETRY_DELAY) || 1000
            },
            
            // Reporting
            reporting: {
                screenshots: process.env.SCREENSHOTS !== 'false',
                videos: process.env.VIDEOS === 'true',
                trace: process.env.TRACE !== 'false'
            }
        };
    }

    /**
     * Get browser configuration
     * @returns {Object} Browser configuration
     */
    getBrowserConfig() {
        return { ...this._config.browser };
    }

    /**
     * Get URL configuration
     * @param {string} type - URL type (base, login, api)
     * @returns {string} URL
     */
    getUrl(type = 'base') {
        return this._config.urls[type] || this._config.urls.base;
    }

    /**
     * Get test data
     * @param {string} userType - User type (validUser, invalidUser)
     * @returns {Object} User credentials
     */
    getTestData(userType = 'validUser') {
        return { ...this._config.testData[userType] };
    }

    /**
     * Get timeout value
     * @param {string} type - Timeout type (short, medium, long, navigation)
     * @returns {number} Timeout in milliseconds
     */
    getTimeout(type = 'medium') {
        return this._config.timeouts[type] || this._config.timeouts.medium;
    }

    /**
     * Get retry configuration
     * @returns {Object} Retry configuration
     */
    getRetryConfig() {
        return { ...this._config.retry };
    }

    /**
     * Get reporting configuration
     * @returns {Object} Reporting configuration
     */
    getReportingConfig() {
        return { ...this._config.reporting };
    }

    /**
     * Update configuration at runtime
     * @param {string} path - Configuration path (e.g., 'browser.headless')
     * @param {*} value - New value
     */
    updateConfig(path, value) {
        const keys = path.split('.');
        let current = this._config;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
    }

    /**
     * Get full configuration
     * @returns {Object} Complete configuration
     */
    getFullConfig() {
        return JSON.parse(JSON.stringify(this._config));
    }

    /**
     * Validate configuration
     * @returns {Array} Array of validation errors
     */
    validateConfig() {
        const errors = [];
        
        // Validate URLs
        Object.entries(this._config.urls).forEach(([key, url]) => {
            try {
                new URL(url);
            } catch {
                errors.push(`Invalid URL for ${key}: ${url}`);
            }
        });
        
        // Validate timeouts
        Object.entries(this._config.timeouts).forEach(([key, timeout]) => {
            if (typeof timeout !== 'number' || timeout <= 0) {
                errors.push(`Invalid timeout for ${key}: ${timeout}`);
            }
        });
        
        // Validate retry configuration
        if (this._config.retry.maxAttempts <= 0) {
            errors.push('Max retry attempts must be greater than 0');
        }
        
        return errors;
    }
}

// Export singleton instance
export default new ConfigManager();