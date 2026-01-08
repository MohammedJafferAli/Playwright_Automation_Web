Feature: Dynamic Element Interactions
  As a new tester
  I want to interact with any element dynamically
  So that I can test without pre-written step definitions

  @dynamic @smoke
  Scenario: Login using dynamic steps
    Given I navigate to "https://rahulshettyacademy.com/loginpagePractise/"
    When I type "rahulshettyacademy" into element "#username"
    And I type "learning" into element "#password"
    And I click on element "#signInBtn"
    Then element ".card-title" should be visible
    And User takes screenshot for cucumber report