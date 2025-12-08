Feature: Login Error Validation
  As a user
  I want to see appropriate error messages
  So that I know when my login credentials are incorrect
  Background:
    Given I am on the e-commerce application

  @errorValidation
  Scenario Outline: Display error message for invalid credentials
       Given I navigate to the login page
    When I enter invalid email "<email>"
    And I enter invalid password "<password>"
    And I click the login button
    Then I should see error message "Incorrect email or password."

    Examples:
      | email              | password    |
      | hagh@gahbja.com    | jasbjhas    |
      | invalid@test.com   | wrongpass   |
      | test@invalid.org   | 12345       |
      | user@fake.net      | password    |
      | admin@wrong.com    | admin123    |