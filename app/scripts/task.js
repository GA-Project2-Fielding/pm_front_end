'use strict';
console.log('task loaded');

var PM = (function (module) {
  var host = 'http://localhost:3000/';

  module.apiRoutes = {
    users: host + 'users/',
    projects: host + 'projects/',
    tasks: host + 'tasks/',
    comments: host + 'comments/',
    fileLocations: host + 'file_locations/'
  };

//   module.getTasks = function() {
//   $.ajax({
//     url: module.apiRoutes.tasks,
//     type: 'GET'
//   }).done(function(data) {
//     var template = Handlebars.compile($('#movies-template').html());
//     $('#movies').html(template(data));
//   }).fail(function(jqXHR, textStatus, errorThrown) {
//     console.log(jqXHR, textStatus, errorThrown);
//   });
// };

  return module;
})(PM || {});
