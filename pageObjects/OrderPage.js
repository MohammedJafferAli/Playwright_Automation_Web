import BasePage from './BasePage.js';

export default class OrdersPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async getOrderId() {
        return await this.page.textContent('.order-id');
    }
}