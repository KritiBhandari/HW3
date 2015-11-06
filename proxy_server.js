var http      = require('http');
var redis = require('redis')
var httpProxy = require('http-proxy');
var exec = require('child_process').exec;
var request = require("request");
var client = redis.createClient(6379, '127.0.0.1', {});
var multer  = require('multer');
var express = require('express')

var server1 = 'http://127.0.0.1:3000';
var server2 = 'http://127.0.0.1:3001';
var port = [3000, 3001];

client.del('servers');

for (var i=0; i<=1; i++){

var childproc = exec('node main.js '+port[i], function(err, out, code) 
    {
      console.log("attempting to run main.js ");
      if (err instanceof Error)
            throw err;
      if( err )
      {
        console.error( err );
      }
    });

}


client.lpush(['servers', server1], function(err, reply){
    console.log(reply);
  });

client.lpush(['servers', server2], function(err, reply){
    console.log(reply);
  });


var options = {};
var proxy   = httpProxy.createProxyServer(options);



var server  = http.createServer(function(req, res)
{
  client.rpoplpush('servers', 'servers', function(err, value){
    proxy.web( req, res, {target: value });
      console.log(value)

    })
  });
server.listen(8080);

//kill child process part: 

var infrastructure = {
teardown: function()
  {
    exec('forever stopall', function()
    {
      console.log("infrastructure shutdown");
      process.exit();
    });
  },
}




// Make sure to clean up.
process.on('exit', function(){infrastructure.teardown();} );
process.on('SIGINT', function(){infrastructure.teardown();} );
process.on('uncaughtException', function(err){
  //console.error(err);
  infrastructure.teardown();} );



  /* var currentvalue = client.rpop('servers',function(err, value){

    proxy.web( req, res, {target: value })
  });
    client.lpush(['servers', currentvalue], function(err, value){
      console.log("LPUSHed: ",value)
    })*/




/*
var options = {};
var proxy   = httpProxy.createProxyServer(3000, 'localhost').listen(8080);
*/


/*
var infrastructure =
{
  setup: function()
  {
    // Proxy.
    

    var server  = http.createServer(function(req, res)
    {
      proxy.web( req, res, {target: TARGET } );
    });
    server.listen(8080);

    // Launch green slice
    //newtarget = TARGET.slice(17,21);
    exec('node main.js '+3000, function(err, out, code) 
    {
      console.log("attempting to run main.js ");
      if (err instanceof Error)
            throw err;
      if( err )
      {
        console.error( err );
      }
    });
}
}*/


