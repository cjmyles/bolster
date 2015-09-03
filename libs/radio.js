'use strict';

// var Backbone = require('backbone');
var Mn = require('backbone.marionette');
var _ = require('underscore');

// var channels = require('libs/radio/channels');

var ANTONYMNS = {
  'on': 'off',
  'comply': 'stopComplying',
  'reply': 'stopReplying'
};

/**
 * Event Manager
 * @type {Object}
 */
 module.exports = function(channels) {
  return Mn.Object.extend({

    // Protected Functions
    // --------------------------

    initialize: function(owner) {
      owner.normalizeMethods = Mn.normalizeMethods;
      this.owner = owner;
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
          channels[key][command](owner.normalizeMethods(y), owner);
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
          channels[key][command](owner.normalizeMethods(y), owner);
        });
      });

      if (stopListening) {
        // console.log(owner);
        owner.stopListening();
      }
    }

  });
};