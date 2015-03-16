'use strict';
console.log('project loaded');

var PM = (function (module) {
  var host = 'http://localhost:3000/';
  var authToken = localStorage.getItem('authToken');

  var apiRoutes = {
      users: host + 'users/',
      projects: host + 'projects/',
      tasks: host + 'tasks/',
      comments: host + 'comments/',
      fileLocations: host + 'file_locations/'
  };

  // this may not be needed as the user json already contains that user's projects
  module.getProjects = function(){
    var currentUser = localStorage.getItem('currentUser');
    $.ajax({
      url: apiRoutes.users + currentUser + '/projects',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
    }).done(function(data){
      console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  return module;
})(PM || {});

PM.getProjects();
