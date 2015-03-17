'use strict';
console.log('main loaded');


var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'home': 'home',
        'projects/:id': 'getProject',
        'tasks/:id': 'getOneTask',
        'comments/:id': 'getComment'
    },
    home: PM.renderUser(),
    getProject: function(id){
      PM.getProject(id);
    },
    getOneTask: function(id){
      PM.getOneTask(id);
    },
    getComment: function(id){
      PM.getComment(id);
    }
});

var setClickHandlers = function(){
  $('#container').on('click', '#new-project-button', PM.showForm);
  $('#container').on('submit', '#newProjectForm', PM.submitProject);
  $('#container').on('click', '#new-task-button', PM.showForm);
  $('#container').on('submit', '#newTaskForm', PM.createTask);
  $('#container').on('click', '#new-subtask-button', PM.showForm);
};

new Router();
Backbone.history.start();

$(document).ready(function() {
  setClickHandlers();
});
