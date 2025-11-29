import { When, Then } from '@cucumber/cucumber';

When('I add {string} to the cart', async function (productName) {
  await this.pom.getDashboardPage().addProductToCart(productName);
});

When('I navigate to the cart page', async function () {
  await this.pom.getDashboardPage().goToCart();
});

Then('the product should be visible in the cart', async function () {
  await this.pom.getCartPage().isProductInCart();
});
