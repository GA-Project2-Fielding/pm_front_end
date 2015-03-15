'use strict';
console.log('user loaded');

var PM = (function (module) {
  var authToken, host = 'http://localhost:3000/';
  var apiRoutes = {
      users: host + 'users/',
      projects: host + 'projects/',
      tasks: host + 'tasks/',
      comments: host + 'comments/',
      fileLocations: host + 'file_locations/'
  };

  module.runLogin = function(){
    authToken = localStorage.getItem('authToken');

    module.setupAjaxRequests();

    $('#loginForm').on('submit', module.submitLogin);
  };

  module.setupAjaxRequests = function() {
    $.ajaxPrefilter(function( options ) {
      options.headers = {};
      options.headers['AUTHORIZATION'] = 'Token token=' + authToken;
    });
  };

  module.submitLogin = function(event) {
    var $form;
    event.preventDefault();
    $form = $(this);
    $.ajax({
      url: apiRoutes.users + 'sign_in',
      type: 'POST',
      data: $form.serialize()
    })
    .done(module.loginSuccess)
    .fail(function(err) {
      console.log(err);
    });

    return false;
  };

  module.loginSuccess = function(userData) {
    localStorage.setItem('authToken', userData.token);
    console.log('logged in!');
    window.location.href = '/index.html';
  };

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home'
  },
  home: function(){
    var id = 20; // temp for testing

    $.ajax({
      url: apiRoutes.users + id
    }).done(function(data){
      console.log(data);
    }).fail();
  }
  });

  new Router();
  Backbone.history.start();

  return module;
})(PM || {});

$(function() {
  PM.runLogin();
});
