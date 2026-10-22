---
title:  Security
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

The security framework permits authentication of connecting components and authorization of operations for all communicating components of the cluster.

-   **[Security Model](security_model)**

    This section describes the security model for Apache Geode. It is intended to help users understand how Geode controls access to information and resources so that they can make informed decisions.

-   **[Security Implementation Introduction and Overview](implementing_security)**

    Encryption, SSL secure communication, authentication, and authorization help to secure the cluster.

-   **[Security Detail Considerations](security_detail_considerations/security_audit_overview)**

    This section gathers discrete details in one convenient location to better help you assess and configure the security of your environment.

-   **[Enable Security with Property Definitions](enable_security)**

-   **[Authentication](authentication/authentication_overview)**

    A cluster using authentication bars malicious peers or clients, and deters inadvertent access to its cache.

-   **[Authorization](authorization/authorization_overview)**

    Client operations on a cache server can be restricted or completely blocked based on the roles and permissions assigned to the credentials submitted by the client.

-   **[Post Processing of Region Data](post_processing)**

-   **[SSL](ssl/ssl_overview)**

    SSL protects your data in transit between applications.

-   **[Serialization](serialization)**

    This section describes the serialization mechanisms available in Apache Geode, including global serialization filters and PDX serialization.
