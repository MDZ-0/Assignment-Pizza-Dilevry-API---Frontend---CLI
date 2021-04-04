/*
* Library for handeling data
*/

// Dependecies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

// Container for the module to be exported

var lib = {};

// Folder where the records will be accesed

lib.basedir = path.join(__dirname,'./../Data/');

// Create a new file even if not exist otherwise raise an error
lib.create = function(dir,file,data,callback){
  // Open the file for writing
  fs.open(lib.basedir + dir + '\\' + file + '.json', 'wx' ,function(err,fileDesc){
    if(!err && fileDesc){
      var stringData = JSON.stringify(data);
      fs.writeFile(fileDesc,stringData,function(err){
        if(!err){
          callback(false);
        } else {
          callback('Couldn\'t write to File !' + err );
        }
      });
    } else {
      callback('Enable to create !!' + err);
    }
  });
};

// Read an existing file

lib.read = function(dir,file,callback){
  fs.readFile(lib.basedir + dir + '\\' + file + '.json', 'utf8', function(err,data){
    if(!err && data){
      var parsedData = helpers.parseJsonToObject(data);
      callback(false,parsedData);
    } else {
      callback(err,parsedData);
    }
  });
};

// Change content of an exisitng file

lib.update = function(dir,file,data,callback){
  fs.open(lib.basedir + dir + '\\' + file + '.json' , 'r+' , function(err,fileDesc){
    if(!err && fileDesc){
      var stringData = JSON.stringify(data);
      // Truncate the file
      fs.ftruncate(fileDesc,function(err){
        if(!err){
          fs.write(fileDesc,stringData,function(err){
            if(!err){
              callback(false);
            } else {
              callback('Couldt write the file !!');
            }
          });
        } else {
          callback('Error when truncating the file ! ');
        }
      });
    } else {
      callback('Couldn\'t open file in update mode');
    }
  });
};

// Append to a file !
lib.append = function(dir,file,data,callback){
    fs.appendFile(lib.basedir + dir + '\\' + file + '.json', JSON.stringify(data),function(err){
      if(!err){
        callback(200);
      } else {
        callback(400,{'Error' : 'Couldnt add data to file'});
      }
    });
};

// Delete a file !
// Important : DEleting in windows is not like Linux
// For Some reason the node index.js stop unlink from deleting the file
// That is why I had to move them to a seperate folder name to be deleted
// So that I don't get erperm error when trying to read newly deleted files
lib.delete = function(dir,file,callback){
  var oldPath = lib.basedir + dir + '\\' + file + '.json';
  var newPath = lib.basedir + '.tobedeleted' + '\\' + file + '-' +  Date.now()+ '.json'
  fs.rename(oldPath,newPath,function(err){
    if(!err){
      fs.unlink(newPath,function(err){
        if(!err){
          callback(false);
        } else {
          callback(500,{'Error' : 'Couldnt remove the file'});
        }
      });
  } else {
      callback(500,{'Error' : 'Deleting prep failed'});
    }

  });
};

// List all items in a directory
lib.list = function(dir,callback){
  fs.readdir(lib.basedir + dir + '/', function(err, data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){
        trimmedFileNames.push(fileName.replace('.json',''));
      });
      callback(false,trimmedFileNames);

    } else{
      callback(err,data);
    }
  });

};


module.exports = lib;
