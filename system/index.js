/* global jQuery, $ */
/*jshint unused: false */

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

// Backbone
var Backbone = require('backbone');
Backbone.$ = jQuery;
// Underscore
var _ = require('underscore');
// Marionette
var Mn = require('backbone.marionette');
// Custom Marionette extension
var Architecture = require('./src/architecture.js');
// Backbone Relational
var Relational = require('backbone-relational');
Backbone.Relational.store.addModelScope(require('core/api/scope'));
// Backbone Radio
var BackboneRadio = require('backbone.radio');

// Core utilities
var utils = require('./libs/utils');
// Custom radio channels
var radio = require('libs/radio');

/**
 * 
 */
module.exports = Mn.Object.extend({

  initialize: function(options) {
    this.config = options.config;
    this.Router = options.Router;
    
    this.app = new Mn.Application();

    utils.enableMarionetteInspector();

    this.logVersion();

    this.loadRegions();
    this.loadModules();
    this.initializeABCUser();
    
    return this.app;
  },

  // Private Functions
  // --------------------------

  loadModules: function() {    
    this.app.module('Store', require('modules/store'));      
    this.app.module('Bootstrap', require('modules/bootstrap'));      

    _.each(this.config.modules, function(value, key) {
      this.app.module(key, value);      
    }, this);
  },

  /**
   * Regions
   * @desc Add regions from index.jade to the application
   * @type {Object}
   */
  loadRegions: function() {
    this.app.addRegions(this.config.regions);
  },

  /**
   * Initialise a new ABC User and attach it to the application
   * @type {ABCUser}
   */
  initializeABCUser: function() {
    var ABCUser = require('libs/user'),
      user = new ABCUser({
        modules: ['location', 'history']
      });

    radio.data.reply('get:user', function() {
      return user;
    });
  },

  initializeRouter: function(Router) {
    var router = new this.Router({ 
      app: this.app,
      traffic: this.config.traffic
    }).getAppRouter();

    Backbone.history.start({
      pushState: true,
      root: $('base').data('base')
    });

    return router;
  },

  logVersion: function() {
    utils.log('%cABC Radio version ' + ABC.Radio.version, 'color:blue');
  },

  // Public Functions
  // --------------------------

  getApplication: function() {
    return this.app;
  }

});