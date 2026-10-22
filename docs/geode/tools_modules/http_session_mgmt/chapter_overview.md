---
title:  HTTP Session Management Modules
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

The Apache Geode HTTP Session Management modules provide fast, scalable, and reliable session replication for HTTP servers without requiring application changes. Apache Geode offers HTTP session management modules for Tomcat and AppServers.

**Note:** As of version 2.x, Geode only supports Tomcat 10.1 and later versions (Jakarta EE namespace). Support for Tomcat 7, 8, 9, and Pivotal tc Server has been discontinued.

These modules are included with the Apache Geode product distribution, and installation .zip files can be found in the `tools/Modules` directory of your product installation.

-   **[HTTP Session Management Quick Start](../http_session_mgmt/quick_start)**

    In this section you download, install, and set up the HTTP Session Management modules.

-   **[Advantages of Using Geode for Session Management](../http_session_mgmt/http_why_use_gemfire)**

    The HTTP Session Management Module enables you to customize how you manage your session data.

-   **[Common Topologies for HTTP Session Management](../http_session_mgmt/common_gemfire_topologies)**

    Decide which topology is best for your usage. The module configuration process is slightly different for each topology.

-   **[General Information on HTTP Session Management](../http_session_mgmt/tc_additional_info)**

    This section provides information on sticky load balancers, session expiration, additional Geode property changes, serialization and more.

-   **[Session State Log Files](../http_session_mgmt/session_state_log_files)**

    Several log files are written by the various parts of the session management code.

-   **[Configuring Non-Sticky Sessions](../http_session_mgmt/configuring_non_sticky_sessions)**

    This section describes the configuration of non-sticky sessions.

-   **[Securing HTTP Session Deserialization](../http_session_mgmt/session_security_filter)**

    Configure ObjectInputFilter (JEP 290) to protect against deserialization vulnerabilities and secure your session data.

-   **[HTTP Session Management Module for Tomcat](../http_session_mgmt/session_mgmt_tomcat)**

    You set up and use the module by modifying Tomcat's `server.xml` and `context.xml` files. Supports Tomcat 10.1 and later (Jakarta EE).

-   **[HTTP Session Management Module for AppServers](../http_session_mgmt/session_mgmt_weblogic)**

    You implement session caching with the HTTP Session Management Module for AppServers with a special filter, defined in the `web.xml`, which is configured to intercept and wrap all requests.



