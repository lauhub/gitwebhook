var shell = require('shelljs');

module.exports = {
  checkGitInstalled: function () {
    if (!shell.which('git')) {
			shell.echo('Sorry, this script requires "git" to be installed');
			shell.exit(1);
			return false;
		}
		else {
			console.log("git found !");
			return true;
		}
  },
  setReposDir: function (newDir, callback) {
  	this.directory = newDir;
    return shell.cd(this.directory).code;
  },
  pullFromOrigin: function (callback) {
  	console.log("Executing pullFromOrigin");
    shell.exec('git pull', callback);
  	console.log("End of pullFromOrigin");
  },
  createRequestHandlerPromise: function(directory, command, identifier){
  	return new Promise((resolve, reject) => {
				if (shell.cd(directory).code != 0) {
					reject(new Error("code : "+ code+ ", directory "+ directory + " does not exist !"));
				}
				shell.exec(command, (code, stdout, stderr) => {
					if(code != 0){
						reject(new Error("code : "+ stdout+ "stderr:\n"+stderr));
					}
					else{
						resolve(identifier);
					}
				});
		});
  }
};
