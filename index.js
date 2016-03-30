/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-wrap-urls',

  included: function(app, parentAddon) {
    var target = (parentAddon || app);

    // target.options = target.options || {};
    // target.options.babel = target.options.babel || {};
    // target.options.babel.plugins = target.options.babel.plugins || [];
    // target.options.babel.plugins.push('transform-es2015-sticky-regex');

    // app.import(app.bowerDirectory + '/unicode-string-utils/unicode-string-utils.js');

    return this._super.included(target);
  }
};
