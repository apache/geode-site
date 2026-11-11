---
title:  Deploying and Configuring a Gemcached Server
sidebar_label: Deploying and Configuring a Gemcached Server
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

You can configure and deploy Gemcached servers in a Java class or by using the gfsh command-line interface.

The following sections describe how to configure and deploy an embedded Gemcached server. You can configure and start a GemCached server either by invoking a Java class that calls the cache server's `start()` method, or by starting the cache server using the gfsh command line.

## Embedding a Gemcached server in a @@product_name@@ Java Application {#topic_7B158074B27A4FEF9D38E7C369905C72__section_17E7E4058D914334B9C5AC2E3DC1F7F2}
The `org.apache.geode.memcached` package contains a single class, `GemFireMemcachedServer` (see the @@product_name@@ Javadocs.) Use this class to configure and embed a Gemcached server in a @@product_name@@ cache server. For example, the following statement creates and starts an embedded Gemcached server on port number 5555 using the binary protocol:

``` pre
GemFireMemcachedServer server = 
  new GemFireMemcachedServer(5555, Protocol.BINARY);server.start(); 
          
```

**Note:**
By default, Gemcached servers use the ASCII protocol.

When you start a Gemcached server, by default, it creates a `RegionShortcut.PARTITION` region named `gemcached` where data used by memcached clients is stored. You can alter these defaults by configuring the region using the `cache.xml` or `gemfire.properties` files. See [Distributed System and Cache Configuration](../../basic_config/config_concepts/chapter_overview).

## Starting a Gemcached Server Using a gfsh Command {#topic_7B158074B27A4FEF9D38E7C369905C72__section_58A3FFED5BBB4F92A79FBD50421DC3F3}
You can also start a Gemcached server with the gfsh command-line interface. Use the following syntax:

``` pre
gfsh>start server 
  --name=<server_name> 
  --server-port=<port_number> 
  --memcached-port=<port_number>
  --memcached-protocol=BINARY|ASCII
```

**Note:**
You can also set the memcached port number and protocol in the `gemfire.properties` file.

If the `memcached-port` property is not specified, the embedded Gemcached server is not started.

## Configuring a Gemcached Server with the gemfire.properties File {#topic_7B158074B27A4FEF9D38E7C369905C72__section_E5587FE56A21424FBAEE8CF61DF34219}
You can set the following properties in the `gemfire.properties` file that are used when starting Gemcached servers:
## {#topic_7B158074B27A4FEF9D38E7C369905C72__table_3F586259E06E42C4BD82AD661B3AFEA4}
| Property | Description |
|---|---|
| `memcached-port` | The port number where the Gemcached server listens for connections from memcached clients.<br/><br/>If the port number is set to `0` or the `memcached-port` parameter is omitted, the Gemcached server does not start. |
| `memcached-protocol` | Memcached supports both ASCII and binary communication protocols (see the Memcached protocol documentation). By default, Gemcached uses the ASCII protocol.<br/><br/>Set one of the following values:<br/>• `ASCII` (default)<br/>• `BINARY` |


<span class="tablecap">Table 1. Gemcached Properties</span>
