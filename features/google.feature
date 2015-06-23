Feature: Google search

  Scenario: Searching on Google for Nightwatch and Yadda
    Given I'm on the Google homepage
    When I search for "Nightwatch Yadda"
    And it should make a screenshot titled Google
    Then I should see search results for "Nightwatch"
    And I should see search results for "Yadda"
