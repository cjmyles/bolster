'use strict';

// var Backbone = require('backbone');
var Mn = require('backbone.marionette');
var _ = require('underscore');

// var app = require('core/app');

module.exports = Mn.Object.extend({
  
  verbose: false,

  modules: [],

  // Protected Functions
  // --------------------------

  initialize: function(options) {
    this.initializeCore('Trafficker');

    this.app = this.getOption('app');
    this.traffic = this.getOption('traffic');

    // Compile a list of all modules
    _.each(this.app.submodules, function(module) {      
      // if (!_.isUndefined(module.moduleName)) {
        this.modules.push(module.moduleName);
      // }
    }, this); 

    this.log('All modules', this.modules);
    this.log('Always on', this.traffic.always_on);
    this.log('Don\'t stop', this.traffic.dont_stop);
  },

  // Private Functions
  // --------------------------

  stopModule: function(name) {
    var module = this.getModule(name);
    if (module) {
      module.stop();
    }
  },

  startModule: function(name) {
    var module = this.getModule(name);
    if (module) {
      module.start();
    }
  },

  getModule: function(name) {
    var module;
    if (_.contains(this.modules, name)) {
      module = this.app.module(name);
    } else if (window.console) {
      console.error('Module', '\'' + name + '\'', 'does not exist.');
    }
    return module;
  },

  getState: function() {
    var started = [],
      stopped = [];

    _.each(this.app.submodules, function(module) {
      if (module.hasStarted()) {
        started.push(module.moduleName);
      } else {
        stopped.push(module.moduleName);
      }
    });

    return {
      started: started,
      stopped: stopped
    };
  },

  // Public Functions
  // --------------------------
  
  control: function(needed, route) {
    var that = this;

    return function() {
      var state = that.getState(), 
        start = _.difference(_.union(that.traffic.always_on, needed), state.started),
        stop = _.difference(that.modules, that.traffic.always_on, that.traffic.dont_stop, needed, state.stopped);
      
      that.log('Needed', needed);
      that.log('Already started', state.started);
      that.log('Already stopped', state.stopped);

      that.log('Stopping', stop);
      _.each(stop, function(name) {
        that.stopModule(name);
      });

      that.log('Starting', start);
      _.each(start, function(name) {
        that.startModule(name);
      });

      route.apply(that, arguments);
    };
  }

});