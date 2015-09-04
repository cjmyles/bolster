'use strict';

var Backbone = require('backbone');
var Mn = require('backbone.marionette');
// require('backbone.radio');
var _ = require('underscore');

// var utils = require('../libs/utils');
var logger = require('../libs/logger');
var Radio = require('../libs/radio');

/**
 * The Module definition
 * @return {Object} Module
 */
module.exports = function(options) {

  var Base = function() {
    logger.assimilate(this);


    var RadioClass = Radio(options);
    this.radio = new RadioClass(this);
    
    Base.__super__.constructor.apply(this, arguments);
  };

  return Base;

};