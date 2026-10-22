

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

*Managing Apache Geode * describes how to plan and implement tasks associated with managing, monitoring, and troubleshooting .

-   **[ Management and Monitoring](management/management_and_monitoring)** Apache Geode     provides APIs and tools for managing your cluster and monitoring the health of your cluster members.

-   **[Managing Heap and Off-heap Memory](heap_use/heap_management)**

    By default,  uses the JVM heap.  also offers an option to store data off heap. This section describes how to manage heap and off-heap memory to best support your application.

-   **[Disk Storage](disk_storage/chapter_overview)**

    With Apache Geode disk stores, you can persist data to disk as a backup to your in-memory copy and overflow data to disk when memory use gets too high.

-   **[Cache and Region Snapshots](cache_snapshots/chapter_overview)**

    Snapshots allow you to save region data and reload it later. A typical use case is loading data from one environment into another, such as capturing data from a production system and moving it into a smaller QA or development system.

-   **[Region Compression](region_compression)**

    This section describes region compression, its benefits and usage.

-   **[Network Partitioning](network_partitioning/chapter_overview)**

     architecture and management features help detect and resolve network partition problems.

-   **[Performance Tuning and Configuration](monitor_tune/chapter_overview)**

    A collection of tools and controls allow you to monitor and adjust Apache Geode performance.

-   **[Logging](logging/logging)**

    Comprehensive logging messages help you confirm system configuration and debug problems in configuration and code.

-   **[Statistics](statistics/chapter_overview)**

    Every application and server in a cluster can access statistical data about Apache Geode operations. You can configure the gathering of statistics by using the `alter runtime` command of `gfsh` or in the `gemfire.properties` file to facilitate system analysis and troubleshooting.

-   **[Troubleshooting and System Recovery](troubleshooting/chapter_overview)**

    This section provides strategies for handling common errors and failure situations.



