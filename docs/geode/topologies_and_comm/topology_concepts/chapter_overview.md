---
title:  Topology and Communication General Concepts
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

Before you configure your Apache Geode members, make sure you understand the options for topology and communication.

-   **[Topology Types](topology_types)**

    The Apache Geode topology options allow you to scale horizontally and vertically.

-   **[Planning Topology and Communication](member_communication)**

    Create a topology plan and a detailed list of machines and communication ports that your members will use. Configure your Apache Geode systems and the communication between systems.

-   **[How Member Discovery Works](how_member_discovery_works)** Apache Geode     provides various options for member discovery within a cluster and between clients and servers.

-   **[How Communication Works](how_communication_works)** Geode     uses a combination of TCP and UDP unicast and multicast for communication between members. You can change the default behavior to optimize communication for your system.

-   **[Using Bind Addresses](using_bind_addresses)**

    You use a bind address configuration to send network traffic through non-default network cards and to distribute the load of network traffic for Geode across multiple cards. If no bind address setting is found, Geode uses the host machine's default address.

-   **[Choosing Between IPv4 and IPv6](IPv4_and_IPv6)**

    By default, Apache Geode uses Internet Protocol version 4 for Geode address specifications. You can switch to Internet Protocol version 6 if all your machines support it. You may lose performance, so you need to understand the costs of making the switch.



