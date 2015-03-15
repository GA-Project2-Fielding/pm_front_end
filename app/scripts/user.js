'use strict';
console.log('user loaded');

var PM = (function (module) {
  var host = 'http://localhost:3000/';

  module.apiRoutes = {
    users: host + 'users/',
    projects: host + 'projects/',
    tasks: host + 'tasks/',
    comments: host + 'comments/',
    fileLocations: host + 'file_locations/'
  };

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home'
  },
  home: function(){
    var id = '24'; // temp for testing

    $.ajax({
      url: module.apiRoutes.users + id
    }).done(function(data){
      console.log(data);
    }).fail();
  }
  });

  new Router();
  Backbone.history.start();

  return module;
})(PM || {});
