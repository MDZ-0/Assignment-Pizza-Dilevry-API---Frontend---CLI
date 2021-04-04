/*
* Functions for helping to do the extra work !
*/

// Dependecies
var crypto = require('crypto');
var config = require('../config');
var path = require('path');
var fs = require('fs');


// Container for all methods
var helpers = {};

// Method for hasing

helpers.hashPassword = function(str){
  if(typeof(str) == 'string' && str.length > 0 ){
    var hashPassword = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hashPassword
  } else {
    return false;
  }
}
// Method for validating emails
helpers.validateEmail = function(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Method for convertiong Json into Objects
helpers.parseJsonToObject = function(str){
  try{
    if(typeof(str) == 'string' && str.length > 0 ){
      var obj = JSON.parse(str.trim());
      return obj;
    } else {
      return {};
    }
  }
  catch(e){
    console.log(e);
    return {};
  }
};

// Method for creating a random string for a specified length

helpers.createRandomString = function(len){
  var strLen = typeof(len) == 'number' && len > 0 ? len : false ;
  if(strLen){
    // Define dictionnary of chars
    var possibleChars = "abcdefghijklmnopqrstuvwxyz0123456789";

    // our temp variable to store the result

    var str = '';

    for(var i = 0; i < strLen ; i++){
      var randomCharacter = possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
      str += randomCharacter;
    }
    return str;
  }
  return false;
};

// Getting a string of a template on server

helpers.getTemplate = function(templateName, data, callback){
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
  data = typeof(data) == 'object' && data !== null ? data : {};
  if(templateName){
    var templateDir = path.join(__dirname,'./../templates/');
    fs.readFile(templateDir+templateName+'.html','utf8',function(err,str){
      if(!err && str && str.length > 0){
        // Do interpolating on the string before calling it back
        var finalString = helpers.interpolate(str,data);
        callback(false, finalString);
      } else {
        callback('No file found with this name');
      }
    });
  } else {
    callback('Invalid name for template');
  }

};

// Adding the _header and _footer to the html string

helpers.addUniversalTemplates = function(str,data,callback){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // Get the header
  helpers.getTemplate('_header', data, function(err,headerString){
    if(!err && headerString){
      //Get the Footer
      helpers.getTemplate('_footer', data, function(err,footerString){
        if(!err && footerString){
          // Generate the html page using the 3 elements
          // Header and Body and Footer
          var fullSTring = headerString + str + footerString;
          callback(false, fullSTring);
        } else{
          callback('Couldnt get the footer template');
        }
      });
    } else {
      callback("Couldnt get the header template");
    }
  });
};

// Use a data object to replace all generic fields in a string

helpers.interpolate = function(str,data){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // Add the tempalateGlboals to the data object
  for(var keyName in config.tempalateGlboals){
    if(config.tempalateGlboals.hasOwnProperty(keyName)){
      data['global.'+keyName] = config.tempalateGlboals[keyName];
    }
  }

  // Lookup in the string for each keyname then replace
  for(var key in data){
    if(data.hasOwnProperty(key) && typeof(data[key]) == 'string'){
      var replace = data[key];
      var find = '{'+key+'}';
      str = str.replace(find,replace);
    }
  }

  return str;
};

// Get a static asset from public folder

helpers.getStaticAsset = function(fileName, callback){
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if(fileName){
    var publicDir = path.join(__dirname, '/../public/');

    fs.readFile(publicDir + fileName,function(err,data){
      if(!err && data){
        callback(false,data);
      } else {
        callback('File couldnt be found');
      }
    });
  } else {
    callback('No valid filename is specified');
  }
};

module.exports = helpers;
