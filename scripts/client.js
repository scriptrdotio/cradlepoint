/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var config = require("./auth/config");
var http = require("http");

/**
 * A generic http client that handles the communication with remote APIs
 * @class Client
 * @constructor Client
 * @param {Object} dto : needed parameters
 */
function Client(dto) {
  
  if (!dto || !dto.principal) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Client. dto.principal cannot be null or empty"
    };
  }
  
  this.principal = dto.principal;
}

/**
 * Invoke a given API. If response status is 401, the method will try to obtain a new access token using the 
 * current user's refresh token and retry the invocation of the target API.
 * This method can throw exceptions
 * @method callApi
 * @param {Object} params : the parameters of the http call to issue
 * 	{String} params.url : the url of the targeted API
 *	{String} params.method : (optional) the http method to use when invoking the API
 *	{Object} params.headers: (optional) the http headers to send to the API
 *	{Object} params.params: (optional) the parameters that are expected by the API
 */
Client.prototype.callApi = function(params) {
  
  try {   
     return this._callApi(params);
  }catch(response) {   
      this._handleError(response);
  }
};

Client.prototype._callApi = function(params) {
  
  if (params.params) {
    params.params = this._paramsToString(params.params);
  }
  
  if (params.params && (!params.method || params.method == "GET")) {
    params.params = this._paramsToString(params.params);
  }
  
  if (params.params && params.method == "POST") {
    
    params.bodyString = JSON.stringify(params.params);
    delete params.params;
  }
  
  var appConfig = config.appConfig[this.principal.app];
  params.url = params.url.indexOf("http") > -1 ? params.url : appConfig.apiUrl + "/" +  appConfig.apiVer + params.url;
  
  params.headers = params.headers ? params.headers : {};
  params.headers["X-ECM-API-ID"] = this.principal.ecmId;
  params.headers["X-ECM-API-KEY"] = this.principal.ecmKey;
  params.headers["X-CP-API-ID"] = this.principal.appId;
  params.headers["X-CP-API-KEY"] = this.principal.appKey;
  
  //console.log("Sending the following request : " + JSON.stringify(params));
  var response = http.request(params);
  //console.log("Received following response  : " + JSON.stringify(response));
  if (response.status >= "200" && response.status < "300") {
    
    var responseBody = response.body ? JSON.parse(response.body) : {};
    if (responseBody.message) {
      throw response;
    }else {
      return responseBody;
    }
  }else {
    throw response;
  }
};
  
Client.prototype._handleError = function(response) {
   
  var errorObj = "";
  try {
    
    errorObj = JSON.parse(response.body);
  }catch(e) {
    
    try {
      errorObj = JSON.parse(response);
    }catch(e) {
      errorObj = response;
    }
  };

  throw {
    "errorCode": "Invocation_Error",
    "errorDetail": errorObj
  };
};

/*
 * Transform all Numeric and boolean parameters to string so they can be passed to http.callApi
 * (shallow only)
 */
Client.prototype._paramsToString = function(params) {
  
  var newParams = {};
  for (var p in params) {
    
    if (typeof(params[p]) != "object") {
    	newParams[p] = "" +  params[p];
    }else {
      newParams[p] = params[p];
    }
  }
  
  return newParams;
};			