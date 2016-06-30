/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var baseobjectModule = require("./baseobject.js");
var objectManagement = require("./objectmanagement.js");

/**
 * Wraps configuration manager data and methods
 * @class ConfigurationManager
 * @contructor ConfigurationManager
 * @param {Object} [dto] : initialization data of the account instance
 * @paran {Object} client : instance of the http client 
 * @throws Error
 */
function ConfigurationManager() {
  
  if (! client) {
   
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Router. client cannot be null or empty"
    };
  }
  
  baseobjectModule.BaseObject.call(this, dto, client);
}

ConfigurationManager.prototype = new baseobjectModule.BaseObject({inheritance:true});
ConfigurationManager.prototype.constructor = ConfigurationManager;			