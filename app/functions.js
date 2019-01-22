var path = require('path');

module.exports = {
	/**
	 * Searches for configuration file named 'gitwebhook.conf'
	 * 
	 * Configuration file may be
	 * - user's home directory's '.gitwebhook' file
	 * - in current directory's conf dir
	 * - in /etc/gitwebhook dir
	 * 
	 */
	getConfigurationFilePath: function(currentDir){
		var shell = require('shelljs') ;
		var configurationFilename = 'gitwebhook.conf' ;
		const homeDir = require('os').homedir() ;
		
		const defaultDir = "/etc/gitwebhook" ;
		
		var arrayConfigurationFilepath = [
			path.join(homeDir, '.gitwebhook'),
			path.join(currentDir, 'conf', configurationFilename),
			path.join('/etc/gitwebhook', configurationFilename)
		];
		var confFilepath = undefined ;
		var i = 0;
		while (confFilepath === undefined && i < arrayConfigurationFilepath.length) {
			if (shell.test('-e', arrayConfigurationFilepath[i])){
				confFilepath = arrayConfigurationFilepath[i];
			}
			i++ ;
		}
		return confFilepath
	}
}
