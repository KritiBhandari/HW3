var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
var upload = multer({ dest: './uploads/'})
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})

///////////// WEB ROUTES
//Part 2: For get and set:

/*client.set("key", "value");
client.get("key", function(err,value){
	console.log(value)
});*/
// Add hook to make it easier to get all visited URLS.
app.use(function(req, res, next) 
{
	console.log(req.method, req.url);

	client.lpush('urlnames',req.url, function(err, reply){
		//console.log(reply);
	});

	client.ltrim('urlnames',0,4, function(err, reply){
		console.log(reply);
	});

	// ... INSERT HERE.

	next(); // Passing the request to the next handler in the stack.
});


//Part 1: prints hello world 
app.get('/', function(req, res){
	res.send('hello world '+ '<br> Request served at: ' + req.client.server._connectionKey.slice(7,11))

})


//Part 3- An expiring Cache

app.get('/set', function(req, response){
	client.set("key1", "this message will self-destruct in 10 seconds", function(err, value){
			response.send(value+ '<br> Request served at: ' + req.client.server._connectionKey.slice(7,11));
	})
	client.expire("key1",10);
})

app.get('/get', function(req, response) {
	
	client.get("key1", function(err, value) {
		if (value)
			response.send(value+ '<br> Request served at: ' + req.client.server._connectionKey.slice(7,11))
		else 
			response.send("Expired"+ '<br> Request served at: ' + req.client.server._connectionKey.slice(7,11))

			});


})




app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
    console.log(req.body) // form fields
    console.log(req.files) // form files

    if( req.files.image )
    {
 	   fs.readFile( req.files.image.path, function (err, data) {
	  		if (err) throw err;
 	  		var img = new Buffer(data).toString('base64');
 	  		client.lpush(['images',img], function(err, reply){
					//console.log(reply);
			})
 	  		
 		});
 	}

    res.status(204).end()
 }]);

 app.get('/meow', function(req, res) 
 	{
 		client.rpop('images', function(err, imagedata){
 		if (err) throw err
 		res.writeHead(200, {'content-type':'text/html'});	
		//console.log(reply);
		res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>"+'<br> Request served at: ' + req.client.server._connectionKey.slice(7,11));
		res.end();
	})
   	
 	
 })


// HTTP SERVER
var server = app.listen(process.argv[2], function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

app.get('/recent', function(req, res){
	client.lrange('urlnames', 0, 4, function(err, value)
	{
		res.send(value+'<br> Request served at: ' + req.client.server._connectionKey.slice(7,11));
	})
})

