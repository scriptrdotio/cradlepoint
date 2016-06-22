/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /**
 * Defaut api url and version
 */
var defaultApiUrl = "https://www.cradlepointecm.com/api";
var defaultApiVersion = "v2";

/**
 * Configure the ids and keys of your applications here 
 */
var appConfig = {
  
  your_app_name: { // specific configuration that pertains to the "your_app" app
    
    appId: "YOUR_ECM_APP_ID",
    appKey: "YOUR_ECM_APP_KEY",
    apiUrl: defaultApiUrl,
    apiVer: defaultApiVersion,
    defaultRole: "fullAccessUser", // if no role defined, use this role and corresponding credentials
    credentials: { // ecm-api-id and ecm-api-key by role
      
      administrator: {
      	ecmId: "ECM_ID_FOR_ADMINISTRATOR_ROLE",
        ecmKey: "ECM_KEY_FOR_ADMINISTRATOR_ROLE"
      },
      fullAccessUser: {
        ecmId: "ECM_ID_FOR_FULL_ACCESS_USER_ROLE",
        ecmKey: "ECM_KEY_FOR_FULL_ACCESS_USER_ROLE"
      }      
    }
  }
};

var defaultApp = "YOUR_DEFAULT_APP_NAME"; // default app configuration to use if none provided			