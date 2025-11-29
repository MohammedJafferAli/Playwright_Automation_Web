import BasePage from './BasePage.js';

export default class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async addProductToCart(productName) {
        await this.waitForNetworkIdle();
        await this.page.getByRole('button', { name: ' Add To Cart' }).first().click();
        await this.dismissAlerts();
    }

    async waitForToastDisappear() {
        // Wait for the toast message to disappear from the page
        await this.page.waitForSelector('div[role="alert"].toast-message', {
            state: 'hidden',
            timeout: 5000
        });
    }

    async goToCart() {
        await this.dismissAlerts();
        await this.page.locator('button[routerlink="/dashboard/cart"]').click();
        await this.waitForNetworkIdle();
    }

    async checkDashboardUrl() {
    const currentUrl = this.page.url();
    return currentUrl.includes('dashboard/dash');
}    }