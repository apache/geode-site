---
title:  gfsh Command Help
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

This section provides help and usage information on all `gfsh` commands, listed alphabetically.

-   **[alter](alter)**

    Modify an existing @@product_name@@ resource.

-   **[backup disk-store](backup)**

    Back up persistent data from all members to the specified directory.

-   **[change loglevel](change)**

    Changes the logging level on specified members.

-   **[clear defined indexes](clear)**

    Clears all the defined indexes.

-   **[close](close)**

    Close durable client CQs and durable clients.

-   **[compact](compact)**

    Compact online and offline disk-stores.

-   **[configure](configure)**

    Configure Portable Data eXchange for all the cache(s) in the cluster.

-   **[connect](connect)**

    Connect to a jmx-manager either directly or via a locator.

-   **[create](create)**

    Create async-event-queues, disk-stores, gateway receivers, gateway senders, indexes, and regions.

-   **[debug](debug)**

    Enable or disable debugging output in `gfsh`.

-   **[define index](define)**

    Define an index that can be used when executing queries. Then, you can execute a single command to create multiple indexes all at once using `create defined          indexes`.

-   **[deploy](deploy)**

    Deploy JAR-packaged applications to a member or members.

-   **[describe](describe)**

    Display details of a member's configuration, shell connection, disk-stores, members, or regions.

-   **[destroy](destroy)**

    Delete or unregister functions, remove indexes, gateway senders, gateway receivers, disk stores and regions.

-   **[disconnect](disconnect)**

    Close any active connection(s).

-   **[echo](echo)**

    Echo the given text, which may include system and user variables.

-   **[execute function](execute)**

    Execute functions on members or regions.

-   **[exit](exit)**

    Exit the `gfsh` shell. You can also use `quit` to exit the shell.

-   **[export](export)**

    Export configurations, data, logs and stack-traces.

-   **[gc](gc)**

    Force GC (Garbage Collection) on a member or members.

-   **[get](get)**

    Display an entry in a region.

-   **[help](help)**

    Display syntax and usage information for all the available commands.

-   **[hint](hint)**

    Display information on topics and a list of commands associated with a topic.

-   **[history](history)**

    Show or save the command history.

-   **[import](import)**

    You can import data into a region or import an existing cluster configuration into the cluster.

-   **[list](list)**

    List existing @@product_name@@ resources such as deployed applications, disk-stores, functions, members, servers, and regions.

-   **[load-balance gateway-sender](load-balance)**

    Causes the specified gateway sender to close its current connections and reconnect to remote gateway receivers in a more balanced fashion.

-   **[locate entry](locate)**

    Locate a region entry on a member.

-   **[netstat](netstat)**

    Report network information and statistics via the "netstat" operating system command.

-   **[pause gateway-sender](pause)**

    Pause a gateway sender.

-   **[pdx rename](pdx)**

    Renames PDX types in an offline disk store.

-   **[put](put)**

    Add or update a region entry.

-   **[query](query)**

    Run queries against @@product_name@@ regions.

-   **[rebalance](rebalance)**

    Rebalance partitioned regions.

-   **[remove](remove)**

    Remove an entry from a region.

-   **[restore redundancy](restore)**

    Restore redundancy to partitioned regions and optionally reassign which members host the primary copies.

-   **[resume gateway-sender](resume)**

    Resume any gateway senders that you have paused.

-   **[revoke missing-disk-store](revoke)**

    Instruct the member(s) of a cluster to stop waiting for a disk store to be available.

-   **[run](run)**

    Execute a set of GFSH commands.

-   **[set variable](set)**

    Set variables in the GFSH environment.

-   **[sh](sh)**

    Execute operating system commands.

-   **[show](show)**

    Display deadlocks, logs, metrics and missing disk-stores.

-   **[shutdown](shutdown)**

    Stop all members.

-   **[sleep](sleep)**

    Delay `gfsh` command execution.

-   **[start](start)**

    Start servers, locators, gateway senders and gateway receivers, and monitoring tools.

-   **[status](status)**

    Check the status of the cluster configuration service, partitioned region redundancy and @@product_name@@ member processes, including locators, gateway receivers, gateway senders, and servers.

-   **[stop](stop)**

    Stop gateway receivers, gateway senders, locators and servers.

-   **[undeploy](undeploy)**

    Undeploy the JAR files that were deployed on members or groups using `deploy` command.

-   **[validate offline-disk-store](validate)**

    Validate offline disk stores.

-   **[version](version)**

    Display product version information.

-   **[wan-copy region](wan_copy_region)**

    Copy the data of a region from a WAN site to the same region on another WAN site by using a gateway sender.
