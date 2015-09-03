'use strict';

var Mn = require('backbone.marionette');
var _ = require('underscore');

// var utils = require('../libs/utils');
var tannoy = require('../libs/tannoy');
var radio = require('../libs/radio');

/**
 * The Module definition
 * @return {Object} Module
 */
module.exports = function(channels) {

  var Base = function() {
    tannoy.addLogging(this);

    if (this.radioEvents) {
      var Radio = radio(channels);
      this.radioManager = new Radio(this);
    }

    Base.__super__.constructor.apply(this, arguments);
  };

  return Base;

};