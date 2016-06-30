/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 

var clientModule = require("./client.js");
var util = require("./util.js");

/**
 * Provides shared behavior accross all xxxmanagers
 * @class ObjectManager
 * @constructor ObjectManager
 * @param {Object} [custom]
 * @param {String} [custom.managedType] link to the constructor of the API objects (e.g. accountmanagement.Account)
 * @param {String} [custom.path] the root path of the API (e.g. "/accounts/")
 * @param {Object} [dto] initialization parameters expected by the API, check specific subclass for more
 * @param {Object} [dto.client] // an instance of the cradlepoint/client.Client class
 */
function ObjectManager(custom, dto) {
  
  if (!custom.inheritance) {
    
    if (!dto || !dto.client) {

      throw {

        errorCode: "Invalid_Parameter",
        errorDetail: this.constructor.name + " dto.client cannot be null or empty"
      };
    }
    
    if (!custom) {

      throw {

        errorCode: "Invalid_Parameter",
        errorDetail: "ObjectManager dto.custom is needed to customize the instance to specific type"
      };
    }

    this.path = custom.path;
    this.managedType = custom.managedType;
    this.client = dto.client;
  }
}

/**
 * Since all xxxmanagers have a listXXX method and all listXXX methods approximatively
 * apply the same algorithm, the latter was factored out to the below
 * @param {Object} [dto]: the parameters sent by the caller 
 * @param {String} path: force the execution of the request using this path (optional)
 * if not provided, this.path is used unless dto.paging.next/dto.paging.previous are provided
 * @return Object {
 *		data: list of classDef instances,
 *		paging: paging data (next, previous, offset, limit, etc.)
 * }
 */
ObjectManager.prototype.listObjects = function(dto, path) {
  
  var url = path ? path : this.path;
  return sListObjects(dto, url, this.client, this.managedType);
};

/**
 * All xxxmanagers have a getXXX() method of which algorithm is factored in the below
 * where XXX == this.managedType
 * @param {Object} [dto]
 * @param {String} [dto.id] : the identifer of a given XXX
 * @param {String} [dto.name] : the name of a given XXX
 * @return {Object} instance of XXX
 */
ObjectManager.prototype.getObject = function(dto) {
   
  if (!dto || (!dto.id && !dto.name)) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: this.constructor.name + ".getAccount - You should provide one of dto.id or dto.name"
    };
  }
  
  var filter = {};
  if (dto.id) {
    filter.id = dto.id;
  }
  
  if (dto.name) {
    filter.name = dto.name;
  }
  
  var dataJson = this.listObjects({filter:filter}).data[0];
  return util.jsonToClassInstance(dataJson, this.managedType, this.client);
};

/**
 * Static method that returns a list of xxx objects (@see listObjects). 
 * Can be called as a utility function
 * by instances of other classes 
 */
function sListObjects(dto, path, client, managedType) {
  
  dto = dto ? dto : {};
  var url = path;
  if (dto.paging) {
    url = dto.paging.next ? dto.paging.next : (dto.paging.previous ? dto.paging.previous : url);
  }
  
  var requestParams = {    
    url: url,
    method: "GET"
  };
    
  if (dto.filter){
    requestParams.params = dto.filter;
  }
  
  if (dto.paging && dto.paging.offset) {
    requestParams.params.offset = dto.paging.offset;
  }
  
  if (dto.paging && dto.paging.limit) {
    requestParams.params.limit = dto.paging.limit;
  }
  console.log(JSON.stringify(requestParams));
  var response = client.callApi(requestParams);
  response.data = util.jsonListToClassInstanceList(response.data, managedType, client);
  response.paging = response.meta;
  delete response.meta;
  return response;
};