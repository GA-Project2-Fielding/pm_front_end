'use strict';
console.log('user loaded');

var PM = (function (module) {
  var host = 'http://localhost:3000/';
  var authToken = localStorage.getItem('authToken');

  var apiRoutes = {
      users: host + 'users/',
      projects: host + 'projects/',
      tasks: host + 'tasks/',
      comments: host + 'comments/',
      fileLocations: host + 'file_locations/'
  };

  module.runLogin = function(){
    $('#loginForm').on('submit', module.submitLogin);
    $('#registrationForm').on('submit', module.submitRegistration);
  };

  module.submitRegistration = function(event){
    event.preventDefault();
    $.ajax({
      url: apiRoutes.users,
      type: 'POST',
      data: {user: { email: $('#email-reg').val(),
              user_name: $('#user-name').val(),
              first_name: $('#first-name').val(),
              last_name: $('#last-name').val(),
              password: $('#password-reg').val()
            }}
    })
    .done(module.loginSuccess)
    .fail(function(errors){
      console.log(errors);
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
    .fail(module.acceptFailure);

    return false;
  };

  module.loginSuccess = function(userData) {
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('currentUser', userData.id);
    console.log('logged in!');
    window.location.href = '/#/home';
  };

  module.acceptFailure = function(error) {
    if (error.status === 401) {
      console.log('SEND TO landing SCREEN');
      window.location.href = '/landing.html';
    }
  };

  module.renderUser = function(){
    var currentUser = localStorage.getItem('currentUser');

    $.ajax({
        url: apiRoutes.users + currentUser,
        type: 'GET',
        headers: { 'AUTHORIZATION': 'Token token=' + authToken },
    }).done(function(data){
        var template = Handlebars.compile($('#homeTemplate').html());
        $('#container').html(template({user: data}));
        console.log(data);
    }).fail(function(errors){
        console.log(errors);
    });
  };

  var Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    },
    home: module.renderUser()
  });

  new Router();
  Backbone.history.start();

  return module;
})(PM || {});

PM.runLogin();
