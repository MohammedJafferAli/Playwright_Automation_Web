import BasePage from './BasePage.js';

/**
 * Payment Page Object
 */
export default class PaymentPage extends BasePage {
    constructor(page) {
        super(page);
        this.selectors = {
            cardNumber: '#cardNumber',
            expiryDate: '#expiryDate',
            cvv: '#cvv',
            payBtn: '#pay'
        };
    }

    async fillPaymentDetails(cardDetails) {
        await this.fill(this.selectors.cardNumber, cardDetails.number);
        await this.fill(this.selectors.expiryDate, cardDetails.expiry);
        await this.fill(this.selectors.cvv, cardDetails.cvv);
    }
}