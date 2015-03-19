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
    $('#sign-out').on('click', module.signOut);
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
      module.deferred.done(function(){module.submitRegistration(data);});
    }else{
       data = {user: { email: $('#email-reg').val(),
              user_name: $('#user-name').val(),
              first_name: $('#first-name').val(),
              last_name: $('#last-name').val(),
              password: $('#password-reg').val()
            }};
      module.submitRegistration(data);
    }
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
        var template = Handlebars.templates.homeTemplate;
        Handlebars.partials = Handlebars.templates;
        $('#sidebar').html(template({user: data}));
        module.populateUpdateForm(data);
    }).fail(function(error){
      module.acceptFailure(error);
    });
  };

  module.userUpdateData = function(key){
    var $file = $('#file_upload');
    var $password = $('#password-reg');

    var data = {user: { email: $('#email-reg').val(),
                        user_name: $('#user-name').val(),
                        first_name: $('#first-name').val(),
                        last_name: $('#last-name').val()
                      }};
    if ($file.val() !== '' &&  $password.val() !== ''){
      data.user.password = $('#password-reg').val();
      data.user.image_url = 'https://s3.amazonaws.com/team-fielding/' + key;
      module.deferred.done(function(){module.updateUser(data);});
    }else if($file.val() !== '' && $password.val() === ''){
      data.user.image_url = 'https://s3.amazonaws.com/team-fielding/' + key;
      module.deferred.done(function(){module.updateUser(data);});
    }else if($file.val() === '' && $password.val() !== ''){
      data.user.password = $('#password-reg').val();
      module.updateUser(data);
    }else{
      module.updateUser(data);
    }
  };

  module.updateUser = function(data){
    var currentUser = localStorage.getItem('currentUser');
    $.ajax({
      url: apiRoutes.users + currentUser,
      type: 'PATCH',
      beforeSend : function(xhr) {
        xhr.setRequestHeader('AUTHORIZATION', 'Token token=' + authToken);
      },
      data: data,
    })
    .done(function() {
      window.location.href = '/';
    })
    .fail(function() {
      console.log('failure');
    });

  };

  module.populateUpdateForm = function(data){
    $('#email-reg').val(data.email);
    $('#user-name').val(data.user_name);
    $('#first-name').val(data.first_name);
    $('#last-name').val(data.last_name);
  };

  module.showUpdateForm = function(event){
    event.preventDefault();
    $('.form.update').toggle();
  };

  module.signOut = function(event){
    event.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  };

  return module;
})(PM || {});


$(document).ready(function() {
  PM.runLogin();
});

