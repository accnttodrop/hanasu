var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
}

var server = restify.createServer();
server.get(/.*/,restify.serveStatic({
    directory : './ui'
}));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
