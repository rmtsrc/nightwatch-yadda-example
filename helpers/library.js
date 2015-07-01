module.exports.init = function() {
    'use strict';

    var Yadda = require('yadda'),
    English = Yadda.localisation.English,
    library = English.library()
        .given('I open $URL', function(url) {
            this.browser.go(url);
        })

        .then('it should make a screenshot titled $TITLE', function(title) {
            var filename = title + '.png';
            this.browser.saveScreenshot('screenshots/' + filename);
        })

        .then('close the browser', function() {
            this.browser.closeWindow();
        })

        .then('end the session', function() {
            this.browser.end();
        })

        .then('the title should be $TITLE', function(title) {
            this.browser.assert.title(title);
        })

        .then('the page should contain contain $TEXT', function(text) {
            this.browser.assert.containsText('body', text);
        })

        .when('I click on $SELECTOR', function(selector) {
            this.browser.click(selector);
        })

        .when('I click link "$TEXT"', function(text) {
            this.browser.clickLink(text);
        })

        .then('$SELECTOR should be visible', function(selector) {
            this.browser.assert.visible(selector);
        })

        .given('I wait until $SELECTOR is present', function(selector) {
            this.browser.assert.elementPresent(selector);
        });

    return library;
};
