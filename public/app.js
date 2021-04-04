/*
 * Frontend Logic for application
 *
 */


//
//$('h3 span:first-child').after("<span class=\"dots\"> </span>");

// Container for frontend application
var app = {};

// Config
app.config = {
  'sessionToken' : false
};

// Functions for orders cart
app.cart = {};

// Menu
app.menu = {};
//
app.cart.removeOrder = function(){
  alert(this.name + " ???");
//alert(document.getElementById(id).getElementsByClassName('orderSum'));
};
// functions for setting order
app.cart.addOrder = function(){
  //var cart = document.getElementById('orderCreate').elements['cart'];
  var cart = document.getElementById('cartList');
  var orderName = document.querySelector('#orderCreate .orderName');
  var orderSize = document.querySelector('#orderCreate .itemSize');
  var orderNbrItems = document.querySelector('#orderCreate .orderNbrItems');
  var menu = JSON.parse(localStorage.getItem('menu'));
  var totalPrice = 0 ;
  var itemPrice = 0;


  if(cart && orderName && orderSize && orderNbrItems && orderNbrItems.value > 0){

    // Getting the total Value of the order from the menu
    for(var e in menu){
      if(menu[e].name == orderName.value){
        itemPrice = menu[e].prices[menu[e].Sizes.indexOf(orderSize.value)].replace("$","");
        totalPrice = menu[e].prices[menu[e].Sizes.indexOf(orderSize.value)].replace("$","")*orderNbrItems.value;
      }
    }
    // Converting an order to a list then add the total value to the total order
    // var counter = localStorage.getItem('counter');
    //
    //
    // var listUl = document.createElement('ul');
    // listUl.setAttribute('id',counter);
    // listUl.setAttribute('name',counter);
    //
    // var li = document.createElement('li');
    // li.setAttribute('name','itemName');
    // li.innerHTML = orderName.value;
    // listUl.appendChild(li);
    //
    // li = document.createElement('li');
    // li.setAttribute('name','itemSize');
    // li.innerHTML = orderSize.value;
    // listUl.appendChild(li);
    //
    // li = document.createElement('li');
    // li.setAttribute('name','nbrItems');
    // li.innerHTML = "Number of items : " + orderNbrItems.value;
    // listUl.appendChild(li);
    //
    // li = document.createElement('li');
    // li.setAttribute('name','itemPrice');
    // li.innerHTML = "One unit price : " + itemPrice;
    // listUl.appendChild(li);
    //
    // li = document.createElement('li');
    // li.innerHTML = "Total order price : " + totalPrice;
    // listUl.appendChild(li);
    //
    // li = document.createElement('li');
    // li.setAttribute('name','button');
    // // Adding a button to remove the order
    // var btn = document.createElement("BUTTON");
    // btn.innerHTML = "X";
    // btn.onclick = function(){
    //   var cartItem = document.getElementById(this.name);
    //   cartItem.parentNode.removeChild(cartItem);
    //   document.querySelector("#orderCreate2 .totalSum").value = parseInt(document.querySelector("#orderCreate2 .totalSum").value) - totalPrice;
    // };
    // //btn.onclick = app.cart.removeOrder('order'+counter) ;
    // //btn.disabled = true;
    // //btn.addEventListener('click',app.cart.removeOrder('order'+counter));
    // btn.setAttribute('type','button');
    // btn.setAttribute('name',counter);
    //
    // li.appendChild(btn)
    //
    // li.appendChild(document.createTextNode(' (Delete this order press X) '));
    //
    // listUl.appendChild(li);
    //
    // //document.getElementById('cartList').appendChild(listUl);

    //Set total price of all orders
    //document.querySelector("#orderCreate2 .totalSum").value = parseInt(document.querySelector("#orderCreate2 .totalSum").value) + totalPrice;
    document.getElementById("totalSum").value = totalPrice;
    document.getElementById("itemId").value = orderName.selectedIndex;
    //document.querySelector("#orderCreate .itemId").value = orderName.selectedIndex;
    document.querySelectorAll("#orderCreate .formError")[0].innerHTML = "";
    document.querySelectorAll("#orderCreate .formError")[0].style.display = "none";

    // counter++;
    // localStorage.setItem('counter',counter);

  } else {
    document.querySelectorAll("#orderCreate .formError")[0].innerHTML = "Pleae verify your order input";
    document.querySelectorAll("#orderCreate .formError")[0].style.display = "block";
    //document.getElementById('orderCreate').getElementsByClassName('formError')[1].innerHTML = "Error";
  }
};

