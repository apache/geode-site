---
title:  Recovering from Machine Crashes
sidebar_label: Recovering from Machine Crashes
sidebar_position: 6
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

When a machine crashes because of a shutdown, power loss, hardware failure, or operating system failure, all of its applications and cache servers and their local caches are lost.

System members on other machines are notified that this machine’s members have left the cluster unexpectedly.

## Recovery Procedure
To recover from a machine crash:

1.  Determine which processes run on this machine.
2.  Reboot the machine.
3.  If a @@product_name@@ locator runs here, start it first.
    **Note:**
    At least one locator must be running before you start any applications or cache servers.

4.  Start the applications and cache servers in the usual order.

If you have to move a locator process to a different machine, the locator isn’t useful until you update the locators list in the `gemfire.properties` file and restart all the applications and cache servers in the cluster. If other locators are running, however, you don’t have to restart the system immediately. For a list of the locators in use, check the locators property in one of the application `gemfire.properties` files.

## Data Recovery for Partitioned Regions
The partitioned region initializes itself correctly regardless of the order in which the data stores rejoin. The applications and cache servers recreate their data automatically as they return to active work.

If the partitioned region is configured for data redundancy, @@product_name@@ may be able to handle a machine crash automatically with no data loss, depending on how many redundant copies there are and how many members have to be restarted. See also [Recovery for Partitioned Regions](./recovering_from_server_crashes/recovering_from_p2p_crashes).

If the partitioned region does not have redundant copies, the system members recreate the data through normal operation. If the member that crashed was an application, check whether it was designed to write its data to an external data source. If so, decide whether data recovery is possible and preferable to starting with new data generated through the @@product_name@@ cluster.

## Data Recovery for Distributed Regions
The applications and cache servers recreate their data automatically. Recovery happens through replicas, disk store files, or newly generated data, as explained in [Recovery for Distributed Regions](./recovering_from_server_crashes/recovering_from_p2p_crashes).

If the recovery is from disk stores, you may not get all of the latest data. Persistence depends on the operating system to write data to the disk, so when the machine or operating system fails unexpectedly, the last changes can be lost.

For maximum data protection, you can set up duplicate replicate regions on the network, with each one configured to back up its data to disk. Assuming the proper restart sequence, this architecture significantly increases your chances of recovering every update.

## Data Recovery in a Client/Server Configuration
If the machine that crashed hosted a server, how the server recovers its data depends on whether the regions are partitioned or distributed. See [Data Recovery for Partitioned Regions](#data-recovery-for-partitioned-regions) and [Data Recovery for Distributed Regions](#data-recovery-for-distributed-regions) as appropriate.

The impact of a server crash on its clients depends on whether the installation is configured for highly available servers. For information, see [Recovering from Crashes with a Client/Server Configuration](./recovering_from_server_crashes/recovering_from_cs_crashes).

If the machine that crashed hosted a client, restart the client as quickly as possible and let it recover its data automatically from the server. For details, see [Recovering from Client Failure](./recovering_from_server_crashes/recovering_from_cs_crashes.md).
