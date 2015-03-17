'use strict';
console.log('task loaded');

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

  module.getTasks = function(project_id) {
    $.ajax({
      url: module.apiRoutes.projects + project_id + '/tasks',
      type: 'GET',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken }
    }).done(function(data) {
      console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  module.getOneTask = function(id) {
    $.ajax({
      url: module.apiRoutes.tasks + id,
      type: 'GET',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken }
    }).done(function(data) {
      var supercomments = module.getSupercomments(data);
      var template = Handlebars.templates['taskShowTemplate'];
      $('#container').html(template({task: data, comments: supercomments}));
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  module.getSupercomments = function(data){
    var supercomments = [];
    for(var i=0; i<data.comments.length; i++){
      if (data.comments[i].supercomment_id === null){
        supercomments.push(data.comments[i]);
      }
    }
    return supercomments;
  };

  module.createTask = function(event, project_id) {
    event.preventDefault();
    $.ajax({
      url: module.apiRoutes.projects + project_id + '/tasks',
      type: 'POST',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
      data: { task: {
        due_date: $('input#taskDueDate').val(),
        completed: $('input#taskCompleted').is(':checked'),
        priority: $('select#taskPriority').val(),
        title: $('input#taskTitle').val(),
        description: $('textarea#taskDescription').val()
        }
      }
    }).done(function(data) {
      console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  module.updateTask = function() {
    $('#container').on('click', '#update-task-button', PM.showTaskForm) , function() {
        $('#taskTitle').val('#taskTitle');
        $('#taskDescription').val('#taskDescription');
        $('#taskDueDate').val('#taskDueDate');
        $('#taskCompleted').is(':checked');
        $('#taskPriority').val('#taskPriority');
    };
  };

  module.patchTask = function(event, id) {
    event.preventDefault();
    $.ajax({
      url: module.apiRoutes.tasks + id,
      type: 'PATCH',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
      data: { task: {
        due_date: $('input#taskDueDate').val(),
        completed: $('input#taskCompleted').is(':checked'),
        priority: $('select#taskPriority').val(),
        title: $('input#taskTitle').val(),
        description: $('textarea#taskDescription').val()
        }
      }
    }).done(function(data) {
      console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  module.deleteTask = function(event, id) {
    event.preventDefault();
    $.ajax({
      url: module.apiRoutes.tasks + id,
      type: 'DELETE',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken }
    }).done(function(data){
      console.log(data);
      location.reload();
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  module.createSubtask = function(event, project_id) {
    event.preventDefault();
    $.ajax({
      url: module.apiRoutes.tasks + project_id + '/subtasks',
      type: 'GET',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
      data: { task: {
        due_date: $('input#taskDueDate').val(),
        completed: $('input#taskCompleted').is(':checked'),
        priority: $('select#taskPriority').val(),
        title: $('input#taskTitle').val(),
        description: $('textarea#taskDescription').val()
        }
      }
    }).done(function(data) {
      console.log(data);
    }).fail(function(data) {
      console.log(data);
    });
  };

$('#newTaskForm').on('submit', module.createTask);

  return module;
})(PM || {});

$(document).ready(function() {
});

