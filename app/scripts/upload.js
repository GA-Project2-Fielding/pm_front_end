'use strict';
console.log('upload.js loaded');

var PM = (function(module){
  var host = 'http://localhost:3000/';
  var userId = localStorage.getItem('currentUser');
  var authToken = localStorage.getItem('authToken');
  module.deferred = $.Deferred();

  var apiRoutes = {
      users: host + 'users/',
      projects: host + 'projects/',
      tasks: host + 'tasks/',
      comments: host + 'comments/',
      fileLocations: host + 'file_locations/',
      amazon: host + 'amazon/sign_key/image%2Fjpeg'
  };


  module.parseRails = function(event){
    event.preventDefault();
    $.get(apiRoutes.amazon, function(data){
      if(event.target.id === 'user-update-form'){
        module.userUpdateData(data.key);
      }else{
        module.hasProfPic(data.key);
      }
      module.unpackRails(data);
    });
  };

  module.unpackRails = function(data){
    var postdata = new FormData();

    var a = $('#file_upload')[0];
    var file = a.files[0];

    if (file){
      postdata.append('key', data.key);
      postdata.append('AWSAccessKeyId', data.access_key);
      postdata.append('policy', data.policy);
      postdata.append('signature', data.signature);
      postdata.append('Content-Type', file.type);
      postdata.append('file', file);
      module.awsRequest(postdata);
    }
  };

  module.storeUrl = function(suffix){
    $.ajax({
      url: apiRoutes.users + userId,
      type: 'PATCH',
      headers: { 'AUTHORIZATION': 'Token token=' + authToken },
      data: { user: {image_url: 'https://s3.amazonaws.com/team-fielding/' + suffix}}
    })
    .done(function() {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });

  };

  module.setAwsHeader = function(){
    $.ajaxPrefilter(function(options){
      options.headers = {};
      options.headers.Accept = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';
    });
  };

  module.awsRequest = function(postdata) {
    module.setAwsHeader();
    $.ajax({
      url: 'https://s3.amazonaws.com/team-fielding',
      type: 'POST',
      data: postdata,
      processData: false,
      contentType: false
    })
    .done(function() {
      console.log('image sent to amazon');
      module.deferred.resolve();
    })
    .fail(function(errors) {
      console.log(errors);
    });
  };

  return module;
})(PM || {});


