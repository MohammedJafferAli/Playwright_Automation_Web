/**
 * Test Data Manager implementing Strategy Pattern
 * Follows Single Responsibility and Open/Closed Principles
 */

/**
 * Abstract data source interface
 */
class DataSource {
  async getData(key) {
    throw new Error('getData method must be implemented');
  }

  async setData(key, value) {
    throw new Error('setData method must be implemented');
  }
}

/**
 * JSON file data source
 */
class JsonDataSource extends DataSource {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    this._cache = new Map();
  }

  async getData(key) {
    if (this._cache.has(key)) {
      return this._cache.get(key);
    }

    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const fullPath = path.resolve(this.filePath);
      
      if (!fs.existsSync(fullPath)) {
        return null;
      }

      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      const value = this._getNestedValue(data, key);
      
      this._cache.set(key, value);
      return value;
    } catch (error) {
      console.warn(`Failed to read data for key ${key}:`, error.message);
      return null;
    }
  }

  async setData(key, value) {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const fullPath = path.resolve(this.filePath);
      let data = {};
      
      if (fs.existsSync(fullPath)) {
        data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      }
      
      this._setNestedValue(data, key, value);
      
      // Ensure directory exists
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
      this._cache.set(key, value);
    } catch (error) {
      throw new Error(`Failed to set data for key ${key}: ${error.message}`);
    }
  }

  _getNestedValue(obj, key) {
    return key.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  _setNestedValue(obj, key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, prop) => {
      if (!current[prop]) current[prop] = {};
      return current[prop];
    }, obj);
    target[lastKey] = value;
  }
}

/**
 * Environment data source
 */
class EnvironmentDataSource extends DataSource {
  async getData(key) {
    return process.env[key.toUpperCase().replace(/\./g, '_')] || null;
  }

  async setData(key, value) {
    process.env[key.toUpperCase().replace(/\./g, '_')] = value;
  }
}

/**
 * In-memory data source
 */
class MemoryDataSource extends DataSource {
  constructor() {
    super();
    this._data = new Map();
  }

  async getData(key) {
    return this._data.get(key) || null;
  }

  async setData(key, value) {
    this._data.set(key, value);
  }

  clear() {
    this._data.clear();
  }
}

/**
 * Test Data Manager with multiple data sources
 */
class TestDataManager {
  constructor() {
    if (TestDataManager.instance) {
      return TestDataManager.instance;
    }

    this._dataSources = [];
    this._defaultData = this._initializeDefaultData();
    
    // Initialize default data sources
    this.addDataSource(new EnvironmentDataSource());
    this.addDataSource(new JsonDataSource('test-data/users.json'));
    this.addDataSource(new MemoryDataSource());
    
    TestDataManager.instance = this;
  }

  /**
   * Initialize default test data
   */
  _initializeDefaultData() {
    return {
      users: {
        valid: {
          email: 'JafTester1@gmail.com',
          password: 'Pl@y1234',
          firstName: 'Test',
          lastName: 'User'
        },
        invalid: {
          email: 'invalid@test.com',
          password: 'wrongpass'
        },
        admin: {
          email: 'admin@test.com',
          password: 'admin123'
        }
      },
      products: {
        sample: {
          name: 'Sample Product',
          price: 99.99,
          category: 'Electronics'
        }
      },
      urls: {
        base: 'https://rahulshettyacademy.com/client/#/',
        login: 'https://rahulshettyacademy.com/loginpagePractise/',
        api: 'https://rahulshettyacademy.com/api'
      },
      credentials: {
        practice: {
          valid: {
            username: 'rahulshettyacademy',
            password: 'learning'
          }
        }
      }
    };
  }

  /**
   * Add data source
   * @param {DataSource} dataSource - Data source to add
   */
  addDataSource(dataSource) {
    if (!(dataSource instanceof DataSource)) {
      throw new Error('Data source must extend DataSource class');
    }
    this._dataSources.push(dataSource);
  }

  /**
   * Get data from sources (first found wins)
   * @param {string} key - Data key (supports dot notation)
   * @returns {Promise<*>} Data value
   */
  async getData(key) {
    // Try data sources first
    for (const source of this._dataSources) {
      try {
        const value = await source.getData(key);
        if (value !== null && value !== undefined) {
          return value;
        }
      } catch (error) {
        console.warn(`Data source error for key ${key}:`, error.message);
      }
    }

    // Fall back to default data
    return this._getNestedValue(this._defaultData, key);
  }

  /**
   * Set data in memory source
   * @param {string} key - Data key
   * @param {*} value - Data value
   */
  async setData(key, value) {
    const memorySource = this._dataSources.find(source => source instanceof MemoryDataSource);
    if (memorySource) {
      await memorySource.setData(key, value);
    } else {
      throw new Error('No memory data source available');
    }
  }

  /**
   * Get user data
   * @param {string} userType - Type of user (valid, invalid, admin)
   * @returns {Promise<Object>} User data
   */
  async getUser(userType = 'valid') {
    return await this.getData(`users.${userType}`);
  }

  /**
   * Get product data
   * @param {string} productType - Type of product
   * @returns {Promise<Object>} Product data
   */
  async getProduct(productType = 'sample') {
    return await this.getData(`products.${productType}`);
  }

  /**
   * Get URL
   * @param {string} urlType - Type of URL (base, login, api)
   * @returns {Promise<string>} URL
   */
  async getUrl(urlType = 'base') {
    return await this.getData(`urls.${urlType}`);
  }

  /**
   * Generate random user data
   * @returns {Object} Random user data
   */
  generateRandomUser() {
    const timestamp = Date.now();
    return {
      email: `test${timestamp}@example.com`,
      password: `Pass${timestamp}!`,
      firstName: `Test${timestamp}`,
      lastName: 'User'
    };
  }

  /**
   * Generate test data for specific scenario
   * @param {string} scenario - Test scenario name
   * @returns {Object} Generated test data
   */
  generateScenarioData(scenario) {
    const generators = {
      'login': () => ({
        validUser: this.generateRandomUser(),
        invalidUser: { email: 'invalid@test.com', password: 'wrong' }
      }),
      'registration': () => ({
        newUser: {
          ...this.generateRandomUser(),
          confirmPassword: 'Pass' + Date.now() + '!'
        }
      }),
      'checkout': () => ({
        shippingAddress: {
          street: '123 Test St',
          city: 'Test City',
          zipCode: '12345',
          country: 'US'
        },
        paymentInfo: {
          cardNumber: '4111111111111111',
          expiryDate: '12/25',
          cvv: '123'
        }
      })
    };

    const generator = generators[scenario];
    if (!generator) {
      throw new Error(`No generator found for scenario: ${scenario}`);
    }

    return generator();
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this._dataSources.forEach(source => {
      if (source instanceof JsonDataSource) {
        source._cache.clear();
      } else if (source instanceof MemoryDataSource) {
        source.clear();
      }
    });
  }

  /**
   * Get nested value from object
   */
  _getNestedValue(obj, key) {
    if (!key) return obj;
    return key.split('.').reduce((current, prop) => current?.[prop], obj);
  }
}

// Export classes and singleton instance
export { 
  TestDataManager, 
  DataSource, 
  JsonDataSource, 
  EnvironmentDataSource, 
  MemoryDataSource 
};

export default new TestDataManager();