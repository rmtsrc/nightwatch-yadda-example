module.exports = function() {
    'use strict';

    var TestRunner = require('../helpers/testRunner'),
        testRunner = new TestRunner();

    testRunner.getLibrary()
        .given("I'm on the Google homepage", function() {
            this.browser.go('/');
        })

        .when('I search for "$QUERY"', function(query) {
            this.browser.waitForElementVisible('body', 1000)
              .setValue('input[type=text]', query)
              .waitForElementVisible('button[name=btnG]', 1000)
              .click('button[name=btnG]')
              .pause(1000);
        })

        .then('I should see search results for "$QUERY"', function(query) {
            this.browser.assert.containsText('#main', query);
        });

    return testRunner.run(__filename);
}();
