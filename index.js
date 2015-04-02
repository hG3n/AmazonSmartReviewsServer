var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

// create a handle to manage different query beginnings
var handle = {};
handle['/'] = requestHandlers.start;

// really start the server
server.start(router.route, handle);
