/*
* File for handlers
* Most of the logic of the API resides in this file
*/


// Dependecies
var helpers = require('./helpers');
var config = require('../config');
var _data = require('./data');
var _email = require('./email');
var https = require('https');
var querystring = require('querystring');
var StringDecoder = require('string_decoder').StringDecoder;

// Declaring the container
var handlers = {};

/*
*
* HTML HANDLERS
*
*/

handlers.index = function(data,callback){
  if(data.method == 'get'){
    // Preparing data for interpolation

    var templateData = {
      'head.title' : '\u03C0-zza Dilevery API',
      'head.description' : 'We get you a free delivery pizza service, you only have to buy it!',
      'body.class' : 'index'
    };

    helpers.getTemplate('index', templateData,function(err,str){
      if( !err && str){
        // Add the unversal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,htmlStr){
          if(!err && htmlStr){
            // Return the page as final HTML
            callback(200,htmlStr,'html');
          }else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};
// Handlers for creating an account !
handlers.accountCreate = function(data, callback){
  if(data.method == 'get'){
    // Preparing data for interpolation

    var templateData = {
      'head.title' : 'Create an account',
      'head.description' : 'We will take only few seconds of your time to get you ready!',
      'body.class' : 'accountCreate'
    };

    helpers.getTemplate('accountCreate', templateData,function(err,str){
      if( !err && str){
        // Add the unversal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,htmlStr){
          if(!err && htmlStr){
            // Return the page as final HTML
            callback(200,htmlStr,'html');
          }else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Handlers for creating a session !
handlers.sessionCreate = function(data, callback){
  if(data.method == 'get'){
    // Preparing data for interpolation

    var templateData = {
      'head.title' : 'Login to your account',
      'head.description' : 'Please input email and password to login!',
      'body.class' : 'sessionCreate'
    };

    helpers.getTemplate('sessionCreate', templateData,function(err,str){
      if( !err && str){
        // Add the unversal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,htmlStr){
          if(!err && htmlStr){
            // Return the page as final HTML
            callback(200,htmlStr,'html');
          }else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Handlers for deleting a session !
handlers.sessionDelete = function(data, callback){
  if(data.method == 'get'){
    // Preparing data for interpolation

    var templateData = {
      'head.title' : 'Logged out',
      'head.description' : 'Successfully logged out',
      'body.class' : 'sessionDelete'
    };

    helpers.getTemplate('sessionDelete', templateData,function(err,str){
      if( !err && str){
        // Add the unversal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,htmlStr){
          if(!err && htmlStr){
            // Return the page as final HTML
            callback(200,htmlStr,'html');
          }else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Handlers for editing user settings !
handlers.accountEdit = function(data, callback){
  if(data.method == 'get'){
    // Preparing data for interpolation

    var templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };
    helpers.getTemplate('accountEdit', templateData,function(err,str){
      if( !err && str){
        // Add the unversal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,htmlStr){
          if(!err && htmlStr){
            // Return the page as final HTML
            callback(200,htmlStr,'html');
          }else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Handlers for deleting user  !
handlers.accountDelete = function(data, callback){
  if(data.method == 'get'){
    // Preparing data for interpolation

    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted!',
      'body.class' : 'accountDelete'
    };
    helpers.getTemplate('accountDelete', templateData,function(err,str){
      if( !err && str){
        // Add the unversal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,htmlStr){
          if(!err && htmlStr){
            // Return the page as final HTML
            callback(200,htmlStr,'html');
          }else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Handlers for deleting user  !
handlers.orderCreate = function(data, callback){
  if(data.method == 'get'){
    // Preparing data for interpolation

    var templateData = {
      'head.title' : 'Order Create',
      'head.description' : 'Your order to be created',
      'body.class' : 'orderCreate'
    };
    helpers.getTemplate('orderCreate', templateData,function(err,str){
      if( !err && str){
        // Add the unversal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,htmlStr){
          if(!err && htmlStr){
            // Return the page as final HTML
            callback(200,htmlStr,'html');
          }else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// History of orders !
// // TODO: If I get some time why not

// Handlers for Payment  !
handlers.paymentValidate = function(data, callback){
  if(data.method == 'get'){
    // Preparing data for interpolation

    var templateData = {
      'head.title' : 'Payment validation',
      'head.description' : 'Your order will be validated',
      'body.class' : 'paymentValidate'
    };
    helpers.getTemplate('paymentValidate', templateData,function(err,str){
      if( !err && str){
        // Add the unversal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,htmlStr){
          if(!err && htmlStr){
            // Return the page as final HTML
            callback(200,htmlStr,'html');
          }else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// handler for favicon

handlers.favicon = function(data, callback){
  // Acccept only get method
  if(data.method == 'get'){
    // Read in the data for favicon
    helpers.getStaticAsset('favicon.ico',function(err, data){
      if(!err && data){
        callback(200, data, 'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Handlers for returning all assets in public folder

handlers.public = function(data,callback){
  // Acccept only get method
  if(data.method == 'get'){
    // Read in the data for favicon
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length >0) {
      helpers.getStaticAsset(trimmedAssetName,function(err, data){
        if(!err && data){
          // DEtermin the asset extenion if not known default to plain
          var contentType = "plain";
          if(trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png';
          }
          if(trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }
          if(trimmedAssetName.indexOf('.jpg') > -1) {
            contentType = 'jpeg';
          }
          if(trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'favicon';
          }

          // Callback the data
          callback(200, data, contentType);
        } else {
          callback(500);
        }
      });
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
}
/*
*
* JSON API HANDLERS
*
*/
// Handler sample
handlers.sample = function(data, callback){
  callback(200,{'All' : 'Good'});
};

// Handler for users

handlers.users = function(data,callback){
  var usedMethods = ['post','get','put','delete'];
  if(usedMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// handlers for users submethods
// A user is defined as follows
// User Email ( unique ) of this form a@b.c
// User fullName
// User Address
handlers._users = {};

// Users Post
handlers._users.post = function(data,callback){
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && helpers.validateEmail(data.payload.email) ? data.payload.email.trim() : false;
  var fullName = typeof(data.payload.fullName) == 'string' && data.payload.fullName.trim().length > 0 ? data.payload.fullName.trim() : false;
  var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.length > 0 ? data.payload.password : false;
  if(email && fullName && address && password){
    _data.read('users',email,function(err,data){
      if(err){
        var hashedPassword = helpers.hashPassword(password);
        // Create the obejct user
        var userObject = {
          'email' : email,
          'fullName' : fullName,
          'address' : address,
          'password' : hashedPassword
        };
        _data.create('users',email,userObject,function(err){
          if(!err){
            callback(200);
          } else {
            console.log(err);
            callback(500,{'Error' : 'Couldnt create the user '});
          }
        });
      } else {
        callback(400,{'Error' : 'Already existing user with the same email !'});
      }
    });
  }else {
    callback(400,{'Error' : 'Fields are not valid !'})
  }
};

// Users Get
// // TODO: Make sure that only data related to the user are pulled
handlers._users.get = function(data,callback){
// Check if the email is a valid input
// We validate any email of the form a@b.c
  var data = {
    'payload' : data.query
  };
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && helpers.validateEmail(data.payload.email) ? data.payload.email.trim() : false;

  if(email){
    _data.read('users',email,function(err,userData){
      if(!err && userData){
        // Return only public data with no password
        delete userData.password;
        callback(200,userData);
      } else {
        callback(404);
      }
    });

  } else {
    callback(400,{'Error' : 'Email is a required field please provide it'});
  }
};

// Users Put

handlers._users.put = function(data,callback){
  console.log(JSON.stringify(data));
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && helpers.validateEmail(data.payload.email) ? data.payload.email.trim() : false;
  var fullName = typeof(data.payload.fullName) == 'string' && data.payload.fullName.trim().length > 0 ? data.payload.fullName.trim() : false;
  var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.length > 0 ? data.payload.password : false;
  if (email) {
    // Valid user
    if(fullName || address || password) {
      _data.read('users',email,function(err, userData){
        if(!err && userData){
          if(fullName){
            userData.fullName = fullName;
          }
          if(address){
            userData.address = address;
          }
          if(password){
            var hashedPassword = helpers.hashPassword(password);
            userData.password = hashedPassword;
          }
          _data.update('users',email,userData,function(err){
            if(!err){
                callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Couldnt update the user'});
            }
          });
        } else {
          callback(400,{'Error' : 'User not found !'});
        }
      });
    } else {
      callback(400, {'Error' : 'No fields to update'});
    }
  } else {
    callback(400,{'Error' : 'Email is a required field'});
  }
};

// Users Delete

handlers._users.delete = function(data,callback){
  var email = typeof(data.payload.email) == 'string' && data.payload.email.trim().length > 0 && helpers.validateEmail(data.payload.email) ? data.payload.email.trim() : false;
  if(email){
    _data.read('users',email,function(err,userData){
      if(!err && userData){
        _data.delete('users',email,function(err){
          if(!err){
            callback(200);
          } else{
            callback(500, {'Error'  : 'Couldnt delete the user'});
          }
        });
      } else {
        callback(400,{'Error' : 'Coulndt find the user'});
      }
    });
  }
};
// Anything not found will go here
handlers.notFound = function(data,callback){
  callback(404);
};


// Tokens

handlers.tokens = function(data,callback){
  var acceptableMethods = ['get','put','post','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};
// Required info : Email and password
// Container for tokens sub-methods
handlers._tokens = {};

// Tokens - Post
handlers._tokens.post = function(data,callback){
  var email = typeof(data.payload.email) == 'string' && helpers.validateEmail(data.payload.email) && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.length > 0 ? data.payload.password : false;
  if(email && password){
    _data.read('users', email,function(err,userData){
      if(!err && userData){
        var hashedPassword = helpers.hashPassword(password);
        if(userData.password == hashedPassword){
          // Create a token when password match for an existing user ( by email )

          var tokenId = helpers.createRandomString(20);
          var expirationDate = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'email' : email,
            'id' : tokenId,
            'expirationDate' : expirationDate
          };
        // Record the created token
        _data.create('tokens',tokenId,tokenObject,function(err){
          if(!err){
            callback(200,tokenObject);
          } else {
            callback(500,{'Error' : 'Couldnt create the file to store token'});
          }
        });
        } else {
          callback(400,{'Error' : 'Password didnt match'});
        }
      } else {
        callback(400,{'Error' : 'Couldnt find the specified user'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }

};

// Tokens - Get
handlers._tokens.get = function(data,callback){
  // check the Id for the token
  var id = typeof(data.query.id) == 'string' && data.query.id.trim().length == 20 ? data.query.id : false;
  if(id){
    // Get the id from the local files or DB
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback(200,tokenData);
      } else {
        callback(400,'Sorry ! token is no longer in our DB');
      }
    });

  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }
};

// Tokens - Put
// Require ID and verification to extend the timeout for token
handlers._tokens.put = function(data,callback){
  // Verify id and extend
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? data.payload.extend : false;
  if(id && extend){
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        if(tokenData.expirationDate > Date.now()){
            tokenData.expirationDate = Date.now() +  100*60*60;

            // recored the new object modification
            _data.update('tokens',id, tokenData,function(err){
              if(!err){
                callback(200);
              } else {
                callback(500,{'Error' : 'Couldnt update the file with the new changes'})
              }
            });
        } else {
          callback(400,{'Error' : 'Token already expired !'})
        }
      } else {
        callback(400,{'Error' : 'Couldnt read the file with the specified Id'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required fields'});
  }
};

// Tokens - Post
handlers._tokens.delete = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  if(id){
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(200);
          } else{
            callback(500, {'Error'  : 'Couldnt delete the token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Coulndt find the token'});
      }
    });
  } else {
    callback(400,{'Error' : 'Required fields are missing'});
  }
};


// Handeling when a user request the menu items
// Only valid method is GET
// User need to be authentificated

handlers.menu = function(data,callback){
  var acceptableMethods = ['get'];
  if(acceptableMethods.indexOf(data.method) > -1 ){
    handlers._menu[data.method](data,callback);
  } else {
    callback(404,{'Error' : 'Unautorized method'});
  }
};


// Container for sub methods for menu
handlers._menu = {} ;
// Menu - Get - Submethod
// User should logged in
handlers._menu.get = function(data,callback){
  var id = typeof(data.query.id) == 'string' && data.query.id.trim().length == 20 ? data.query.id.trim() : false;
  if(id){
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        if(tokenData.expirationDate > Date.now()){
          // Get all the items in the the direcory
          _data.read('menu','items',function(err,menuData){
            if(!err && menuData){
              callback(200,menuData);
            } else {
              callback(400,{'Error' : 'Couldnt read menu file'})
            }
          })
        } else {
          callback(400,{'Error' : 'Session expired'});
        }
      } else {
        callback(400,{'Error' : 'Couldnt read the file for the specified id'});
      }
    });
  } else {
    callback(400,{'Error' : 'Required fields are missing !'})
  }
};

// Handlers for shopping cart
// Shoping cart is an order placed by a user
// A user can place only one order
// The order is update one item at a time
handlers.cart = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1) {
    handlers._cart[data.method](data,callback);
  } else {
    callback(400,{'Error' : 'Unauthorized methid'});
  }
}
// Order start as follow
// POST one item
// Each new order is added as one item with PUT
// Get return the cart
// Delete remove the cart, you can delete only one item if item ID is provided

// container for cart submethods
handlers._cart = {};
// handlers post
// Create a cart items
handlers._cart.post = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
// Verify if the user creating the app is loggind in
  if(id){
    // Make sure that the items are within the menu
    var possibleSizes = ["Small",'Medium','Large','XXL'];
    var itemId = typeof(data.payload.itemId) == 'number' && data.payload.itemId >= 0 && data.payload.itemId < 3 ? data.payload.itemId : false;
    var itemSize = typeof(data.payload.itemSize) == 'string' && data.payload.itemSize.trim().length > 0 && possibleSizes.indexOf(data.payload.itemSize.trim()) > -1 ? data.payload.itemSize.trim() : false;
    var nbrItems = typeof(data.payload.nbrItems) == 'number' && data.payload.nbrItems > 0 ? data.payload.nbrItems : false;
    if((itemId == 0 || itemId) && itemSize && nbrItems){
      if(itemId != 0 && itemSize == 'XXL'){
        callback(400,{'Error' : 'Unlucky xxl only for Seafood Pizza'});
      } else {
        _data.read('menu','items',function(err,itemsData){
          var itemPrice = itemsData['item'+itemId].prices[itemsData['item'+itemId].Sizes.indexOf(itemSize)] ;
          if(!err && itemsData){
            var order = {'tokenId' : id};
            order["0"] = {
              'itemName' : itemsData['item'+itemId].name,
              'itemSize' : itemSize,
              'itemPrice' : itemPrice,
              'nbrItems' : nbrItems
            };
            // Store the order
            _data.create('orders',id+'-order',order,function(err){
              if(!err){
                callback(200,order);
              } else {
                callback(400,{'Error' : 'Coulndt Store the order'});
              }
            });
          } else {
            callback(500,{'Error' : 'Couldnt open file for menu items'});
          }
        });
      }
    } else {
      callback(400,{'Error' : 'Fields required are not correct for items'});
    }
  } else {
    callback(400,{'Error' : 'Missing required fields'});
}
};

// handlers get
// Get the cart items
handlers._cart.get = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  if(id){
    _data.read('orders',id+'-order',function(err,orderData){
      if(!err && orderData){
        callback(200,orderData);
      } else {
        callback(500,{'Error':'Couldnt open the file to get orders'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required id to retrieve order'});
  }
};

// handlers put
// Modify the list of items :
// Order ID is required also the order
handlers._cart.put = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  if(id){
    var possibleSizes = ["Small",'Medium','Large','XXL'];
    var itemId = typeof(data.payload.itemId) == 'number' && data.payload.itemId >= 0 && data.payload.itemId < 3 ? data.payload.itemId : false;
    var itemSize = typeof(data.payload.itemSize) == 'string' && data.payload.itemSize.trim().length > 0 && possibleSizes.indexOf(data.payload.itemSize.trim()) > -1 ? data.payload.itemSize.trim() : false;
    var nbrItems = typeof(data.payload.nbrItems) == 'number' && data.payload.nbrItems > 0 ? data.payload.nbrItems : false;
    var orderId = typeof(data.payload.orderId) == 'number' && data.payload.orderId >= 0 ? data.payload.orderId.toString() : false;
    if((itemId == 0 || itemId) && itemSize && nbrItems && orderId){

      if(itemId != 0 && itemSize == 'XXL'){
        callback(400,{'Error' : 'Unlucky xxl only for Seafood Pizza'});
      } else {
        _data.read('menu','items',function(err,itemsData){
          var itemPrice = itemsData['item'+itemId].prices[itemsData['item'+itemId].Sizes.indexOf(itemSize)] ;
          if(!err && itemsData){
            var order = {
              'itemName' : itemsData['item'+itemId].name,
              'itemSize' : itemSize,
              'itemPrice' : itemPrice,
              'nbrItems' : nbrItems
            };
            // Store the order
            _data.read('orders',id+'-order',function(err,orderData){
              if(!err && orderData){
                orderData[orderId] = order;
                _data.update('orders',id+ '-order',orderData,function(err){
                if(!err){
                  callback(200,orderData);
                } else {
                  callback(500,{'Error' : 'Couldnt update the file for new orders'});
                }
                });
              } else {
                callback(400,{'Error' : 'Couldnt open the file of orders !! '});
              }
            });
          } else {
            callback(400,{'Error' : 'Couldnt open file for menu items'});
          }
        });
      }
    } else {
      callback(400,{'Error' : 'Invalid items input'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field to retrieve the order !'});
  }
};

// handlers delete
// Delete the list of items
// If order idITem is given delete it, otherwise delete the whole order list
handlers._cart.delete = function(data,callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var orderId = typeof(data.payload.orderId) == 'number' && data.payload.orderId >= 0 ? data.payload.orderId.toString() : false;
   if(id){
      _data.read('orders',id+'-order',function(err,orderData){

        if(!err && orderData){
          console.log('Deleting . 0' + typeof(orderId) + " " + orderId + " " + id);
          if(orderId && orderId in orderData && Object.keys(orderData).length > 2 ){
            console.log("Found the Order !");
            console.log(JSON.stringify(orderData[orderId]));
            delete orderData[orderId];
            console.log("PAY ATTENTION\n" + JSON.stringify(orderData));
            _data.update('orders', id + '-order', orderData,function(err){
              if(!err){
                callback(200,orderData);
              } else {
                callback(500,{'Error' : 'Coulndt update the file'});
              }
            });
          } else {
            _data.delete('orders',id+'-order',function(err){
              if(!err){
                callback(200);
              } else{
                callback(500, {'Error'  : 'Couldnt delete the order'});
              }
            });

          }
        } else {
            callback(400,{'Error' : 'Coulndt find the order'});
          }

      });
  } else {
    callback(400,{'Error' : 'Required fields are missing'});
  }
};

// Handlkers for payment
// a simple POSt
// IT goes as follows:
// POST the id of the order
// Only one order is available named id + '-order'
// Generate the whole amoun
// POST a request to stripe to validate payment
// POST a request to mailgun to send email
// Saved the order as payed with date in title to make sure it is unique and provied traceability
handlers.payment  = function(data,callback){
  var acceptableMethods = ['post'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._payment[data.method](data,callback);
  } else {
    callback(400,{'Error' : 'Unauthorized methid'});
  }
};

// Handlers Container

handlers._payment = {};

// Handlers for payment sub-methods
// Post require token Id

handlers._payment.post = function(data,callback){
  var id = typeof(data.payload.id) =='string' && data.payload.id.trim().length == 20 ? data.payload.id : false;
  var state = typeof(data.payload.state) == 'boolean' ? data.payload.state : false;
  var email = "";
  if(id && state){
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        email = tokenData.email;
        _data.read('orders', id + '-order',function(err,orderData){
          var totalPayment = 0 ;
          for(var prop in orderData){
            if (!isNaN(prop)){
              var price = orderData[prop].itemPrice;
              totalPayment += parseInt(price.replace('$','')) * orderData[prop].nbrItems;
            }
          }
          // Payload and options to send payment to stripe
          var payload  = {
             amount : totalPayment*100,
             currency : 'usd',
             confirm : state,
             payment_method : 'pm_card_visa',
             receipt_email: email
          };
          //
          console.log(JSON.stringify(payload));

          payload = querystring.stringify(payload);
          var username = config.stripeKey;
          var auth = 'Basic ' + new Buffer.from(username + ':' + '').toString('base64');
          var options = {
            hostname : 'api.stripe.com',
            path : '/v1/payment_intents',
            method : 'POST',
            port : 443,
            headers : {
              'Authorization': auth,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept' : '*/*',
              'Content-Length': payload.length
            }
          };
          // Mimic curl behavior to contact the stripe api
          // IF success then do the same with mailgun API
          var buffer = "";
          var decoder = new StringDecoder('utf-8');
          var req = https.request(options,function(res){
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            buffer = "";
            res.on('data',function(d){
              process.stdout.write(d);
              buffer += decoder.write(d);
              //callback(201,buffer);
            });

            res.on('end',function(){
              buffer += decoder.end();
              _data.read('orders',id  + '-order',function(err,orderData){
                if(!err && orderData){
                  _data.create('orders', id + '-order-payed-' + Date.now(),orderData,function(err){
                    if(!err){
                      _data.delete('orders', id + '-order',function(err){
                        if(!err){
                          _email.sendReceipt(email,totalPayment,id,function(err,response){
                            if(!err && response){
                              callback(200,JSON.parse(buffer));
                            } else {
                              callback(500,{'Error' : 'Couldnt send email'});
                            }
                          });
                        } else {
                          callback(500, {'Error':'Couldnt delete order for some reason'});
                        }
                      });
                    } else{
                      callback(500,{'Error':'Couldnt store payed order'});
                    }
                  });
                } else {
                  callback(500,{'Error' : 'Couldnt retrieve order Data'});
                }
              });

            });
          });
          req.on('error', function(err){
            if(!err){
              console.log('All good!');
            } else{
              console.error(err);
            }
          });
          req.write(payload);
          req.end();
        });
      } else{
        callback(500,{'Error' : 'Couldnt open the token file' + err});
      }
    });
  } else{
    callback(400,{'Error' : 'Missing required field'});
  }

};


module.exports = handlers;
