var fs = require('fs'),
    Yadda = require('yadda'),
    parser = new Yadda.parsers.FeatureParser(),
    EventBus = Yadda.EventBus;

/**
 * Show feature steps on execution
 */
EventBus.instance().on(EventBus.ON_EXECUTE, function(event) {
    console.log("\x1b[36m "+event.data.step);
});

/**
 * Returns a Yadda parsed feature object
 * @param  {string} jsFile location of JS test
 * @return {object} Yadda feature
 */
function getFeature(jsFile) {
    function getRootPath() {
        var path = __dirname.split(require('path').sep);
        path.pop();
        return path.join(require('path').sep);
    }

    function removeFileExtension(filename) {
        return filename.replace(/\.[^/.]+$/, '');
    }

    var featureFilename = removeFileExtension(jsFile).replace(getRootPath()+'/tests', 'features'),
        text = fs.readFileSync(featureFilename + '.feature', 'utf8');

    return parser.parse(text);
}

/**
 * Creates a new Test Runner
 * @class
 */
function TestRunner() {
    'use strict';
    this.steps = {};

    // Close the session when done
    this.steps.after = function(browser) {
        browser.end();
    };

    this.library = require('../helpers/library').init();
    this.yadda = new Yadda.Yadda(this.library);
}

/**
 * Returns the Yadda library
 * @return {object} Yadda library
 */
TestRunner.prototype.getLibrary = function getLibrary() {
    'use strict';
    return this.library;
};

/**
 * Kicks off the test runner propper
 * @param  {string} filename test filename
 * @return {object} Nightwatch test steps
 */
TestRunner.prototype.run = function run(filename) {
    'use strict';
    var feature = getFeature(filename);

    feature.scenarios.forEach(function(scenario) {
        this.steps[scenario.title] = function(browser) {
            this.yadda.run(scenario.steps, { browser: browser });
        }.bind(this);
    }.bind(this));

    return this.steps;
};

module.exports = TestRunner;
