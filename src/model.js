'use strict';

/**
 * model
 * @module model
 * @desc Custom model definition
 * @requires underscore
 * @requires config
 */

var _ = require('underscore');

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
    
    /*
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