Radio
=====

The libs/radio/index object provides an easy mechanism to get a handle on any pre-defined radio channel and utilises [Backbone Radio](https://github.com/marionettejs/backbone.radio).

Listeners
---------

There are three types of handlers that can be attached to a channel:

  channel.on('some:event', function() {
    console.log('An event has happened!');
  });

  channel.comply('some:action', function() {
    console.log('I was told to execute some action');
  });

  channel.reply('some:request', 'food is good');

Triggers
---------

There are three types of triggers that can be fired on a channel:

  channel.trigger('some:event');

  channel.command('some:command');

  var response = channel.request('some:request');

Mapping
-------

The trigger:handler mapping is as follows:

  trigger -> on

  command -> comply

  request -> reply 

