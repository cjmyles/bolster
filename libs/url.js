'use strict';

var Backbone = require('backbone');

module.exports = {

  redirect: function(route) {
    Backbone.history.navigate(route, { trigger: true });
  },

  refresh: function(route) {
    location.reload();
  },

  back: function() {
    Backbone.history.history.back();
  },

  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  getParameterByName: function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  } 

};