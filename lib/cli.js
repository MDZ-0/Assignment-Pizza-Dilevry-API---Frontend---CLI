/*
*
* CLI related logic
*
*/


// Dependecies

var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');
class _events extends events{};
var e = new _events();
var os = require('os');
var v8 = require('v8');

var _data = require('./data');



// object CLI
var cli = {};

// Input handlers

e.on('man',function(str){
  cli.responders.help();
});

e.on('help',function(str){
  cli.responders.help();
});

e.on('exit',function(str){
  cli.responders.exit();
});

e.on('stats',function(str){
  cli.responders.stats();
});

e.on('menu',function(str){
  cli.responders.menu();
});

e.on('orders',function(str){
  cli.responders.orders(str);
});

e.on('order info',function(str){
  cli.responders.orderInfo(str);
});

e.on('users',function(str){
  cli.responders.users(str);
});

e.on('user info',function(str){
  cli.responders.userInfo(str);
});


// Responders Object

cli.responders = {};

cli.responders.help = function(){
  var commands = {
    'man' : 'Similar to help',
    'help' : 'Show this help page',
    'exit' : 'Terminate the CLI and the rest of the app',
    'stats' : 'Get general stats of the operating system',
    'menu' : 'Show current menu items',
    'orders --day' : 'View all orders placed (in the last 24 hours if day is added)',
    'order info --{orderId}' : 'View detais of order by Id',
    'users  --day' : 'View all users that did (in the last 24 hours if day is added)',
    'user info --{userEmail}' : 'View user information by email'
  };

  // Some fancy header for our menu
  cli.horizontalLine();
  cli.centered('CLI MANUAL');
  cli.horizontalLine();
  cli.verticalSpace(2);

  // Print each command with description
  for(var key in commands){
    if(commands.hasOwnProperty(key)){
      var value = commands[key];
      var line = '\x1b[36m'+ key + '\x1b[0m';
      var padding = 60 - line.length;
      for(i=0; i<padding;i++){
        line += ' ';
      }
      line += value;
      console.log(line);
      cli.verticalSpace(2);
    }
  }
  cli.verticalSpace(1);

  cli.horizontalLine();
};



// Create centered line

cli.centered = function(str){
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';

  // Get the available screen size
  var width = process.stdout.columns ;

  // calculate the left padding needed
  var leftPadding = Math.floor((width - str.length)/2);

  // Add padding spaces before the string
  var line = '';
  for(i=0; i<leftPadding ;i++){
    line += ' ';
  }
  line += str ;
  console.log(line);
};

// Create horizontalLine
cli.horizontalLine = function(){
  // Your screen width
  var width = process.stdout.columns ;

  var line = '';
  for(i = 0; i<width ; i++){
    line += '-';
  }
  console.log(line);
};
// Create verticalSpace

cli.verticalSpace = function(lines){
  lines = typeof(lines) == 'number' && lines > 0 ? lines : 1 ;
  for( i = 0 ; i<lines ; i++){
    console.log('');
  }
};

cli.responders.exit = function(){
  process.exit(0);
};

cli.responders.stats = function(){
  var stats = {
    'Load Average' : os.loadavg().join(' '),
    'CPU Count' : os.cpus().length,
    'Free Memory' : os.freemem(),
    'Current Malloced Memory' : v8.getHeapStatistics().malloced_memory,
    'Peak Malloced Memory' : v8.getHeapStatistics().peak_malloced_memory,
    'Allcoated Heap Used (%)' : Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size)*100,2),
    'Available Heap Allocated (%)' : Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit)*100,2),
    'UpTime' : os.uptime() + ' Seconds'
  };

  // Some fancy header for our menu
  cli.horizontalLine();
  cli.centered('SYS STATS');
  cli.horizontalLine();
  cli.verticalSpace(2);

  // Print each command with description
  for(var key in stats){
    if(stats.hasOwnProperty(key)){
      var value = stats[key];
      var line = '\x1b[31m'+ key + '\x1b[0m';
      var padding = 60 - line.length;
      for(i=0; i<padding;i++){
        line += ' ';
      }
      line += value;
      console.log(line);
      cli.verticalSpace(2);
    }
  }
  cli.verticalSpace(1);

  cli.horizontalLine();
};

cli.responders.menu = function(){
  _data.read('menu','items',function(err,data){
    if(!err && data){
      cli.verticalSpace();
      console.dir(data, {'colors' : true});
      cli.verticalSpace();
    }
  });
};

