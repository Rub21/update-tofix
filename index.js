#!/usr/bin/env node

'use strict';
var fs = require('fs');
var request = require("request");
var argv = require('minimist')(process.argv.slice(2));
var host = argv.host;
var csvfile = argv.csvfile;
var idtask = argv.idtask;
var password = argv.password;
request({
  url: host + '/detail/' + idtask,
  json: true
}, function(err, response, task) {
  if (!err && response.statusCode === 200) {
    var formData = {
      id: task.id,
      name: task.title,
      source: task.source,
      description: task.description,
      changeset_comment: task.changeset_comment,
      password: password,
      file: fs.createReadStream(csvfile),
      preserve: 'false',
      newtask: 'false'
    };
    // update task
    request.post({
      url: host + '/csv',
      formData: formData
    }, function optionalCallback(err, res, body) {
      if (err) {
        console.log(err);
      }
      console.log(body);
    });
  } else {
    console.log('the task doesnt exit');
  }
});