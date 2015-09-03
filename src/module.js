'use strict';

var Mn = require('backbone.marionette');


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
    Module.__super__.constructor.apply(this, arguments);

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
      // this.log('start()');

      // if (this.radioManager) {
      //   this.radioManager.start();
      // }

      this.started = true;
    }, this);

    /**
     * before:stop
     * 
     */
    this.on('before:stop', function() {
      this.log('stop()');

      // if (this.radioManager) {
      //   this.radioManager.stop();
      //   this.stopListening();
      // }

      this.started = false;
    }, this);
  };

  return Module;
}());