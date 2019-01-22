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

var gitRepos = require('./gitFunctions');

gitRepos.checkGitInstalled();

//var directory = path.join(__dirname, 'voting-app') ;

var directory = '/home/lauhub';

function createCallback(resolve, reject, next, callback){
	return function(code, stdout, stderr){
		return callback(code, resolve, reject, next);
	};
}

var obj = JSON.parse(fs.readFileSync('gitwebhook.conf', 'utf8'));

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
