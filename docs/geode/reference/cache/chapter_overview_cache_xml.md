---
title:  cache.xml
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
# {#cache_xml}
Use the `cache.xml` file to set up general cache facilities and behavior and to create and initialize cached data regions. These sections document `cache.xml` requirements; provide hierarchical diagrams of cache.xml elements; and show the specific syntax needed to accomplish typical cache configuration tasks.

**Note:**
You can configure most elements of the `cache.xml` file and apply it to your entire cluster by using the [gfsh](../../tools_modules/gfsh/chapter_overview) and [cluster configuration service](../../configuring/gfsh_persist#using-cluster-config-svc). See [Cluster Configuration Service Overview](../../configuring/gfsh_persist) for more information.

-   **[`cache.xml` Quick Reference](elements_ref)**

    This section documents cache.xml file requirements and variables. It also points you to specific element sections for server, client, and WAN configuration.

-   **[`<cache>` Element Hierarchy](cache-elements-list)**

    This section shows the hierarchy of `<cache>` element sub-elements that you use to configure @@product_name@@ caches and servers.

-   **[`<cache>` Element Reference](cache_xml)**

    This section documents the `cache.xml` sub-elements used for @@product_name@@ server configuration. All elements are sub-elements of the `<cache>` element.

-   **[`<client-cache>` Element Hierarchy](client-cache-elements-list)**

    This section shows the hierarchy of `<client-cache>` element sub-elements that you use to configure @@product_name@@ caches and clients.

-   **[`<client-cache>` Element Reference](client-cache)**

    This section documents all `cache.xml` elements that you use to configure @@product_name@@ clients. All elements are sub-elements of the `<client-cache>` element.
