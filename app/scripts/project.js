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

  module.getProject = function(project_id){
    $.ajax({
      url: apiRoutes.projects + project_id,
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
    }).done(function(data){
      var supertasks = module.getSupertasks(data);
      Handlebars.partials = Handlebars.templates;
      var template = Handlebars.templates['projectshowTemplate'];
      localStorage.setItem('projectId', data.id);
      $('#container').html(template({project: data, tasks: supertasks}));
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  module.getSupertasks = function(data){
    var supertasks = [];
    for(var i=0; i<data.tasks.length; i++){
      if (data.tasks[i].supertask_id === null){
        supertasks.push(data.tasks[i]);
      }
    }
    return supertasks;
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
          completed: $('#completed').is(':checked'),
          visible: $('#visible').is(':checked')
        }
      }
    })
    .done(function() {
      module.renderUser();
    })
    .fail(function() {
      console.log('error');
    });
  };

  module.showForm = function(){
    $('.form.new').toggle();
  };

  return module;
})(PM || {});


// user_projects GET    /users/:user_id/projects(.:format)       projects#index {:format=>:json}
//               POST   /users/:user_id/projects(.:format)       projects#create {:format=>:json}
//       project GET    /projects/:id(.:format)                  projects#show {:format=>:json}
//               PATCH  /projects/:id(.:format)                  projects#update {:format=>:json}
//               PUT    /projects/:id(.:format)                  projects#update {:format=>:json}
//               DELETE /projects/:id(.:format)                  projects#destroy {:format=>:json}
