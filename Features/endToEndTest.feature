Feature: E-commerce End-to-End Shopping Journey
  As a customer
  I want to complete a full shopping journey
  So that I can purchase products successfully

  Background:
    Given I am on the e-commerce application

  @smoke @e2e
  Scenario: Complete product purchase flow with valid credentials
    Given I navigate to the login page
    When I login with valid credentials
    Then I should be redirected to the dashboard
    When I add "ADIDAS ORIGINAL" to the cart
    And I navigate to the cart page
    Then the product should be visible in the cart
    When I proceed to checkout
    And I complete the payment with the following details:
      | cvv        |      123 |
      | nameOnCard | John Doe |
      | country    | India    |
    Then I should receive a valid order confirmation
    And the order ID should be generated successfully

  