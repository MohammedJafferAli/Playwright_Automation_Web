import BasePage from './BasePage.js';

export default class PaymentPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async fillCreditCardDetails(cardDetails = {}) {
        const { cvv = '123', nameOnCard = 'Test User', month = '01', year = '25' } = cardDetails;
        
        await this.page.locator('.field.small input[type="text"]').first().fill(cvv);
        await this.page.locator('.title:has-text("Name on Card") + input').fill(nameOnCard);
        await this.page.locator('.field.small select').first().selectOption(month);
        await this.page.locator('.field.small select').last().selectOption(year);
    }

    async selectCountry(country) {
        const countryPrefix = country.toLowerCase().substring(0, 3);
        await this.page.getByRole('textbox', { name: 'Select Country' }).type(countryPrefix);
        await this.page.getByRole('button', { name: ` ${country}` }).first().click();
    }

    async placeOrder() {
        await this.page.getByText('Place Order').click();
    }

    async completePayment(paymentDetails = {}) {
        const { country = 'India' } = paymentDetails;
        await this.waitForNetworkIdle();
        await this.selectCountry(country);
        await this.placeOrder();
        await this.waitForNetworkIdle();
    }
}