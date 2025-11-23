export default class BasePage {
    constructor(page) {
        this.page = page;
    }
    async navigateTo(path = '') {
        await this.page.goto(`https://rahulshettyacademy.com/client/#/${path}`);
    }
}