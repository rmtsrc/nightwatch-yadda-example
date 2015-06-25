/**
 * Navigates to a relative uri
 * @param  {string} uri relative uri
 * @return {object} this
 */
exports.command = function(uri) {
    return this.url(this.launchUrl + uri);
};
