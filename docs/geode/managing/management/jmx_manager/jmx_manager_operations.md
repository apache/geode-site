---
title: Starting, Configuring, Stopping a JMX Manager
---

<!--
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements.  See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License.  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
## {#topic_686158E9AFBD47518BE1B4BEB232C190}
JMX Manager nodes are members that manage other @@product_name@@ members (as well as themselves). A JMX Manager node can manage all other members in the cluster. Typically a locator will function as the JMX Manager, but you can also turn any other member such as a server into a JMX Manager node as well.

To allow a server to become a JMX Manager you configure @@product_name@@ property `jmx-manager=true`, in the server's`gemfire.properties` file. This property configures the node to become a JMX Manager node passively; if gfsh cannot locate a JMX Manager when connecting to the cluster, the server node will be started as a JMX Manager node.

**Note:**
The default property setting for all locators is `gemfire.jmx-manager=true`. For other members, the default property setting is `gemfire.jmx-manager=false`.

To force a server to become a JMX Manager node whenever it is started, set the @@product_name@@ properties `jmx-manager-start=true` and `jmx-manager=true` in the server's gemfire.properties file. Note that both of these properties must be set to true for the node.

To start the member as a JMX Manager node on the command line, provide`                     --J=-Dgemfire.jmx-manager-start=true and --J=-Dgemfire.jmx-manager=true` as arguments to either the `start server` or `start                     locator` command.

For example, to start a server as a JMX Manager on the gfsh command line:

``` pre
gfsh>start server --name=<server-name> --J=-Dgemfire.jmx-manager=true \
--J=-Dgemfire.jmx-manager-start=true
```

By default, any locator can become a JMX Manager when started. When you start up a locator, if no other JMX Manager is detected in the cluster, the locator starts one automatically. If you start a second locator, it will detect the current JMX Manager and will not start up another JMX Manager unless the second locator's `gemfire.jmx-manager-start` property is set to true.

For most deployments, you only need to have one JMX Manager per cluster. However, you can run more than one JMX Manager if necessary. If you want to provide high-availability and redundancy for the Pulse monitoring tool, or if you are running additional JMX clients other than gfsh, then use the `jmx-manager-start=true` property to force individual nodes (either locators or servers) to become JMX Managers at startup. Since there is some performance overhead to being a JMX Manager, we recommend using locators as JMX Managers. If you do not want a locator to become a JMX manager, then you must use the `jmx-manager=false` property when you start the locator.

