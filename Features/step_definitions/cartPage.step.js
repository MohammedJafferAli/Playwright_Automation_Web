import { When } from '@cucumber/cucumber';

When('I proceed to checkout', async function () {
  await this.pom.getCartPage().checkout();
});