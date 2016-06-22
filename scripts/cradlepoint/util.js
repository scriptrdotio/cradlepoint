/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /**
 * @function jsonListToClassInstanceList
 * @param {Array} jsonArray: list of json objects 
 * @param {Object} classDef: constructor function
 * @param {Object} client: (optional) instance of the http client class
 * @return {Array} list of instances of classDef initialized using the items in jsonArray
 */
function jsonListToClassInstanceList(jsonArray, classDef, client){
 
  var instanceList = [];
  for (var i = 0; jsonArray && i < jsonArray.length; i++) {
   instanceList.push(jsonToClassInstance(jsonArray[i], classDef, client));
  }
  
  return instanceList;
}

/**
 * @function jsonToClassInstance
 * @param {Object} json: a json object
 * @param {Object} classDef: constructor function
 * @param {Object} client: (optional) instance of the http client class
 * @return {Object} a instance of classDef initialized using json
 */
function jsonToClassInstance(json, classDef, client) {   
 return new classDef(json, client); 
}			