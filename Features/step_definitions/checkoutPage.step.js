import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I complete the payment with default details', async function () {
  await this.pom.getPaymentPage().completePayment({
    cardDetails: { cvv: '123', nameOnCard: 'John Doe' },
    country: 'India'
  });
});

When('I complete the payment with the following details:', async function (dataTable) {
  await this.pom.getPaymentPage().completePayment({
    cardDetails: { cvv: '123', nameOnCard: 'John Doe' },
    country: 'India'
  });
});

Then('I should receive a valid order confirmation', async function () {
  const isThankYouDisplayed = await this.pom.getOrdersPage().checkThankYouMessage();
  expect(isThankYouDisplayed).toBe(true);
});

Then('the order ID should be generated successfully', async function () {
  this.orderId = await this.pom.getOrdersPage().getOrderId();
  expect(this.orderId).not.toBeNull();
  expect(this.orderId.length).toBeGreaterThan(0);
});