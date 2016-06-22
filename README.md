# Cadlepoint connector

## About Cradlepoint ECM
Cradlepoint's Enterprise Cloud Manager (ECM) is a device management meant to rapidly deploy and dynamically manage networks at geographically distributed locations.

## Purpose of the connector
The connector wraps the APIs that are exposed by ECM into JavaScript objects that facilitate the way you can manipulate Cradlepoint's services. Using the connector, you can for example create applications to monitor the data usage of your network devices or update their configuration dynamically.  

## Components
- /cradlepointmanagement: factory class used to obtain instances of router managers, net devices managers and configuration managers
- /routermanagement: class to list routers, get routers usage and logs, get a specific router
- /netdevicemanagement: class to list net devices, get net devices usage and metrics, get a specific net devices
- /configurationmanagement: class to list ECM configuration managers, get a specific configuration manager
- /objectmanagement: base class of all aforementioned managers, provides base implementation for listing and getting instances of the managed entity types
- /router: class that wraps a specific router instance (list router usage and logs, update router)
- /netdevice: class that wraps a specific net device instance (list net device usage and metrics)
- baseobject: base class of /router and netdevices
- /util: utility module, provides utility functions used by other modules
- /admin/accountmanagement: class to list accounts and get a specific account (only available to administrator role)
- /admin/account: class that wraps a given ECM account
- /auth/principal: class used to wrap ECM user credentials and auth token
- /auth/config: main configuration file of the connector, used to declar ECM API keys and secrets and default values
- /test/tests: test script that contains multiple examples on how to use the connector

## Configuring the connector

You can configure your application in the connector using the "cradlepoint/auth/config" file and more specifically the "appConfig" variable. 
Create an entry for every application (account) you have defined in ECM, using that application's name as key: 
```
var appConfig = { 
  scriptr: { // "scriptr" is the name of the application in ECM
     // specific configuration that pertains to the "scriptr" app 
    } 
  };
``` 
Then specify the following properties for your application: 
```
appId: "APP _ID_FROM_ECM", 
appKey: "APP_KEY_FROM_ECM", 
apiUrl: "https://www.cradlepointecm.com/api, 
apiVer: "v2", 
defaultRole: "SOME_ROLE_OF_YOUR_CHOICE", // e.g. "fullAccessUser" if no role defined, use this role and corresponding credentials 
credentials: { // ecm-api-id and ecm-api-key by role 
  administrator: { // this is an example. use "administrator" only if your created ECM ID/Key pair for the Administrator role
    ecmId: "ECM_ID_for_Administrator_role", 
    ecmKey: "ECM_KEY_for_Administrator_role" 
  }, 
  fullAccessUser: { 
    ecmId: "ECM_ID_for_FullAccessUser_role", 
    ecmKey: "ECM_KEY_for_FullAccessUser_rol" 
  },
  // etc.
} 
```
In the configuration script you also specify what is the default application to use when no application is specified:
```
var defaultApp = "scriptr"; // default app 
```

## Authentication and authorizations

### About Cradlepoint authorization model

#### Roles

Cradlepoint adopts a role-based authorization model: whenever a user is created in the ECM platform, a role has to be assigned to him that determines the permissions he will have, i.e. what operations (API) he can execute on the devices that are managed by the platform. There are currently four distinct roles:

*   Administrator: full access to the account they are created in and corresponding subaccounts
*   Full Access User: similar to Administrator but cannot create/update other users
*   Read Only User: can only view ECM information and run reports
*   Diagnostic User: Similar to Read Only user, but provides additional permissions to perform ping, traceroute, speed test, and reboot functions (unrelated to API)

#### ECM Ids and Keys

Cradlepoint’s ECM provides applications with programmatic access to networks data through its APIs. 
From the "Applications" section of ECM, it is possible to create pairs ECM Id/ECM secret per role in an account (application). 
These id/key pairs are used to authenticate and authorize the users who is sending a request.

### Principals

Our Predix connector uses the concept of "Principal" to wrap roles and permissions. 
Hence before using any of the classes that constitute our connector, it is necessary to create an instance of Principal: 
```
var principalModule = require("../auth/principal"); 
// Create principal with administrator role 
var principal = new principalModule.Principal({app:"scriptr", role:"administrator"});
```
Note that if no role is specified then the Principal class falls back to the "defaultRole" specified for the related application 
in the configuration script (see "Configuration" paragraph)

## Using the connector

The first thing to do is to create an instance of CradlepointManager, which is a factory of other objects (API managers) that wrap specific ECM APIs. The constructor or CradlepointManager expects you to pass it an instance of Principal. 
```
// first, require the "cradlepointmanagement" module 
var cradlepointManagementModule = require("../cradlepointmanagement"); 
// then create an instance of CradlepointManager, passing a Principal 
var cradlepointManager = new cradlepointManagementModule.CradlepointManager({principal:principal});
```
*Note* Although using the CradlepointManager is a straightforward way of obtaining instances of  API managers, you can directly instantiate the latter using their own constructors.

