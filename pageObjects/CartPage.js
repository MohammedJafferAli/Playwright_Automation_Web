import BasePage from './BasePage.js';

/**
 * Cart Page Object
 */
export default class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.selectors = {
            cartItems: '.cart-item',
            checkoutBtn: '#checkout'
        };
    }

    async getCartItems() {
        return await this.page.locator(this.selectors.cartItems).count();
    }
}