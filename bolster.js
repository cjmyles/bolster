/* global jQuery */

'use strict';

/**
 * Bolster
 * @library Bolster
 * @desc Backbone Marionette initialisation with regions & modules loader, with Backbone Relational integration and more
 * @requires backbone
 * @requires backbone.marionette
 * @requires backbone-relational
 * @requires backbone.radio
 */

console.log('BOLSTER! Requires package.json and README cleanup + minification')

// Backbone
var Backbone = require('backbone');
Backbone.$ = jQuery;
// Underscore
var _ = require('underscore');
// Backbone Marionette
var Mn = require('backbone.marionette');
// Backbone Relational
require('backbone-relational');
// Backbone Radio
require('backbone.radio');

// Core utilities
var utils = require('./libs/utils');
// Logging (like the Spanish Olé! Also the "ole" in "console")
var ole = require('./libs/ole');

// Custom Backbone Radio functionality
// var RadioTemplate = require('./libs/radio-template');

// Custom entity definitions
var Model = require('./src/model');
var Collection = require('./src/collection');
var Module = require('./src/module');
var Base = require('./src/base');



var Radio = {

  // Attributes
  // --------------------------
  
  // Keep a local copy of the created channels
  // channels: {},

  /**
   * initialize
   * @description Initialize Backbone.Radio
   * @param  {Object} options Initialization parameters, including debug parameter and channel names
   */
  initialize: function(options) {
    // Specify debug
    Backbone.Radio.DEBUG = options.debug;

    // Create the required channels
    _.each(options.channels, function(id) {
      Backbone.Radio.channel(id);
    });
  }

}





/**
 * 
 * @type {Object}
 */
module.exports = {

  // Attributes
  // --------------------------

  // Turn on/off Olé logging 
  verbose: false,

  // Keep a local list of app module names
  modules: [],

  // Protected Functions
  // --------------------------

  /**
   * initialize
   * @description Initialize Bolster by enabling logging and setting up the core entities
   * @param  {Object} options Initialization parameters, including custom entity definitions
   */
  initialize: function(options) {
    // Add logging cability to Bolster itself (how ironic)!
    ole.assimilate(this);

    // var Radio = RadioTemplate(options);
    // this.radio = new Radio();
    
    // Radio.initialize(options);
    // this.Radio = Backbone.Radio;
    
    var extend = function(Root, Factory) {
      utils._extends(Root, Factory);
      return Root;
    };

    var extendBase = function(Parent) {
      // var base = Base();
      return extend(Base(), Parent);
    };

    var extendObject = function(Root, Parent) {
      return extend(Root, extendBase(Parent));
    }

    this.Model = (extendObject)(Model, Backbone.RelationalModel);
    this.Collection = options.Collection ? (extendObject)(options.Collection, Backbone.Collection) : (extendBase)(Backbone.Collection);

    this.Module = (extendObject)(Module, Mn.Module);
    this.LayoutView = (extendBase)(Mn.LayoutView);
    this.ItemView = (extendBase)(Mn.ItemView);
    this.Object = (extendBase)(Mn.Object);  

    if (options.Model) {
      this.Model = (extendObject)(options.Model, this.Model);
    }
    // For some reason extending the Collection twice causes issues
    // if (options.Collection) {
    //   this.Collection = (extendObject)(options.Collection, Backbone.Collection);
    // }
  },

  // Public Functions
  // --------------------------

  /**
   * createApplication
   * Create a Backbone Marionette applicaiton with all the Bolster trimmings
   */
  createApp: function(options) { 
    var config = options.config;
    this.traffic = config.traffic;

    if (config.enableMarionetteInspector) {
      utils.enableMarionetteInspector();
    }
    if (config.logVersion) {
      utils.logVersion(config.name, options.version);
    }

    Backbone.Relational.store.addModelScope(options.modelScope);

    this.app = new Mn.Application();
    this.loadRegions(config.regions);
    this.loadModules(config.modules);    

    this.app.radio = this.radio;

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
      
      that.log('Needed', modules);
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