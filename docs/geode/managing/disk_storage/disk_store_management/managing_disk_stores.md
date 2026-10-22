---
title:  Disk Store Management
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

The `gfsh` command-line tool has a number of options for examining and managing your disk stores. The `gfsh` tool, the `cache.xml` file and the DiskStore APIs are your management tools for online and offline disk stores.

See [Disk Store Commands](../../tools_modules/gfsh/quick_ref_commands_by_area#topic_1ACC91B493EE446E89EC7DBFBBAE00EA) for a list of available commands.

-   **[Disk Store Management Commands and Operations](managing_disk_stores_cmds)**

-   **[Validating a Disk Store](validating_disk_store)**

-   **[Running Compaction on Disk Store Log Files](compacting_disk_stores)**

-   **[Keeping a Disk Store Synchronized with the Cache](keeping_offline_disk_store_in_sync)**

-   **[Configuring Disk Free Space Monitoring](disk_free_space_monitoring)**

-   **[Handling Missing Disk Stores](handling_missing_disk_stores)**

-   **[Altering When Buffers Are Flushed to Disk](managing_disk_buffer_flushes)**

    You can configure @@product_name@@ to write immediately to disk and you may be able to modify your operating system behavior to perform buffer flushes more frequently.
