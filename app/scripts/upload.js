'use strict';
console.log('upload.js loaded');

var PM = (function(module){
  var host = 'http://localhost:3000/';

  var apiRoutes = {
      users: host + 'users/',
      projects: host + 'projects/',
      tasks: host + 'tasks/',
      comments: host + 'comments/',
      fileLocations: host + 'file_locations/',
      amazon: host + '/amazon/sign_key/image%2Fjpeg'
  };


  module.fileUpload = function(event){
    event.preventDefault();
    $.get(apiRoutes.amazon, function(data) {
      module.awsRequest(data);
    });
  };

  module.awsRequest = function(sign_key) {
    $.post('https://s3.amazonaws.com/team-fielding', { "access_key": sign_key.access_key }, function(data, textStatus, xhr) {
      /*optional stuff to do after success */
    });
  };

  module.getAmazonKey = function(){
    console.log('hi');
    $.get(apiRoutes.amazon, function(sign_key) {
      module.buildAwsRequest(sign_key);
      // module.sendFileToApi(sign_key.key);
    });
  };

  module.buildAwsRequest = function(){
    console.log('in buildAwsRequest');
    module.getAmazonKey();
  };

  return module;
})(PM || {});

$(document).ready(function(){
$('#fileUploadForm').on('submit', PM.fileUpload);
});


