'use strict';
console.log('project loaded');

var PM = (function (module) {
  var host = 'http://localhost:3000/',
  authToken = localStorage.getItem('authToken'),
  currentUser = localStorage.getItem('currentUser'),
  apiRoutes = {
      users: host + 'users/',
      projects: host + 'projects/',
      tasks: host + 'tasks/',
      comments: host + 'comments/',
      fileLocations: host + 'file_locations/'
  };

  // this may not be needed as the user json already contains that user's projects
  module.getProjects = function(){
    $.ajax({
      url: apiRoutes.users + currentUser + '/projects',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
    }).done(function(data){
      console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  module.submitProject = function(event){
    event.preventDefault();

    $.ajax({
      url: apiRoutes.users + currentUser + '/projects',
      type: 'post',
      dataType: 'json',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
      data: {
        project: {
          project_title: $('#projectTitle').val(),
          description: $('#description').val(),
          start_date: $('#startDate').val(),
          due_date: $('#dueDate').val(),
          completion_date: $('#completionDate').val(),
          completed: $('#completed').val(),
          visible: $('#visible').val()
        }
      }
    })
    .done(function() {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    })
    .always(function() {
      console.log('complete');
    });

  };

  $('#newProjectForm').on('submit', module.submitProject);

  return module;
})(PM || {});

PM.getProjects();

// user_projects GET    /users/:user_id/projects(.:format)       projects#index {:format=>:json}
//               POST   /users/:user_id/projects(.:format)       projects#create {:format=>:json}
//       project GET    /projects/:id(.:format)                  projects#show {:format=>:json}
//               PATCH  /projects/:id(.:format)                  projects#update {:format=>:json}
//               PUT    /projects/:id(.:format)                  projects#update {:format=>:json}
//               DELETE /projects/:id(.:format)                  projects#destroy {:format=>:json}
