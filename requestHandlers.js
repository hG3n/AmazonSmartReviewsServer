var exec = require('child_process').exec;
var amazon = require('amazon-product-api');
var aws =require('aws-lib');

function getParametersFromQuery(path) {
  // delete the leading '/'
  path = path.substr(1,path.length);
  var parameterList = path.split(';');
  
  // creates an object with all the parameters of the url query
  var parameters = {};
  for(var i = 0; i < parameterList.length; i++) {
    parameters[parameterList[i].substr(0, parameterList[i].indexOf('='))]
      = parameterList[i].substr(parameterList[i].indexOf('=') + 1, parameterList[i].length);
  }

  return parameters;
}

function start(response,pathname) {
  var parameterList = getParametersFromQuery(pathname);

  console.log('Request handler "start" was called.');

  response.writeHead(200, {'Content-Type':'text/plain'});

  for(var property in parameterList) {
    response.write(property + ': ' + parameterList[property] + '\n');
  }

  response.end();
}

exports.start = start;
