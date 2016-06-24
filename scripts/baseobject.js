/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /**
 * Base object used to factor out behavior that is shared accross
 * all objects (device APIs)
 * This is an abstract class, not to be istanciated 
 * @class BaseObject
 * @constructor BaseObject
 * @param {Object} [dto]: initialization data of the account instance
 * @param {Object} client: instance of the http client (optional, subclasses should decide if mandatory)
 * @throws Error
 */
function BaseObject(dto, client, manager) {
  
  if (!dto) {
   
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: this.constructor.name + ". dto cannot be null or empty"
    };
  }
  
  if (!dto.inheritance) {
   
      for (var prop in dto) {
      this[prop] = dto[prop]
    }

    this.client = client;
  }
}

BaseObject.prototype._getExcludedField = function() {
  throw new Error("Not implemented");
};

BaseObject.prototype._cloneData = function(){
  
  var excludeFields = this._getExcludedField();
  var dataCopy = {};
  for (var prop in this) {
  	if (excludeFields.indexOf(prop) == -1){
      dataCopy[prop] = this[prop];
    }
  }
  
  return dataCopy;  
};

BaseObject.prototype._copyData = function(source, target){
  
  target = target ? target : {};
  if (source && target) {
    
    for (var prop in source) {      
      target[prop] = source[prop];  
    }  	
  }
  
  return target;
};