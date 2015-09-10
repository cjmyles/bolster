'use strict';

var Backbone = require('backbone');
var Mn = require('backbone.marionette');
// var _ = require('underscore');

var ole = require('./ole');

module.exports = {

  /**
   * Provide an easy way to extend classes
   */
  _extends: function(child, parent) {
    var __hasProp = {}.hasOwnProperty;

    for (var key in parent) {
      if (__hasProp.call(parent, key)) {
        child[key] = parent[key];
      }
    }

    function Ctor() {
      this.constructor = child;
    }

    Ctor.prototype = parent.prototype;
    child.prototype = new Ctor();
    child.__super__ = parent.prototype;

    return child;
  },

  /**
   * Enable cookie authentication
   */
  enableCookieAuth: function() {    
    // (function() {
      var proxiedSync = Backbone.sync;

      Backbone.sync = function(method, model, options) {
        options = options || {};

        if (!options.crossDomain) {
          options.crossDomain = true;
        }

        if (!options.xhrFields) {
          options.xhrFields = { withCredentials:true };
        }

        return proxiedSync(method, model, options);
      };
    // })();
  },

  /**
   * Enable Backbone Marionette inspector
   */
  enableMarionetteInspector: function() {   
    if (this.debug && window.__agent) {
      window.__agent.start(Backbone, Mn);
    }
  },

  logVersion: function(name, version) {
    ole.log('%c' + name + ' version ' + version, 'color:blue');
  },

  redirect: function(route) {
    Backbone.history.navigate(route, { trigger: true });
  }

};