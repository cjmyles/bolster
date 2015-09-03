// 'use strict';

// // var Backbone = require('backbone');
// var Mn = require('backbone.marionette');
// var _ = require('underscore');

// var radio = require('libs/radio');
// var Logger = require('libs/logger');

// function getType(entity) {
//   var type;

//   if (entity instanceof Mn.Module) {
//     type = 'Module';
//   } else if (entity instanceof Mn.View) {
//     type = 'View';
//   } else if (entity instanceof Mn.Object) {
//     type = 'Object';
//   }

//   return type;
// }

// /**
//  * Add a logging facility and radio management to
//  * Marionette entities by default
//  */
// var Architecture = {

//   initializeCore: function(name) {
//     var type = getType(this); 

//      if (type === 'Module') {
//       this.started = false;
//       this.hasStarted = function() {
//         return this.started;
//       };
//     }

//     this.logger = new Logger(name, type, this.verbose);
//     this.log = this.logger.log;

//     this.log('initialize()');

//     if (this.radioEvents) {
//       this.radioManager = new radio.Manager(this);
//     }

//     this.on('before:start', function() {
//       this.log('start()');

//       if (this.radioManager) {
//         this.radioManager.start();
//       }

//       if (type === 'Module') {
//         this.started = true;        
//       }
//     }, this);

//     this.on('before:stop', function() {
//       this.log('stop()');

//       if (this.radioManager) {
//         this.radioManager.stop();
//         this.stopListening();
//       }

//       if (type === 'Module') {
//         this.started = false;
//       }
//     }, this);
//   }

// };

// _.extend(Mn.Module.prototype, Architecture);
// _.extend(Mn.View.prototype, Architecture);
// _.extend(Mn.Object.prototype, Architecture);