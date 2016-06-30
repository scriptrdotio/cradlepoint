/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
var baseobjectModule = require("./baseobject.js");
var objectManagement = require("./objectmanagement.js");

/**
 * @class NetDevice
 * @constructor NetDevice
 * @param {Object} [dto] : initialization data of the instance
 * @paran {Object} client : instance of the http client 
 */
function NetDevice(dto, client) {
  
  if (!client) {
   
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "NetDevice. client cannot be null or empty"
    };
  }
  
  baseobjectModule.BaseObject.call(this, dto, client);
}

NetDevice.prototype = new baseobjectModule.BaseObject({inheritance:true});
NetDevice.prototype.constructor = NetDevice;

/**
 * Return the usage samples (periodic reports) of the number of bytes passed in and out of the current device. 
 * By default a net device will report it's usage on an hourly basis, although this can be configured.
 * @method listUsageSamples
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
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {Number} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {Number} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object}
 * @throws Error
 */
NetDevice.prototype.listUsageSamples = function(dto) {
 
  var params = {filter: {net_device: this.id}};
  params = this._copyData(dto, params);
  return objectManagement.sListObjects(params, "/net_device_usage_samples/", this.client, this.constructor);
};

/**
 * This method provides information about the current net device modem's signal metrics
 * @method listNetDeviceSignalSamples
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
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {Number} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {Number} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object}
 * @throws Error
 */
NetDevice.prototype.listSignalSamples = function(dto) {
  
  var params = {filter: {net_device: this.id}};
  params = this._copyData(dto, params);
  return objectManagement.sListObjects(params, "/net_device_signal_samples/", this.client, this.constructor);
};

/**
 * This method provides information about the net device modem's signal metrics
 * @method listMetrics
 * @param {Object} [dto]
 * @param {Object} [dto.filter] (optional)
 * @param {String} [dto.filter.update_ts__gt] : return all sample updated after that date/time as ISO Date string
 * @param {String} [dto.filter.update_ts__lt] : return all sample updated before that date/time as as ISO Date string
 * @param {String} [dto.filter.fields] : comma separated list of field names to limit the number of fields returned per record
 * @param {Object} [dto.paging] (optional)
 * @param {Number} [dto.paging.offset] index to start the list of results at
 * @param {Number} [dto.paging.limit] max number of records to return
 * @param {Number} [dto.paging.next] url of next result set. If defined, overrides all other parameters
 * @param {Number} [dto.paging.previous] url of previous result set. If defined, overrides all other parameters
 * @return {Object}
 * @throws Error
 */
NetDevice.prototype.listMetrics = function(dto) {

  var params = {filter: {net_device: this.id}};
  params = this._copyData(dto, params);
  return objectManagement.sListObjects(params, "/net_device_metrics/", this.client, this.constructor);
};