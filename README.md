# Git Web Hook handler

## Installation

```
npm install
```


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