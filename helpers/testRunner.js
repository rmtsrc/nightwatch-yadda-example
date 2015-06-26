var fs = require('fs'),
    Yadda = require('yadda'),
    parser = new Yadda.parsers.FeatureParser(),
    EventBus = Yadda.EventBus;

EventBus.instance().on(EventBus.ON_EXECUTE, function(event) {
    console.log("\x1b[36m "+event.data.step);
});

function TestRunner() {
    'use strict';
    this.steps = {};

    this.steps.after = function(browser) {
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
            this.yadda.run(scenario.steps, { browser: browser });
        }.bind(this);
    }.bind(this));

    return this.steps;
};

module.exports = TestRunner;
