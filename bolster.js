'use strict';

console.log('BOLSTER!')

var Backbone = require('backbone');
Backbone.$ = jQuery;
var _ = require('underscore');
var Mn = require('backbone.marionette');
require('backbone-relational');
require('backbone.radio');

var utils = require('./libs/utils');
var tannoy = require('./libs/tannoy');

var Model = require('./src/model');
var Collection = require('./src/collection');
var Module = require('./src/module');
var Any = require('./src/any');

module.exports = {

  // Classes
  // --------------------------

  Model: (function(Parent) {
    utils._extends(Model, Parent);
    return Model;
  })(Backbone.RelationalModel),

  Collection: (function(Parent) {
    utils._extends(Collection, Parent);
    return Collection;
  })(Backbone.Collection),

  Module: (function(Parent) {
    utils._extends(Module, Parent);
    return Module;
  })(Mn.Module),  

  LayoutView: (function(Parent) {
    utils._extends(Any, Parent);
    return Any;
  })(Mn.LayoutView),  

  // ItemView: (function(Parent) {
  //   utils._extends(Generic, Parent);
  //   return Generic;
  // })(Mn.ItemView),  

  // Attributes
  // --------------------------

  modules: [],

  // Public Functions
  // --------------------------

  /**
   * createApplication
   * Create a Backbone Marionette applicaiton with all the Bolster trimmings
   */
  createApp: function(options) {
    var config = options.config;

    Backbone.Relational.store.addModelScope(options.modelScope);

    this.traffic = config.traffic;
    // this.config = options.config;
    // this.Router = options.Router;

    if (config.enableMarionetteInspector) {
      utils.enableMarionetteInspector();
    }
    if (config.logVersion) {
      utils.logVersion(config.name, options.version);
    }

    this.app = new Mn.Application();
    this.loadRegions(config.regions);
    this.loadModules(config.modules);
    // this.initializeABCUser();

    return this.app;
  },

  /**
   * ignition
   * Start & stop modules
   */
  ignition: function(modules, route) {
    var that = this;
    return function() {
      var state = that.getState(), 
        start = _.difference(_.union(that.traffic.always_on, modules), state.started),
        stop = _.difference(that.modules, that.traffic.always_on, that.traffic.dont_stop, modules, state.stopped);
      
      tannoy.log('Needed', modules);
      tannoy.log('Already started', state.started);
      tannoy.log('Already stopped', state.stopped);

      tannoy.log('Stopping', stop);
      _.each(stop, function(name) {
        that.stopModule(name);
      });

      tannoy.log('Starting', start);
      _.each(start, function(name) {
        that.startModule(name);
      });

      route.apply(that, arguments);
    };
  },

  // Private Functions
  // --------------------------

  /**
   * loadRegions
   * @desc Load regions into the app scope
   */
  loadRegions: function(regions) {
    this.app.addRegions(regions);
  },

  /**
   * loadModules
   * @desc Load modules into the app scope
   */
  loadModules: function(modules) {    
    // this.app.module('Store', require('modules/store'));      
    // this.app.module('Bootstrap', require('modules/bootstrap'));      

    _.each(modules, function(value, key) {
      this.app.module(key, value);      
      this.modules.push(key);
    }, this);

    // Compile a list of all modules
    // _.each(this.app.submodules, function(module) {      
    //   // if (!_.isUndefined(module.moduleName)) {
    //     this.modules.push(module.moduleName);
    //   // }
    // }, this); 
    // console.log(this.modules);
  },

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

};