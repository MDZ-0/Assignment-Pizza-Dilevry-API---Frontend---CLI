/*
* Email Library that handle sending email to the client once order is valid
*/
// Dependecies

var config = require('../config');
var https = require('https');
var querystring = require('querystring');
var StringDecoder = require('string_decoder').StringDecoder;


// Container

var email = {};
// Helper that enable us to simply send a receipt to the client
// Require:
// Object : Email, Order content, Total Payment
email.sendReceipt = function(email,payment,id,callback){
  // No need to verify input since it will passed directly after payment confirmed

  // API key
  var username = 'api:' + config.emailApiKey;
  // Validate the Authorization
  var auth = 'Basic ' + new Buffer.from(username).toString('base64');
  // Mimicing the curl behavior
  var payload = {
    from : 'Mailgun Sandbox <postmaster@' + config.emailDomain + '>',
    to : email,
    subject : 'Payment receipt of order-' + id,
    text : 'We confirm the payment of ' + payment + '$, thank you for visiting our humble pizza shop'
  };
  payload = querystring.stringify(payload);
  var options = {
    hostname : 'api.mailgun.net',
    path : '/v3/' + config.emailDomain + '/messages',
    method : 'POST',
    port : 443,
    headers : {
      'Authorization': auth,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept' : '*/*',
      'Content-Length': payload.length
    }
  };
  var buffer = "";
  var decoder = new StringDecoder('utf-8');
  var req = https.request(options,function(res){
    buffer = "";
    // Getting buffer if any
    res.on('data',function(d){
      process.stdout.write(d);
      buffer += decoder.write(d);
    });

    res.on('end',function(){
      buffer += decoder.end();
      callback(false,JSON.parse(buffer));
    });

  // Building the payload of the https request
  });

  req.on('error', function(err){
    if(!err){
      console.log('All good!');
    } else{
      console.error("Error" + err);
    }
  });
  req.write(payload);
  req.end();
};

//
module.exports = email;
