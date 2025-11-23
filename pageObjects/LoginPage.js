import BasePage from './BasePage.js';

export default class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async login(username, password) {
        await this.page.locator("#userEmail").fill(username);
        await this.page.locator("#userPassword").fill(password);
        await this.page.locator("#login").click();
    }
}