### Routers

You manipulate routers using an instance of RouterManager, obtained from the CradlepointManager: 
```
// Create an instance of RouterManager
var routerManager = cradlepointManager.getRouterManager();
```
Using the RouteManager you can execute a lot of useful methods:

*Note* 
- You can always omit the filter, which returns a paginated list of results
- There are other available ways to filter. Kindly check the documentation of the RouterMananger code

#### List routers
```
// list routers, filtered by name
var listRoutersFiltered = routerManager.listRouters({filter:{name__in: data.listRouters.data[0].name}});
```
#### Routers' stream usage
```  
// list all routers stream usage samples filtered by date 2016-05-21T16:49:57.930033+00:00 
var listRouterStreamUsageSamples = routerManager.listRouterStreamUsageSamples({filter:{created_at__gt: "2016-05-21T16:49:57.930033+00:00"}});
```
#### Routers' state samples
```
var listRouterStateSamples = routerManager.listRouterStateSamples({filter:{created_at__gt: "2016-05-21T16:49:57.930033+00:00"}});
```
### Single router
"routerManager.listRouters()" returns a list of instances of the Router class that you can use to manipulate a specific router. You can also directly obtain a reference to a Router instance from the RouterManager:
```
var router = routerManager.getRouter({name:"some_router_name"});
```
*Note:* you can also obtain a router by id

#### Get router's data
Using the Router instance, you can ask for specific data, such as:
```
// list stream usage samples for that router (use can also use filters)
var listStreamUsageSamples = router.listStreamUsageSamples();
    
// list state samples for that router (use can also use filters)
var listStateSamples = router.listStateSamples();
    
// list logs generated by the router
var listRouterLogs = router.listLogs({filter:{created_at__gt: "2016-05-21T16:49:57.930033+00:00"}});
```
#### Update a router
To update a router, modify the value of its properties, then invoke its update() method, specifyig the properties  to update:
```
// update the router's name
router.name = "router001";
router.update(["name"]);
```
### Net Devices
Net Devices are the network interfaces currently enabled in a router. They are categorized as either WAN or LAN devices, as signified by the "mode" attribute, and further broken down by interface type, such as ethernet, wireless, modem, LTE, etc.

You manipulate net devices using an instance of NetDeviceManager, obtained from the CradlepointManager: 
```
var netDeviceManager = cradlepointManager.getNetDeviceManager();
```

#### List net devices

*Note* 
- You can always omit the filter, which returns a paginated list of results
- There are other available ways to filter. Kindly check the documentation of the NetDeviceMananger code
```
var listNestDevicesFiltered = netDeviceManager.listNetDevices({filter:{ipv4_address:"192.168.0.1"}});
```
#### Net devices' stream usage 
```
var istNetDeviceUsageSamplesFiltered = netDeviceManager.listNetDeviceUsageSamples({filter:{created_at__gt: "2016-05-21T19:22:58.431527+00:00"}});
```
#### Net deices's metrics
```
var listNetDeviceMetrics = netDeviceManager.listNetDeviceMetrics(); // you can also apply a filter
```
### Single Net Device

"neDevicerManager.listDevices()" returns a list of instances of the NetDevice class that you can use to manipulate a specific net device. You can also directly obtain a reference to a NetDevice instance from the NetDeviceManager:
```
var netDevice = netDeviceManager.getNetDevice({id:"some_net_device_id"});
```
#### Get data from a Net Device
```
// list usage samples for the given device (note: you can use filters)
var listUsageSamples = netDevice.listUsageSamples();
    
// list signal samples for the given device (note: you can use filters)
var listSignalSamples = netDevice.listSignalSamples();
    
// list metrics for the given device (note: you can use filters)
var listMetrics = netDevice.listMetrics();
```
### Configuration Managers
Individual router configs are managed by the configuration manager endpoint. A configuration manager is an abstract resource for controlling and monitoring config sync on a single router. Each router has its own corresponding configuration manager.

You manipulate configuration managers using an instance of ConfigurationManagers, obtained from CradlepointManager
```
var configurationManagers = cradlepointManager.getConfigurationManagers();
```
#### List Configuration Managers
```
var listConfigurationManagers = configurationManagers.listConfigurationManagers();
```
*Note* You can also apply filters to the above method. The returned list contains instances of the ConfigurationManager class

### Single ConfigurationManager
You can also obtain a reference to an instance of ConfigurationManager by id:
```
var configurationMgr = configurationManagers.getConfigurationManager({id:"some_id"});
```
#### Update a configuration mananger
```
configurationMgr.some_property = new_value
configurationMgr.update[propeties,...]
```
*Note** More details can be found in /scripts/cradlepoint/test/tests
