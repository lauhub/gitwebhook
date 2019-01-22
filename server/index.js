module.exports = function(app, configuration, gitRepos){
	var shell = require('shelljs');
	
	app.get('/', function(req, res) {
		if(gitRepos.setReposDir(__dirname) != 0){
			res.send('Directory '+ __dirname +' does not exist');
		}
		else {
			var p = new Promise((resolve, reject) => {
					gitRepos.pullFromOrigin((code, stdout, stderr) => {
						if(code != 0){
							reject(new Error("code : "+ stdout+ "stderr:\n"+stderr));
						}
						else{
							resolve(true);
						}
					});
			});
			p.then(successful => {
					if (successful) {
						res.send('done');
						//  response.redirect('/connected');
					}
					else {
						res.send('failed');
						//  response.redirect('/failure');
					}
			}).catch(error => {res.send('exception: '+error.message);});
		}
	});
	
	app.listen(3000, function() {
		console.log('listening on port 3000');
	});
} ;
