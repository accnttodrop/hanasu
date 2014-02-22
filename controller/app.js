var restify = require('restify');
var https = require('https');
var Future = require('futures').future;

var request_wit = function(user_text) {
    var options = {
	host : 'api.wit.ai',
	path : '/message?q='+encodeURIComponent(user_text),
	headers: {'Authorization' : 'Bearer ETLJSAMINY3NYUF3LFCYISGT2SLINLY'}
    };
    var future = Future.create(); 
    https.request(options, function(res) {

	var response = ' ';
	res.on('data', function (chunk) {
	    response += chunk; 
	});
	
	res.on('data', function (chunk) {
	    future.fulfill(undefined, JSON.parse(response)); 
	})
    }).on('error', function(e) {
	fulfill(e, undefined);
    }).end();
    return future;
}
function respond(req, res, next) {
  res.send('hello ' + req.params.name);
}

var server = restify.createServer();
server.get(/.*/,restify.serveStatic({
    directory : '/home/blade/work/hanasu/ui'
}));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
