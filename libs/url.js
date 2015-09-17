'use strict';

var Backbone = require('backbone');

module.exports = {

  redirect: function(route) {
    Backbone.history.navigate(route, { trigger: true });
  },

  back: function() {
    Backbone.history.history.back();
  }

};