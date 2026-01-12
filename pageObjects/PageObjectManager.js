import LoginPage from './LoginPage.js';
import DashboardPage from './DashboardPage.js';
import CartPage from './CartPage.js';
import OrdersPage from './OrderPage.js';
import PaymentPage from './PaymentPage.js';

/**
 * Page Object Manager implementing Factory Pattern and Singleton Pattern
 * Follows Single Responsibility and Open/Closed Principles
 */
export default class PageObjectManager {
    constructor(page) {
        if (!page) {
            throw new Error('Page instance is required');
        }
        this.page = page;
        this._pageInstances = new Map();
    }

    /**
     * Generic factory method following Open/Closed Principle
     * @param {string} pageType - Type of page to create
     * @param {Function} PageClass - Page class constructor
     * @returns {Object} Page instance
     */
    _createPageInstance(pageType, PageClass) {
        if (!this._pageInstances.has(pageType)) {
            this._pageInstances.set(pageType, new PageClass(this.page));
        }
        return this._pageInstances.get(pageType);
    }

    getLoginPage() {
        return this._createPageInstance('login', LoginPage);
    }

    getDashboardPage() {
        return this._createPageInstance('dashboard', DashboardPage);
    }

    getCartPage() {
        return this._createPageInstance('cart', CartPage);
    }

    getOrdersPage() {
        return this._createPageInstance('orders', OrdersPage);
    }

    getPaymentPage() {
        return this._createPageInstance('payment', PaymentPage);
    }

    /**
     * Get all available page types
     * @returns {Array<string>} Available page types
     */
    getAvailablePages() {
        return ['login', 'dashboard', 'cart', 'orders', 'payment'];
    }

    /**
     * Clear all cached page instances
     */
    clearCache() {
        this._pageInstances.clear();
    }

    /**
     * Get page instance by type name
     * @param {string} pageType - Type of page
     * @returns {Object|null} Page instance or null if not found
     */
    getPageByType(pageType) {
        const methodMap = {
            'login': () => this.getLoginPage(),
            'dashboard': () => this.getDashboardPage(),
            'cart': () => this.getCartPage(),
            'orders': () => this.getOrdersPage(),
            'payment': () => this.getPaymentPage()
        };
        
        return methodMap[pageType] ? methodMap[pageType]() : null;
    }
}
