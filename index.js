

//Dependecies

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');
var config = require('./config');

// CLI for Admin access
var cli = require('./lib/cli');

// Start server

var server = http.createServer(function(req,res){
  // Parse the URL
  var parsedURL = url.parse(req.url,true);
  // Select only the path
  var path = parsedURL.pathname;
  // regex to validate only the correct path
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');
  // Formate the parameters of the query
  var queryStringObject = parsedURL.query ;
  // Select the headers of the request
  var headers = req.headers ;
  // Get the payload from the user if there is any

  var decoder = new StringDecoder('utf-8');
  var method = req.method ;
  var buffer = '';
  // Get the buffer if ther eis any
  req.on('data',function(data){
    buffer += decoder.write(data);
  });
  req.on('end',function(){
    buffer += decoder.end();
    // Route the data to the correct handler
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Make sure that public assets requsted are routed to public handlers
    chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;

    var data = {
      'trimmedPath' : trimmedPath,
      'method' : method.toLowerCase(),
      'query' : queryStringObject,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buffer)
    };
    if(trimmedPath.indexOf('menu') > -1){
      console.log(path + " Payload "+ buffer);
    }

    // Choose the appropriate handler
    chosenHandler(data,function(statusCode,payload,contentType){
      // Verify variables
      contentType = typeof(contentType) == 'string' ? contentType : 'json';
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;


      var payloadString = '';
      // JSON content type
      if(contentType == 'json'){
        res.setHeader('Content-Type', 'application/json');
        payload = typeof(payload) == 'object' ? payload : {};
        payloadString = JSON.stringify(payload);
      }

      // HTML content type
      if(contentType == 'html'){
        res.setHeader('Content-Type', 'text/html');
        payloadString = typeof(payload) == 'string' ? payload : '';
      }
      // favicon content type
      if(contentType == 'favicon'){
        res.setHeader('Content-Type', 'image/x-icon');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      // CSS content type
      if(contentType == 'css'){
        res.setHeader('Content-Type', 'text/css');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      // PNG content type
      if(contentType == 'png'){
        res.setHeader('Content-Type', 'image/png');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      // JPG content type
      if(contentType == 'jpg'){
        res.setHeader('Content-Type', 'image/jpeg');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      // PLAIN content type
      if(contentType == 'plain'){
        res.setHeader('Content-Type', 'text/plain');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }

      res.writeHead(statusCode);

      res.end(payloadString);
    });
  });

  // Data to send for the handlers
});

// Only HTTP support
// On windows having difficulty creating a valid certificate
server.listen(config.httpPort,function(){
  console.log("Server start listeing on port "+ config.httpPort + " ...");
});




// Possible routes that we have

// Sample just for testing
// Users for Adding, updating, deleting users
// Tokens for validating users by creating token, exnteding duration and deleting tokens
// Menu for getting only the menu for authentificated users
// Payment is a simple post method that will validate an order by id, pay and send email

var router = {
  '' : handlers.index,
  'account/create' : handlers.accountCreate,
  'account/edit' : handlers.accountEdit,
  'account/delete' : handlers.accountDelete,
  'session/create' : handlers.sessionCreate,
  'session/delete' : handlers.sessionDelete,
  'order/create' : handlers.orderCreate,
  'sample' : handlers.sample,
  'api/users' : handlers.users,
  'api/tokens' : handlers.tokens,
  'api/menu' : handlers.menu,
  'api/cart' : handlers.cart,
  'api/payment' : handlers.payment,
  'payment/validate' : handlers.paymentValidate,
  'account/history' : handlers.history,
  'favicon.ico' : handlers.favicon,
  'public' : handlers.public
};


// Start the CLI Last after 50ms
setTimeout(function(){
  cli.init();
},100);
console.log("Test");
