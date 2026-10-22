---
title: alter
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
## {#topic_9323467A645D4F2B82EC236448030D14}
Modify an existing Geode resource.

-   **[alter async-event-queue](#topic_alter_async_event_queue)**

    Modifies attributes of an async event queue

-   **[alter disk-store](#topic_99BCAD98BDB5470189662D2F308B68EB)**

    Modifies or removes a region from an offline disk-store.

-   **[alter gateway-sender](#topic_alter_gateway_sender)**

    Modifies attributes of a gateway-sender.

-   **[alter query-service](#topic_alter_query_service)**

    Alter configuration details of the query configuration service.

-   **[alter region](#topic_E74ED23CB60342538B2175C326E7D758)**

    Alters the configuration of a region.

-   **[alter runtime](#topic_7E6B7E1B972D4F418CB45354D1089C2B)**

    Alters configuration properties for all members or a subset of members while the member or members are running.

## alter async-event-queue {#topic_alter_async_event_queue}
Alter attributes of a specified asynchronous event queue. Each server hosting the specified async event queue must be restarted for the new attribute
settings to take effect on that server.

**Availability:** Online. You must be connected in <span class="keyword parmname">gfsh</span> to a JMX Manager member to use this command.

**Syntax:**

``` pre
alter async-event-queue --id=value [--batch-size=value] [--batch-time-interval=value]
    [--max-queue-memory=value] [--if-exists(=value)] [--pause-event-processing(=value)]
```

The required option, `--id`, identifies the async event queue to be altered.

**Parameters, alter async-event-queue**

| Name | Description |
|------|-------------|
| &#8209;&#8209;id   | _Required._ ID of the async event queue to be changed |
| &#8209;&#8209;batch&#8209;size | Maximum number of events that a batch can contain |
| &#8209;&#8209;batch&#8209;time&#8209;interval | Maximum amount of time, in ms, that can elapse before a batch is delivered |
| &#8209;&#8209;max&#8209;queue&#8209;memory | Maximum amount of memory, in megabytes, that the queue can consume before overflowing to disk |
| &#8209;&#8209;if&#8209;exists | If the specified async event queue does not exist, gfsh responds with a message to that effect. If this parameter is true, the response is prefixed with the label "Skipping: ". Useful for scripted tests. Default (if the parameter is not specified): false. Default (if the parameter is specified without value): true. |
| &#8209;&#8209;pause&#8209;event&#8209;processing | Specifies whether event dispatching from the queue to the listener(s) will be paused when the AsyncEventQueue is started. Default (if the parameter is not specified): false. Default (if the parameter is specified without value): true.

**Example Commands:**

``` pre
alter async-event-queue --id=myAsyncEventQueue --batch-size=50 --if-exists
```

## alter disk-store {#topic_99BCAD98BDB5470189662D2F308B68EB}
Modify or remove a region from an offline disk-store.

When modifying a region's configuration, it is customary to take the region off-line and restart using the new configuration. You can use the `alter disk-store` command to change the configuration of the region stored in the disk-store to match the configuration you will use at restart.

**Availability:** Offline.

**Syntax:**

``` pre
alter disk-store --name=value --region=value --disk-dirs=value(,value)*
    [--compressor(=value)] [--concurrency-level=value]
    [--enable-statistics=value] [--initial-capacity=value] [--load-factor=value]
    [--lru-algorithm=value] [--lru-action=value] [--lru-limit=value]
    [--off-heap(=value)] [--remove(=value)]
```

The three required options, `--name`, `--region`, and `--disk-dirs`, identify the disk store and region to be altered. If no additional options are specified, `gfsh` displays the current configuration without making any changes.

**Parameters, alter disk-store**

| Name | Description |
|---|---|
| `--name` | *Required*. Name of the disk-store whose contents will be altered. |
| `--region` | *Required*. Name (including path) of the region using the disk store. |
| `--disk-dirs` | *Required*. Directories where the data for the disk store was previously written. |
| `--compressor` | The fully-qualified class name of the compressor to use when compressing region entry values. A value of `none` removes the compressor. |
| `--concurrency-level` | An estimate of the maximum number of application threads that will concurrently access a region entry. Together with `--initial-capacity` and `--load-factor`, sets the parameters on the underlying `java.util.ConcurrentHashMap` used for storing region entries. This attribute does not apply to partitioned regions. |
| `--enable-statistics` | Enables statistics for the region specified by the `--region` option. Valid values are `true` or `false`. If the parameter is specified without a value, the value of `true` is used. |
| `--initial-capacity` | Together with `--concurrency-level` and `--load-factor`, sets the parameters on the underlying `java.util.ConcurrentHashMap` used for storing region entries. |
| `--load-factor` | Together with `--concurrency-level` and `--initial-capacity`, sets the parameters on the underlying `java.util.ConcurrentHashMap` used for storing region entries. Must be a floating point number between `0` and `1`, inclusive. |
| `--lru-action` | Action to take when evicting entries from the region. Valid values are:<br/>• `none`<br/>• `overflow-to-disk`<br/>• `local-destroy` |
| `--lru-algorithm` | Least recently used eviction algorithm. Valid values are:<br/>• `none`<br/>• `lru-entry-count`<br/>• `lru-heap-percentage`<br/>• `lru-memory-size` |
| `--lru-limit` | Number of entries allowed in the region before eviction occurs. |
| `--off-heap` | Specifies whether the region values are in heap memory or off-heap memory. When `true`, region values are in off-heap memory. If the parameter is specified without a value, the value of `true` is used. |
| `--remove` | Specifies whether to remove the region from the disk-store. If the parameter is specified without a value, the value of `true` is used.<br/><br/>**Note:** `--remove` deletes all persistent data for the region. Consider copying the disk store files to a backup before using this option if you might want to retrieve the data later. |


**Example Commands:**

``` pre
alter disk-store --name=DiskStore1 --region=region1 --disk-dirs=/Disks/DiskStore1 --off-heap
alter disk-store --name=DiskStore1 --region=region1 --disk-dirs=/Disks/DiskStore1 --remove
```

## alter gateway-sender {#topic_alter_gateway_sender}
Alter attributes of a specified gateway sender on one or more members of a cluster.

**Availability:** Online. You must be connected in <span class="keyword parmname">gfsh</span> to a JMX Manager member to use this command.

**Syntax:**

``` pre
alter gateway-sender --id=value [--members=value(,value)*] [--groups=value(,value)*]
    [--alert-threshold=value] [--batch-size=value] [--batch-time-interval=value]
    [--gateway-event-filter=value(,value)*] [--group-transaction-events(=value)?]
```

The required option, `--id`, identifies the gateway sender to be altered.

**Parameters, alter gateway-sender**

| Name | Description |
|---|---|
| `--id` | *Required.* ID of the gateway sender to be changed. |
| `--members` | Name or ID of the member(s) whose configuration is to be altered at runtime. If you do not specify this parameter, the configuration properties are modified for all cluster members using the cluster configuration service. |
| `--groups` | Name of the group(s) whose members' runtime configurations are to be altered. If you do not specify this parameter, the configuration properties are modified for all cluster members using the cluster configuration service. |
| `--alert-threshold` | Maximum time, in milliseconds, that a region event can remain in the gateway sender queue before an alert is logged. |
| `--batch-size` | Maximum number of messages that a batch can contain. |
| `--batch-time-interval` | Maximum amount of time, in milliseconds, that can elapse before a batch is delivered when no events are found in the queue to reach the batch size. |
| `--gateway-event-filter` | A comma-separated list of fully-qualified class names of `GatewayEventFilter`s to be associated with the `GatewaySender`. This serves as a callback to filter out events before dispatching to a remote cluster.<br/><br/>Example:<br/>```pre<br/>gateway-event-filter=com.user.filters.MyFilter1,com.user.filters.MyFilters2<br/>```<br/>To remove all existing filters, use the value `CLEAR` (case-insensitive):<br/>```pre<br/>gateway-event-filter=CLEAR<br/>``` |
| `--group-transaction-events` | Boolean value to ensure that all the events of a transaction are sent in the same batch (never spread across different batches).<br/><br/>Only allowed when:<br/>• `parallel=false` and `dispatcher-threads=1`, **or**<br/>• `parallel=true`<br/>and `enable-batch-conflation=false`.<br/><br/>**Note:** For transactions to work, the regions involved must be replicated by the same set of senders with this flag enabled. |


**Example Commands:**

``` pre
alter gateway-sender --id=sender1 --alert-threshold=100 --batch-size=200 --group-transaction-events
```

## alter query-service {#topic_alter_query_service}
Alter configuration details of the query configuration service.

**Availability:** Online. You must be connected in <span class="keyword parmname">gfsh</span> to a JMX Manager member to use this command.

**Syntax:**

``` pre
alter query-service --method-authorizer=value
    [--authorizer-parameters=value(;value)*] [--force-update(=value)]
```

**Parameters, alter query-service**

| Name | Description |
|------|-------------|
| &#8209;&#8209;method-authorizer       | _Required._ Fully qualified class name of the `MethodInvocationAuthorizer` to be used for query authorization. |
| &#8209;&#8209;authorizer-parameters   | A **semicolon-separated** list of parameters to be used by the specified `MethodInvocationAuthorizer`. This requires that a method-authorizer option has been specified. |
| &#8209;&#8209;force-update            | Specifies whether to forcibly update the `MethodInvocationAuthorizer`, even when there are continuous queries registered in the member. Default (if the parameter is not specified): `false`. Default (if the parameter is specified without value): `true`. **Note:** when set as `true`, any registered CQ will pick up the new `MethodInvocationAuthorizer` and invalidate its internal cache; consider checking that the new `MethodInvocationAuthorizer` allows the methods invoked by the CQs before using this option. |

**Example Commands:**

``` pre
alter query-service --method-authorizer=org.apache.geode.cache.query.security.UnrestrictedMethodAuthorizer
alter query-service --method-authorizer=org.apache.geode.cache.query.security.UnrestrictedMethodAuthorizer --force-update=true
alter query-service --method-authorizer=org.apache.geode.cache.query.security.JavaBeanAccessorMethodAuthorizer --authorizer-parameters=java.lang;java.util
```

## alter region {#topic_E74ED23CB60342538B2175C326E7D758}
Alters the configuration of a region.

See [Specifying JSON within Command-Line Options](../json_in_gfsh)
for syntax details.

**Availability:** Online. You must be connected in <span class="keyword parmname">gfsh</span> to a JMX Manager member to use this command.

**Syntax:**

``` pre
alter region --name=value [--groups=value(,value)*]
    [--entry-idle-time-expiration=value]
    [--entry-idle-time-expiration-action(=value)?]
    [--entry-time-to-live-expiration=value]
    [--entry-time-to-live-expiration-action(=value)?]
    [--entry-idle-time-custom-expiry=value] [--entry-time-to-live-custom-expiry=value]
    [--region-idle-time-expiration=value]
    [--region-idle-time-expiration-action(=value)?]
    [--region-time-to-live-expiration=value]
    [--region-time-to-live-expiration-action(=value)?]
    [--cache-listener=value(,value)*] [--cache-loader=value]
    [--cache-writer=value] [--async-event-queue-id=value(,value)*]
    [--gateway-sender-id=value(,value)*] [--enable-cloning(=value)?]
    [--eviction-max(=value)?]
```

**Parameters, alter region**

| Name | Description | Default Value |
|---|---|---|
| `--async-event-queue-id` | IDs of the Async Event Queues that will be used for write-behind operations. |  |
| `--cache-listener` | Fully qualified class name of a plug-in to be instantiated for receiving after-event notification of changes to the region and its entries. Any number of cache listeners can be configured. A fully qualified class name may be appended with a JSON specification that will be parsed to become the fields of the parameter to the `init()` method for a class that implements the `Declarable` interface. |  |
| `--cache-loader` | Fully qualified class name of a plug-in to be instantiated for receiving notification of cache misses in the region. At most, one cache loader can be defined in each member for the region. For distributed regions, a cache loader may be invoked remotely from other members that have the region defined. A fully qualified class name may be appended with a JSON specification that will be parsed to become the fields of the parameter to the `initialize()` method for a class that implements the `Declarable` interface. |  |
| `--cache-writer` | Fully qualified class name of a plug-in to be instantiated for receiving before-event notification of changes to the region and its entries. The plug-in may cancel the event. At most, one cache writer can be defined in each member for the region. A fully qualified class name may be appended with a JSON specification that will be parsed to become the fields of the parameter to the `init()` method for a class that implements the `Declarable` interface. |  |
| `--enable-cloning` | Determines how `fromDelta` applies deltas to the local cache for delta propagation. When true, the updates are applied to a clone of the value and then the clone is saved to the cache. When false, the value is modified in place in the cache. | `false` |
| `--entry-idle-time-expiration` | Number of seconds before a region or an entry expires. Specify `-1` to indicate that there is no expiration of this type. | `-1` |
| `--entry-idle-time-expiration-action` | Action that should take place when a region or an entry expires. Valid values:<br/>• `local-destroy` – Removes the region or entry from the local cache without distributing the removal. Not valid for partitioned region entries.<br/>• `destroy` – Removes the region or entry completely and distributes the operation according to the region’s distribution settings.<br/>• `invalidate` – **Default.** Marks entries as invalid and distributes the invalidation according to the region’s scope.<br/>• `local-invalidate` – Marks entries as invalid locally without distributing. Not valid for partitioned region entries and not supported for replicated regions. | `invalidate` |
| `--entry-time-to-live-expiration` | Number of seconds before a region or an entry expires. Specify `-1` to indicate that there is no expiration of this type. | `-1` |
| `--entry-time-to-live-expiration-action` | Action that should take place when a region or an entry expires. Valid values are the same as for `--entry-idle-time-expiration-action`. | `invalidate` |
| `--entry-idle-time-custom-expiry` | The name of a class implementing `CustomExpiry` for entry idle time. Append a JSON string for initialization properties. |  |
| `--entry-time-to-live-custom-expiry` | The name of a class implementing `CustomExpiry` for entry time to live. Append a JSON string for initialization properties. |  |
| `--eviction-max` | Maximum value for the Eviction Attributes that the eviction algorithm uses to determine when to perform its eviction action. The unit of the maximum value is determined by the Eviction Algorithm. | `0` |
| `--gateway-sender-id` | IDs of the Gateway Senders where data is routed. |  |
| `--groups` | Group(s) of members where the region will be altered. |  |
| `--name` | **Required.** Name (including path) of the region. |  |
| `--region-idle-time-expiration` | Number of seconds before a region or an entry expires. If timeout is not specified, it defaults to zero (no expiration). | `-1` |
| `--region-idle-time-expiration-action` | Action that should take place when a region or an entry expires. Valid values are the same as for `--entry-idle-time-expiration-action`. | `invalidate` |
| `--region-time-to-live-expiration` | Number of seconds before a region or an entry expires. If timeout is not specified, it defaults to zero (no expiration). | `-1` |
| `--region-time-to-live-expiration-action` | Action that should take place when a region or an entry expires. Valid values are the same as for `--entry-idle-time-expiration-action`. | `invalidate` |


**Example Commands:**

``` pre
alter region --name=region1 --eviction-max=5000 [-group=all]
```

**Sample Output:**

``` pre
gfsh>alter region --name=customer --eviction-max=5000
Member  | Status
------- | ----------------------------------
server1 | Region "/customer" altered on "server1"
```

## alter runtime {#topic_7E6B7E1B972D4F418CB45354D1089C2B}
Alters configuration properties for all servers or a subset of servers while the member or members are running.
Alter runtime is a cluster configuration command that affects the configuration for newly joining servers.
In order for running members to adopt the alteration, they must be stopped and restarted.

The alter runtime command does not apply to locators.

For more information on these configuration properties, see [cache.xml](../../../reference/cache/chapter_overview_cache_xml#cache_xml) and configuration parameter reference.

**Availability:** Online. You must be connected in `gfsh` to a JMX Manager member to use this command.

**Syntax:**

``` pre
alter runtime [--members=value(,value)*] [--groups=value(,value)*]
    [--archive-disk-space-limit=value]
    [--archive-file-size-limit=value] [--log-disk-space-limit=value]
    [--log-file-size-limit=value] [--log-level=value]
    [--statistic-archive-file=value] [--statistic-sample-rate=value]
    [--enable-statistics=value] [--copy-on-read(=value)?] [--lock-lease=value]
    [--lock-timeout=value] [--message-sync-interval=value] [--search-timeout=value]
```

**Parameters, alter runtime**

| Name | Description | Default Value |
|---|---|---|
| `--members` | Name or ID of the member(s) whose configuration is to be altered at runtime. If not specified, the configuration properties are modified for all cluster members using the cluster configuration service. | If not specified, all members using the cluster configuration service |
| `--groups` | Name of the group(s) whose members’ runtime configuration is to be altered. If not specified, the configuration properties are modified for all cluster members using the cluster configuration service. | If not specified, all members using the cluster configuration service |
| `--archive-disk-space-limit` | Archive disk space limit. Maximum size (in megabytes) of all inactive statistic archive files combined. If this limit is exceeded, inactive archive files are deleted (oldest first) until within the limit. `0` means unlimited. Valid values: `0–1000000`. | `0` |
| `--archive-file-size-limit` | Archive file size limit. Maximum size (in megabytes) of a single statistic archive file. When exceeded, a new archive file is created and the current file becomes inactive. `0` means unlimited. Valid values: `0–1000000`. | `0` |
| `--log-disk-space-limit` | Log disk space limit. Maximum size (in megabytes) of all inactive log files combined. If exceeded, inactive log files are deleted (oldest first) until within the limit. `0` means unlimited. Valid values: `0–1000000`. | `0` |
| `--log-file-size-limit` | Log file size limit. Maximum size (in megabytes) of a log file before rolling to a new log file. `0` disables log rolling. Valid values: `0–1000000`. | `0` |
| `--log-level` | The new log level. **Required.** Valid values: `ALL`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`, `OFF`. | `INFO` |
| `--statistic-archive-file` | The file where the running system member writes statistic samples (for example, `StatisticsArchiveFile.gfs`). Adding `.gz` compresses the file. | not set |
| `--statistic-sample-rate` | Statistic sampling rate in milliseconds. Valid values: `100–60000`. | `1000` |
| `--enable-statistics` | Whether statistic sampling should be enabled. Specify `--statistic-archive-file` to store statistics to a file. Valid values: `true`, `false`. | `false` |
| `--copy-on-read` | Sets the copy-on-read region attribute for cache read operations. Valid values: `true`, `false`. | `false` |
| `--lock-lease` | Length (in seconds) of distributed lock leases obtained by this cache. | `120` |
| `--lock-timeout` | Number of seconds a cache operation may wait to obtain a distributed lock lease before timing out. | `60` |
| `--message-sync-interval` | Frequency (in seconds) at which the primary cache-server sends a message to all secondary cache-server nodes to remove events already dispatched from the queue. | `1` |
| `--search-timeout` | Number of seconds a cache `get` operation can spend searching for a value. | `300` |


**Example Commands:**

``` pre
alter runtime --members=server1 --log-level=WARN --enable-statistics=true
```

**Sample Output:**

``` pre
gfsh>alter runtime --members=server1 --log-level=WARN --enable-statistics=true
Runtime configuration altered successfully for the following member(s)
192.0.2.0(server1:240)<v1>:64871
```

