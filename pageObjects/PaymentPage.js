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
        await this.page.locator('input[placeholder="Select Country"]').type(country);
    }

    async placeOrder() {
        await this.page.locator('a:has-text("Place Order")').click();
    }

    async completePayment(paymentDetails = {}) {
        const { cardDetails = {}, country = 'India' } = paymentDetails;
        
        await this.fillCreditCardDetails(cardDetails);
        await this.selectCountry(country);
        await this.placeOrder();
    }
}