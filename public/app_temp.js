/*
*
* FrontEnd Logic for the API
*
*/

var app = {};

// Configuration
app.config = {
  'sessionToken' : false
};

// Ajax Client for the restful API

app.client = {};

// Interface for making API calls

app.client.request = function(headers, path, method, queryStringObject, payload, callback){
  // SET defaults values
  headers = typeof(headers) == 'object' && headers != null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['PUT','GET','POST','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject != null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload != null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  // Building the url based on the queryStringObject

  var requestUrl = path + '?';
  var counter = 0 ;
  for(var queryKey in queryStringObject){
    if(queryStringObject.hasOwnProperty(queryKey)){
      counter++;
      if(counter > 1){
        requestUrl += '&';
      }
      // Append the key and value to the request url
      requestUrl += queryKey + '=' + queryStringObject[queryKey];
    }
  }
  // Creating the HTTP request as JSON

  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl,true);
  xhr.setRequestHeader("Content-Type","application/json");

  // For each header sent add it to the request
  for(var headerKey in headers){
    if(headers.hasOwnProperty(headerKey)){
      xhr.setRequestHeader(headerKey, headers[headerKey]);
    }
  }
  // Check if there is an already created session and add it to the header
  if(app.config.sessionToken){
    xhr.setRequestHeader('token',app.config.sessionToken.id)
  }
  // When the request comes back handle the response

  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){
      var statusCode = xhr.status;
      var responseReturned = xhr.responseText;
      // callback if requested
      if(callback){
        try{
          var parsedResponse = JSON.parse(responseReturned);
          callback(statusCode,parsedResponse);
        } catch(e){
          callback(statusCode,false);
        }
      }
    }
  };


  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);

};
