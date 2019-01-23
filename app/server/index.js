module.exports = function(app, configuration){
	var shell = require('shelljs');
	var requests = require('./requests');
	
	app.get('/', function(req, res) {
			res.send('failed : unknown request handler');
	});
	
	configuration.hooks.forEach(function(hook){
		console.log(hook);
		console.log(`Adding hook ${hook.id}`);
		app.post('/'+hook.id, function(req, res) {
				console.log(JSON.stringify(req.body));
				console.log(req.body.zen);
				
				requests.createRequestHandlerPromise(hook.dir, hook.cmd, hook.id)
				.then(successful => {
						if (successful) {
							res.send('done ' + successful);
						}
						else {
							res.send('failed '+successful);
						}
				}).catch(error => {res.send('exception: '+error.message);});
		});
	});
	
	var port = 3000;
	if(configuration.port){
		port = configuration.port
	}
	app.listen(port, function() {
		console.log(`listening on port ${port}`);
	});
} ;
