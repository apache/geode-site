---
title:  Management and Monitoring Features
sidebar_label: Management and Monitoring Features
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

@@product_name_long@@ uses a federated Open MBean strategy to manage and monitor all members of the cluster. This strategy gives you a consolidated, single-agent view of the cluster.
## {#concept_F7B9EE348DA744D3BBDFD68E7F48A604__section_37CECE9B26644505A79784EA0CD1FDAE}
Application and manager development is much easier because you do not have to find the right MBeanServer to make a request on an MBean. Instead, you interact with a single MBeanServer that aggregates MBeans from all other local and remote MBeanServers.

Some other key advantages and features of @@product_name@@ administration architecture:

-   @@product_name@@ monitoring is tightly integrated into @@product_name@@'s processes instead of running in a separately installed and configured monitoring agent. You can use the same framework to actually manage @@product_name@@ and perform administrative operations, not just monitor it.
-   All @@product_name@@ MBeans are *MXBeans*. They represent useful and relevant information on the state of the cluster and all its members. Because MXBeans use the Open MBean model with a predefined set of types, clients and remote management programs do not require access to model-specific classes representing your MBean types. Using MXBeans adds flexibility to your selection of clients and makes the @@product_name@@ management and monitoring much easier to use.
-   Each member in the cluster is manageable through MXBeans, and each member hosts its own MXBeans in a Platform MBeanServer.
-   Any @@product_name@@ member can be configured to provide a federated view of all the MXBeans for all members in a @@product_name@@ cluster.
-   @@product_name@@ has also modified its use of JMX to be industry-standard and friendly to generic JMX clients. You can now easily monitor or manage the cluster by using any third-party tool that is compliant with JMX. For example, JConsole.

## References {#concept_F7B9EE348DA744D3BBDFD68E7F48A604__section_A3166A9657044E088DA0FE2C2B8325BE}
For more information on MXBeans and Open MBeans, see:

-   [http://docs.oracle.com/javase/8/docs/api/javax/management/MXBean.html](http://docs.oracle.com/javase/8/docs/api/javax/management/MXBean.html)
-   [http://docs.oracle.com/javase/8/docs/api/javax/management/openmbean/package-summary.html](http://docs.oracle.com/javase/8/docs/api/javax/management/openmbean/package-summary.html)
