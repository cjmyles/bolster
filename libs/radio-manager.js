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

module.exports = Mn.Object.extend({

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

    _.each(events, function(x, id) {
      _.each(events[id], function(y, command) {
        // console.log('radio[' + id + '][' + command + ']', y);
        if (command === 'comply') {
          command = 'reply';
        }
        Backbone.Radio.channel(id)[command](owner.normalizeMethods(y), owner);
      });
    });
  },

  stop: function(stopListening) {
    var owner = this.owner,
      events = owner.radioEvents;

    _.each(events, function(x, id) {
      _.each(events[id], function(y, command) {
        command = ANTONYMNS[command];
        // console.log('radio[' + id + '][' + command + ']', y);
        Backbone.Radio.channel(id)[command](owner.normalizeMethods(y), owner);
      });
    });

    if (stopListening) {
      owner.stopListening();
    }
  }

});