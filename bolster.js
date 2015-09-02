'use strict';

console.log('BOLSTER!')

var Backbone = require('backbone');
Backbone.$ = jQuery;
var _ = require('underscore');
var Mn = require('backbone.marionette');
var Relational = require('backbone-relational');
var BackboneRadio = require('backbone.radio');

var utils = require('./libs/utils');

var Model = require('./src/model');
var Collection = require('./src/collection');

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

  // Public Functions
  // --------------------------

  /**
   * createApplication
   * Create a Backbone Marionette applicaiton with all the Bolster trimmings
   */
  createApplication: function(options) {
    Backbone.Relational.store.addModelScope(options.modelScope);

    // this.config = options.config;
    // this.Router = options.Router;

    if (options.enableMarionetteInspector) {
      utils.enableMarionetteInspector();
    }
    this.app = new Mn.Application();
    this.loadRegions(options.config.regions);
    this.loadModules(options.config.modules);
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
      // var state = that.getState(), 
      //   start = _.difference(_.union(that.traffic.always_on, needed), state.started),
      //   stop = _.difference(that.modules, that.traffic.always_on, that.traffic.dont_stop, needed, state.stopped);
      
      // that.log('Needed', needed);
      // that.log('Already started', state.started);
      // that.log('Already stopped', state.stopped);

      // that.log('Stopping', stop);
      // _.each(stop, function(name) {
      //   that.stopModule(name);
      // });

      // that.log('Starting', start);
      // _.each(start, function(name) {
      //   that.startModule(name);
      // });

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
      this.app.module(key, value.src);      
    }, this);
  }

};