var restify = require('restify');
var https = require('https');
var url = require('url'); 
var Future = require('futures').future;

var request_wit = function(user_text) {
  var options = {
        host: 'api.wit.ai',
        path: '/message?q=' + encodeURIComponent(user_text),
        // the Authorization header allows you to access your Wit account
        // make sure to replace it with your own
        headers: {'Authorization': 'Bearer ETLJSAMINY3NYUF3LFCYISGT2SLINLYF'}
    };


    console.log("Send message "+user_text);
    var future = Future.create(); 
     https.request(options, function(res) {
        var response = '';

        res.on('data', function (chunk) {
            response += chunk;
        });

        res.on('end', function () {
	    console.log("Sucess " + response);
            future.fulfill(undefined, response);
        });
    }).on('error', function(e) {
	console.log("Error " + e);
        future.fulfill(e, undefined);
    }).end();

    return future;
}

function respond(req, res, next) {
  var urlPart = url.parse(req.url,true);
  var witRequest = request_wit(urlPart.query.msg)
  witRequest.when(function(err,response) {
      if(err) {
	  res.end("There is an error" + err);
      }else { 
	  res.end(response);
      }
  });
  return next();
}

var server = restify.createServer();

//server.use(restify.CORS());
server.use(restify.fullResponse());
server.get('/wit', respond);
server.get(/.*/,restify.serveStatic({
    directory : '/home/blade/work/hanasu/ui'
}));



server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

