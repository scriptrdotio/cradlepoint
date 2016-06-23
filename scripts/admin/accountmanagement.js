/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var accountModule = require("../admin/account");
var objectmanagement = require("../objectmanagement");

// the root path of the accounts API
var PATH = "/accounts/";

/**
 * @class AccountManager
 * @param {Object} [dto]
 * @param {Object} [dto.client] // an instance of the cradlepoint/client.Client class
 */
function AccountManager(dto) {
  
  var custom = {
    
    managedType: accountModule.Account,
    path: PATH
  };
  
  objectmanagement.ObjectManager.call(this, custom, dto);
}

AccountManager.prototype = new objectmanagement.ObjectManager({inheritance:true});
AccountManager.prototype.construtor = AccountManager;

/**
 * @method listAccounts
 * @param {Object} [dto]
 * @param {Object} [dto.filter] (optional)
 * @param {String} [dto.filter.id] : the identifer of a given account
 * @param {String} [dto.filter.id__in] : array of account ids, corresponding accounts will be returned by the method
 * @param {String} [dto.filter.name] : the name of a given account
 * @param {String} [dto.filter.name__in] : array of account names, corresponding accounts will be returned by the method
 * @param {String} [dto.filter.expand] : Specifies expanded data for a attribute
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {Number} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {Number} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object} {
 * { 
 *   "data": [Array of /admin/account.Account objects]
 *   "paging": { "limit", "next", "offset", "previous"}
 * }
 */
AccountManager.prototype.listAccounts = function(dto) {
  return this.listObjects(dto);
};

/**
 * @method getAccount
 * @param {Object} [dto]
 * @param {String} [dto.id] : the identifer of a given account
 * @param {String} [dto.name] : the name of a given account
 * @return {Object} instance of /admin/account.Account
 */
AccountManager.prototype.getAccount = function(dto) {
  return this.getObject(dto);
};			