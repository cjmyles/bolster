'use strict';

/**
 * api
 * @module api
 * @desc Add custom api functions and variables
 * @requires backbone
 * @requires backbone-relational
 * @requires utils
 * @requires model
 * @requires collection
 */

var Backbone = require('backbone');
require('backbone-relational');
var utils = require('libs/utils');
var Model = require('./model');
var Collection = require('./collection');
  
/**
 * Custom options for API
 * @type {Object}
 */
var API = {
  PAPI: 'papi',
  MAPI: 'mapi',
  /**
   * customModel
   * @description Model
   * @param  {Object} Parent 
   * @return {Object}         Model
   */
  Model: (function(Parent) {
    utils._extends(Model, Parent);
    return Model;
  })(Backbone.RelationalModel),

  Collection: (function(Parent) {
    utils._extends(Collection, Parent);
    return Collection;
  })(Backbone.Collection)
};


module.exports = API;