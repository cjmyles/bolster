'use strict';

/**
 * scope
 * @module scope
 * @desc Define scope for backbone relational models
 * @requires backbone
 * @requires backbone-relational
 * @requires config
 */

/**
 * scope
 * An object containing the models and collections to be added to the scope
 * @type {Object}
 */
var scope = {
  LivePAPI: require('models/live-papi'),
  LiveMAPI: require('models/live-mapi'),
  ProgramItem: require('models/program-item'),
  Program: require('models/program'),
  Figure: require('models/figure'),
  Category: require('models/category'),
  Play: require('models/play'),
  Recording: require('models/recording'),
  Service: require('models/service'),
  PublicationEvent: require('models/publication-event'),
  Outlet: require('models/outlet'),
  Audio: require('models/audio'),
  Brand: require('models/brand'),
  Artist: require('models/artist'),
  Link: require('models/link'),
  Artwork: require('models/artwork'),
  Release: require('models/release'),
  Version: require('models/version'),

  ProgramItems: require('collections/program-items'),
  LivePAPIs: require('collections/live-papis'),
  // Figures: require('collections/figures'),
  Categories: require('collections/categories'),
  Plays: require('collections/plays'),
  Services: require('collections/services'),
  PublicationEvents: require('collections/publication-events'),  
  Outlets: require('collections/outlets'),  
  Audios: require('collections/audios'),  
  Brands: require('collections/brands'),
  Artists: require('collections/artists'),
  Links: require('collections/links'),
  Artworks: require('collections/artworks'),
  Releases: require('collections/releases'),
  Versions: require('collections/versions')
};

module.exports = scope;