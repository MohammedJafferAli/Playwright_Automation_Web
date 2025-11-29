import BasePage from './BasePage.js';

export default class OrdersPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async checkThankYouMessage() {
        const thankYouText = await this.page.locator('h1.hero-primary').textContent();
        return thankYouText.includes('Thankyou for the order');
    }

    async getOrderId() {
        const orderIdElement = await this.page.locator('label.ng-star-inserted').textContent();
        const orderId = orderIdElement.replace(/\|/g, '').trim();
        console.log('Order ID:', orderId);
        return orderId;
    }
}