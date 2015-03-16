'use strict';
console.log('main loaded');

var PM = (function (module) {
  module.init = function() {

    var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'projects/:id': 'getProject'
    },
      home: PM.renderUser()
    });

    new Router();
    Backbone.history.start()
  };

  return module;
})(PM || {});





$(document).ready(function() {
  PM.init();

});
