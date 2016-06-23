/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var baseobjectModule = require("./baseobject");
var objectManagement = require("./objectmanagement");

/**
 * @class ConfigurationManager
 * @constructor ConfigurationManager
 */
function ConfigurationManager(dto, client) {
  
  if (!client) {
   
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "NetDevice. client cannot be null or empty"
    };
  }
  
  baseobjectModule.BaseObject.call(this, dto, client);
}

ConfigurationManager.prototype = new baseobjectModule.BaseObject({inheritance:true});
ConfigurationManager.prototype.constructor = ConfigurationManager;

/**
 * Update the configuration with the current value of this instance's properties
 * @method update
 */
ConfigurationManager.prototype.update = function(){
  
  var updateParameters = {
    
    url: "/configuration_managers/" + this.id + "/",
    method: "PUT",
    bodyString: JSON.stringify(this._cloneData()),
    headers: {
      "Content-Type": "application/json"
    }
  };
  
  return this.client.callApi(updateParameters);
};

ConfigurationManager.prototype._getExcludedField = function() {
  
  return [
    "id", "resource_url", "synched", "suspended", "version_number", "client"
  ];
};			