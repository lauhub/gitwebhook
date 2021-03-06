var shell = require('shelljs');

module.exports = {
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
