/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var objectmanagement = require("./objectmanagement");
var netdeviceModule = require("./netdevice");

var PATH = "/net_devices/";

/**
 * @class NetDeviceManager
 * @constructor NetDeviceManager
 * @param {Object} [dto]
 * @param {Object} [dto.client] // an instance of the cradlepoint/client.Client class
 */
function NetDeviceManager(dto) {
  
  var custom = {

    managedType: netdeviceModule.NetDevice,
    path: PATH
  };

  objectmanagement.ObjectManager.call(this, custom, dto, dto.client);
}

NetDeviceManager.prototype = new objectmanagement.ObjectManager({inheritance:true});
NetDeviceManager.prototype.construtor = NetDeviceManager;

/**
 * @method listNetDevices
 * @param {Object} [dto]
 * @param {Object} [dto.filter] optional
 * @param {String} [dto.filter.id] : the identifer of a given net_device
 * @param {String} [dto.filter.id__in] : array of net_device ids, corresponding routers will be returned by the method
 * @param {String} [dto.filter.account] : the name of a given router
 * @param {String} [dto.filter.account__in] : array of router names, corresponding routers will be returned by the method
 * @param {String} [dto.filter.is_asset] : list net_devices that are/aren't assets
 * @param {String} [dto.filter.ipv4_address] : list net_devices that have this ipv4 address
 * @param {String} [dto.filter.ipv4_address__in] : list net_devices in this ipv4_addresses range
 * @param {String} [dto.filter.mode] : list net_devices in this mode
 * @param {String} [dto.filter.mode__in] : list net_devices in this modes range 
 * @param {String} [dto.filter.connection_state] : list net_devices in this state
 * @param {String} [dto.filter.connection_state_in] : list net_devices in one of these states  
 * @param {TimeStamp} [dto.filter.router] : list net_devices that are connected to this router
 * @param {TimeStamp} [dto.filter.router__in] : list net_devices that are connected to one of these routers
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
* @return {Object} {
 * { 
 *   "data": [Array of /netdevice.NetDevice objects]
 *   "paging": { "limit", "next", "offset", "previous"}
 * }
 * @throws Error
 */
NetDeviceManager.prototype.listNetDevices = function(dto) {
  return this.listObjects(dto);
};

/**
 * @method getNetDevice
 * @param {Object} [dto]
 * @param {String} [dto.id] : the identifer of a given router
 * @return {Object} instance of /netdevice.NetDevice
 * @throws Error
 */
NetDeviceManager.prototype.getNetDevice = function(dto) {
  return this.getObject(dto);
};

/**
 * Net device usage samples are periodic reports of the number of bytes passed in and out of a net device. 
 * By default a net device will report it's usage on an hourly basis, although this can be configured.
 * @method listNetDeviceUsageSamples
 * @param {Object} [dto]
 * @param {Object} [dto.filter] (optional)
 * @param {String} [dto.filter.created_at] : time when the sample was created as ISO Date string
 * @param {String} [dto.filter.create_at__gt] : return all sample created after that date/time as ISO Date string
 * @param {String} [dto.filter.create_at__lt] : return all sample created before that date/time as as ISO Date string
 * @param {String} [dto.filter.created_at_timeuuid] : unique ID associated with the created_at timestamp. 
 * Ordering by the ID is equivalent to time ordering. This field can identify a specific record or be used for paging
 * @param {String} [dto.filter.created_at_timeuuid__in] : return all samples of which timeuuid is in this array
 * @param {String} [dto.filter.created_at_timeuuid__gt] : return all samples that have a timeuuid > this value
 * @param {String} [dto.filter.created_at_timeuuid__gte] : return all samples that have a timeuuid >= this value
 * @param {String} [dto.filter.created_at_timeuuid__lt] : return all samples that have a timeuuid < this value
 * @param {String} [dto.filter.created_at_timeuuid__lte] : return all samples that have a timeuuid <this value
 * @param {Number} [dto.filter.net_device] : identifier of the Network device that reported the usage sample
 * @param {Number} [dto.filter.net_device__in] : return all samples where net_device_id in this list
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
NetDeviceManager.prototype.listNetDeviceUsageSamples = function(dto) {
 
  var url = "/net_device_usage_samples/";
  return this.listObjects(dto, url);
}; 

/**
 * This method provides information about the net device modem's signal metrics
 * @method listNetDeviceSignalSamples
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
 * @param {Number} [dto.filter.net_device] : identifier of the Network device that reported the usage sample
 * @param {Number} [dto.filter.net_device__in] : return all samples where net_device_id in this list
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
NetDeviceManager.prototype.listNetDeviceSignalSamples = function(dto) {
 
  var url = "/net_device_signal_samples/";
  return this.listObjects(dto, url);
}; 

/**
 * This method provides information about the net device modem's signal metrics
 * @method listNetDeviceMetrics
 * @param {Object} [dto]
 * @param {Object} [dto.filter] (optional)
 * @param {String} [dto.filter.update_ts__gt] : return all sample updated after that date/time as ISO Date string
 * @param {String} [dto.filter.update_ts__lt] : return all sample updated before that date/time as as ISO Date string
 * @param {Number} [dto.filter.net_device] : identifier of the Network device that reported the usage sample
 * @param {Number} [dto.filter.net_device__in] : return all samples where net_device_id in this list
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {String} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {String} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object} {
 * { 
 *   "data": [Array of device metrics]
 *   "paging": { "limit", "next", "offset", "previous"}
 * }
 * @throws Error
 */
NetDeviceManager.prototype.listNetDeviceMetrics = function(dto) {
 
  var url = "/net_device_metrics/";
  return this.listObjects(dto, url);
};			