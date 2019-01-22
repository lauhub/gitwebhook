module.exports = function(app, configuration){
	var shell = require('shelljs');
	var requests = require('./requests');
	
	app.get('/', function(req, res) {
			res.send('failed : unknown request handler');
	});
	
	configuration.hooks.forEach(function(hook){
		console.log(hook);
		console.log(`Adding hook ${hook.id}`);
		app.get('/'+hook.id, function(req, res) {
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
	
	app.listen(3000, function() {
		console.log('listening on port 3000');
	});
} ;
