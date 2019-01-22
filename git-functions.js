module.exports = {
	shell: require('shelljs'),
  checkGitInstalled: function () {
    if (!this.shell.which('git')) {
			this.shell.echo('Sorry, this script requires "git" to be installed');
			this.shell.exit(1);
			return false;
		}
		else {
			console.log("git found !");
			return true;
		}
  },
  setReposDir: function (newDir, callback) {
  	this.directory = newDir;
    return this.shell.cd(this.directory).code;
  },
  pullFromOrigin: function (callback) {
  	console.log("Executing pullFromOrigin");
    this.shell.exec('git pull', callback);
  	console.log("End of pullFromOrigin");
  }
};
