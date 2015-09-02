'use strict';

var Backbone = require('backbone');
var Mn = require('backbone.marionette');
// var _ = require('underscore');

module.exports = {

  // logger: 'log',

  // useConsole: (function() {
  //   // Whether this browser has a console we can call directly
  //   return window.console && typeof console.log === 'function';
  // })(),

  // console: function() {
  //   // log.history.push(arguments);

  //   if (this.useConsole) {
  //     var args = arguments,
  //       // Convert arguments to an array
  //       sliced = Array.prototype.slice.call(args);

  //     // Single argument, which is a string
  //     if (sliced.length === 1 && typeof sliced[0] === 'string') {
  //       console[this.logger](sliced.toString());
  //     }
  //     // Multiple arguments
  //     else {
  //       var first = Array.prototype.shift.call(sliced);
  //       if (typeof sliced === 'object' && sliced.length === 1) {
  //         console[this.logger](first, sliced[0]);
  //       } else {
  //         console[this.logger](first, sliced);
  //       }        
  //     }
  //   }
  // },

  // log: function() {
  //   this.logger = 'log';
  //   this.console.apply(this, arguments);
  // },

  // error: function() {
  //   this.logger = 'error';
  //   this.console.apply(this, arguments);
  // },

  // IE8 doesnt like extends as a reserved word
  _extends: function(child, parent) {
    var __hasProp = {}.hasOwnProperty;

    for (var key in parent) {
      if (__hasProp.call(parent, key)) {
        child[key] = parent[key];
      }
    }

    function Ctor() {
      this.constructor = child;
    }

    Ctor.prototype = parent.prototype;
    child.prototype = new Ctor();
    child.__super__ = parent.prototype;

    return child;
  },
  
  /**
   * Enable Backbone Marionette inspector
   */
  enableMarionetteInspector: function() {   
    if (this.debug && window.__agent) {
      window.__agent.start(Backbone, Mn);
    }
  }

};