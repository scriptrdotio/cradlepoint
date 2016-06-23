/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var config = require("./config");

/**
 * Define a structure that holds credentials to be used in the different classes
 * @class Principal
 * @constructor 
 * @param {Object} [dto]
 * @param {String} [dto.app] : optional. Used to retrieve the credentials of the provided role or default role in auth/config
 * @param {String} [dto.role] : optonal. Used to retrieve appropriate credentials. If not defined, use default role
 * @param {String} [dto.ecmId] : optional, if defined, has precedence over dto.role and dto.app
 * @param {String} [dto.ecmKey] : optional, if defined, has precedence over dto.role and dto.app
 */
function Principal(dto) {
  
  dto = dto ? dto : {};
  this.ecmId = dto.ecmId;
  this.ecmKey = dto.ecmKey;
  this.app = dto.app ? dto.app : config.defaultApp;
  if (!this.ecmId || !this.ecmKey) {
    
    this.role = dto.role ? dto.role : config.appConfig[this.app].defaultRole;
    this.ecmId =  config.appConfig[this.app].credentials[this.role].ecmId;
    this.ecmKey = config.appConfig[this.app].credentials[this.role].ecmKey;
  }
  
  this.appId = dto.appId ? dto.appId : config.appConfig[this.app].appId;
  this.appKey = dto.appKey ? dto.appKey : config.appConfig[this.app].appKey;
  
  if (!this.ecmId || !this.ecmKey) {
    
    throw {
      
      errorCode: "Credentials_Not_Found",
      errorDetail: "Principal. Could not find credentials to initialize Principa object"
    }
  }
}

/**
 * @method getEcmId
 * @return {String}
 */
Principal.prototype.getEcmId = function() {
  return this.ecmId;
};

/**
 * @method getEcmKey
 * @return {String}
 */
Principal.prototype.getEcmKey = function() {
  return this.ecmKey;
};

/**
 * @method getAppId
 * @return {String}
 */
Principal.prototype.getAppId = function() {
  return this.appId;
};

/**
 * @method getAppKey
 * @return {String}
 */
Principal.prototype.getAppKey = function() {
  return this.appKey;
};

/**
 * @method getApp
 * @return {String}
 */
Principal.prototype.getApp = function() {
  return this.app;
};

/**
 * @method getRole
 * @return {String}
 */
Principal.prototype.getRole = function() {
  return this.role;
};			
