'use strict';
console.log('upload.js loaded');

var PM = (function(module){
  var host = 'http://localhost:3000/';
  var userId = localStorage.getItem('currentUser');
  var authToken = localStorage.getItem('authToken');

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
      console.table(data);
      module.unpackRails(data);
    });
  };

  module.unpackRails = function(data){
    var postdata = new FormData();

    var a = $('#file_upload')[0];
    var file = a.files[0];

    postdata.append('key', data.key);
    postdata.append('AWSAccessKeyId', data.access_key);
    postdata.append('policy', data.policy);
    postdata.append('signature', data.signature);
    postdata.append('Content-Type', file.type);
    postdata.append('file', file);

    module.storeUrl(data.key);
    module.awsRequest(postdata);
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
      options.headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';
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
    .done(function(data) {
      console.log(data);
    })
    .fail(function(errors) {
      console.log(errors);
    });
  };



  //   $.ajax('https://s3.amazonaws.com/team-fielding', { "access_key": sign_key.access_key }, function(data, textStatus, xhr) {
  //     /*optional stuff to do after success */
  //   });


  // module.getAmazonKey = function(){
  //   console.log('hi');
  //   $.get(apiRoutes.amazon, function(sign_key) {
  //     module.buildAwsRequest(sign_key);
  //     // module.sendFileToApi(sign_key.key);
  //   });
  // };

  // module.buildAwsRequest = function(){
  //   console.log('in buildAwsRequest');
  //   module.getAmazonKey();
  // };

  return module;
})(PM || {});

$(document).ready(function(){
$('#fileUploadForm').on('submit', PM.parseRails);
});


