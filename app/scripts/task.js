'use strict';
console.log('task loaded');

var PM = (function (module) {
  var host = 'http://localhost:3000/',
  authToken = localStorage.getItem('authToken'),
  projectId = localStorage.getItem('projectId'),
  taskId = localStorage.getItem('taskId');

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
      localStorage.setItem('taskId', data.id);
      Handlebars.partials = Handlebars.templates;
      var template = Handlebars.templates.taskShowTemplate;
      $('#column-right').html(template({task: data, comments: supercomments}));

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

  module.createTask = function(event) {
    projectId = localStorage.getItem('projectId');
    event.preventDefault();
    $.ajax({
      url: module.apiRoutes.projects + projectId + '/tasks',
      type: 'POST',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
      data: { task: {
        due_date: $('.new-task-form .taskDueDate').val(),
        completed: $('.new-task-form .taskCompleted').is(':checked'),
        priority: $('.new-task-form .taskPriority').val(),
        title: $('.new-task-form .taskTitle').val(),
        description: $('.new-task-form .taskDescription').val()
        }
      }
    }).done(function() {
      window.location.href = '/#/projects/'+ projectId;
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  // module.updateTask = function() {
  //   $('#container').on('click', '#update-task-button', PM.showTaskForm) , function() {
  //       $('#taskTitle').val('#taskTitle');
  //       $('#taskDescription').val('#taskDescription');
  //       $('#taskDueDate').val('#taskDueDate');
  //       $('#taskCompleted').is(':checked');
  //       $('#taskPriority').val('#taskPriority');
  //   };
  // };

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

  module.createSubtask = function(event) {
    event.preventDefault();
    taskId = localStorage.getItem('taskId');
    $.ajax({
      url: module.apiRoutes.tasks + taskId + '/subtasks',
      type: 'POST',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
      data: { task: {
        due_date: $('.new-subtask-form .taskDueDate').val(),
        completed: $('.new-subtask-form .taskCompleted').is(':checked'),
        priority: $('.new-subtask-form .taskPriority').val(),
        title: $('.new-subtask-form .taskTitle').val(),
        description: $('.new-subtask-form .taskDescription').val()
        }
      }
    }).done(function() {
      window.location.href = '/#/tasks/'+ taskId;
    }).fail(function(data) {
      console.log(data);
    });
  };

  module.showTaskForm = function(){
    $('.new-task-form').toggle();
  };

  module.showSubtaskForm = function(){
    $('.new-subtask-form').toggle();
  };

$('.newTaskForm').on('submit', module.createTask);



  return module;
})(PM || {});

$(document).ready(function() {
});

