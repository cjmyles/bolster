'use strict';

module.exports = {

  scrollToTop: function(duration) {
    this.scrollTo(0, duration);
  },

  scrollTo: function(top, duration) {
    //window.scrollTo(0, 0); /*Instantly reset window scroll*/
    $('html, body').animate({ scrollTop: top }, duration || 100);
  }

}