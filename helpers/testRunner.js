var fs = require('fs'),
    Yadda = require('yadda'),
    parser = new Yadda.parsers.FeatureParser();

function TestRunner() {
    'use strict';
    this.steps = {};
    this.steps.before = function(browser) {
        browser.go = function(uri) {
            browser.url(browser.launchUrl + uri);
        };
    };

    this.steps.after = function(browser){
        browser.end();
    };

    this.library = require('../helpers/library').init();
    this.yadda = new Yadda.Yadda(this.library);
}

TestRunner.prototype.getLibrary = function getLibrary() {
    'use strict';
    return this.library;
};

TestRunner.prototype.run = function run(filename) {
    'use strict';
    filename = filename.slice(filename.lastIndexOf(require('path').sep)+1, filename.length -3);

    var text = fs.readFileSync('features/' + filename + '.feature', 'utf8'),
        feature = parser.parse(text);

    feature.scenarios.forEach(function(scenario) {
        this.steps[scenario.title] = function(browser) {
            this.yadda.yadda(scenario.steps, { browser: browser });
        }.bind(this);
    }.bind(this));

    return this.steps;
};

module.exports = TestRunner;
