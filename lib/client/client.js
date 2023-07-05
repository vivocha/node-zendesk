//client.js

var fs           = require('fs'),
    request      = require('request'),
    util         = require('util'),
    EventEmitter = require('events').EventEmitter,
    Client       = require('./client').Client,
    qs           = require('querystring'),
    async        = require('async'),
    path         = require('path'),
    flatten      = require('flatten');


var Client = exports.Client = function (options) {
  this.options = options;
  
  // Cookies are enabled by default !!!!! 
  // Each call must have its own cookie to isolate authentication among clients !!!!!
  //this._request = request;  

  if (!this.jsonAPIName) {
    this.jsonAPIName = null;
  }
  if (!this.jsonAPIName2) {
    this.jsonAPIName2 = null;
  }

  if (typeof this.options.get !== 'function') {
    this.options.get = function (key) {
      return this[key];
    };
  }
};

util.inherits(Client, EventEmitter);

Client.prototype.request = function (options, method, uri) {
  // mvigano - Vivocha Inc. Added options
  //var username = typeof method === 'object' && Array.isArray(method) && method.length == 2 ? method.pop() : this.options.get('username'),
  var args = Array.prototype.slice.call(arguments),
  // The last param is always the callback
  callback = args.pop();
  
  if (typeof options === 'undefined' ) {
      error = new Error('Internal Server Error');
      error.statusCode = 500;
      error.result = { 'error' : 'Options undefined!' };
      return callback(error);
  }
  var username = options['username'],
  verb = method,
  //verb = typeof method === 'object' && Array.isArray(method) && method.length == 1 ? method.pop() : method,    
  requestOptions, 
  params = '', last_element, url, self, res,
  body       = typeof args[args.length - 1] === 'object' && !Array.isArray(args[args.length - 1]) && args.pop(),
  //auth       = this.options.get('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
  auth       = options['password'] ? ':' + options['password'] : '/token:' + options['token'],
  encoded    = new Buffer(username + auth).toString('base64'),
  //proxy      = this.options.get('proxy');
  proxy      = options['proxy'];

  if (typeof uri === 'object' && Array.isArray(uri)) {
    last_element = uri.pop();
    if (typeof last_element === 'object') {
      params = '?' + qs.stringify(last_element);
    } else {
      uri.push(last_element);
    }
    //url = this.options.get('remoteUri') + '/' + uri.join('/') + '.json' + params;
    url = options['remoteUri'] + '/' + uri.join('/') + '.json' + params;
  } else {
    if (uri.indexOf(options['remoteUri']) === -1) {
      url = options['remoteUri'] + uri;
    } else {
      url = uri;
    }
  }

  if(!requestOptions){
    requestOptions = {
      method: verb || 'GET',
      uri: url,
      headers: {
        'Authorization': 'Basic ' + encoded,
        'Content-Type' : 'application/json',
        'Accept'       : 'application/json'
      }
    };
  }

  console.log('requestOptions', JSON.stringify(requestOptions));
  // NOT SUPPORTED by v2 API
  // 'X-On-Behalf-Of' : 'somebody@gmail.com'
  // console.log('zendesk:', options);
  // Use {enduseremail}/token:{token}
  
  if (body) {
    requestOptions.body = JSON.stringify(body);
    console.log('request body', JSON.stringify(requestOptions.body));
  } else if (verb !== 'GET') {
    requestOptions.body = '{}';
  }
  
  if (proxy) {
    requestOptions.proxy = proxy;
  }

  self = this;
  self.emit('debug::request', requestOptions);
  
  // To use a custom cookie jar (instead of letting request use its own global cookie jar) 
  // set the jar default or specify it as an option:
  // var __request = request.defaults({jar: request.jar()});
  
  // To disable cookies set jar to false (either in defaults or in the options sent).  
  var __request = request.defaults({jar: false});
  
  __request(requestOptions, function (err, response, result) {
  //this._request(requestOptions, function (err, response, result) {
    if (err) {
      return callback(err);
    }

    var statusCode, error;

    try {
      statusCode = response.statusCode;
      res = JSON.parse(result);

      self.emit('debug::response', { statusCode: statusCode, result: result });

      var retryAfter = response.headers['Retry-After'];
      if (retryAfter) {
        error = new Error('Zendesk rate limits 200 requests per minute');
        error.statusCode = 429;
        error.result = retryAfter;
        return callback(error);
      }

      if (failCodes[statusCode]) {
        error = new Error('Zendesk Error (' + statusCode + '): ' + failCodes[statusCode]);
        error.statusCode = statusCode;
        error.result = result;
        return callback(error);
      }

      /*
       if (self.jsonAPIName === null && self.jsonAPIName2 === null) {
       body = res;
       } else {
       if (self.jsonAPIName !== null) {
       body = res[(self.jsonAPIName.toString())];
       } else if (self.jsonAPIName2 !== null) {
       body = res[(self.jsonAPIName2.toString())];
       } else { //should not come here but it could happen
       body = res;
       }
       }
       */
      
      body = null;
      if (!body && self.jsonAPIName !== null) {
        body = res[(self.jsonAPIName.toString())];
      }
      if (!body && self.jsonAPIName2 !== null) {
        body = res[(self.jsonAPIName2.toString())];
      }
      if (!body) {
        body = res;
      }

      callback(null, statusCode, body, response, res);
      
    } catch (ex) {
      callback(ex);
    }

    
  });
};

