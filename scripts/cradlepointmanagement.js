/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var accountManagementModule = require("./admin/accountmanagement");
var routerManagementModule = require("./routermanagement");
var netdevicemanagementModule = require("./netdevicemanagement");
var configurationmanagementModule = require("./configurationmanagement");
var clientModule = require("./client");

/**
 * Main entry point (factory) to all cradelpoint services
 * @class CradlepointManager
 * @constructor CradlepointManager
 * @param {Object} [dto]
 * @param {String} [dto.principal] // the principal object to use when invoking the instance's methods
 */
function CradlepointManager(dto) {
  
  if (!dto || !dto.principal) {

    throw {

      errorCode: "Invalid_Parameter",
      errorDetail: "CradlepointManager dto.principal cannot be null or empty"
    };
  }

  this.principal = dto.principal;
  this.client = new clientModule.Client({principal:this.principal});
}

/**
 * @method getAccountManager
 * @return {Object} instance of cradlepoint/accountmanagement.AccountManager
 */
CradlepointManager.prototype.getAccountManager = function() {
  return new accountManagementModule.AccountManager({client:this.client});
};

/**
 * @method getRouterManager
 * @return {Object} instance of cradlepoint/routermanagement.RouterManager
 */
CradlepointManager.prototype.getRouterManager = function() {
  return new routerManagementModule.RouterManager({client:this.client});
};

/**
 * @method getNetDeviceManager
 * @return {Object} instance of cradlepoint/routermanagement.NetDeviceManager
 */
CradlepointManager.prototype.getNetDeviceManager = function() {
  return new netdevicemanagementModule.NetDeviceManager({client:this.client});
};

/**
 * @method getConfigurationManagers
 * @return {Object} instance of cradlepoint/routermanagement.NetDeviceManager
 */
CradlepointManager.prototype.getConfigurationManagers = function() {
  return new configurationmanagementModule.ConfigurationManagers({client:this.client});
};			