After the node becomes a JMX Manager, all other `jmx-manager-*` configuration properties listed in [Configuring a JMX Manager](jmx_manager_operations#topic_263072624B8D4CDBAD18B82E07AA44B6) are applied.

The following is an example of starting a new locator that also starts an embedded JMX Manager (after detecting that another JMX Manager does not exist). In addition, `gfsh` also automatically connects you to the new JMX Manager. For example:

``` pre
gfsh>start locator --name=locator1
Starting a @@product_name@@ Locator in /Users/username/apache-geode/locator1...
....
Locator in /Users/username/apache-geode/locator1 on 192.0.2.0[10334] as locator1
is currently online.
Process ID: 27144
Uptime: 5 seconds
@@product_name@@ Version: @@product_version@@
Java Version: @@min_java_version@@.0.@@min_java_update@@
Log File: /Users/username/apache-geode/locator1/locator1.log
JVM Arguments: -Dgemfire.enable-cluster-configuration=true 
-Dgemfire.load-cluster-configuration-from-dir=false 
-Dgemfire.launcher.registerSignalHandlers=true 
-Djava.awt.headless=true -Dsun.rmi.dgc.server.gcInterval=9223372036854775806
Class-Path: /Users/username/apache-geode/lib/geode-core-1.2.0.jar
:/Users/username/apache-geode/lib/geode-dependencies.jar

Successfully connected to: JMX Manager [host=192.0.2.0, port=1099]

Cluster configuration service is up and running.
```

Locators also keep track of all nodes that can become a JMX Manager.

Immediately after creating its cache, the JMX Manager node begins federating the MBeans from other members. After the JMX Manager node is ready, the JMX Manager node sends a notification to all other members informing them that it is a new JMX Manager. The other members then put complete MBean states for themselves into each of their hidden management regions.

At any point, you can determine whether a node is a JMX Manager by using the MemberMXBean isManager() method.

Using the Java API, any managed node that has been configured with `jmx-manager=true` can also be turned into a JMX Manager Node by invoking the ManagementService startManager() method.

**Note:**
If you start the JMX Manager programmatically and wish to enable command processing, you must also add the absolute path of `gfsh-dependencies.jar` (located in the `lib` directory of your installation) to the CLASSPATH of your application. Do not copy this library to your CLASSPATH, because this library refers to other dependencies in `lib` by a relative path.

## Configuring a JMX Manager {#topic_263072624B8D4CDBAD18B82E07AA44B6}
In the `gemfire.properties` file, you configure a JMX manager as follows.

| Property | Description | Default |
|---|---|---|
| `http-service-port` | If non-zero, starts an embedded HTTP service that listens on this port. The HTTP service is used to host the Geode Pulse Web application. If you are hosting the Pulse web app on your own web server, disable this embedded HTTP service by setting this property to zero. Ignored if `jmx-manager` is false. | 7070 |
| `http-service-bind-address` | If set, the member binds the embedded HTTP service to the specified address. If this property is not set but the HTTP service is enabled using `http-service-port`, the service binds to the member’s local address. | *not set* |
| `jmx-manager` | If `true`, this member can become a JMX Manager. All other `jmx-manager-*` properties are used when it becomes a JMX Manager. If this property is false, all other `jmx-manager-*` properties are ignored.<br/><br/>The default value is `true` on locators. | false (with Locator exception) |
| `jmx-manager-access-file` | By default the JMX Manager allows full access to all MBeans by any client. If this property is set to a file name, clients can be restricted to read-only access. The access level can be configured per user defined in the password file. See Oracle’s documentation for `com.sun.management.jmxremote.access.file`. Ignored if `jmx-manager` is false or `jmx-manager-port` is zero. | *not set* |
| `jmx-manager-bind-address` | By default, the JMX Manager listens on all local host addresses when configured with a port. This property specifies which IP address or host name the JMX Manager listens on. Ignored if `jmx-manager` is false or `jmx-manager-port` is zero. This address also applies to the Pulse server if hosting the Pulse web application. | *not set* |
| `jmx-manager-hostname-for-clients` | Hostname given to clients that ask the locator for the location of a JMX Manager. By default the IP address is used. For clients on a different network, configure a different hostname to return. Ignored if `jmx-manager` is false or `jmx-manager-port` is zero. | *not set* |
| `jmx-manager-password-file` | By default the JMX Manager allows clients to connect without credentials. If this property is set to a file name, only clients with credentials matching an entry in this file are allowed. Most JVMs require this file to be readable only by the owner. See Oracle’s documentation for `com.sun.management.jmxremote.password.file`. Ignored if `jmx-manager` is false or `jmx-manager-port` is zero. | *not set* |
| `jmx-manager-port` | Port on which this JMX Manager listens for client connections. If set to zero, remote client connections are not allowed. Alternatively, use standard JVM system properties for remote JMX access. Ignored if `jmx-manager` is false. The default RMI port is 1099. | 1099 |
| `jmx-manager-ssl-enabled` | If true and `jmx-manager-port` is not zero, the JMX Manager accepts only SSL connections. The `ssl-enabled` property does not apply to the JMX Manager, but other SSL properties do. This allows SSL to be configured for only the JMX Manager without affecting other connections. Ignored if `jmx-manager` is false. | false |
| `jmx-manager-start` | If true, this member starts a JMX Manager when it creates a cache. In most cases this should not be set because a JMX Manager is automatically started when needed on a member that has `jmx-manager` set to true. Ignored if `jmx-manager` is false. | false |
| `jmx-manager-update-rate` | The rate, in milliseconds, at which this member pushes updates to any JMX Managers. This value should be greater than or equal to `statistic-sample-rate`. Setting it too high causes `gfsh` and Pulse to display stale values. | 2000 |


## Stopping a JMX Manager {#topic_5B6DF783A14241399DC25C6EE8D0048A}
To stop a JMX Manager using gfsh, simply shut down the locator or server hosting the JMX Manager.

For a locator:

``` pre
gfsh>stop locator --dir=locator1
Stopping Locator running in /home/user/test2/locator1 on ubuntu.local[10334] as locator1...
Process ID: 2081
Log File: /home/user/test2/locator1/locator1.log
....
No longer connected to ubuntu.local[1099].
```

For a server:

``` pre
gfsh>stop server --dir=server1
Stopping Cache Server running in /home/user/test2/server1 ubuntu.local[40404] as server1...
Process ID: 1156
Log File: /home/user/test2/server1/server1.log
....


No longer connected to ubuntu.local[1099].
```

Notice that `gfsh` has automatically disconnected you from the stopped JMX Manager.

To stop a JMX manager using the management API, use the ManagementService stopManager() method to stop a member from being a JMX Manager.

When a Manager stops, it removes all federated MBeans from other members from its Platform MBeanServer. It also emits a notification to inform other members that it is no longer considered a JMX Manager.
