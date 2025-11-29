Feature: E-commerce End-to-End Shopping Journey
  As a customer
  I want to complete a full shopping journey
  So that I can purchase products successfully

  Background:
    Given I am on the e-commerce application

 
  @regression
  Scenario Outline: Purchase different products successfully
    Given I navigate to the login page
    When I login with valid credentials
    And I add "<product>" to the cart
    And I navigate to the cart page
    And I proceed to checkout
    And I complete the payment with default details
    Then I should receive a valid order confirmation
    And the order ID should be generated successfully

    Examples:
      | product         |
      | ADIDAS ORIGINAL |
      | IPHONE 13 PRO   |
      | ZARA COAT 3     |
