---
title: create
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

Create async-event-queues, disk-stores, gateway receivers, gateway senders, indexes, and regions.

-   **[create async-event-queue](#topic_ryz_pb1_dk)**

    Creates an asynchronous event queue for batching events before they are delivered by a gateway sender.

-   **[create defined indexes](#topic_w2t_l3m_qq)**

    Creates all the defined indexes.

-   **[create disk-store](#topic_bkn_zty_ck)**

    Defines a pool of one or more disk stores, which can be used by regions and client subscription queues, and gateway sender queues for WAN distribution.

-   **[create gateway-receiver](#topic_a4x_pb1_dk)**

    Creates a gateway receiver. You can only have one gateway receiver on each member, and unlike a gateway sender, you do not need to specify an identifier for the gateway receiver .

-   **[create gateway-sender](#topic_hg2_bjz_ck)**

    Creates a gateway sender on one or more members of a cluster.

-   **[create index](#topic_960A5B6FD3D84E1881EE118E299DD12D)**

    Create an index that can be used when executing queries.

-   **[create jndi-binding](#create_jndi-binding)**

    Create a JNDI binding that specifies resource attributes which describe a JDBC connection.

-   **[create lucene index](#create_lucene_index)**

    Create a region with given path and configuration.

-   **[create region](#topic_54B0985FEC5241CA9D26B0CE0A5EA863)**

    Create a region with given path and configuration.


**Note:** The order in which components are created matters. For example, the recommendation for WAN setup is:

- Create/start WAN senders first
- Create Regions
- Create/start WAN receivers last

This assures that when WAN receivers are started, their associated regions are in place. Otherwise,
the `create region` command may fail if events are received before the region exists.
For more on this topic, see [Configuring a Multi-site (WAN) System](../../../topologies_and_comm/multi_site_configuration/setting_up_a_multisite_system).

## create async-event-queue {#topic_ryz_pb1_dk}
Creates an asynchronous event queue for batching events before they are delivered by a gateway sender.

See [Configuring Multi-Site (WAN) Event Queues](../../../developing/events/configure_multisite_event_messaging#configure_multisite_event_messaging).

**Availability:** Online. You must be connected in `gfsh` to a JMX Manager member to use this command.

**Syntax:**

``` pre
create async-event-queue --id=value --listener=value [--groups=value(,value)*]
    [--parallel(=value)?] [--enable-batch-conflation(=value)?] [--batch-size=value]
    [--batch-time-interval=value] [--persistent(=value)?] [--disk-store=value]
    [--disk-synchronous(=value)?] [--max-queue-memory=value]
    [--dispatcher-threads=value] [--order-policy=value]
    [--gateway-event-filter=value(,value)*]
    [--gateway-event-substitution-filter=value]
    [--listener-param=value(,value)*] [--forward-expiration-destroy(=value)?]
    [--pause-event-processing(=value)?]
```

**Parameters, create async-event-queue:**
<table>
<colgroup>
<col width="33%" />
<col width="34%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;id</span></td>
<td><em>Required</em>. ID of the asynchronous event queue</td>
<td> </td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;groups</span></td>
<td>The queue is created on all members of the group(s). If you do not specify a group, the queue is created on all members.</td>
<td> </td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;parallel</span></td>
<td>Specifies whether the queue is parallel.</td>
<td>false</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;enable-batch-conflation</span></td>
<td>Enables batch conflation.</td>
<td>false</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;batch-size</span></td>
<td>Maximum number of messages that a batch can contain.</td>
<td>100</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;batch-time-interval</span></td>
<td>Maximum amount of time, in ms, that can elapse before a batch is delivered, when no events are found in the queue to reach the batch-size.</td>
<td>5</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;persistent</span></td>
<td>Boolean value that determines whether @@product_name@@ persists this queue.</td>
<td>false
<p>If specified with out a value, default is true.</p></td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;disk-store</span></td>
<td>Named disk store to use for storing queue overflow, or for persisting the queue. If you specify a value, the named disk store must exist. If you specify a null value, @@product_name@@ uses the default disk store for overflow and queue persistence.</td>
<td> </td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;disk-synchronous</span></td>
<td>Specifies whether disk writes are synchronous.</td>
<td>true</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;max-queue-memory</span></td>
<td>Maximum amount of memory in megabytes that the queue can consume before overflowing to disk.</td>
<td>100</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;dispatcher-threads</span></td>
<td>Number of threads used for sending events.</td>
<td>5</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;order-policy</span></td>
<td>Policy for dispatching events when <code>&#8209;&#8209;dispatcher-threads</code> is &gt; 1. Possible values are <code class="ph codeph">THREAD</code>, <code class="ph codeph">KEY</code>, <code class="ph codeph">PARTITION</code>.</td>
<td>KEY</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;gateway-event-filter</span></td>
<td>List of fully qualified class names of GatewayEventFilters for this queue. These classes filter events before dispatching to remote servers.</td>
<td> </td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;gateway-event-substitution-filter</span></td>
<td>Fully-qualified class name of the <code class="ph codeph">GatewayEventSubstitutionFilter</code> for this queue.</td>
<td> </td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;listener</span></td>
<td><em>Required.</em> Fully-qualified class name of Async Event Listener for this queue</td>
<td> </td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;listener-param</span></td>
<td>Parameter name and value to be passed to the Async Event Listener class. Optionally, you can specify a value by following the parameter name with the <code>#</code> character and the value. For example:
<pre class="pre codeblock"><code>--listener-param=myParam#24</code></pre></td>
<td> </td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;forward-expiration-destroy</span></td>
<td>Enables forwarding of expiration destroy operations to AsyncEventListener instances. If specified without a value, this parameter is set to “false”.</td>
<td>false</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;pause-event-processing</span></td>
<td>Specifies whether event dispatching from the queue to the listener(s) will be paused when the AsyncEventQueue is started. If specified without a value, this parameter is set to "true".</td>
<td>false</td>
</tr>
</tbody>
</table>

**Example Commands:**

``` pre
create async-event-queue --id=myAEQ --listener=myApp.myListener
```

## create defined indexes {#topic_w2t_l3m_qq}
Creates all the defined indexes.

See also [define index](define) and [clear defined indexes](clear).

**Availability:** Online. You must be connected in <span class="keyword parmname">gfsh</span> to a JMX Manager member to use this command.

**Syntax:**

``` pre
create defined indexes [--members=value(,value)*] [--groups=value(,value)*]
```

**Parameters, create defined indexes:**

| Name                                           | Description                                                        | Default |
|------------------------------------------------|--------------------------------------------------------------------|---------|
| <span class="keyword parmname">&#8209;&#8209;members</span> | Name/Id of the member(s) on which index will be created.              |         |
| <span class="keyword parmname">&#8209;&#8209;groups</span>  | The index will be created on all the members in the member group(s). |         |


**Example Commands:**

``` pre
create defined indexes
```

**Sample Output:**

``` pre
gfsh>create defined indexes
Indexes successfully created. Use list indexes to get details.
1. ubuntu(server1:17682)<v1>:27574
```

If index creation fails, you may receive an error message in gfsh similar to the following:

``` pre
gfsh>create defined indexes
Exception : org.apache.geode.cache.query.RegionNotFoundException , 
Message : Region ' /r3' not found: from  /r3Occurred on following members
1. india(s1:17866)<v1>:27809
```

## create disk-store {#topic_bkn_zty_ck}
Defines a pool of one or more disk stores, which can be used by regions and client subscription queues, and gateway sender queues for WAN distribution.

See [Disk Storage](../../../managing/disk_storage/chapter_overview)

**Availability:** Online. You must be connected in <span class="keyword parmname">gfsh</span> to a JMX Manager member to use this command.

**Syntax:**

``` pre
create disk-store --name=value --dir=value(,value)* [--allow-force-compaction(=value)?] 
[--auto-compact(=value)?] [--compaction-threshold=value] [--max-oplog-size=value]
[--queue-size=value] [--time-interval=value] [--write-buffer-size=value]
[--groups=value(,value)*]
[--disk-usage-warning-percentage=value] [--disk-usage-critical-percentage=value]
```


**Parameters, create disk-store:**

<table>
<colgroup>
<col width="25%" />
<col width="50%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Default Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;name</span></td>
<td><em>Required.</em> The name of this disk store.</td>
<td> </td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;dir</span></td>
<td><em>Required.</em> One or more directory names where the disk store files are written. Optionally, directory names may be followed by <code class="ph codeph">#</code> and the maximum number of megabytes that the disk store can use in the directory. For example:
<pre class="pre codeblock"><code>--dir=/data/ds1 
--dir=/data/ds2#5000</code></pre>
If the specified directory does not exist, the command will create the directory for you.</td>
<td>If the maximum directory size in megabytes is not specified, it will be set to `2147483647` (the value of `Integer.MAX_VALUE`)</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;allow-force-compaction</span></td>
<td>Set to true to allow disk compaction to be forced on this disk store.</td>
<td>false</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;auto-compact</span></td>
<td>Set to true to automatically compact the disk files.</td>
<td>true</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;compaction-threshold</span></td>
<td>Percentage of non-garbage remaining, below which the disk store is eligible for compaction.</td>
<td>50</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;max-oplog-size</span></td>
<td>Maximum size, in megabytes, for an oplog file. When the oplog file reaches this size, the file is rolled over to a new file.</td>
<td>1024</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;queue-size</span></td>
<td>Maximum number of operations that can be asynchronously queued to be written to disk.</td>
<td>0</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;time-interval</span></td>
<td>The number of milliseconds that can elapse before unwritten data is written to disk.</td>
<td>1000</td>
</tr>
<tr>
<td><span class="keyword parmname"> --groups</span></td>
<td>The disk store is created on all members of the group(s). If no group is specified, the disk store is created on all members.</td>
<td>Â </td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;write-buffer-size</span></td>
<td>The size in bytes of the write buffer that this disk store uses when writing data to disk. Larger values may increase performance but use more memory. The disk store allocates one direct memory buffer of this size.</td>
<td>32768</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;disk-usage-warning-percentage</span></td>
<td>Disk usage above this threshold generates a warning message. For example, if the threshold is set to 90%, then on a 1 TB drive falling under 100 GB of free disk space generates the warning.
<p>Set to &quot;0&quot; (zero) to disable.</p></td>
<td>90</td>
</tr>
<tr>
<td><span class="keyword parmname">&#8209;&#8209;disk-usage-critical-percentage</span></td>
<td>Disk usage above this threshold generates an error message and shuts down the member's cache. For example, if the threshold is set to 99%, then falling under 10 GB of free disk space on a 1 TB drive generates the error and shuts down the cache.
<p>Set to &quot;0&quot; (zero) to disable.</p></td>
<td>99</td>
</tr>
</tbody>
</table>

**Example Commands:**

``` pre
create disk-store --name-store1 --dir=/data/ds1
```

**Sample Output:**

``` pre
gfsh>create disk-store --name-store1 --dir=/data/ds1
Member  | Result
------- | -------
server1 | Success
```

## create gateway-receiver {#topic_a4x_pb1_dk}
Creates gateway receivers. You can only have one gateway receiver on each member, and unlike a gateway sender, you do not need to specify an identifier for the gateway receiver.

The create occurs on all servers,
unless the `--groups` or `--members` option is specified.

If the gateway receiver creation succeeds on at least one member,
this `gfsh` command exits with an exit code indicating success.

Outputs a tabular format status of each member's gateway receiver,
independent of the success or failure of the creation.

See [Gateway Receivers](../../../topologies_and_comm/topology_concepts/multisite_overview).

**Availability:** Online. You must be connected in `gfsh` to a JMX Manager member to use this command.

**Syntax:**

``` pre
create gateway-receiver [--groups=value(,value)*] [--members=value(,value)*] 
  [--manual-start=(value)?] [--start-port=value] [--end-port=value] [--bind-address=value] 
  [--maximum-time-between-pings=value] [--socket-buffer-size=value]
  [--gateway-transport-filter=value(,value)*] [--hostname-for-senders=value]
  [--if-not-exists=(value)?]
```

**Parameters, create gateway-receiver:**

| Name | Description | Default Value |
|---|---|---|
| `--groups` | Gateway receivers are created on the members of the specified group(s). |  |
| `--members` | Name of the member(s) on which to create the gateway receiver. For backward compatibility, no gateway receiver configuration is persisted if this option is specified and cluster configuration is enabled. |  |
| `--manual-start` | Boolean value that specifies whether you must manually start the gateway receiver. If specified without a value or set to `true`, the receiver must be started manually. | `false` |
| `--start-port` | Starting port number for the range of possible ports used by this gateway receiver to accept connections from gateway senders in other sites. An unused port within the range is selected. If none are available, an exception is thrown. The `start-port` and `end-port` values are inclusive (for example, `50510`–`50520`). | `5000` |
| `--end-port` | Upper bound of the port range used by this gateway receiver for connections from gateway senders in other sites. An unused port within the range is selected. If none are available, an exception is thrown. The `start-port` and `end-port` values are inclusive. | `5500` |
| `--bind-address` | Network address for connections from gateway senders in other sites. Specify as a literal string. |  |
| `--socket-buffer-size` | Buffer size (in bytes) for the socket connection. This should match the `socket-buffer-size` setting on gateway senders that connect to this receiver. | `32768` |
| `--gateway-transport-filter` | Fully qualified class name of the `GatewayTransportFilter` to add to the gateway receiver. |  |
| `--maximum-time-between-pings` | Time interval (in milliseconds) between pings to connected WAN sites. Determines how long before a remote site is considered offline. | `60000` |
| `--hostname-for-senders` | Host name or IP address that gateway senders use to connect to this receiver. Provided to senders by the locator. |  |
| `--if-not-exists` | If specified without a value or set to `true`, gateway receivers are not created if they already exist. The command output reports the status of each attempt. | `false` |


**Example Commands:**

``` pre
gfsh>create gateway-receiver --members=server1
```

**Sample Output:**

``` pre
gfsh>create gateway-receiver --members=server1
Member  | Status
------- | ---------------------------------------------------------------------------
server1 | GatewayReceiver created on member "server1" and will listen on the port "0"
```

## create gateway-sender {#topic_hg2_bjz_ck}
Creates a gateway sender on one or more members of a cluster.

See [Gateway Senders](../../../topologies_and_comm/topology_concepts/multisite_overview).

**Note:**
The gateway sender configuration for a specific sender `id` must be identical on each @@product_name@@ member that hosts the gateway sender.

**Availability:** Online. You must be connected in `gfsh` to a JMX Manager member to use this command.

**Syntax:**

``` pre
create gateway-sender --id=value --remote-distributed-system-id=value 
   [--groups=value(,value)*] [--members=value(,value)*] [--parallel(=value)?]
   [--manual-start=value] [--socket-buffer-size=value] [--socket-read-timeout=value] 
   [--enable-batch-conflation=value] [--batch-size=value] [--batch-time-interval=value]
   [--enable-persistence=value] [--disk-store-name=value] [--disk-synchronous=value] 
   [--maximum-queue-memory=value] [--alert-threshold=value] [--dispatcher-threads=value] 
   [--order-policy=value][--gateway-event-filter=value(,value)*]
   [--gateway-transport-filter=value(,value)*]
   [--group-transaction-events(=value)?]
```

**Parameters, create gateway-sender:**

| Name | Description | Default |
|---|---|---|
| `--id` | **Required.** Unique identifier for the gateway sender, usually associated with a physical location. |  |
| `--remote-distributed-system-id` | **Required.** ID of the remote cluster where this gateway sender sends events. |  |
| `--groups` | Gateway senders are created on the members of the specified group(s). |  |
| `--members` | Name of the member(s) on which to create the gateway sender. |  |
| `--parallel` | When `true`, specifies a parallel Gateway Sender. | `false` |
| `--enable-batch-conflation` | Boolean value that determines whether messages are conflated. | `false` |
| `--manual-start` | **Deprecated.** Boolean value that specifies whether you must manually start the gateway sender. A manual start is likely to cause data loss and should not be used in production. | `false` |
| `--socket-buffer-size` | Size of the socket buffer used to send messages to remote sites. Should match the `socket-buffer-size` of remote gateway receivers. | `32768` |
| `--socket-read-timeout` | Time in milliseconds the sender waits for an acknowledgment from a remote site. Must be ≥ `30000` if set; otherwise defaults to no timeout. | `0` |
| `--batch-size` | Maximum number of messages per batch. | `100` |
| `--batch-time-interval` | Maximum time (ms) before a batch is delivered if the batch size is not reached. | `1000` |
| `--enable-persistence` | Boolean value that determines whether the gateway queue is persisted. | `false` |
| `--disk-store-name` | Disk store used for queue overflow or persistence. If not specified, the default disk store is used. |  |
| `--disk-synchronous` | Specifies whether disk writes are synchronous. | `true` |
| `--maximum-queue-memory` | Maximum memory (MB) the queue can use before overflowing to disk. | `100 MB` |
| `--alert-threshold` | Maximum time (ms) a region event can remain in the queue before an alert is logged. | `0` |
| `--dispatcher-threads` | Number of dispatcher threads used to process region events. | `5` |
| `--order-policy` | Configures ordering when `dispatcher-threads` > 1. Values: `key`, `thread`, `partition`. Not applicable to parallel queues. | `key` |
| `--gateway-event-filter` | Comma-separated list of fully qualified `GatewayEventFilter` class names used to filter events before dispatch. Example: `gateway-event-filter=com.user.filters.MyFilter1,com.user.filters.MyFilters2`. |  |
| `--gateway-transport-filter` | Fully qualified class name of the `GatewayTransportFilter` to add to the GatewaySender. |  |
| `--group-transaction-events` | Ensures all events of a transaction are sent in the same batch (with constraints on `parallel`, `dispatcher-threads`, and `enable-batch-conflation`). May not be guaranteed under heavy load. | `false` |
| `--enforce-threads-connect-same-receiver` | Applies only to serial senders. Ensures all dispatcher threads connect to the same receiver; starts one thread first, then the rest in parallel. | `false` |


**Example Commands:**

``` pre
gfsh>create gateway-sender --remote-distributed-system-id="2" --id="sender2"
```

**Sample Output:**

``` pre
gfsh>create gateway-sender --remote-distributed-system-id="2" --id="sender2"
Member  | Status
------- | --------------------------------------------
server1 | GatewaySender "sender2" created on "server1"
```

## create index {#topic_960A5B6FD3D84E1881EE118E299DD12D}
Create an index that can be used when executing queries.

**Availability:** Online. You must be connected in `gfsh` to a JMX Manager member to use this command.

See [Working with Indexes](../../../developing/query_index/query_index).

**Syntax:**

``` pre
create index --name=value --expression=value --region=value 
[--members=value(,value)*] [--type=value] [--groups=value(,value)*]
```

**Parameters, create index:**

| Name                                               | Description                                                                            | Default |
|----------------------------------------------------|----------------------------------------------------------------------------------------|---------|
| <span class="keyword parmname">&#8209;&#8209;name</span>       | *Required.* Name of the index to create.                                               | Â        |
| <span class="keyword parmname">&#8209;&#8209;expression</span> | *Required.* Field of the region values that are referenced by the index.               | Â        |
| <span class="keyword parmname">&#8209;&#8209;region</span>     | *Required.* Name/Path of the region which corresponds to the "from" clause in a query. | Â        |
| <span class="keyword parmname">&#8209;&#8209;members</span>     | Name/Id of the member(s) on which index will be created.                                  | Â        |
| <span class="keyword parmname">&#8209;&#8209;type</span>       | Type of the index. Valid values are: `range` and `key`. (A third type, `hash`, is still recognized but hash indexes are deprecated.)                       | `range` |
| <span class="keyword parmname">&#8209;&#8209;groups</span>      | The index will be created on all the members in the group(s).                     | Â        |


**Example Commands:**

``` pre
create index --name=myKeyIndex --expression=region1.Id --region=region1 --type=key
```

**Sample Output:**

``` pre
gfsh>create index --name=myKeyIdex --expression=region1.Id --region=region1 --type=key
Index successfully created with following details
Name       : myKeyIdex
Expression : region1.Id
RegionPath : /region1
Members which contain the index
1. ubuntu(server1:17682)<v1>:27574

gfsh>create index --name=myIndex2 --expression=exp2 --region=/exampleRegion
Failed to create index "myIndex2" due to following reasons
Index "myIndex2" already exists.  Create failed due to duplicate name.
Occurred on following members
1. ubuntu(server1:17682)<v1>:27574
```

## create jndi-binding {#create_jndi-binding}
Create a JNDI binding that specifies resource attributes which describe a
JDBC connection.

**Availability:** Online. You must be connected in <span class="keyword parmname">gfsh</span> to a JMX Manager member to use this command.

**Syntax:**

``` pre
create jndi-binding --name=value --url=value
 [--jdbc-driver-class=value] [--type=value] [--blocking-timeout-seconds=value]
 [--conn-pooled-datasource-class=value] [--idle-timeout-seconds=value]
 [--init-pool-size=value] [--login-timeout-seconds=value]
 [--managed-conn-factory-class=value] [--max-pool-size=value] [--password=value]
 [--transaction-type=value] [--username=value] [--xa-datasource-class=value]
 [--if-not-exists(=value)?] [--datasource-config-properties=value(,value)*]
```

**Parameters, create jndi-binding:**

| Name                                               | Description                                                                            | Default |
|----------------------------------------------------|----------------------------------------------------------------------------------------|---------|
| <span class="keyword parmname">&#8209;&#8209;name</span>       | *Required.* Name of the binding to create.                                               |         |
| <span class="keyword parmname">&#8209;&#8209;url or &#8209;&#8209;connection-url</span>       | *Required.* the JDBC driver connection URL string. For example, `jdbc:hsqldb:hsql://localhost:1701`.              |         |
| <span class="keyword parmname">&#8209;&#8209;jdbc-driver-class</span>       | The fully qualified name of the JDBC driver class.              |         |
| <span class="keyword parmname">&#8209;&#8209;type</span>       | Type of the XA datasource. One of: `MANAGED`, `SIMPLE`, `POOLED`, or `XAPOOLED`. If `--type=POOLED` and a `--conn-pooled-datasource-class` option is not specified, a pool will be created using Hikari. For more information on Hikari, see [https://brettwooldridge.github.io/HikariCP](https://brettwooldridge.github.io/HikariCP).    | `SIMPLE` |
| <span class="keyword parmname">&#8209;&#8209;blocking-timeout-seconds</span>       | Specifies the maximum time, in seconds, to block while waiting for a connection before throwing an exception.                                        |         |
| <span class="keyword parmname">&#8209;&#8209;conn-pooled-datasource-class</span>   | The fully qualified name of the connection pool implementation that holds XA datasource connections. If `--type=POOLED`, then this class must implement `org.apache.geode.datasource.PooledDataSourceFactory`.                                                 |         |
| <span class="keyword parmname">&#8209;&#8209;idle-timeout-seconds</span>   | Specifies the time, in seconds, that a connection may be idle before being closed. |         |
| <span class="keyword parmname">&#8209;&#8209;init-pool-size</span>   | Specifies the initial number of connections the pool should hold.                  |         |
| <span class="keyword parmname">&#8209;&#8209;login-timeout-seconds</span>   | The quantity of seconds after which the client thread will be disconnected due to inactivity. |         |
| <span class="keyword parmname">&#8209;&#8209;managed-conn-factory-class</span>   | The fully qualified name of the connection factory implementation.     |         |
| <span class="keyword parmname">&#8209;&#8209;max-pool-size</span>   | The maximum number of connections that may be created in a pool.                    |         |
| <span class="keyword parmname">&#8209;&#8209;password</span>   | The default password used when creating a new connection.                                |         |
| <span class="keyword parmname">&#8209;&#8209;transaction-type</span>   | Type of the transaction. One of `XATransaction`, `NoTransaction`, or `LocalTransaction`. |         |
| <span class="keyword parmname">&#8209;&#8209;username</span>   | Specifies the user name to be used when creating a new connection. When specified, if the `--password` option is not also specified, gfsh will prompt for the password. |         |
| <span class="keyword parmname">&#8209;&#8209;xa-datasource-class</span>   | The fully qualified name of the `javax.sql.XADataSource` implementation class. |         |
| <span class="keyword parmname">&#8209;&#8209;if-not-exists</span>   | When true, a duplicate jndi binding will not be created if one with the same name already exists.  When false, an attempt to create a duplicate jndi binding results in an error. The option is set to true if the option is specified without a value. | false   |
| <span class="keyword parmname">&#8209;&#8209;datasource-config-properties</span>   | Properties for the custom `XADataSource` driver. Append a JSON string containing a (name, type, value) tuple to set any property. If `--type=POOLED`, the properties will configure the database data source. If `--type=POOLED` and the value of a name within the tuple begins with the string "pool.", then the properties will configure the pool data source. For example: `--datasource-config-properties={'name':'name1','type':'type1','value':'value1'},{'name':'pool.name2','type':'type2','value':'value2'}`         |         |

**Example Commands:**

``` pre
gfsh>create jndi-binding --name=jndi1 --type=SIMPLE \
  --jdbc-driver-class=org.apache.derby.jdbc.EmbeddedDriver \
  --url="jdbc:derby:newDB;create=true"
```

## create lucene index {#create_lucene_index}
Create a Lucene index. For details on Lucene index creation, see [Apache Lucene Integration](../../../tools_modules/lucene_integration).

For additional Lucene-related gfsh commands, see [describe lucene index](describe#describe_lucene_index), [destroy lucene index](destroy#destroy_lucene_index), [list lucene indexes](list#list_lucene_indexes) and [search lucene](search#search_lucene).

**Availability:** Online. You must be connected in <span class="keyword parmname">gfsh</span> to a JMX Manager member to use this command.

**Syntax:**

``` pre
create lucene index --name=value --region=value --field=value(,value)*
  [--analyzer=value(,value)*] [--serializer=value] [--group=value(,value)*]
```

**Parameters, create lucene index:**

| Name                                               | Description                                                                            | Default |
|----------------------------------------------------|----------------------------------------------------------------------------------------|---------|
| <span class="keyword parmname">&#8209;&#8209;name</span>       | *Required.* Name of the index to create.                                               |         |
| <span class="keyword parmname">&#8209;&#8209;region</span>     | *Required.* Name/Path of the region on which to define the index. |         |
| <span class="keyword parmname">&#8209;&#8209;field</span>      | *Required.* Field(s) of the region values that are referenced by the index, specified as a comma-separated list. To treat the entire value as a single field, specify `__REGION_VALUE_FIELD`. |         |
| <span class="keyword parmname">&#8209;&#8209;analyzer</span>   | Analyzer(s) to extract terms from text, specified as a comma-separated list. If not specified, the default analyzer is used for all fields. If specified, the number of analyzers must exactly match the number of fields specified. When listing analyzers, use the keyword `DEFAULT` for any field that will use the default analyzer.                                  | Lucene `StandardAnalyzer`        |
| <span class="keyword parmname">&#8209;&#8209;serializer</span>   | Fully qualified class name of the serializer to be used with this index. The serializer must implement the `LuceneSerializer` interface. You can use the built-in `org.apache.geode.cache.lucene.FlatFormatSerializer` to index and search collections and nested fields. If not specified, the simple default serializer is used, which indexes and searches only the top level fields of the region objects.   | simple serializer        |
| <span class="keyword parmname">&#8209;&#8209;group</span>      | The index will be created on all the members in the specified member groups.                     |         |


**Example Commands:**

``` pre
gfsh>create lucene index --name=customerIndex --region=/Customer 
   --field=__REGION_VALUE_FIELD

gfsh>create lucene index --name=analyzerIndex --region=/Person 
     --field=name,email,address,revenue 
     --analyzer=DEFAULT,org.apache.lucene.analysis.core.KeywordAnalyzer,
                examples.MyCharacterAnalyzer,DEFAULT
```

**Sample Output:**

``` pre
gfsh>create lucene index --name=testIndex --region=testRegion
    --field=__REGION_VALUE_FIELD
               Member                  | Status
-------------------------------------- | ---------------------------------
192.168.1.23(server505:17200)<v1>:1025 | Successfully created lucene index
```

## create region {#topic_54B0985FEC5241CA9D26B0CE0A5EA863}
Create a region with given path and configuration.

You must specify either a `--type` or a `--template-region` for initial configuration when creating a region. Specifying a `--key-constraint` and `--value-constraint` makes object type information available during querying and indexing.

See [Region Data Storage and Distribution](../../../developing/region_options/chapter_overview).

See [Specifying JSON within Command-Line Options](../json_in_gfsh)
for syntax details.

**Availability:** Online. You must be connected in `gfsh` to a JMX Manager member to use this command.

**Syntax:**

``` pre
 create region --name=value [--type=value] [--template-region=value]
    [--groups=value(,value)*] [--if-not-exists(=value)?]
    [--key-constraint=value] [--value-constraint=value]
    [--enable-statistics=value] [--entry-idle-time-expiration=value]
    [--entry-idle-time-expiration-action=value]
    [--entry-time-to-live-expiration=value]
    [--entry-time-to-live-expiration-action=value]
    [--entry-idle-time-custom-expiry=value] [--entry-time-to-live-custom-expiry=value]
    [--region-idle-time-expiration=value]
    [--region-idle-time-expiration-action=value]
    [--region-time-to-live-expiration=value]
    [--region-time-to-live-expiration-action=value] [--disk-store=value]
    [--enable-synchronous-disk=value] [--enable-async-conflation=value]
    [--enable-subscription-conflation=value] [--cache-listener=value(,value)*]
    [--cache-loader=value] [--cache-writer=value]
    [--async-event-queue-id=value(,value)*]
    [--gateway-sender-id=value(,value)*] [--enable-concurrency-checks=value]
    [--enable-cloning=value] [--concurrency-level=value]
    [--colocated-with=value] [--local-max-memory=value]
    [--recovery-delay=value] [--redundant-copies=value]
    [--startup-recovery-delay=value] [--total-max-memory=value]
    [--total-num-buckets=value] [--compressor=value] [--off-heap(=value)?]
    [--partition-listener=value(,value)*] [--partition-resolver=value]
    [--eviction-entry-count=value] [--scope=value]
    [--eviction-max-memory=value] [--eviction-action=value]
    [--eviction-object-sizer=value]
```

**Parameters, create region:**

| Name | Description | Default |
|---|---|---|
| `--name` | **Required.** Name/Path of the region to be created. |  |
| `--type` | **Required** (if `--template-region` is not specified). Type of region to create (for example: `PARTITION`, `PARTITION_REDUNDANT`, `REPLICATE`, `LOCAL`). Use TAB completion to see all options. |  |
| `--template-region` | **Required** (if `--type` is not specified). Region whose attributes will be duplicated. |  |
| `--groups` | Group(s) of members on which the region will be created. |  |
| `--if-not-exists` | Skips creation if the region already exists. | `false` |
| `--key-constraint` | Fully qualified class name allowed as region keys. |  |
| `--value-constraint` | Fully qualified class name allowed as region values. |  |
| `--enable-statistics` | Enables region statistics (required for expiration). |  |
| `--entry-idle-time-expiration` | Seconds entries can remain idle. | no expiration |
| `--entry-idle-time-expiration-action` | Action when idle timeout occurs (`destroy`, `local-destroy`, `invalidate`, `local-invalidate`). |  |
| `--entry-time-to-live-expiration` | Seconds entries can exist without access or update. | no expiration |
| `--entry-time-to-live-expiration-action` | Action when TTL expires. |  |
| `--entry-idle-time-custom-expiry` | Class implementing `CustomExpiry` for idle time. |  |
| `--entry-time-to-live-custom-expiry` | Class implementing `CustomExpiry` for TTL. |  |
| `--region-idle-time-expiration` | Seconds region can remain idle. |  |
| `--region-idle-time-expiration-action` | Action when region idle timeout occurs. |  |
| `--region-time-to-live-expiration` | Seconds region can exist without access or update. | no expiration |
| `--region-time-to-live-expiration-action` | Action when region TTL expires. |  |
| `--disk-store` | Disk store used by the region. |  |
| `--enable-synchronous-disk` | Enables synchronous disk writes. |  |
| `--enable-async-conflation` | Enables aggregation of async TCP/IP messages. |  |
| `--enable-subscription-conflation` | Enables conflation of server-to-client messages. |  |
| `--cache-listener` | Fully qualified class for after-event notifications. |  |
| `--cache-loader` | Fully qualified class for cache misses. |  |
| `--cache-writer` | Fully qualified class for before-event notifications. |  |
| `--async-event-queue-id` | Async event queue IDs used for write-behind. |  |
| `--gateway-sender-id` | Gateway sender IDs for routing data. |  |
| `--enable-concurrency-checks` | Enables Region Version Vectors for replicated regions. |  |
| `--enable-cloning` | Applies deltas to a clone rather than in-place. |  |
| `--concurrency-level` | Estimated max concurrent threads per entry (not for partitioned regions). |  |
| `--colocated-with` | Region with which this region is colocated. |  |
| `--local-max-memory` | Max memory (MB) used by the region in this process. |  |
| `--recovery-delay` | Delay (ms) before redundancy recovery after a crash (`-1` disables). |  |
| `--redundant-copies` | Number of extra bucket copies (`0–3`). |  |
| `--startup-recovery-delay` | Delay (ms) before new members assume redundancy. | immediate |
| `--total-max-memory` | Max memory (MB) used by the region across all processes. |  |
| `--total-num-buckets` | Total number of hash buckets. | `113` |
| `--compressor` | Compression class (for example `SnappyCompressor`). | no compression |
| `--off-heap` | Stores values in off-heap memory when `true`. | `false` |
| `--partition-listener` | Fully qualified class names of partition listeners. |  |
| `--partition-resolver` | Fully qualified class name of a partition resolver. |  |
| `--eviction-entry-count` | Enables eviction based on entry count. |  |
| `--eviction-max-memory` | Enables eviction based on memory (MB). |  |
| `--eviction-action` | Action when eviction threshold is reached (`local-destroy`, `overflow-to-disk`). |  |
| `--eviction-object-sizer` | Implementation of `ObjectSizer` for heap-based eviction. |  |
| `--scope` | Scope for replicated regions (default `DISTRIBUTED_ACK`). |  |

**Example Commands:**

``` pre
create region --name=region1 --type=REPLICATE_PERSISTENT \
--cache-writer=org.apache.geode.examples.MyCacheWriter \
--group=Group1 --disk-store=DiskStore1

create region --name=region12 --template-region=/region1

create region --name=region2 --type=REPLICATE \
--cache-listener=org.apache.geode.examples.MyCacheListener1,\
org.apache.geode.examples.MyCacheListener2 \
--group=Group1,Group2

create region --name=region3 --type=PARTITION_PERSISTENT --redundant-copies=2 \
--total-max-memory=1000 --startup-recovery-delay=5 --total-num-buckets=100 \
--disk-store=DiskStore2 --cache-listener=org.apache.geode.examples.MyCacheListener3 \
--group=Group2 

create region --name=region4 --type=REPLICATE_PROXY \
--cache-listener=org.apache.geode.examples.MyCacheListener1 --group=Group1,Group2

create region --name=myRegion --type=REPLICATE --eviction-max-memory=100 \
--eviction-action=overflow-to-disk --eviction-object-sizer=my.company.geode.MySizer

create region --name=r1 --type=PARTITION \
--cache-loader=org.example.myLoader{'URL':'jdbc:cloudscape:rmi:MyData'}
```

**Sample Output:**

``` pre
gfsh>create region --name=myRegion --type=LOCAL
Member  | Status
------- | ---------------------------------------
server1 | Region "/myRegion" created on "server1"
```
