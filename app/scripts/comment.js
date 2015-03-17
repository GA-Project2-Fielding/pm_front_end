'use strict';
console.log('comment loaded');

var PM = (function (module) {
  var host = 'http://localhost:3000/';
  var authToken = localStorage.getItem('authToken');

  module.apiRoutes = {
    users: host + 'users/',
    projects: host + 'projects/',
    tasks: host + 'tasks/',
    comments: host + 'comments/',
    fileLocations: host + 'file_locations/'
  };

  module.getComment = function(id){
    $.ajax({
      url: module.apiRoutes.comments + id,
      headers: { 'AUTHORIZATION': 'Token token=' + authToken }
    })
    .done(function(data) {
      console.log(data);
    })
    .fail(function() {
      console.log('error');
    });

  };

  return module;
})(PM || {});
