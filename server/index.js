module.exports = function(app, configuration){
	app.get('/', function(req, res) {
		if(gitRepos.setReposDir(directory) != 0){
			res.send('Directory '+directory+' does not exist');
		}
		else {
			var p = new Promise((resolve, reject) => {
					gitRepos.pullFromOrigin((code, stdout, stderr) => {
						if(code != 0){
							reject();
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
			});
			p.catch(() => {res.send('exception');});
		}
	});
	
	app.listen(3000, function() {
		console.log('listening on port 3000');
	});
} ;
