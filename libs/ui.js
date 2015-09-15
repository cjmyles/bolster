'use strict';

var Backbone = require('backbone');

module.exports = {

  scrollToTop: function(duration) {
    this.scrollTo(0, duration);
  },

  scrollTo: function(top, duration) {
    //window.scrollTo(0, 0); /*Instantly reset window scroll*/
    $('html, body').animate({ scrollTop: top }, duration || 100);
  },

  resetWindowOnRoute: function() {
    var that = this,
      firstRun = true;
    
    var resetWindowScroll = function() {
      if (firstRun) {
        firstRun = false;
      } else {
        that.scrollToTop();
      }
    };
    
    Backbone.history.on('route', function() {
      resetWindowScroll();
    });
  }

}