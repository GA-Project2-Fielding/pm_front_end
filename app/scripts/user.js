'use strict';
console.log('user loaded');

var PM = (function () {
  var authToken, host = 'http://localhost:3000/';
  var apiRoutes = {
      users: host + 'users/',
      projects: host + 'projects/',
      tasks: host + 'tasks/',
      comments: host + 'comments/',
      fileLocations: host + 'file_locations/'
  };

  var runLogin = function(){
    authToken = localStorage.getItem('authToken');

    setupAjaxRequests();

    $('#loginForm').on('submit', submitLogin);
  };

  var setupAjaxRequests = function() {
    $.ajaxPrefilter(function( options ) {
      options.headers = {};
      options.headers['AUTHORIZATION'] = 'Token token=' + authToken;
    });
  };

  var submitLogin = function(event) {
    var $form;
    event.preventDefault();
    $form = $(this);
    $.ajax({
      url: apiRoutes.users + 'sign_in',
      type: 'POST',
      data: $form.serialize()
    })
    .done(loginSuccess)
    .fail(function(err){
      console.log(err);
    });

    return false;
  };

  var loginSuccess = function(userData) {
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('currentUser', userData.id);
    console.log('logged in!');
    window.location.href = '/index.html';
  };

  var acceptFailure = function(error) {
    if (error.status === 401) {
      console.log('SEND TO LOGIN SCREEN');
      window.location.href = '/';
    }
  };

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home'
  },
  home: function(){
    var currentUser = localStorage.getItem('currentUser');

    $.ajax({
      url: apiRoutes.users + currentUser
    }).done(function(data){
      console.log(data);
    }).fail();
  }
  });

  new Router();
  Backbone.history.start();

  return runLogin;
})();

$(document).ready(function() {
  PM.runLogin();
});
