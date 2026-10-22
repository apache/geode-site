

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

@@product_name_long@@ provides APIs and tools for managing your cluster and monitoring the health of your members.

-   **[Management and Monitoring Features](management_and_monitoring_features)**

    @@product_name_long@@ uses a federated Open MBean strategy to manage and monitor all members of the cluster. This strategy gives you a consolidated, single-agent view of the cluster.

-   **[Overview of @@product_name@@ Management and Monitoring Tools](mm_overview)**

    @@product_name@@ provides a variety of management tools you can use to manage a @@product_name@@ cluster.

-   **[Architecture and Components](management_system_overview)**

    @@product_name@@'s management and monitoring system consists of one JMX Manager node (there should only be one) and one or more managed nodes within a cluster. All members in the cluster are manageable through MBeans and @@product_name@@ Management Service APIs.

-   **[JMX Manager Operations](jmx_manager_node#topic_36C918B4202D45F3AC225FFD23B11D7C)**

    Any member can host an embedded JMX Manager, which provides a federated view of all MBeans for the cluster. The member can be configured to be a manager at startup or anytime during its life by invoking the appropriate API calls on the ManagementService.

-   **[Federated MBean Architecture](mbean_architecture)**

    @@product_name@@ uses MBeans to manage and monitor different parts of @@product_name@@. @@product_name@@'s federated MBean architecture is scalable and allows you to have a single-agent view of a @@product_name@@ cluster.

-   **[Configuring RMI Registry Ports and RMI Connectors](configuring_rmi_connector)**

    @@product_name@@ programmatically emulates out-of-the-box JMX provided by Java and creates a JMXServiceURL with RMI Registry and RMI Connector ports on all manageable members.

-   **[Executing gfsh Commands through the Management API](gfsh_and_management_api)**

    You can also use management APIs to execute gfsh commands programmatically.
