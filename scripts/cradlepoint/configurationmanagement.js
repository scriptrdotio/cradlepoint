/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var configurationManagerModule = require("./configurationmgr");
var objectmanagement = require("./objectmanagement");

var PATH = "/configuration_managers/";

/**
 * @class ConfigurationManager
 * @constructor ConfigurationManager
 * @param {Object} [dto]
 * @param {Object} [dto.client] // an instance of the cradlepoint/client.Client class
 */
function ConfigurationManagers(dto) {
 
  var custom = {
    
    managedType: configurationManagerModule.ConfigurationManager,
    path: PATH
  };
  
  objectmanagement.ObjectManager.call(this, custom, dto);
}

ConfigurationManagers.prototype = new objectmanagement.ObjectManager({inheritance:true});
ConfigurationManagers.prototype.construtor = ConfigurationManagers;

/**
 * @method listConfigurationManagers
 * @param {Object} [dto]
 * @param {Object} [dto.filter] optional
 * @param {String} [dto.filter.id] : the identifer of a given configuration manager
 * @param {String} [dto.filter.id__in] : array of configuration manager ids, corresponding configuration manager 
 * twill be returned by the method
 * @param {String} [dto.filter.account] : the account that owns the configuration managers
 * @param {String} [dto.filter.name__in] : return all configuration managers owned by these account ids
 * @param {String} [dto.filter.router] : list routers in this group
 * @param {String} [dto.filter.router__in] : list routers in this group list 
 * @return {Object} {
 * { 
 *   "data": [Array of  /configurationmgr.ConfigurationManager]
 *   "paging": { "limit", "next", "offset", "previous"}
 * }
 * @throws Error
 */
ConfigurationManagers.prototype.listConfigurationManagers = function(dto) {
  return this.listObjects(dto);
};

/**
 * @method getConfigurationManager
 * @param {Object} [dto]
 * @param {String} [dto.id] : the identifer of a given configuration manager
 * @param {String} [dto.name] : the name of a given configuration manager
 * @return {Object} instance of /configurationmgr.ConfigurationManager
 */
ConfigurationManagers.prototype.getConfigurationManager = function(dto) {
  return this.getObject(dto);
};			