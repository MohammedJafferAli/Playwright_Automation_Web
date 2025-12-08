import BasePage from './BasePage.js';

export default class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.selectors = {
            email: { role: 'textbox', name: 'email@example.com' },
            password: { role: 'textbox', name: 'enter your passsword' },
            loginBtn: { role: 'button', name: 'Login' }
        };
    }

    async login(username, password) {
        await this.page.getByRole('textbox', { name: 'email@example.com' }).fill(username);
        await this.page.getByRole('textbox', { name: 'enter your passsword' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
        await this.waitForNetworkIdle();
    }

    async waitForSuccessMessageToDisappear() {
        // Wait for success message to be hidden/removed from DOM
        await this.page.waitForSelector(this.selectors.successMessage, { state: 'hidden' });
    }




}