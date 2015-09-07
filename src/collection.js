'use strict';

/**
 * collection
 * @module collection
 * @desc Custom collection definition
 * @requires underscore
 * @requires config
 */

var _ = require('underscore');

/**
 * The Collection definition
 * @return {Object} Collection
 */
module.exports = (function() {

  var Collection = function() {
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

    Collection.__super__.constructor.apply(this, arguments);
  };

  return Collection;

}());