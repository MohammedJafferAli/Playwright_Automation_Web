Feature: Screenshot Capture for Reports
  As a tester
  I want to capture screenshots during test execution
  So that I can have visual evidence in Cucumber and Allure reports

  @screenshot @smoke
  Scenario: Capture screenshot for documentation
    Given I navigate to "https://rahulshettyacademy.com/loginpagePractise/"
    When User takes screenshot for cucumber report