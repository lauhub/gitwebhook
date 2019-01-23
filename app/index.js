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
var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var express = require('express');
var app = express();

if (!shell.which('git')) {
	shell.echo('Sorry, this script requires "git" to be installed');
	shell.exit(1);
}
else {
	console.log("git found !");
}
var cwd = shell.pwd().stdout;

// Morgan configuration
// see http://expressjs.com/en/resources/middleware/morgan.html (single file logger)
var accessLogStream = fs.createWriteStream(path.join(cwd, 'access.log'), { flags: 'a' })
app.use(morgan('short', { stream: accessLogStream }))

var functions = require('./functions');

//Check configuration file existence and run server if exists
var confFile = functions.getConfigurationFilePath(cwd);
if(confFile !== undefined){
	console.log('Loading '+ confFile +' configuration');
	var configuration = JSON.parse(fs.readFileSync(confFile, 'utf8'));
	
	//Let us configure express (https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters):
	app.use(express.json());
	
	require("./server")(app, configuration);
}
else {
	console.log("Missing configuration file" );
	process.exit(1);
}
