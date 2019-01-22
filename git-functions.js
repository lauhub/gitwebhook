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
  }
};
