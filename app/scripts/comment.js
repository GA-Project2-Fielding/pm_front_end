'use strict';
console.log('comment loaded');

var PM = (function (module) {
  var host = 'http://localhost:3000/',
  authToken = localStorage.getItem('authToken');

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
      var template = Handlebars.templates['commentShowTemplate'];
      $('#container').html(template({comment: data}));
    })
    .fail(function() {
      console.log('error');
    });
  };

  module.getComments = function(taskId){
    $.ajax({
      url: module.apiRoutes.tasks + taskId + '/comments',
      type: 'get',
      dataType: 'json',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken }
    })
    .done(function(data) {
      console.table(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  return module;
})(PM || {});

var testTaskId = 1;
PM.getComments(testTaskId);
