import BasePage from './BasePage.js';

/**
 * Dashboard Page Object
 */
export default class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        this.selectors = {
            productCards: '.card-body h5 b',
            addToCartBtn: '[data-testid="add-to-cart"]'
        };
    }

    async getProducts() {
        return await this.page.locator(this.selectors.productCards).allTextContents();
    }
}