var http = require('http')
var url = require('url')

function start(route,handle){

  function onRequest(request, response) {

    // get url path beginning beyond port number
    var pathname = url.parse(request.url).path;

    console.log('Request for ' + pathname + ' received');
    request.setEncoding('utf-8');

    // route the given parameters to the request handler
    // second parameter is a little hack for skipping the handle
    // kind of useless right now but working, if there might be 
    // different querys for different types of request this may change
    route(handle,'/',pathname, response);
  }

  // create and start the server on port 8000
  http.createServer(onRequest).listen(8000);
  console.log("server started");
}

exports.start = start