cli.responders.orders = function(str){
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
  var arr = str.split('--');

  if( arr && arr[1] == 'day'){
    cli.horizontalLine();
    cli.centered('ORDERS PAST 24 HOURS');
    cli.horizontalLine();
    cli.verticalSpace(2);
    _data.list('orders',function(err,ordersData){
      if( !err && ordersData && ordersData.length > 0){
        cli.verticalSpace();
        ordersData.forEach(function(order){
          var orderDate = order.split('-')[3];
          if(order.includes('payed') && (Date.now() - orderDate)/(1000*60*60) <= 24 ){
            _data.read('orders',order,function(err,orderData){
              if(!err && orderData ){
                cli.verticalSpace();
                delete orderData.tokenId;
                console.log('orderId : ' + order);
                console.log("Order created last : " + Math.round((Date.now() - orderDate)/(1000*60*60),2) + "hours");
                console.dir(orderData, {'colors' : true});
                cli.verticalSpace();
                cli.verticalSpace();
              }
            });
          }
        });
      }
    });

  } else {
    cli.horizontalLine();
    cli.centered('ALL ORDERS');
    cli.horizontalLine();
    cli.verticalSpace(2);
    _data.list('orders',function(err,ordersData){
      if( !err && ordersData && ordersData.length > 0){
        cli.verticalSpace();
        ordersData.forEach(function(order){
          if(order.includes('payed')){
            _data.read('orders',order,function(err,orderData){
              if(!err && orderData ){
                cli.verticalSpace();
                delete orderData.tokenId;
                console.log('orderId : ' + order);
                console.dir(orderData, {'colors' : true});
                cli.verticalSpace();
                cli.verticalSpace();
              }
            });
          }
        });
      }
    });
  }

};

cli.responders.orderInfo = function(str){
  var arr = str.split('--');
  console.log(str);
  console.log(arr);
  var orderId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1] : false;
  if(orderId){
    _data.read('orders',orderId,function(err,orderData){
      if(!err && orderData){
        cli.verticalSpace();
        console.dir(orderData, {'colors' : true});
        cli.verticalSpace();
      }
    });
  }
};

cli.responders.users = function(str){
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
  var arr = str.split('--');

  if( arr && arr[1] == 'day'){
    cli.horizontalLine();
    cli.centered('USERS PAST 24 HOURS');
    cli.horizontalLine();
    cli.verticalSpace(2);
    _data.list('tokens',function(err,tokensData){
      if( !err && tokensData && tokensData.length > 0){
        cli.verticalSpace();
        tokensData.forEach(function(token){
          _data.read('tokens',token,function(err,tokenData){
            if(!err && tokenData){
              if((Date.now() - tokenData.expirationDate)/(1000*60*60) <= 24 ){
                cli.verticalSpace();
                console.log('User Email : ' + tokenData.email);
                console.log("Signed up last : " + Math.round((Date.now() - tokenData.expirationDate)/(1000*60*60),2) + "hours");
                cli.verticalSpace();
                cli.verticalSpace();
              }
            } else {
              console.log("Error");
            }
          });
        });
      }else {
        console.log("Error");
      }
    });

  } else {
    cli.horizontalLine();
    cli.centered('ALL USERS');
    cli.horizontalLine();
    cli.verticalSpace(2);
    _data.list('users',function(err,usersData){
      if( !err && usersData && usersData.length > 0){
        cli.verticalSpace();
        usersData.forEach(function(user){
          console.log('User email : ' + user);
        });
      }
    });
  }
};

cli.responders.userInfo = function(str){
  var arr = str.split('--');
  userEmail = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
  if(userEmail){
    _data.read('users',userEmail,function(err, userData){
      if(!err && userData){
        delete userData.password;
        cli.verticalSpace();
        console.log('\x1b[5m%s\x1b[0m','User Email :' + userData.email );
        console.log('\x1b[5m%s\x1b[0m','User Full Name :' + userData.fullName );
        console.log('\x1b[5m%s\x1b[0m','User Address :' + userData.address );
        cli.verticalSpace();
      }
    });
  }
};

// Input processor

cli.processInput = function(str){
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;

  // Proces only valid strings
  if(str){
  // Command-lines that are only acceptables
  var uniqueInputs = [
    'man',
    'help',
    'exit',
    'stats',
    'menu',
    'orders',
    'order info',
    'users',
    'user info'
  ];

  // Emit an event when the admin input a valid string

  var matchFound = false;
  var counter = 0 ;

  uniqueInputs.some(function(input){
    if(str.toLowerCase().indexOf(input) >  -1){
      matchFound = true ;
      // emit an event
      e.emit(input,str);
      return true;
    }
  });
  // If no valid input are found ask the admin to try again
  if(!matchFound){
    console.log('Sorry, try again!');
  }
  }
};

// Init script

cli.init = function(){
  // Send the start message to the console in color
  console.log('\x1b[32m%s\x1b[0m',"The CLI is running");

  // Start the interface
  var _interface = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : ''
  });

  // Create an initial prompt
  _interface.prompt();

  // Handle user input
  _interface.on('line',function(str){
    // Send input to input processor
    cli.processInput(str);

    // Give prompt to user again
    _interface.prompt();

    // If the CLI is closed stop all process
    _interface.on('close',function(){
      process.exit(0);
    });
  });

};

// Export the module
module.exports = cli ;
