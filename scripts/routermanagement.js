/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var routerModule = require("./router.js");
var objectmanagement = require("./objectmanagement.js");

var PATH = "/routers/";

/**
 * @class RouterManager
 * @constructor RouterManager
 * @param {Object} [dto]
 * @param {Object} [dto.client] // an instance of the cradlepoint/client.Client class
 */
function RouterManager(dto) {
 
   var custom = {
    
    managedType: routerModule.Router,
    path: PATH
  };
  
  objectmanagement.ObjectManager.call(this, custom, dto);
}

RouterManager.prototype = new objectmanagement.ObjectManager({inheritance:true});
RouterManager.prototype.construtor = RouterManager;

/**
 * @method listRouters
 * @param {Object} [dto]
 * @param {Object} [dto.filter] optional
 * @param {String} [dto.filter.id] : the identifer of a given router
 * @param {String} [dto.filter.id__in] : array of router ids, corresponding routers will be returned by the method
 * @param {String} [dto.filter.name] : the name of a given router
 * @param {String} [dto.filter.name__in] : array of router names, corresponding routers will be returned by the method
 * @param {String} [dto.filter.group] : list routers in this group
 * @param {String} [dto.filter.group__in] : list routers in this group list 
 * @param {String} [dto.filter.ipv4_address] : list routers that have this ipv4 address
 * @param {String} [dto.filter.ipv4_address__in] : list routers in this ipv4_addresses range
 * @param {String} [dto.filter.mac] : list routers in this mac
 * @param {String} [dto.filter.mac__in] : list routers in this mac addresses range 
 * @param {String} [dto.filter.state] : list routers in this state
 * @param {String} [dto.filter.state__in] : list routers in one of these states  
 * @param {TimeStamp} [dto.filter.state_updated_at] : list routers that state was updated at that date (timestamp)
 * @param {TimeStamp} [dto.filter.state_updated_at__in] : list routers that state was updated at any of these dates (timestamp)
 * @param {TimeStamp} [dto.filter.updated_at] : list routers that were updated at that date (timestamp)
 * @param {TimeStamp} [dto.filter.updated_at__in] : list routers that were updated at any of these dates (timestamp)
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object} {
 * { 
 *   "data": [Array of /router.Router objects]
 *   "paging": { "limit", "next", "offset", "previous"}
 * }
 * @throws Error
 */
RouterManager.prototype.listRouters = function(dto) {
  return this.listObjects(dto);
};

/**
 * @method getRouter
 * @param {Object} [dto]
 * @param {String} [dto.id] : the identifer of a given router
 * @param {String} [dto.name] : the name of a given router
 * @return {Object} instance of /router.Router objects
 * @throws Error
 */
RouterManager.prototype.getRouter = function(dto) {
  return this.getObject(dto);
};

/**
 * A Cradlepoint router connects to ECM through the ECM stream server.  ECM tracks communication 
 * between the router and the server using stream samples. This endpoint can be used to calculate total ECM network traffic. 
 * @method listRouterStreamUsageSamples
 * @param {Object} [dto]
 * @param {Object} [dto.filter] (optional)
 * @param {String} [dto.filter.created_at] : time when the sample was created as ISO Date string
 * @param {String} [dto.filter.created_at__gt] : return all samples created after that date/time as ISO Date string
 * @param {String} [dto.filter.created_at__lt] : return all samples created before that date/time as as ISO Date string
 * @param {String} [dto.filter.created_at_timeuuid] : unique ID associated with the created_at timestamp. 
 * Ordering by the ID is equivalent to time ordering. This field can identify a specific record or be used for paging
 * @param {String} [dto.filter.created_at_timeuuid__in] : return all samples of which timeuuid is in this array
 * @param {String} [dto.filter.created_at_timeuuid__gt] : return all samples that have a timeuuid > this value
 * @param {String} [dto.filter.created_at_timeuuid__gte] : return all samples that have a timeuuid >= this value
 * @param {String} [dto.filter.created_at_timeuuid__lt] : return all samples that have a timeuuid < this value
 * @param {String} [dto.filter.created_at_timeuuid__lte] : return all samples that have a timeuuid <this value
 * @param {Number} [dto.filter.router] : identifier of the router that reported the usage sample
 * @param {Number} [dto.filter.router__in] : return all samples where router id is in this list
 * @param {String} [dto.filter.order_by] : group results according to this order
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object} {
 * { 
 *   "data": [Array of samples]
 *   "paging": { "limit", "next", "offset", "previous"}
 * }
 * @throws Error
 */