// AJAX Client (for RESTful API)
app.client = {};

// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){

  // Set defaults
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  var requestUrl = path+'?';
  var counter = 0;
  for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl+='&';
       }
       // Add the key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
  }

  // Form the http request as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey, headers[headerKey]);
     }
  }

  // If there is a current session token set, add that as a header
  if(app.config.sessionToken){
    xhr.setRequestHeader("token", app.config.sessionToken.id);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        var statusCode = xhr.status;
        var responseReturned = xhr.responseText;

        // Callback if requested
        if(callback){
          try{
            var parsedResponse = JSON.parse(responseReturned);
            callback(statusCode,parsedResponse);
          } catch(e){
            callback(statusCode,false);
          }

        }
      }
  }

  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);
};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};


// Log the user out then redirect them
app.logUserOut = function(){
  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;

  // Send the current token to the tokens endpoint to delete it
  var payload = {
    'id' : tokenId
  };
  app.client.request(undefined,'api/tokens','DELETE',undefined,payload,function(statusCode,responsePayload){
    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    window.location = '/session/delete';

  });
};

// Bind the forms
app.bindForms = function(){
  if(document.querySelector("form")){

    var allForms = document.querySelectorAll("form");
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){

        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();

        // Hide the error message (if it's currently shown due to a previous error)
        document.querySelector("#"+formId+" .formError").style.display = 'none';

        // Hide the success message (if it's currently shown due to a previous error)
        if(document.querySelector("#"+formId+" .formSuccess")){
          document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
        }

        // Turn the inputs into a payload
        var payload = {};

        if(formId == 'orderCreate'){
          payload.id = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;
        }
        // if(formId=="orderCreate2"){
        //   payload.id = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;
        //   payload.state = true;
        //   var cartList = document.querySelector("#cartList");
        //   var elements = cartList.getElementsByTagName("ul");
        //
        //   for(var i=0; i<elements.length; i++){
        //     var orderItem = elements[i].getElementsByTagName('li');
        //     payload.itemId = parseInt(elements[i].getAttribute('name'));
        //     if(payload.itemId == 0){
        //
        //       app.client.request(undefined,'/api/cart','DELETE',undefined,payload,function(statusCode,responsePayload){
        //         // Display an error on the form if needed
        //
        //         if(statusCode !== 200){
        //
        //           if(statusCode == 403){
        //             // log the user out
        //             app.logUserOut();
        //
        //           } else {
        //
        //             // Try to get the error from the api, or set a default error message
        //             var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';
        //
        //             // Set the formError field with the error text
        //             document.querySelector("#"+formId+" .formError").innerHTML = error;
        //
        //             // Show (unhide) the form error field on the form
        //             document.querySelector("#"+formId+" .formError").style.display = 'block';
        //           }
        //         } else {
        //           // If successful, send to form response processor
        //           app.formResponseProcessor(formId,payload,responsePayload);
        //         }
        //
        //       });
        //
        //     }
        //     for(var j=0; j<orderItem.length; j++){
        //       if(orderItem[j].getAttribute('name') != "button" && typeof(orderItem[j].getAttribute('name')) == 'string' ){
        //         if(orderItem[j].getAttribute('name') == 'nbrItems'){
        //           payload[orderItem[j].getAttribute('name')] = parseInt(orderItem[j].innerHTML.replace(/\D/g,''));
        //         }
        //          else if(orderItem[j].getAttribute('name') == 'itemPrice'){
        //           //payload[orderItem[j].getAttribute('name')] = orderItem[j].innerHTML.replace(/\D/g,'');
        //         } else {
        //           payload[orderItem[j].getAttribute('name')] = orderItem[j].innerHTML;
        //         }
        //       }
        //     }
        //   }
        // } else {
          var elements = this.elements;
          for(var i = 0; i < elements.length; i++){
            if(elements[i].type !== 'submit'){
              console.log(elements[i].type);
              var valueOfElement = elements[i].type == 'checkbox' ? elements[i].checked : elements[i].value;
              if(elements[i].name == '_method'){
                method = valueOfElement;
              } else {
                if(isNaN(valueOfElement)){
                  payload[elements[i].name] = valueOfElement;
                } else {
                  payload[elements[i].name] = parseInt(valueOfElement);
                }
              }
            }
          }
        //}

        // var elements = this.elements;
        // for(var i = 0; i < elements.length; i++){
        //   if(elements[i].type !== 'submit'){
        //     console.log(elements[i].type);
        //     var valueOfElement = elements[i].type == 'checkbox' ? elements[i].checked : elements[i].value;
        //     if(elements[i].name == '_method'){
        //       method = valueOfElement;
        //     } else {
        //       payload[elements[i].name] = valueOfElement;
        //     }
        //
        //   }
        // }
        console.log(JSON.stringify(payload));
        // Call the API
        app.client.request(undefined,path,method,undefined,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed

          if(statusCode !== 200){

            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {

              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#"+formId+" .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#"+formId+" .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId,payload,responsePayload);
          }

        });
      });
    }
  }
};
// Getting the menu before the user place an order !
app.getMenu = function(tokenId){
  // We get the menu if user succefully login or sign up
  var tokenId = typeof(tokenId) == 'string' ? tokenId.trim() : false;
  if(tokenId){
    var queryStringObject = {
      'id' : tokenId
      };

    app.client.request(undefined,'api/menu','GET',queryStringObject,undefined,function(newStatusCode,newResponsePayload){

      if(newStatusCode !== 200){
        console.log(JSON.stringify(newResponsePayload));
      } else {
        localStorage.setItem('menu',JSON.stringify(newResponsePayload));
      }
    });
  } else {
    window.location = "/";
  }
};

// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  var functionToCall = false;
  // If account creation was successful, try to immediately log the user in
  if(formId == 'accountCreate'){
    // Take the phone and password, and use it to log the user in
    var newPayload = {
      'email' : requestPayload.email,
      'password' : requestPayload.password
    };
    app.client.request(undefined,'api/tokens','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed


      if(newStatusCode !== 200){
        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';


      } else {
        // If successful, set the token and redirect the user
        // Get the Menu

        app.setSessionToken(newResponsePayload);
        app.getMenu(newResponsePayload.id);
        window.location = '/api/menu';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    //window.location = '/api/menu';
    app.getMenu(responsePayload.id);
    window.location = 'account/edit';
  }

  // If forms saved successfully and they have success messages, show them
  var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
  }

  // If the user delete their account redirct them to account/delete
  if(formId=="accountEdit3"){
    app.logUserOut(false);
    window.location = 'account/delete';
  }

  // If the user validate their order redirect them to the payment process
  if(formId == 'orderCreate'){
    // Take the phone and password, and use it to log the user in
    var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;

    var newPayload = {
      'id' : tokenId,
      'state' : true
    };
    app.client.request(undefined,'api/payment','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed


      if(newStatusCode !== 200){
        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';


      } else {
        // If successful, redirect the user to payment

        window.location = 'payment/validate';
      }
    });
  }

};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  localStorage.setItem('counter',0);
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token',tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'id' : currentToken.id,
      'extend' : true,
    };
    app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'id' : currentToken.id};
        app.client.request(undefined,'api/tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Load data on the page
app.loadDataOnPage = function(){
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for account settings page
  if(primaryClass == 'accountEdit'){
    app.loadAccountEditPage();
  }

  // Logic for cart page
  if(primaryClass == 'orderCreate'){

  }
};

app.loadOrderPage = function(){
  var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;
  if(tokenId){
    var payload = {
      'id' : tokenId
    };

    // Get the user order currently using
    app.client.request(undefined,'/api/cart',undefined,payload,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Fill the data

      }
    });
  }
}
// Load the account edit page specifically
app.loadAccountEditPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var email = typeof(app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;

  if(email){
    // Fetch the user data
    var queryStringObject = {
      'email' : email
    };
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .firstNameInput").value = responsePayload.fullName;
        document.querySelector("#accountEdit1 .lastNameInput").value = responsePayload.address;
        document.querySelector("#accountEdit1 .displayEmailInput").value = responsePayload.email;

        // Put the hidden phone field into both forms
        var hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailNumberInput");
        for(var i = 0; i < hiddenEmailInputs.length; i++){
            hiddenEmailInputs[i].value = responsePayload.email;
        }

      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }



};

// Loop to renew token often
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());
      }
    });
  },1000 * 60);
};

// Init (bootstrapping)
app.init = function(){

  // Bind all form submissions
  app.bindForms();

  // Bind logout logout button
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};
