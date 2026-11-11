---
title: change loglevel
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
## {#topic_E74ED23CB60342538B2175C326E7D758}
Changes the logging level on specified members. This command takes effect if the default @@product_name@@ logging configuration is used.

When using a custom `Log4J` configuration, this command takes effect only if the member whose logging level you want to change was started using the `--J=-Dgeode.LOG_LEVEL_UPDATE_OCCURS=ALWAYS` system property.

The `change loglevel` command applies only to the members specified, whether they are servers or locators. The change does not apply to unspecified or subsequently-added members.

**Availability:** Online. You must be connected in `gfsh` to a JMX Manager member to use this command.

**Syntax:**

``` pre
change loglevel --log-level=value [--members=value(,value)*] [--groups=value(,value)*]
```
## {#topic_E74ED23CB60342538B2175C326E7D758__table_2277A2CE8F6E4731B45FEFA2B1366DB6}
**Table 1. Change Loglevel Parameters**

| Name | Description | Default Value |
|---|---|---|
| `--members` | Name or ID of one or more member(s) whose logging level you want to change. |  |
| `--groups` | One or more group names. The logging level changes for all members of these groups. |  |
| `--log-level` | **Required.** Log level to change. Valid options: `ALL`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`, `OFF`. |  |


<span class="tablecap">Table 1. Change Loglevel Parameters</span>

**Example Commands:**

``` pre
gfsh>change loglevel --log-level=DEBUG --members=server1
```

**Sample Output:**

``` pre
gfsh>change loglevel --log-level=DEBUG --members=server1

Summary

                Member            | Changed log-level
--------------------------------- | -----------------
192.0.2.0(server1:3060)<v1>:24653 | true
```
