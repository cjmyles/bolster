'use strict';

var Mn = require('backbone.marionette');
var _ = require('underscore');

var utils = require('../libs/utils');
var tannoy = require('../libs/tannoy');

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
    
    // tannoy.addLogging(this);

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
      this.announce('stop()');

      // if (this.radioManager) {
      //   this.radioManager.stop();
      //   this.stopListening();
      // }

      this.started = false;
    }, this);

    Module.__super__.constructor.apply(this, arguments);    
  };

  return Module;

}());