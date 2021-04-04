/*
* Configuration variables
*/

environment = {};

// Just one workign environment Staging

environment.staging = {
  'httpPort' : 9999,
  'httpsPort' : 0000,
  'envNale' : 'staging',
  'hashingSecret' : '',
  'emailApiKey' : '',
  'emailDomain' : '',
  'stripeKey' : '',
  'tempalateGlboals' : {
    'appName' : 'Pizza Dilevery',
    'companyName' : '\u03C0-zza, Inc',
    'yearCreated' : '2021',
    'baseUrl' : 'http://localhost:9999'
  }
};

module.exports = environment.staging;
