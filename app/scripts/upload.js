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

    postdata.key = data.key;
    postdata.AWSAccessKeyId = data.access_key;
    postdata.policy = data.policy;
    postdata.signature = data.signature;
    postdata.contentType = file.type;
    postdata.file = file;

    // postdata.set('key', data.key);
    // postdata.set('AWSAccessKeyId', data.access_key);
    // postdata.set('policy', data.policy);
    // postdata.set('signature', data.signature);
    // postdata.set('contentType', file.type);
    // postdata.set('file', file);


    module.awsRequest(postdata);
  };

  module.setAwsHeader = function(){
    $.ajaxPrefilter(function(options){
      options.headers = {};
      options.headers['Accept'] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8";
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
      console.log('success!!!!!');
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


