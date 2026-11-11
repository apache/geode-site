---
title: Developing with Apache Geode
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

*Developing with @@product_name_long@@* explains main concepts of application programming with @@product_name_long@@. It describes how to plan and implement regions, data serialization, event handling, delta propagation, transactions, and more.

For information about @@product_name@@ REST application development, see [Developing REST Applications for @@product_name_long@@](../rest_apps/book_intro).

-   **[Region Data Storage and Distribution](region_options/chapter_overview)**

    The @@product_name_long@@ data storage and distribution models put your data in the right place at the right time. You should understand all the options for data storage in @@product_name@@ before you start configuring your data regions.

-   **[Partitioned Regions](partitioned_regions/chapter_overview)**

    In addition to basic region management, partitioned regions include options for high availability, data location control, and data balancing across the cluster.

-   **[Distributed and Replicated Regions](distributed_regions/chapter_overview)**

    In addition to basic region management, distributed and replicated regions include options for things like push and pull distribution models, global locking, and region entry versions to ensure consistency across @@product_name@@ members.

-   **[Consistency for Region Updates](consistency/region_entry_versions)**

    @@product_name@@ ensures that all copies of a region eventually reach a consistent state on all members and clients that host the region, including @@product_name@@ members that distribute region events.

-   **[General Region Data Management](general_region_management/general_region_data_management)**

    For all regions, you have options to control memory use, back up your data to disk, and keep stale data out of your cache.

-   **[Data Serialization](data_serialization/chapter_overview)**

    Data that you manage in @@product_name@@ must be serialized and deserialized for storage and transmittal between processes. You can choose among several options for data serialization.

-   **[Events and Event Handling](events/chapter_overview)**

    @@product_name@@ provides versatile and reliable event distribution and handling for your cached data and system member events.

-   **[Delta Propagation](delta_propagation/chapter_overview)**

    Delta propagation allows you to reduce the amount of data you send over the network by including only changes to objects rather than the entire object.

-   **[Querying](querying_basics/chapter_overview)**

    @@product_name@@ provides a SQL-like querying language called OQL that allows you to access data stored in @@product_name@@ regions.

-   **[Continuous Querying](continuous_querying/chapter_overview)**

    Continuous querying continuously returns events that match the queries you set up.

-   **[Transactions](transactions/chapter_overview)**

    @@product_name@@ provides a transactions API, with `begin`, `commit`, and `rollback` methods. These methods are much the same as the familiar relational database transactions methods.

-   **[Function Execution](function_exec/chapter_overview)**

    A function is a body of code that resides on a server and that an application can invoke from a client or from another server without the need to send the function code itself. The caller can direct a data-dependent function to operate on a particular dataset, or can direct a data-independent function to operate on a particular server, member, or member group.

