DevOps Homework 3
==================

**Kriti Bhandari**
**kbhanda**
**200065115**


### Setup

* Clone this repo, run `npm install`.
* Install redis and run on localhost:6379

### Parts 1, 2 and 3

*Run main.js on port 3000 on localhost from the required folder

	node main.js 3000
	

*3000 is passed as a command line argument. 
*Upload some of the images on the localhost using the Curl Command. For E.g.

>	curl -F "image=@./img/hairypotter.jpg" localhost:3000/upload

*On the browser /set, /get, /recent, /meow are used to test the functionality
*'/set' sets a key value 'this key will expire in 10 seconds' for a period of 
*10 seconds
*'/get' gets the value that has been set till it expires. It returns "Expired" 
* after 10 seconds
*'/recent' returns the 5 latest visited urls
*'/meow' returns the uploaded images (FIFO Queue implementation) one by one 
* till the images last in the queue
*Stop main.js from running on 3000 by doing CTRL+C

### Parts 4

*Run main.js on port 3001 on localhost from the required folder

	node main.js 3001
	

*3001 is passed as a command line argument. 
*Upload some of the images using the Curl Command. For E.g.

>	curl -F "image=@./img/hairypotter.jpg" localhost:3001/upload

*On the browser /set, /get, /recent, /meow are used to test the functionality
*Stop main.js from running on 3001 by doing CTRL+C

### Parts 5

*Change the rule on your machine to forward all http requests on your machine 
*on 8080
*Run proxy_server 

	node proxy_server
	
 
*Upload some of the images using the Curl Command. For E.g.

>	curl -F "image=@./img/hairypotter.jpg" localhost:8080/upload
	curl -F "image=@./img/hairypotter.jpg" localhost:8080/upload

*The images are uploaded alternately on 3000 and 3001 
*On the browser /set, /get, /recent, /meow are used to test the functionality
*Each of the requests are served alternately by 3000 and 3001

###Screencast

![gif Recording](https://www.youtube.com/watch?v=p9qEzeFj87g&feature=youtu.be)





