function route(handle, handler, pathname, response) {

  console.log('About to route a request for ' + pathname);
  
  // currently useless handle for different url querys
  // but working for the moment
  if(typeof handle[handler] === 'function') {
    return handle[handler](response,pathname);
  } else {
    console.log('No request pathname found for ' + pathname);
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('404 Not Found');
    response.end();
  }
}

exports.route = route;
