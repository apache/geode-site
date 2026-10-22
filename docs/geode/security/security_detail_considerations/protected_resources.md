---
title: Resources That Must Be Protected
sidebar_label: Resources That Must Be Protected
sidebar_position: 2
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

## These configuration files should be readable and writeable *only* by the dedicated user who runs servers: {#topic_263072624B8D4CDBAD18B82E07AA44B6}
-   `gemfire.properties`
-   `cache.xml`
-   `gfsecurity.properties`
    A default `gfsecurity.properties` is not provided in the `defaultConfigs` directory. If you choose to use this properties file, you must create it manually. A clear text user name and associated clear text password may be in this file for authentication purposes. The file system's access rights are relied upon to protect this sensitive information.

The default location of the `gemfire.properties` and `cache.xml` configuration files is the `defaultConfigs` child directory of the main installation directory.
