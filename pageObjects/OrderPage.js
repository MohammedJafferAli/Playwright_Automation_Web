import BasePage from './BasePage.js';

/**
 * Orders Page Object
 */
export default class OrdersPage extends BasePage {
    constructor(page) {
        super(page);
        this.selectors = {
            ordersList: '.order-item',
            orderDetails: '.order-details'
        };
    }

    async getOrders() {
        return await this.page.locator(this.selectors.ordersList).count();
    }
}