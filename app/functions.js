module.exports = {
  checkGitIsInstalled: function () {
    if (!shell.which('git')) {
			shell.echo('Sorry, this script requires "git" to be installed');
			shell.exit(1);
			return false;
		}
		else {
			console.log("git found !");
			return true;
		}
  }
}
