'use strict';

var Backbone = require('backbone');
var Mn = require('backbone.marionette');
require('backbone.radio');
var _ = require('underscore');

var ANTONYMNS = {
  'on': 'off',
  'comply': 'stopComplying',
  'reply': 'stopReplying'
};

/**
 * Radio
 */
// var Channels = function(channels) {
//   var methods = {};

//   _.each(channels, function(id) {
//     methods[id] = Backbone.Radio.channel(id);
//   });

//   return methods;
// };

module.exports = Mn.Object.extend({

  // channels: channels,

  // Protected Functions
  // --------------------------

  initialize: function(owner) {
    if (owner) {
      owner.normalizeMethods = Mn.normalizeMethods;
      this.owner = owner;
    }      
  },

  // Private Functions
  // --------------------------

  // Public Functions
  // --------------------------

  start: function() {
    var owner = this.owner,
      events = owner.radioEvents;

    _.each(events, function(x, key) {
      _.each(events[key], function(y, command) {
        // console.log('radio[' + key + '][' + command + ']', y);
        Backbone.Radio.channel('key')[command](owner.normalizeMethods(y), owner);
      });
    });
  },

  stop: function(stopListening) {
    // console.log('manager:stop listening? ', stopListening);
    var owner = this.owner,
      events = owner.radioEvents;

    _.each(events, function(x, key) {
      _.each(events[key], function(y, command) {
        command = ANTONYMNS[command];
        Backbone.Radio.channel('key')[command](owner.normalizeMethods(y), owner);
      });
    });

    if (stopListening) {
      // console.log(owner);
      owner.stopListening();
    }
  }

});