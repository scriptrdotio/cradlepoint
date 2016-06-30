/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var principalModule = require("../auth/principal.js");
var cradlepointManagementModule = require("../cradlepointmanagement.js");
var accountManagementModule = require("../admin/accountmanagement.js");
var clientModule = require("../client.js");

try {
  
    
  /*
   * Different ways of creating a principal
   */ 
  
  // Create principal with administrator role
  var principal = new principalModule.Principal({app:"scriptr", role:"administrator"});
  
  var data = {};
  data.principal = principal;

  // create principal with defaut (config-based) role
  var principalDefaultRole = new principalModule.Principal({app:"scriptr"})
  data.principalDefaultRole = principalDefaultRole;

  // Create principal with administrator role for default app (config-based)
  var principalDefaultAppWithRole = new principalModule.Principal({role:"administrator"});
  data.principalDefaultAppWithRole = principalDefaultAppWithRole;

  // create principal for default app with defaut role (config-based)
  var principalDefaultAppDefaultRole = new principalModule.Principal();
  data.principalDefaultAppDefaultRole = principalDefaultAppDefaultRole;

  var cradlepointManager = new cradlepointManagementModule.CradlepointManager({principal:principalDefaultAppWithRole});
  
  /*
   * Using the AccountManager class to obtain account information
   */
   
  // try to use the method of an accountmanager with non-admin credentials
  /*
  var client = new clientModule.Client({principal:principalDefaultRole});
  var accountManager = new accountManagementModule.AccountManager({client:client});
  try {
    data.accounts = accountManager.listAccounts();
  }catch(exception){
    console.log(JSON.stringify(exception));
  }
  
  accountManager = cradlepointManager.getAccountManager();
  
  // list all account
  data.listAccounts = accountManager.listAccounts();
  
  if (data.listAccounts.data.length > 0) {
   
    // filter accounts by name
  	data.listAccountsFiltered = accountManager.listAccounts({filter:{name:data.listAccounts.data[0].name}});
    
    // get a specific account (same as filter by name);
    data.getAccount = accountManager.getAccount({name:data.listAccounts.data[0].name});
  }  
  */
  
  /*
   * Using the RouterManager class to obtain data on/ and manipulate routers
   */
   
  /* Create an instance of RouterManager, using the admin role */  
  var routerManager = cradlepointManager.getRouterManager();
  
  /* list all available routers */
  data.listRouters = routerManager.listRouters();
  
  /* list routers filtered by name list */
  //data.listRoutersFiltered = routerManager.listRouters({filter:{name__in: data.listRouters.data[0].name}});
  
  /* list all routers stream usage samples */
  //data.listRouterStreamUsageSamples = routerManager.listRouterStreamUsageSamples();
  
  /* list routers stream usage samples, filtered by date 2016-05-21T16:49:57.930033+00:00 */
  //data.listRouterStreamUsageSamples = routerManager.listRouterStreamUsageSamples({filter:{created_at__gt: "2016-05-21T16:49:57.930033+00:00"}});
  
  /* list routers state samples */
  

  //data.listRouterStateSamples = routerManager.listRouterStateSamples({filter:{created_at__gt: "2016-05-21T16:49:57.930033+00:00"}});
  
  //if (data.listRouters && data.listRouters && data.listRouters.data.length > 0) {

    /* get a given router */
   var router = routerManager.getRouter({name:data.listRouters.data[0].name});
   data.getRouter = router;
    
    /* update the router */
    //router.name = "eb-wan-kenobe";
    //data.routerUpdate = router.update(["name"]);
    //data.getRouterUpdated = routerManager.getRouter({name:router.name});
    
    /* list stream usage samples for that router (use can also use filters) */
    //data.listStreamUsageSamples = router.listStreamUsageSamples();
    
    /* list router state samples (use can also use filters) */
    //data.listStateSamples = router.listStateSamples();
    
    /* list routers logs */
    //data.listRouterLogs = router.listLogs({filter:{created_at__gt: "2016-05-21T16:49:57.930033+00:00"}});
 
 //}
 
  
  /*
   * Manipulate net_devices using the NetDeviceManager
   */
  
  var netDeviceManager = cradlepointManager.getNetDeviceManager();
  
  // list all net_devices (limited to 100 device)
  data.listNetDevices = netDeviceManager.listNetDevices(); 
  
  // list all net_devices filtered by ip
  //data.listNestDevicesFiltered = netDeviceManager.listNetDevices({filter:{ipv4_address:"192.168.0.1"}});

  // list all net device usage samples
  //data.listNetDeviceUsageSamples = netDeviceManager.listNetDeviceUsageSamples();
  
  // list all net device usage samples filtered by creation date
  //data.listNetDeviceUsageSamplesFiltered = netDeviceManager.listNetDeviceUsageSamples({filter:{created_at__gt: "2016-05-21T19:22:58.431527+00:00"}});
  
  // list all net device signal samples
  data.listNetDeviceSignalSamples = netDeviceManager.listNetDeviceSignalSamples();
  
  // list all net device metrics
  data.listNetDeviceMetrics = netDeviceManager.listNetDeviceMetrics();
  
  if (data.listNetDevices.data.length > 0) {
    
    // Get a specific net device
    var netDevice = netDeviceManager.getNetDevice({id:data.listNetDevices.data[0].id});
    //data.getNetDevice = netDevice;
    
    // list usage samples for the given device (note: you can use filters)
    //data.listUsageSamples = netDevice.listUsageSamples();
    
    // list signal samples for the given device (note: you can use filters)
    //data.listSignalSamples = netDevice.listSignalSamples();
    
    // list metrics for the given device (note: you can use filters)
    data.listMetrics = netDevice.listMetrics();
  }
  
  
  /*
   * Manipulate configuration_managers using the ConfigurationManagers
   */
  
  /*
  var configurationManagers = cradlepointManager.getConfigurationManagers();
  data.listConfigurationManagers = configurationManagers.listConfigurationManagers();
  
  if (data.listConfigurationManagers && data.listConfigurationManagers.length > 0) {
    
    var configurationMgr = configurationManagers.getConfigurationManager({id:data.listConfigurationManagers[0].id});
    data.getConfigurationManager = configurationMgr;
  }
  */
  
  return data;
}catch(exception){
  return exception;
}			