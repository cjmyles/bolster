'use strict';

var _ = require('underscore');

var useConsole = (function() {
  // Whether this browser has a console we can call directly
  return window.console && typeof console.log === 'function';
})();

// function addLogging(object) {
//   object.log = object.verbose ? console.log.bind(console) : _.noop;
//   object.error = object.verbose ? console.error.bind(console) : _.noop;
//   object.announce = function(message) {
//     object.log(object.name + '.' + message);
//   }
// }

module.exports = {

  action: 'log',

  // Protected Functions
  // --------------------------

  // Private Functions
  // --------------------------

  console: function() {
    // log.history.push(arguments);

    if (useConsole) {
      var args = arguments,
        // Convert arguments to an array
        sliced = Array.prototype.slice.call(args);

      // Single argument, which is a string
      if (sliced.length === 1 && typeof sliced[0] === 'string') {
        console[this.action](sliced.toString());
      }
      // Multiple arguments
      else {
        var first = Array.prototype.shift.call(sliced);
        if (typeof sliced === 'object' && sliced.length === 1) {
          console[this.action](first, sliced[0]);
        } else {
          console[this.action](first, sliced);
        }        
      }
    }
  },

  // Public Functions
  // --------------------------

  assimilate: function(object) {
    object.log = object.verbose ? console.log.bind(console) : _.noop;
    object.error = object.verbose ? console.error.bind(console) : _.noop;
    object.announce = function(message) {
      object.log(object.name + '.' + message);
    }
  },  

  log: function() {
    this.action = 'log';
    this.console.apply(this, arguments);
  },

  error: function() {
    this.action = 'error';
    this.console.apply(this, arguments);
  }
  
};