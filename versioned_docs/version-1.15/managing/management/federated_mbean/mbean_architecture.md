---
title:  Federated MBean Architecture
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

@@product_name@@ uses MBeans to manage and monitor different parts of @@product_name@@. @@product_name@@'s federated MBean architecture is scalable and allows you to have a single-agent view of a @@product_name@@ cluster.

## Federation of @@product_name@@ MBeans and MBeanServers {#concept_40A475F186E249C597681069C835CF65__section_19948055E4184110910B11CD979A923A}
Federation of the MBeanServers means that one member, the JMX Manager Node, can provide a proxied view of all the MBeans that the MBeanServer hosts. Federation also means that operations and notifications are spread across the cluster.

@@product_name@@ federation takes care of the following functionality:

-   MBean proxy creation
-   MBean state propagation
-   Notifications propagation
-   Operation invocation

## MBean Proxy Naming Conventions {#concept_40A475F186E249C597681069C835CF65__section_AD13594ADA814194897488CF96BCC479}
Each @@product_name@@ MBean follows a particular naming convention for easier grouping. For example:

``` pre
GemFire:type=Member,service=LockService,name=<dlsName>,memberName=<memberName>
```

At the JMX Manager node, this MBean will be registered with GemFire/&lt;memberId&gt; as domain.

The following are some sample MBean names:

MemberMBean:

``` pre
GemFire:type=Member,member=<Node1>
```

## Use of MXBeans {#concept_40A475F186E249C597681069C835CF65__section_8F9D375A185E476FB50E7D6E30BE2FC7}
In its Management API, @@product_name@@ provides MXBeans to ensure that any MBeans that are created are usable by any client, including remote clients, without requiring the client to access specific classes in order to access contents of the MBean.

## MBean Proxy Creation {#concept_40A475F186E249C597681069C835CF65__section_DCC1B2AB80B04E8CBED041C1F3BDAB5F}
@@product_name@@ proxies are inherently local MBeans. Every @@product_name@@ JMX manager member hosts proxies pointing to the local MBeans of every managed node. Proxy MBeans will also emit any notification emitted by local MBeans in managed nodes when an event occurs in that managed node.

**Note:**
Aggregate MBeans on the JMX Manager node are not proxied.
