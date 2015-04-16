var exec = require('child_process').exec;
var fs = require('fs');
var amazon = require('amazon-product-api');
var aws = require('aws-lib');

function loadCredentials(filename) {
  var credentials = {};
  credentials = fs.readFileSync(filename, 'utf8', function(err, data){
    if(err) {
      console.log('Error: ' + err);
    } else {
      data = data.split('\r');
      credentials.id = data[0].substr(data[0].indexOf('=') + 1, data[0].length);
      credentials.key = data[1].substr(data[1].indexOf('=') + 1, data[1].length);
      credentials.tag = data[2].substr(data[2].indexOf('=') + 1, data[2].length);
      return credentials;
    }
  });
  return credentials;
}

function getReviews(api, productID) {
//sample id: B007NIWPKU

  api.call('ItemSearch', {SearchIndex:'Books', Keywords:'Java'}, function(err,result){
    if(err){
      console.log(err);
    } else {
      console.log(result);
    }
  });

//  api.call('ItemLookup', {ItemId:productID}, function(err,result){
//    if(err) {
//      console.log(err);
//    } else {
//      console.log(result);
//    }
//  });

}

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
  var credentials = loadCredentials("rootkey.csv");

  var prodAdv = aws.createProdAdvClient(credentials.id,credentials.key,credentials.tag);
  getReviews(prodAdv,parameterList.id);

  console.log('Request handler "start" was called.');

  response.writeHead(200, {'Content-Type':'text/plain'});

  for(var property in parameterList) {
    response.write(property + ': ' + parameterList[property] + '\n');
  }

  response.end();
}

exports.start = start;
