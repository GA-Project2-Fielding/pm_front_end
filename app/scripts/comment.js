'use strict';
console.log('comment loaded');

var PM = (function (module) {
  var host = 'http://localhost:3000/';

  module.apiRoutes = {
    users: host + 'users/',
    projects: host + 'projects/',
    tasks: host + 'tasks/',
    comments: host + 'comments/',
    fileLocations: host + 'file_locations/'
  };

  return module;
})(PM || {});
