'use strict';
console.log('main loaded');

var PM = (function(module){
  var host = 'http://localhost:3000/',
  apiRoutes = {
    users: host + 'users/',
    projects: host + 'projects',
    tasks: host + 'tasks/',
    comments: host + 'comments/',
    fileLocations: host + 'file_locations/'
  },
  Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'users': 'users'
    },
    users: function(){
      $.get(apiRoutes.users + 5, function(data) {
        console.log(data);
      }).fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
      });
    }
  });

  new Router();
  Backbone.history.start();

  return module;
})(PM || {});

$(document).ready(function() {
  $.getScript('scripts/user.js');
  $.getScript('scripts/project.js');
  $.getScript('scripts/task.js');
  $.getScript('scripts/comment.js');
  $.getScript('scripts/fileLocation.js');
});