RouterManager.prototype.listRouterStreamUsageSamples = function(dto) {
  
  var url = "/router_stream_usage_samples/";
  return this.listObjects(dto, url);
};

/**
 * ECM keeps a history of the online/offline state of routers using state samples. 
 * A router is considered online when it is connected to ECM.  This endpoint can be used to track historical online/offline status.
 * @method listRouterStateSamples
 * @param {Object} [dto]
 * @param {Object} [dto.filter] (optional)
 * @param {String} [dto.filter.created_at] : time when the sample was created as ISO Date string
 * @param {String} [dto.filter.created_at__gt] : return all sample created after that date/time as ISO Date string
 * @param {String} [dto.filter.created_at__lt] : return all sample created before that date/time as as ISO Date string
 * @param {String} [dto.filter.created_at_timeuuid] : unique ID associated with the created_at timestamp. 
 * Ordering by the ID is equivalent to time ordering. This field can identify a specific record or be used for paging
 * @param {String} [dto.filter.created_at_timeuuid__in] : return all samples of which timeuuid is in this array
 * @param {String} [dto.filter.created_at_timeuuid__gt] : return all samples that have a timeuuid > this value
 * @param {String} [dto.filter.created_at_timeuuid__gte] : return all samples that have a timeuuid >= this value
 * @param {String} [dto.filter.created_at_timeuuid__lt] : return all samples that have a timeuuid < this value
 * @param {String} [dto.filter.created_at_timeuuid__lte] : return all samples that have a timeuuid <this value
 * @param {Number} [dto.filter.router] : identifier of the router that reported the usage sample
 * @param {Number} [dto.filter.router__in] : return all samples where router id is in this list
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {String} [dto.filter.order_by] : group results according to this order
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object} {
 * { 
 *   "data": [Array of samples]
 *   "paging": { "limit", "next", "offset", "previous"}
 * }
 * @throws Error
 */
RouterManager.prototype.listRouterStateSamples = function(dto) {
  
  var url = "/router_state_samples/";
  return this.listObjects(dto, url);
};

/**
 * @method listAlerts
 * @param {Object} [dto]
 * @param {Object} [dto.filter] (optional)
 * @param {String} [dto.filter.created_at] : time when the sample was created as ISO Date string
 * @param {String} [dto.filter.created_at__gt] : return all alerts created after that date/time as ISO Date string
 * @param {String} [dto.filter.created_at__lt] : return all alerts created before that date/time as as ISO Date string
 * @param {String} [dto.filter.created_at_timeuuid] : unique ID associated with the created_at timestamp. 
 * Ordering by the ID is equivalent to time ordering. This field can identify a specific record or be used for paging
 * @param {String} [dto.filter.created_at_timeuuid__in] : return all alerts of which timeuuid is in this array
 * @param {String} [dto.filter.created_at_timeuuid__gt] : return all alerts that have a timeuuid > this value
 * @param {String} [dto.filter.created_at_timeuuid__gte] : return all alerts that have a timeuuid >= this value
 * @param {String} [dto.filter.created_at_timeuuid__lt] : return all alerts that have a timeuuid < this value
 * @param {String} [dto.filter.created_at_timeuuid__lte] : return all alerts that have a timeuuid <this value
 * @param {Number} [dto.filter.router] : identifier of the router that reported the usage sample
 * @param {Number} [dto.filter.router__in] : return all alerts where router id is in this list
 * @param {String} [dto.filter.order_by] : group results according to this order
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object} {
 * { 
 *   "data": [Array of alerts]
 *   "paging": { "limit", "next", "offset", "previous"}
 * }
 * @throws Error
 */
RouterManager.prototype.listAlerts = function(dto) {
  
  var url = "/router_alerts/";
  return this.listObjects(dto, url);
};			