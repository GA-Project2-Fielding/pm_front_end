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
  $('#sidebar').on('click', '#new-project-button', PM.showProjectForm);
  $('#sidebar').on('submit', '#newProjectForm', PM.submitProject);
  $('#content-top').on('click', '#new-task-button', PM.showTaskForm);
  $('#content-top').on('submit', '.new-task-form .newTaskForm', PM.createTask);
  $('#container').on('click', '#new-subtask-button', PM.showForm);
  $('#container').on('submit', '.new-subtask-form .newTaskForm', PM.createSubtask);
  $('#column-right').on('submit', '.new-comment-form .newCommentForm', PM.createComment);
};

new Router();
Backbone.history.start();

$(document).ready(function() {
  setClickHandlers();
});
