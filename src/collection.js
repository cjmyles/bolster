'use strict';

/**
 * collection
 * @module collection
 * @desc Custom collection definition
 * @requires underscore
 * @requires config
 */

var _ = require('underscore');
var config = require('libs/config');

/**
 * The Collection definition
 * @return {Object} Collection
 */
module.exports = (function() {

  var Collection = function() {
    Collection.__super__.constructor.apply(this, arguments);

    /**
     * Generate the URL
     * @return {string} The URL of the model
     */
    this.url = function() {
      var url;      
      if (this.api) {
        url = config.api[this.api].url() + this.uri + '.json';
        // console.log(url);
      }
      return url;
    };

    /**
     * Parse the JSON looking for items
     * @param  {object} data The raw JSON
     * @return {object}      The amended JSON
     */
    this.parse = function(data) {
      if (!_.isUndefined(data) && _.has(data, 'items')) {
        return data.items;
      }
    };
  };

  // Collection.prototype.isWorthFetching = function() {
  //   alert('here');
  // }

  // Collection.prototype.parse = function(data) {
  //   if (typeof data !== 'undefined' && data.hasOwnProperty('items')) {
  //     return data.items;
  //   }
  // };

  // Collection.prototype.contains = function(model) {
  //   return !_.isUndefined(this.findWhere({ arid: model.get('arid') }));
  // };

  // Collection.prototype.first = function() {
  //   var first;
  //   if (this.length > 0) {
  //     first = this.at(0);
  //   }
  //   return first;
  // };

  // Collection.prototype.last = function() {
  //   var last;
  //   if (this.length > 0) {
  //     last = this.at(this.length - 1);
  //   }
  //   return last;
  // };

  return Collection;

}());