'use strict';
console.log('main loaded');

// var PM = (function (module) {
//   var host = 'http://localhost:3000/';

//   module.apiRoutes = {
//     users: host + 'users/',
//     projects: host + 'projects/',
//     tasks: host + 'tasks/',
//     comments: host + 'comments/',
//     fileLocations: host + 'file_locations/'
//   };

//   return module;
// })(PM || {});





$(document).ready(function() {
  $.getScript('scripts/user.js');
  $.getScript('scripts/project.js');
  // $.getScript('scripts/task.js');
  // $.getScript('scripts/comment.js');
  // $.getScript('scripts/fileLocation.js');
});
