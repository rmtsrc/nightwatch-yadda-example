/**
 * Clicks a link by text
 * @param  {string} text to click
 * @return {object} this
 */
exports.command = function(text) {
    return this.click('xpath', '//a[text()="'+text+'"]');
};
