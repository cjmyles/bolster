'use strict';

var Backbone = require('backbone');
var Mn = require('backbone.marionette');
// require('backbone.radio');
var _ = require('underscore');

// var utils = require('../libs/utils');
var ole = require('../libs/ole');

// var RadioManager = require('../libs/radio-template');


/**
 * The Module definition
 * @return {Object} Module
 */
module.exports = function() {

  var Base = function() {
    // Add logging capability
    ole.assimilate(this);

    // Add radio communication and event listener capability
    // this.radio = new RadioManager(this);
    
    // console.log(Backbone.Radio._channels);
    // Base.__super__.constructor.apply(this, arguments);
  };

  return Base;

};