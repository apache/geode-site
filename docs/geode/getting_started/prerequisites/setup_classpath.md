---
title:  Setting Up the CLASSPATH
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

This topic describes how @@product_name@@ processes set their CLASSPATH.

To simplify CLASSPATH environment settings, @@product_name@@ has organized all application libraries required by @@product_name@@ processes into `*-dependencies.jar` files. All dependency JAR files are located in the `path_to_product/lib` directory.

When starting a server or locator process using `gfsh`,
application JAR files are automatically loaded into
the process's CLASSPATH from two directories:

- `path_to_product/lib/`
- `path_to_product/extensions/`

**Note:**
To embed @@product_name@@ in your application, add `path_to_product/lib/geode-dependencies.jar` to your CLASSPATH.

The following table lists the dependency JAR files associated with various @@product_name@@ processes:

| Process | Associated JAR Files                                                                                                                             |
|---|--------------------------------------------------------------------------------------------------------------------------------------------------|
| gfsh | `gfsh-dependencies.jar`                                                                                                                          |
| server and locator | `geode-dependencies.jar` <br></br>Note: Use this library for all standalone or embedded Geode processes (including Java clients) that host cache data. |


## Modifying the CLASSPATH in gfsh-Managed Processes

There are two options for updating the CLASSPATH of @@product_name@@ server and locator processes that are started on the gfsh command line.

**Option 1:** Specify the `--classpath` parameter upon process startup. For example, to modify the CLASSPATH of a locator:

``` pre
gfsh> start locator --name=locator1 --classpath=/path/to/applications/classes.jar
```

And to modify the CLASSPATH of a server:

``` pre
gfsh> start server --name=server1 --classpath=/path/to/applications/classes.jar
```

Application classes supplied as arguments to the `--classpath` option are *prepended* to the server or locator's CLASSPATH, beginning in second position. The first entry in the CLASSPATH is reserved for the core @@product_name@@ jar file, for security reasons.

**Option 2:** Define the CLASSPATH environment variable in your OS environment. Then, specify the `--include-system-classpath` parameter upon process startup. For example:

``` pre
gfsh> start locator --name=locator1 --include-system-classpath=true
```

The same can also be done for server processes:

``` pre
gfsh> start server --name=server1 --include-system-classpath=true
```

This option *appends* the contents of the system CLASSPATH environment variable to the locator or server's CLASSPATH upon startup. Specifying this option without a value sets it to true.

## Setting the CLASSPATH for Applications and Standalone Java Processes

If you are starting a @@product_name@@ process programmatically (standalone or embedded), we recommend that you specify the CLASSPATH upon program execution using the `java -classpath` or `java -cp` command-line option. This method is preferred to setting the CLASSPATH as an environment variable since it allows you to set the value individually for each application without affecting other applications and without other applications modifying its value.

For example, to start up a @@product_name@@ locator process using the LocatorLauncher API, you can execute the following on the command line:

``` pre
prompt# java -cp "path_to_product/lib/geode-dependencies.jar"
org.apache.geode.distributed.LocatorLauncher start locator1
<locator-launcher-options>
```

To start up a @@product_name@@ server process using the ServerLauncher API:

``` pre
prompt# java -cp "path_to_product/lib/geode-dependencies.jar:/path/to/your/applications/classes.jar"
org.apache.geode.distributed.ServerLauncher start server1
<server-launcher-options>
```

Note that in addition to the `*-dependencies.jar` file associated with the process, you must also specify any custom application JARs that you wish to access in your @@product_name@@ process. For example, if you are planning on using a customized compressor on your regions, you should specify the application JAR that contains the compressor application you wish to use.

To start up an application with an embedded cache:

``` pre
java -cp "path_to_product/lib/geode-dependencies.jar:/path/to/your/applications/classes.jar"
com.mycompany.package.ApplicationWithEmbeddedCache
```

**Note:**
Another method for updating the CLASSPATH of a server process with your own applications is to use the `gfsh deploy` command. Deploying application JAR files will automatically update the CLASSPATH of all members that are targeted for deployment. See [Deploying Application JARs to @@product_name_long@@ Members](../../configuring/deploying_application_jars#concept_4436C021FB934EC4A330D27BD026602C) for more details.

For systems running an embedded HTTP or HTTPS service,
setting a `GEODE_HOME` environment variable with a path to the 
@@product_name@@ installation directory allows a server launcher 
to find the WAR file without any changes to the CLASSPATH.
