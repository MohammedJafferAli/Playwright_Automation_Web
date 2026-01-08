Feature: Smart Element Detection
  As a tester
  I want to interact with elements using natural language
  So that I don't need to know technical selectors

  @smart @smoke
  Scenario: Login using smart detection
    Given I navigate to "https://rahulshettyacademy.com/loginpagePractise/"
    When I type "rahulshettyacademy" in "username"
    And I type "learning" in "password"
    And I click "Sign In" in "loginpage"
    Then I should see "ProtoCommerce"
    And User takes screenshot for cucumber report