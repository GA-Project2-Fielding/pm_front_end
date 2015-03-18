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
    $('#registrationForm').on('submit', module.parseRails);
  };

  module.submitRegistration = function(data){
    $.ajax({
      url: apiRoutes.users,
      type: 'POST',
      data: data
    })
    .done(function(data){
      module.loginSuccess(data);
    })
    .fail(function(errors){
      console.log(errors);
    });
  };

  module.hasProfPic = function(key){
    var awsKey = key;
    var data;
    if ($('#file_upload').val() !== ''){
       data = {user: { email: $('#email-reg').val(),
            user_name: $('#user-name').val(),
            first_name: $('#first-name').val(),
            last_name: $('#last-name').val(),
            password: $('#password-reg').val(),
            image_url: 'https://s3.amazonaws.com/team-fielding/' + awsKey
          }};
    }else{
       data = {user: { email: $('#email-reg').val(),
              user_name: $('#user-name').val(),
              first_name: $('#first-name').val(),
              last_name: $('#last-name').val(),
              password: $('#password-reg').val()
            }};
    }
    module.submitRegistration(data);
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
        Handlebars.partials = Handlebars.templates;
        var template = Handlebars.templates['homeTemplate'];
        $('#sidebar').html(template({user: data}));
    });
  };

  module.showUpdateForm = function(event){
    event.preventDefault();
    $('.form.update').toggle();
  };

  return module;
})(PM || {});


$(document).ready(function() {
  PM.runLogin();
});

