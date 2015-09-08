'use strict';

var Mn = require('backbone.marionette');
var _ = require('underscore');

var utils = require('../libs/utils');
// var ole = require('../libs/ole');

/**
 * The Module definition
 * @return {Object} Module
 */
module.exports = (function() {

  /**
   * Module
   * @desc A model
   * @class
   */
  var Module = function() {
    
    // this.logger = new Logger(name, type, this.verbose);

    // if (this.radioEvents) {
    //   this.radioManager = new radio.Manager(this);
    // }

    this.started = false;
    /**
     * 
     * 
     */
    this.hasStarted = function() {
      return this.started;
    };    

    /**
     * before:start
     * 
     */
    this.on('before:start', function() {
      this.announce('start()');

      // Start the radio manager (inherited from Base)
      this.radioManager.start();

      this.started = true;
    }, this);

    /**
     * before:stop
     * 
     */
    this.on('before:stop', function() {
      this.announce('stop()');

      // Stop the radio manager (inherited from Base)
      this.radioManager.stop();
      
      this.started = false;
    }, this);

    Module.__super__.constructor.apply(this, arguments);    
  };

  return Module;

}());