Client.prototype.requestAll = function (options, method, uri) {
  var args         = Array.prototype.slice.call(arguments),
      callback     = args.pop(),
      nextPage     = 'Not Null!',
      bodyList     = [],
      statusList   = [],
      responseList = [],
      resultList   = [],
      self         = this;


  return Client.prototype.request.apply(this, args.concat(function (error, status, body, response, result) {
    if (error) {
      return callback(error);
    }

    statusList.push(status);
    bodyList.push(body);
    responseList.push(response);
    resultList.push(result);
    nextPage = result.next_page;

    async.whilst(
      function () {return nextPage !== null && nextPage !== 'undefined'; },
      function (cb) {
        Client.prototype.request.apply(self, [options, 'GET', nextPage, function (error, status, body, response, result) {
          if (error) {
            return cb(error);
          }

          statusList.push(status);
          bodyList.push(body);
          responseList.push(response);
          resultList.push(result);
          nextPage = result.next_page;
          cb(null);
        }]);
      },
      function (err) {
        if (err) {
          callback(err);
        } else {
          return callback(null, statusList, flatten(bodyList), responseList, resultList);
        }
      }
      );
  }));
};


Client.prototype.upload = function (uri, file, fileToken, callback) {
  var self       = this,
      out,
      auth     = this.options('password') ? ':' + this.options.get('password') : '/token:' + this.options.get('token'),
      encoded  = new Buffer(this.options.get('username') + auth).toString('base64');

  if (fileToken !== null && fileToken !== undefined && fileToken !== '') {
    uri.push({filename: path.basename(file), token: fileToken});
  } else {
    uri.push({filename: path.basename(file)});
  }

  fs.stat(file, function (err, stat) {
    if (err) {
      return callback(err);
    }

    this.options = {
      method: 'POST',
      uri: self.options.get('remoteUri') + '/' + uri.join('/'),
      headers: {
        'Authorization' : 'Basic ' + encoded,
        'Content-Type'  : 'application/octet-stream',
        'Content-Length': stat.size
      }
    };

    out  = Client.prototype.request.apply(this, ['POST', uri,  function (error, request, result) {
      if (error) {
        return callback(error);
      }

      callback(null, request, result);

    }]);

    fs.createReadStream(file).pipe(out);

  });
};

var failCodes = {
  400: 'Bad Request',
  401: 'Not Authorized',
  403: 'Forbidden',
  404: 'Item not found',
  405: 'Method not Allowed',
  409: 'Conflict',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable'
};

