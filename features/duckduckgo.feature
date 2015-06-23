Feature: DuckDuckGo search

  Scenario: Searching on DuckDuckGo for Nightwatch and Yadda
    Given I'm on the DuckDuckGo homepage
    When I search for "Nightwatch Yadda"
    And it should make a screenshot titled DuckDuckGo
    Then I should see search results for "Nightwatch"
    And I should see search results for "Yadda"
