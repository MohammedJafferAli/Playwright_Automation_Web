import BasePage from './BasePage.js';

export default class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async checkout() {
        await this.page.click('text=Checkout');
    }
}