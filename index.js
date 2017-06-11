/* jshint node: true */
'use strict';

var util = require('util');
var extend = util._extend;
var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var map = require('broccoli-stew').map;

var defaultOptions = {
  importBootstrapSliderCSS: true,
  importAddonCss: true
};

module.exports = {
  name: 'ui-slider',
  description: 'A flexible UI slider for ambitious Ember apps',
  treeForVendor(defaultTree) {

    var sliderTree = new Funnel(
      path.join(this.project.root, 'bower_components/seiyria-bootstrap-slider/dist/'),
      { files: ['bootstrap-slider.js'] }
    );

    sliderTree = map(
      sliderTree,
      content => `if (typeof FastBoot === 'undefined') { ${content} }`
    );

    return defaultTree ? new MergeTrees([defaultTree, sliderTree]) : sliderTree;
  },
  included: function(app) {
    var parentApp = (typeof app.import !== 'function' && app.app) ? app.app : app;
    var options = extend(defaultOptions, app.options['ui-slider']);

    parentApp.import('vendor/bootstrap-slider.js');

    if (options.importBootstrapSliderCSS) {
      parentApp.import('bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.css');
    }
    if (options.importAddonCss) {
      parentApp.import('vendor/ui-slider/ui-slider.css');
    }
  }
};
