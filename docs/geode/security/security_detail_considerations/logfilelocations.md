---
title: Log File Locations
sidebar_label: Log File Locations
sidebar_position: 3
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
## By default, the log files are located in the working directory used when you started the corresponding processes. {#topic_5B6DF783A14241399DC25C6EE8D0048A}
For Geode members (locators and cache servers), you can also specify a custom working directory location when you start each process. See [Logging](../managing/logging/logging#concept_30DB86B12B454E168B80BB5A71268865) for more details.

The log files are as follows:

-   `locator-name.log`: Contains logging information for the locator process.
-   `server-name.log`: Contains logging information for a cache server process.
-   `gfsh-%u_%g.log`: Contains logging information of an individual `gfsh` environment and session.

    **Note:** By default, `gfsh` session logging is disabled. To enable `gfsh` logging, you must set the Java system property `-Dgfsh.                                 log-level=desired_log_level`. See [Configuring the gfsh Environment](../tools_modules/gfsh/configuring_gfsh#concept_3B9C6CE2F64841E98C33D9F6441DF487) for more information.

These log files should be readable and writable *only* by the dedicated user who runs the servers.

