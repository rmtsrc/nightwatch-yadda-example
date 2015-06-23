module.exports = function() {
    'use strict';

    var TestRunner = require('../helpers/testRunner'),
        testRunner = new TestRunner();

    testRunner.getLibrary()
        .given("I'm on the DuckDuckGo homepage", function() {
            this.browser.url('https://duckduckgo.com/');
        })

        .when('I search for "$QUERY"', function(query) {
            this.browser.waitForElementVisible('body', 1000)
              .setValue('input[type=text]', query)
              .waitForElementVisible('input[id=search_button_homepage]', 1000)
              .click('input[id=search_button_homepage]')
              .pause(1000);
        })

        .then('I should see search results for "$QUERY"', function(query) {
            this.browser.assert.containsText('.results', query);
        });

    return testRunner.run(__filename);
}();
