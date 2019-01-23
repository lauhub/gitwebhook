# Git Web Hook handler

An express.js webserver that manages GitHub WebHooks requests

## Installation

```
npm install
```

## Configuration

Copy the `conf/gitwebhook.conf.sample` to one of the following locations:

 - `$HOME/.gitwebhook`
 - `conf/gitwebhook.conf` (in directory from where app is launched)
 - `/etc/gitwebhook/gitwebhook.conf`

Modify it according to your needs`. The following file:

```
{
    "hooks": [
        {
            "id": "test-the-pull",
            "dir": "/full/path/to/local/repos",
            "cmd": "/full/path/to/script"
        }
    ],
    "port": 3011
}
```

will allow the following POST request :

```
http://127.0.0.1:3011/test-the-pull
```

to execute `/full/path/to/script` executable file into `/full/path/to/local/repos` directory.

**Important** 

Make sure your script has executable permission.

## NGINX sample configuration file

```conf
server {
  listen 80;
  listen [::]:80;

  root /var/www/server/ ;
  index index.html index.htm;
  server_name server.domain.example.org ;

  location / {
    try_files $uri $uri/ =404;
  }
  
  # This will make any request to server.domain.example.org/webhook rewritten
  # e.g. :
  # Request : http://server.domain.example.org/webhook/test-hook
  # will become : http://127.0.0.1:3001/test-hook
  location /webhook/ {
    proxy_pass    http://127.0.0.1:3001/ ;
    # in order to rewrite URL
    proxy_set_header Host $host;
  }    
}
```
