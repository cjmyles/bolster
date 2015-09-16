Bolster
===

*This document is currently in DRAFT status and requires further work*

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

# Documentation

## Getting Started

Import the library:

```javascript
var Br = require('bolster');
```

Define your Backbone Radio channels:

```javascript
var channels = ['user'];
```

Initialize Bolster:

```javascript
Br.initialize({
  channels: channels, // Your Backbone Radio channels
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