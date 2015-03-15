'use strict';
console.log('fileLocation loaded');

var PM = (function (module) {
  var host = 'http://localhost:3000/';

  module.apiRoutes = {
    users: host + 'users/',
    projects: host + 'projects/',
    tasks: host + 'tasks/',
    comments: host + 'comments/',
    files: host + 'files/'
  };

  return module;
})(PM || {});
