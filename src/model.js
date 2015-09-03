'use strict';

/**
 * model
 * @module model
 * @desc Custom model definition
 * @requires underscore
 * @requires config
 */

var _ = require('underscore');
var config = {
  api: {
    PAPI: {
      url: function() { return 'http://program-dev.abcradio.net.au/api/v1/' }
    },
    MAPI: {
      url: function() { return 'http://music.abcradio.net.au/api/v1/' }
    }
  }
}

var tannoy = require('../libs/tannoy');

/**
 * The Model definition
 * @return {Object} Model
 */
module.exports = (function() {

  /**
   * Model
   * @desc A model
   * @class
   */
  var Model = function() {
    
    tannoy.addLogging(this);

    /**
     * Generate the URL
     * @return {string} The URL of the model
     */
    this.url = function() {
      var url,
        id = this.has('arid') ? this.get('arid') : (this.has('id') ? this.get('id') : void 0);

      if (this.api) {
        var urlRoot = typeof this.urlRoot === 'function' ? this.urlRoot() : this.urlRoot;
        url = config.api[this.api].url() + urlRoot + (id ? '/' + id : '') + '.json';
        // console.log(url);
      }
      return url;
    };

    /**
     * isEmpty
     * @desc Determine whether a model is empty
     * @param  {String}  key Object key
     * @return {Boolean} isEmpty Returns whether an attribute is empty    
     */
    this.isEmpty = function(key) {
      var isEmpty = true,
        model = key ? this.get(key) : this;

      if (model) {
        var relations = model.getRelations();
              
        if (relations.length === 0) {
          isEmpty = _.isEmpty(model.attributes);
        } else {
          _.each(relations, function(relation) {
            var child = model.get(relation.key);
            if (child && !child.isEmpty()) {
              isEmpty = false;
            }
          }, model);
        }
      }

      return isEmpty;
    };

    Model.__super__.constructor.apply(this, arguments);
  };

  return Model;
  
}());