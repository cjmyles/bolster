Bolster
===

*Please note: This document is currently in DRAFT status and requires further work*

Do you yearn to create Backbone Marionette applications that have Backbone Relational & Backbone Radio integration, access to a host of useful helper functions including logging, and can be created from just a few lines of code? Well Bolster is the library for you! 

Bolster helps to manage the following tasks in creating and running robust Backbone Marionette applications:

* Initialise and extend core Backbone Relational entities and model scope
* Create the desired Backbone Radio channels
* Initialise and extend core Backbone Marionette entities to include logging, radio event listeners and more
* Create a Backbone Marionette application with specified Modules and entry-point Regions
* Manage the process of starting and stopping Modules per route

# Installation

Install using npm:

```javascript
$ npm install bolster
```

Import the library:

```javascript
var Br = require('bolster');
```

# Documentation

- [Introduction](#introduction)
- [Getting Started](#getting-started)

## Introduction

Bolster is an interface to - not a replacement for - Backbone Marionette, Backbone Relational and Backbone Radio. Bolster simplifies the initialization of these libraries and the creation of Backbone Marionette applications.

## Bolster Classes

Bolster currently extends the following Backbone Marionette classes:

* Object
* Module
* LayoutView
* ItemView

By referencing the Bolster version, instantiated objects have access to a logging mechanism as well as a radio event controller.

### Logging

Each instantiated object has access to a ```log()``` method. This method is bound to console.log, but only outputs to the console if 1) the ```verbose``` option is set to ```true```, and 2) the browser supports the console.log method. The ```log()``` method is particularly helpful for adding persistent log statements to your code, and enabling/disabling their usage from one point.

Let's use the Backbone Marionette Object as an example:

```javascript
var O = Br.Object.extend({
  verbose: true,

  initialize: function() {
    this.log('initialize()');
  }
});

var o = new O(); // --> initialize()
```

### Radio Events

Setting up and removing radio event listeners is a common application task and Bolster takes care of this for you. Once a ```radioEvents``` option is added to your class, the instantiated object has access to a ```radioManager``` object which can be started and stopped. Any radio events triggered matching the definition in your ```radioEvents``` object will call the associated method, similar to Backbone Marionette's ```modelEvents``` object:

```javascript
var O = Br.Object.extend({
  verbose: true,

  radioEvents: {
    auth: {
      on: {
        'userLoggedIn': 'onUserLoggedIn'
      }
    }
  },

  initialize: function() {
    this.radioManager.start();
  },

  onUserLoggedIn: function() {
    this.log('onUserLoggedIn()');
  },

  onBeforeDestroy: function() {
    this.radioManager.stop();
  }
});

var o = new O();
Br.radio.auth.trigger('userLoggedIn'); // --> onUserLoggedIn()
o.destroy();
```

Note: method names are normalized using Backbone Marionette's ```normalizeMethods``` function.

## Getting Started

In order to create your application Bolster assumes the following:

* You have defined your Backbone Radio channel names (optional)
* You have defined your Backbone Relational Models & Collections
* You have defined your Backbone Marionette Regions
* You have defined your Backbone Marionette Modules

Before you initialize Bolster and create your application, let's go through each of these prerequisites.

Note: The examples referenced in this document assume that your application is divided into separate files, referenced by ```require``` statements.

### Backbone Radio

Creating and accessing radio channels in your application is as simple as defining a list of channel names. The best way to do this is to create an application config file and store the array there:

config.js
```javascript
module.exports = {
  channels: ['auth', 'data']
}
```

Once Bolster has been initialised you'll then be able to access the radio channels through Bolster:

```javascript
var User = Br.radio.auth.request('getUser');
```

### Backbone Marionette Regions

First, create the regions in your HTML (I use the data attribute of the div to define my region names so as to separate application attributes from style attributes):

index.html
```html
<div data-region="index.header"></div>
<div data-region="index.main"></div>
<div data-region="index.footer"></div>
```

Next, append the region selectors to your config file:

config.js
```javascript
module.exports = {
  channels: ['auth', 'data'],
  regions: {
    header    : '*[data-region="index.header"]',
    main      : '*[data-region="index.main"]',
    footer    : '*[data-region="index.footer"]'
  },
}
```

### Backbone Marionette Modules

Bolster Modules extend Backbone Marionette Modules. 

Now create your module(s):

user.js
```javascript
var Br = require('bolster');

module.exports = Br.Module.extend({
  
});
```

Note: Br.Module 

### Initialization

Initialize Bolster:

```javascript
Br.initialize();
```

Create your application:

```javascript
var app = Br.createApp();
```

### Introduction









Define your Backbone Radio channels:

```javascript
var channels = ['user'];
```

Initialize Bolster:

```javascript
Br.initialize({
  channels: channels, // Your Backbone Radio channels array
  debug: true, // Used to turn on debug mode
  Model: require('system/model'), // Optional: Your own Model definition which will inherit all the properties of the Br Model definition
  Collection: require('system/collection') // Optional: Your own Collection definition which will inherit all the properties of the Br Collection definition
});
```

Define your Backbone Relational Models and Collections Scope (more on the specifics of Models & Collections later):

```javascript
var scope = {
  // Models
  User: require('./models/user'),
  Purchase: require('./models/purchase'),
  // Collections
  Users: require('./collections/users'),
  Purchases: require('./collections/purchases')
};
```

Add your Backbone Relational Models and Collections to the Backbone Relational Model Scope:

```javascript
Br.addModelScope(scope);
```

Create your application config (more on the specifics of Regions & Modules later):

```javascript
var config = {
  resetWindowOnRoute: true, // Always scroll to the top of the page on-route

  // Application Regions
  regions: {
    header    : '*[data-region="index.header"]',  // <div data-region="index.header"></div> in your HTML
    main      : '*[data-region="index.main"]',    // <div data-region="index.main"></div> in your HTML
    footer    : '*[data-region="index.footer"]'   // <div data-region="index.footer"></div> in your HTML
  },

  // Application Modules
  modules: {
    'Bootstrap'         : require('modules/bootstrap'),
    'Analytics'         : require('modules/analytics'),
    'Alerts'            : require('modules/alerts'),
    'Search'            : require('modules/search'),
    'Help'              : require('modules/help'),
    'PlayerControls'    : require('modules/player-controls'),
  },

  // Traffic Control - which Modules to start and which not to stop on-route
  traffic: {
    always_on: ['Bootstrap', 'Analytics', 'Alerts'],
    dont_stop: ['PlayerControls']
  }
};
```

Create your application:

```javascript
var app = Br.createApp(config);
```

## HTML

@todo

## Regions

@todo

## Modules

@todo

## Backbone Relational

@todo

## API

@todo

# Companies

The following companies are using Bolster

<!-- <a href= "http://www.abc.net.au/radio" target="_blank")><img src="images/logos/abc.png" alt= "Australian Broadcasting Corporation - Radio")/></a> -->
<a href="http://www.abc.net.au/radio" target="_blank")>Australian Broadcasting Corporation - Radio</a>