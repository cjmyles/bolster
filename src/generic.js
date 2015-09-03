'use strict';

var Mn = require('backbone.marionette');
var _ = require('underscore');

// var utils = require('../libs/utils');
var tannoy = require('../libs/tannoy');

/**
 * The Module definition
 * @return {Object} Module
 */
module.exports = (function() {

  /**
   * Module
   * @desc A model
   * @class
   */
  var Module = function() {
    
    tannoy.addLogging(this);

    Module.__super__.constructor.apply(this, arguments);    
  };

  return Module;

}());