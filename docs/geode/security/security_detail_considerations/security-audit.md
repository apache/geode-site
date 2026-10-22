---
title: External Interfaces, Ports, and Services

sidebar_label: External Interfaces, Ports, and Services
sidebar_position: 1
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
## Geode {#topic_686158E9AFBD47518BE1B4BEB232C190}
Geode processes use either UDP or TCP/IP ports to communicate with other processes or clients.

For example:

-   Members can use multicast to communicate with peer members. You specify multicast addresses and multicast ports in your `gemfire.properties` file or as parameters on the command-line when starting the members using `gfsh`.
-   Clients connect to a locator to discover cache servers.
-   JMX clients (such as `gfsh` and JConsole) can connect to JMX Managers and other manageable members on the pre-defined RMI port 1099. You can configure a different port if necessary.
-   Each gateway receiver usually has a port range where it listens for incoming communication.

See [Firewalls and Ports](../configuring/running/firewalls_ports#concept_5ED182BDBFFA4FAB89E3B81366EBC58E) for the complete list of ports used by Geode Geode, their default values, and how to configure them if you do not want to use the default value. Geode 

Geode does not have any external interfaces or services that need to be enabled or opened.




