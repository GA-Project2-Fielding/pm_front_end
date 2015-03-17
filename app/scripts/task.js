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

  module.getTasks = function(id) {
    $.ajax({
      url: module.apiRoutes.projects + id + '/tasks',
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
       console.log(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  module.createTask = function(event, id) {
    event.preventDefault();
    $.ajax({
      url: module.apiRoutes.projects + id + '/tasks',
      type: 'POST',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
      data: { task: {
        due_date: $('input#taskDueDate').val(),
        completed: $('input#taskCompleted').val(),
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
    $('button#updateTask').on('click', )
  }

  module.patchTask = function(event, id) {
    event.preventDefault();
    $.ajax({
      url: module.apiRoutes.tasks + id,
      type: 'PATCH',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
      data: { task: {
        due_date: $('input#taskDueDate').val(),
        completed: $('input#taskCompleted').val(),
        priority: $('select#taskPriority').val(),
        title: $('input#taskTitle').val(),
        description: $('textarea#taskDescription').val()
        }
      }
    }).done().fail();
  };

  module.createSubtask = function(event, id) {
    event.preventDefault();
    $.ajax({
      url: module.apiRoutes.tasks + id + '/subtasks',
      type: 'GET',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
      data: { task: {
        due_date: $('input#taskDueDate').val(),
        completed: $('input#taskCompleted').val(),
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

  return module;
})(PM || {});

$(document).ready(function() {
});

