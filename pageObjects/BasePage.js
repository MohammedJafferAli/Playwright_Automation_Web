export default class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(path = '') {
        await this.page.goto(`https://rahulshettyacademy.com/client/#/${path}`);
        await this.waitForNetworkIdle();
    }

    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle');
    }

    async dismissAlerts() {
        try {
            // Wait for alerts to be hidden before proceeding
            await this.page.locator('[role="alert"], .toast, .alert').waitFor({ state: 'hidden', timeout: 3000 });
            // Double check that all alerts are gone
            await this.page.waitForSelector('[role="alert"], .toast, .alert', { state: 'detached', timeout: 1000 });
        } catch (e) {
            // No alerts to dismiss
        }
    }

    async safeAction(action) {
        await this.waitForNetworkIdle();
        // Ensure alerts are dismissed before action
        await this.dismissAlerts();
        await action();
        // Wait for any new alerts to appear
        await this.page.waitForTimeout(500);
        // Ensure alerts are dismissed after action
        await this.dismissAlerts();
        await this.waitForNetworkIdle();
    }

    

    async click(selector, options = {}) {
        await this.safeAction(async () => {
            await this.page.click(selector, options);
        });
    }

    async fill(selector, text) {
        await this.safeAction(async () => {
            await this.page.fill(selector, text);
        });
    }
}