/*******************************************************************************
 * A Webhook script for github
 *
 * Author: Laurent HUBERT
 * License: GPL
 *
 * Dependencies and source code re-use:
 * 
 * shelljs : Copyright (c) 2012, Artur Adib <arturadib@gmail.com>
 * All rights reserved.
 * 
 *
 ******************************************************************************/

var express = require('express');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var shell = require('shelljs');

var app = express();

// Morgan configuration
// see http://expressjs.com/en/resources/middleware/morgan.html (single file logger)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('short', { stream: accessLogStream }))

var gitRepos = require('./git-functions');

gitRepos.checkGitInstalled();

/**
 * Searches for configuration file named 'gitwebhook.conf'
 * 
 * Configuration file may be
 * - user's home directory's '.gitwebhook' file
 * - in current directory's conf dir
 * - in /etc/gitwebhook dir
 * 
 */
function getConfigurationFilePath(){
	var shell = require('shelljs') ;
	var configurationFilename = 'gitwebhook.conf' ;
	const homeDir = require('os').homedir() ;
	
	const defaultDir = "/etc/gitwebhook" ;
	
	var arrayConfigurationFilepath = [
		path.join(homeDir, '.gitwebhook'),
		path.join(__dirname, 'conf', configurationFilename),
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

//Check configuration file existence and run server if exists
var confFile = getConfigurationFilePath();
if(confFile !== undefined){
	console.log('Loading '+ confFile +' configuration');
	var configuration = JSON.parse(fs.readFileSync(confFile, 'utf8'));
	require("./server")(app, configuration, gitRepos);
}
else {
	console.log("Missing configuration file" );
	process.exit(1);
}
