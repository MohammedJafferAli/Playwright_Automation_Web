import BasePage from './BasePage.js';

export default class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async checkout() {
        await this.waitForNetworkIdle();
        await this.dismissAlerts();
        await this.page.getByRole('button', { name: 'Checkout❯' }).click();
        await this.waitForNetworkIdle();
    }
    async checkCartUrl() {
        const currentUrl = this.page.url();
        return currentUrl.includes('dashboard/cart');
    }

    async isProductInCart(productName) {
    // Check if the specified product exists in the cart
    const product = await this.page.locator(`text=${productName}`).first();
    return await product.isVisible();
}    
}