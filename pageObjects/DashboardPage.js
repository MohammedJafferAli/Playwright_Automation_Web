import BasePage from './BasePage.js';

export default class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async addProductToCart(productName) {
        const products = this.page.locator('.card-body');
        const count = await products.count();
        
        for (let i = 0; i < count; i++) {
            const name = await products.nth(i).locator('b').textContent();
            if (name.trim() === productName) {
                await products.nth(i).locator('text=Add To Cart').click();
                break;
            }
        }
    }

    async goToCart() {
        await this.page.click('button[routerlink="/dashboard/cart"]');
    }
}