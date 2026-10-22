---
title:  Planning an Upgrade
sidebar_label: Planning an Upgrade
sidebar_position: 1
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

Before you upgrade your system, back it up.  Make backup copies of all existing disk-stores,
server-side code, configuration files, and data across the entire cluster.  To get a backup of the
data that includes the most recent changes may require that traffic across the cluster is stopped
before the backup is made.
The discussion at [Creating Backups for System Recovery and Operational Management](../../managing/disk_storage/backup_restore_disk_store#backup_restore_disk_store)
explains the process, and the
[backup disk-store](../../tools_modules/gfsh/command-pages/backup) command reference page describes
how to use the `gfsh backup disk-store` command to make a backup.

## Guidelines for Upgrading {#guidelines-upgrading}
-   Schedule your upgrade during a period of low user activity for your system and network.
-   Verify that the machines hosting the cluster members meet the [Host Machine Requirements](../system_requirements/host_machine) of the upgraded cluster.
-   **Important:** After all locators have been upgraded, *do not start or restart any processes* that use the older version of the software. The older process will either not be allowed to join the cluster or, if allowed to join, can potentially cause a deadlock.
-   Verify that all members that you wish to upgrade are members of the same cluster.
A list of cluster members will be output with the `gfsh` command:

    ``` pre
    gfsh>list members
    ```

-   Locate a copy of your system's startup script, if your site has one (most do). The startup script can be a handy reference for restarting upgraded locators and servers with the same `gfsh` command lines that were used in your current installation.

- Identify how your current cluster configuration was specified. The way in which your cluster
  configuration was created determines which commands you use to save and restore that cluster
  configuration during the upgrade procedure.  There are two possibilites:

  - With `gfsh` commands, relying on the underlying **cluster configuration service** to record the configuration: see [Exporting and Importing Cluster Configurations](../../configuring/export-import).
  - With **XML properties** specified through the Java API or configuration files: see [Deploying Configuration Files without the Cluster Configuration Service](../../configuring/running/deploying_config_files).

-   Do not modify region attributes or data, either via `gfsh` or `cache.xml` configuration, during the upgrade process.

-   If possible, follow the [Rolling Upgrade](upgrade_rolling) procedure.  A multi-site
installation can also do rolling upgrades within each site.  If a rolling upgrade is not possible,
follow the [Off-Line Upgrade](upgrade_offline) procedure.
A rolling upgrade is not possible for a cluster that has partitioned regions without redundancy.
Without the redundancy, region entries will be lost when individual servers are taken out of the
cluster during a rolling upgrade.

## Version Compatibilities {#version_compatibilities}
Your choice of upgrade procedure depends, in part, on the versions of @@product_name_long@@ involved.

- **Version Compatibility Between Peers and Cache Servers**

    For best reliability and performance, all server components of a @@product_name@@ system should run the same version of the software.
    For the purposes of a rolling upgrade, you can have peers or cache servers running different minor
    versions of @@product_name_long@@ at the same time, as long as the major version is the same. For example,
    some components can continue to run under version @@product_version_old_minor@@ while you are in the process of upgrading to
    version @@product_version@@.

- **Version Compatibility Between Clients and Servers**

    Client/server access is backward compatible. An @@product_name_long@@ cluster can be accessed by clients using any previous version. However, clients
    cannot connect to servers running older versions of @@product_name_long@@. For example, a client running @@product_name_long@@ @@product_version_old_minor@@ can access a cluster
    running @@product_name_long@@ @@product_version@@, but a client running @@product_name_long@@ @@product_version@@ could not connect to a cluster running @@product_name_long@@ @@product_version_old_minor@@.

- **Version Compatibility Between Sites in Multi-Site (WAN) Deployments**

    In multi-site (WAN) deployments, sites should still be able to communicate with one another, even if they use different versions.
