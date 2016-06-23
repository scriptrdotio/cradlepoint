var baseobjectModule = require("./baseobject");
var objectManagement = require("./objectmanagement");
var netDeviceModule = require("./netdevicemanagement");

/**
 * Wraps router data and methods
 * @class Router
 * @contructor Router
 * @param {Object} [dto] : initialization data of the instance
 * @paran {Object} client : instance of the http client 
 * @throws Error
 */
function Router(dto, client) {
  
  if (! client) {
   
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Router. client cannot be null or empty"
    };
  }
  
  baseobjectModule.BaseObject.call(this, dto, client);
}

Router.prototype = new baseobjectModule.BaseObject({inheritance:true});
Router.prototype.constructor = Router;

/**
 * Update the router with the current value of this instance's properties
 * @method update
 */
Router.prototype.update = function(){
  
  var updateParameters = {
    
    url: "/routers/" + this.id + "/",
    method: "PUT",
    bodyString: JSON.stringify(this._cloneData()),
    headers: {
      "Content-Type": "application/json"
    }
  };
  
  return this.client.callApi(updateParameters);
};

/**
 * A Cradlepoint router connects to ECM through the ECM stream server.  ECM tracks communication 
 * between the router and the server using stream samples. This endpoint can be used to calculate total ECM network traffic
 * for the current router. 
 * @method listStreamUsageSamples
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
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object}
 * @throws Error
 */
Router.prototype.listStreamUsageSamples = function(dto) {
  
  var params = {filter: {router: this.id}};
  return objectManagement.sListObjects(params, "/router_stream_usage_samples/", this.client, this.constructor);
};

/**
 * ECM keeps a history of the online/offline state of routers using state samples. 
 * A router is considered online when it is connected to ECM.  This endpoint can be used to track historical online/offline status.
 * @method listStateSamples
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
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object} list of samples
 * @throws Error
 */
Router.prototype.listStateSamples = function(dto) {
  
  var params = {filter: {router: this.id}};
  return objectManagement.sListObjects(params, "/router_state_samples/", this.client, this.constructor);
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
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object} list of samples
 * @throws Error
 */
Router.prototype.listAlerts = function(dto) {
  
  var params = {filter: {router: this.id}};
  return objectManagement.sListObjects(params, "/router_alerts/", this.client, this.constructor);
};

/**
 * This method provides a history of router events. To receive router logs, you must enable them on the Group settings form. 
 * Enabling router logs can significantly increase the ECM network traffic from the router to the server depending on how quickly 
 * the router is generating events.
 * @method listLogs
 * @param {Object} [dto]
 * @param {Object} [dto.filter] (optional)
 * @param {String} [dto.filter.created_at] : time when the logs was created as ISO Date string
 * @param {String} [dto.filter.created_at__gt] : return all logs created after that date/time as ISO Date string
 * @param {String} [dto.filter.created_at__lt] : return all logs created before that date/time as as ISO Date string
 * @param {String} [dto.filter.created_at_timeuuid] : unique ID associated with the created_at timestamp. 
 * Ordering by the ID is equivalent to time ordering. This field can identify a specific record or be used for paging
 * @param {String} [dto.filter.created_at_timeuuid__in] : return all logs of which timeuuid is in this array
 * @param {String} [dto.filter.created_at_timeuuid__gt] : return all logs that have a timeuuid > this value
 * @param {String} [dto.filter.created_at_timeuuid__gte] : return all logs that have a timeuuid >= this value
 * @param {String} [dto.filter.created_at_timeuuid__lt] : return all logs that have a timeuuid < this value
 * @param {String} [dto.filter.created_at_timeuuid__lte] : return all logs that have a timeuuid <this value
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object} list of samples
 * @throws Error
 */
Router.prototype.listLogs = function(dto) {
  
  var params = {filter: {router: this.id}};
  return objectManagement.sListObjects(params, "/router_logs/", this.client, this.constructor);
};

/** 
 * Return a list of NetDevice instances that are related to the current router
 * @method listNetDevices
 * @param {Obejct} [dto]
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Array} list of NetDevice instances
 */
Router.prototype.listNetDevices = function(dto) {
  
  dto = dto ? dto : {};
  var netDeviceManager = new netDeviceModule.NetDeviceManager({client:this.client});
  dto.router = this.id;
  return netDeviceManager.listNetDevices(dto);
};

Router.prototype._getExcludedField = function() {
  
  return [
    "state", "locality", "created_at", "updated_at", 
    "full_product_name", "state_updated_at", "ipv4_address",
    "actual_firmware", "mac", "client", "target_firmware", 
    "id", "serial_number", "resource_url", "config_status"
  ];
};