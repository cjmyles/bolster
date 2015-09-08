Bolster
===

**DRAFT**
Please note: this library is currently a work in progress

Creating robust Backbone Marionette Applications integrated with Backbone Relational that utilise APIs is no simple feat, and can be fraught with a magnitude of minor issues. After creating several applications I realised there was a commonality in my applications that could and should be abstracted to make the process easier, as well as provide easy-to-access utility functions like logging. Bolster therefore helps to manage the following tasks in creating and running a robust Backbone Marionette Application:

* Initialise and extend core Backbone Relational entities
* Initialise and extend core Backbone Marionette entities
* Create the desired Backbone Radio channels and event listeners
* Create a Backbone Marionette Application with desired Regions and Modules
* Add Backbone Relational Models & Collections to the application scope
* Manage the process of starting and stopping Backbone Marionette Modules depending on the Backbone Marionette Router
* Provide an easy to use logging facility that is browser aware and can be enabled/disabled per Backbone Relational or Backbone Marionette entity