---
title: "<cache> Element Reference"
sidebar_label: "<cache> Element Reference"
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

This section documents the `cache.xml` sub-elements used for @@product_name@@ server configuration. All elements are sub-elements of the `<cache>` element.

For @@product_name@@ client configuration, see [&lt;client-cache&gt; Element Reference](client-cache).

**API**:`org.apache.geode.cache.CacheFactory`

**&lt;cache&gt; Attributes**

<table>
<colgroup>
<col width="30%" />
<col width="50%" />
<col width="20%" />
</colgroup>
<thead>
<tr class="header">
<th>Attribute</th>
<th>Description</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td>copy-on-read</td>
<td><p>Boolean indicating whether entry value retrieval methods return direct references to the entry value objects in the cache (false) or copies of the objects (true).</p></td>
<td>False</td>
</tr>
<tr>
<td>is-server</td>
<td><p>Boolean indicating whether this member is a cache server.</p></td>
<td>False</td>
</tr>
<tr>
<td>lock-timeout</td>
<td><p>The timeout, in seconds, for implicit object lock requests. This setting affects automatic locking only, and does not apply to manual locking. If a lock request does not return before the specified timeout period, it is cancelled and returns with a failure.</p></td>
<td>60</td>
</tr>
<tr>
<td>lock-lease</td>
<td><p>The timeout, in seconds, for implicit and explicit object lock leases. This affects both automatic locking and manual locking. Once a lock is obtained, it can remain in force for the lock lease time period before being automatically cleared by the system.</p></td>
<td>120</td>
</tr>
<tr>
<td>message-sync-interval</td>
<td><p>Used for client subscription queue synchronization when this member acts as a server to clients and server redundancy is used. Sets the frequency (in seconds) at which the primary server sends messages to its secondary servers to remove queued events that have already been processed by the clients.</p></td>
<td>1</td>
</tr>
<tr>
<td>search-timeout</td>
<td><p>How many seconds a <code class="ph codeph">netSearch</code> operation can wait for data before timing out. You may want to change this based on your knowledge of the network load or other factors.</p></td>
<td>300</td>
</tr>
</tbody>
</table>

**Example:**

``` pre
<cache>
  <cache-server port="40404" />
  <region name="root">
    <region-attributes refid="REPLICATE"/>
    <region name="cs_region" refid="REPLICATE">
      <region-attributes>
        <cache-loader>
          <class-name>cacheRunner.StringLoader</class-name>
        </cache-loader>
          <cache-listener>
          <class-name>cacheRunner.LoggingCacheListener</class-name>
        </cache-listener>
      </region-attributes>
    </region>
  </region>
</cache>
```

## &lt;cache-transaction-manager&gt; {#cache-transaction-manager}
Specifies a transaction listener.

**API:** `CacheTransactionManager`

**Example:**

``` pre
<cache search-timeout="60">
   <cache-transaction-manager>
     <transaction-listener>
       <class-name>com.company.data.MyTransactionListener</class-name>
       <parameter name="URL">
         <string>jdbc:cloudscape:rmi:MyData</string>
       </parameter>
     </transaction-listener>
     <transaction-listener>... </transaction-listener> 
     <transaction-writer>
       <class-name>com.company.data.MyTransactionWriter</class-name>
       <parameter name="URL">
         <string>jdbc:cloudscape:rmi:MyData</string>
       </parameter>
       <parameter>
     </transaction-writer>
   </cache-transaction-manager> .. .
</cache>
```

## &lt;transaction-listener&gt; {#transaction-listener}
When a transaction ends, its thread calls the TransactionListener to perform the appropriate follow-up for successful commits, failed commits, or voluntary rollbacks.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

## &lt;transaction-writer&gt; {#transaction-writer}
When you commit a transaction, a TransactionWriter can perform additional tasks, including cancelling the transaction.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

## &lt;dynamic-region-factory&gt; {#dynamic-region-factory}
The `<dynamic-region-factory>` element configures a dynamic region factory for this cache. You can use this element to dynamically create regions in your application code. Use the `createDynamicRegion()` method of the `org.apache.geode.cache.DynamicRegionFactory` class in your Java code to dynamically create regions.

**Note:**
You cannot use this element to dynamically create *partitioned* regions.

**Note:** Use of the `DynamicRegionFactory` class and the `<dynamic-region-factory>` element are deprecated in favor of the `org.apache.geode.cache.execute.FunctionService` class and the [`<function-service>`](#function-service) element.

We recommend that you use functions to dynamically create regions. See [Creating Regions Dynamically](../../developing/region_options/dynamic_region_creation).

The optional `<disk-dir>` sub-element specifies the directory to store the persistent files that are used for dynamic region bookkeeping. It defaults to the current directory.

Set the `pool-name` attribute to set the name of the connection pool used by client applications in a client/server cache configuration. Do not specify the `pool-name` attribute in servers or peers.

**API:** `org.apache.geode.cache.DynamicRegionFactory`

**&lt;dynamic-region-factory&gt; Attributes**


| Attribute                 | Description                                                                                                                    | Default |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|---------|
| disable-persist-backup    | When set to false, the factory is persisted on disk.                                                                           | false   |
| disable-register-interest | When set to false, client regions created by the factory register interest in all keys in a corresponding server cache region. | false   |
| pool-name                 | The name of a connection pool used by the client factory to communicate with the server-side factory.                          | none    |

**Example:**

``` pre
<dynamic-region-factory 
     pool-name=myPool>
     <disk-dir>/home/gemfire/myDiskdir</disk-dir>
</dynamic-region-factory>
```

## &lt;disk-dir&gt; {#id_utn_c3p_wk}
Specifies a region or disk store's disk directory.

**&lt;disk-dir&gt; Attributes**

| Attribute                 | Description                                                                              | Default                  |
|---------------------------|------------------------------------------------------------------------------------------|--------------------------|
| dir-size                  | Maximum amount of space to use for the disk store, in megabytes.                         | 214748364 (2 petabytes)  |

**Example:**

``` pre
<disk-dir 
    dir-size="20480">/host3/users/gf/memberA_DStore</disk-dir> 
```

## &lt;gateway-sender&gt; {#gateway-sender}
Configures a gateway sender to distribute region events to another @@product_name@@ site. See [Configuring a Multi-site (WAN) System](../../topologies_and_comm/multi_site_configuration/setting_up_a_multisite_system#setting_up_a_multisite_system).

**API:** `GatewaySender`

**&lt;gateway-sender&gt; Attributes**

| Attribute | Description | Default |
|---|---|---|
| `parallel` | Value of `true` or `false` that specifies the type of gateway sender that is created. | false |
| `dispatcher-threads` | Number of dispatcher threads used to process region events from a gateway sender queue or asynchronous event queue. | 5 |
| `order-policy` | When `dispatcher-threads` is greater than 1, `order-policy` configures how multiple dispatcher threads process region events from a serial gateway queue or serial asynchronous event queue. Possible values:<br/><br/>- **key** – preserves the order of key updates.<br/>- **thread** – preserves the order in which a given thread added region events to the queue.<br/>- **partition** – valid for parallel event queues; preserves ordering per partition or queue.<br/><br/>You cannot configure `order-policy` for a parallel event queue because parallel queues cannot preserve global event ordering. | key |
| `id` | Unique identifier for the gateway sender, usually associated with a physical location. This attribute is required. | null |
| `remote-distributed-system-id` | Integer that uniquely identifies the remote Geode cluster to which this gateway sender sends region events. Corresponds to the `distributed-system-id` property in the remote cluster’s locators. This attribute is required. | null |
| `manual-start` | **Deprecated.** Boolean that specifies whether the gateway sender must be started manually. If null, the default `false` is used and the sender starts automatically. *Manual start can cause data loss and should not be used in production.* | false |
| `socket-buffer-size` | Size of the socket buffer used to send messages to remote sites. Should match the `socket-buffer-size` of the remote gateway receivers. | 32768 |
| `socket-read-timeout` | Time in milliseconds that the gateway sender waits for an acknowledgment from a remote site. Default `0` means no timeout. If set, the minimum value is `30000`; lower values are reset to `0`. | 0 |
| `enable-batch-conflation` | Boolean that determines whether messages are conflated. | false |
| `batch-size` | Maximum number of messages in a batch. | 100 |
| `batch-time-interval` | Maximum time in milliseconds before a batch is delivered when the batch size is not reached. | 1000 |
| `enable-persistence` | Boolean that determines whether the gateway queue is persisted. | false |
| `disk-store-name` | Named disk store used for queue overflow or persistence. If null, the default disk store is used. | *not set* |
| `disk-synchronous` | For regions that write to disk, specifies whether disk writes are synchronous. | true |
| `maximum-queue-memory` | Maximum memory in megabytes that the queue can use before overflowing to disk. | 100 MB |
| `alert-threshold` | Maximum time in milliseconds that a region event can remain in the queue before an alert is logged. | 0 |
| `group-transaction-events` | Boolean that ensures all events of a transaction are sent in the same batch.<br/><br/>Allowed only when:<br/>- `parallel=false` and `dispatcher-threads=1`, or<br/>- `parallel=true`, and `enable-batch-conflation=false`.<br/><br/>*Note:* Regions in the transaction must be replicated by the same set of senders with this flag enabled.<br/>*Note:* Under high load or if the above conditions are not met, transaction events may still be split across batches. The number of incomplete transaction batches can be retrieved from the `GatewaySenderMXBean`. | false |


**Example:**

``` pre
<cache>
  
  <gateway-sender 
    id="remoteA" 
    parallel="true" 
    remote-distributed-system-id="1"> 
    <gateway-event-filter>
      <class-name>org.apache.geode.util.SampleEventFilter</class-name>
      <parameter 
       name="param1">
        <string>"value1"</string>
      </parameter>
    </gateway-event-filter>
    <gateway-transport-filter>
      <class-name>org.apache.geode.util.SampleTransportFilter</class-name>
      <parameter 
       name="param1">
        <string>"value1"</string>
      </parameter>
    </gateway-transport-filter>
  </gateway-sender> 
  ...
</cache>
```

## &lt;gateway-event-filter&gt; {#gateway-event-filter}
A GatewayEventFilter implementation determines whether a region event is placed in a gateway sender queue and/or whether an event in a gateway queue is distributed to a remote site. You can optionally add one or more GatewayEventFilter implementations to a gateway sender, either in the cache.xml configuration file or using the Java API.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**Example:**

``` pre
<gateway-event-filter>
      <class-name>org.apache.geode.util.SampleEventFilter</class-name>
      <parameter name="param1">
        <string>"value1"</string>
      </parameter>
</gateway-event-filter>
```

## &lt;gateway-event-substitution-filter&gt; {#gateway-event-substitution-filter}
A GatewayEventSubstitutionFilter provides a way to specify a substitute value to be stored in the GatewayQueueEvent and enqueued in the RegionQueue. You can optionally add one GatewayEventSubstitutionFilter implementation to a gateway sender.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**Example:**

``` pre
<gateway-event-substitution-filter>
      <class-name>org.apache.geode.util.SampleEventSubstitutionFilter</class-name>
      <parameter name="param1">
        <string>"value1"</string>
      </parameter>
</gateway-event-substitution-filter>
```

## &lt;gateway-transport-filter&gt; {#gateway-transport-filter}
Use a GatewayTransportFilter implementation to process the TCP stream that sends a batch of events that is distributed from one @@product_name@@ cluster to another over a WAN. A GatewayTransportFilter is typically used to perform encryption or compression on the data that distributed. You install the same GatewayTransportFilter implementation on both a gateway sender and gateway receiver.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**Example:**

``` pre
<gateway-transport-filter>
      <class-name>org.apache.geode.util.SampleTransportFilter</class-name>
      <parameter 
       name="param1">
        <string>"value1"</string>
      </parameter>
</gateway-transport-filter>
```

## &lt;gateway-receiver&gt; {#gateway-receiver}
Configures a gateway receiver to receive and apply region events that were distributed from another @@product_name@@ site. You can only specify one gateway receiver on a member. See [Configuring a Multi-site (WAN) System](../../topologies_and_comm/multi_site_configuration/setting_up_a_multisite_system#setting_up_a_multisite_system).

**API:** `GatewayReceiverFactory`, `GatewayTransportFilter`

**&lt;gateway-receiver&gt; Attributes**

<table>
<colgroup>
<col width="30%" />
<col width="50%" />
<col width="20%" />
</colgroup>
<thead>
<tr class="header">
<th>Attribute</th>
<th>Description</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td>start-port</td>
<td><p>Starting port number to use when specifying the range of possible port numbers this gateway receiver will use to connects to gateway senders in other sites. @@product_name@@ chooses an unused port number in the specified port number range to start the receiver. If no port numbers in the range are available, an exception is thrown.</p>
<p>The <code class="ph codeph">STARTPORT</code> value is inclusive while the <code class="ph codeph">ENDPORT</code> value is exclusive. For example, if you specify <code class="ph codeph">STARTPORT=&quot;50510&quot;</code> and <code class="ph codeph">ENDPOINT=&quot;50520&quot;</code>, @@product_name@@ chooses a port value from 50510 to 50519.</p></td>
<td>5000</td>
</tr>
<tr>
<td>end-port</td>
<td><p>Defines the upper bound port number to use when specifying the range of possible port numbers this gateway receiver will use to for connections from gateway senders in other sites. @@product_name@@ chooses an unused port number in the specified port number range to start the receiver. If no port numbers in the range are available, an exception is thrown.</p>
<p>The <code class="ph codeph">ENDPORT</code> value is exclusive while the <code class="ph codeph">STARTPORT</code> value is inclusive. For example, if you specify <code class="ph codeph">STARTPORT=&quot;50510&quot;</code> and <code class="ph codeph">ENDPOINT=&quot;50520&quot;</code>, @@product_name@@ chooses a port value from 50510 to 50519.</p></td>
<td>5500</td>
</tr>
<tr>
<td>bind-address</td>
<td>Network address for connections from gateway senders in other sites. Specify the address as a literal string value.</td>
<td>Â </td>
</tr>
<tr>
<td>hostname-for-senders</td>
<td>Attribute where you can specify an IP address or hostname for gateway sender connections. If you configure hostname-for-senders, locators will use the provided hostname or IP address when instructing gateway senders on how to connect to gateway receivers. If you provide &quot;&quot; or null as the value, by default the gateway receiver's bind-address will be sent to clients.</td>
<td>Â </td>
</tr>
<tr>
<td>manual-start</td>
<td>When set to false, the gateway receiver will automatically start when the receiver is created. If set to true, you must manually start the receiver.</td>
<td>true</td>
</tr>
<tr>
<td>maximum-time-between-pings</td>
<td>Integer value that specifies the time interval (in milliseconds) to use between pings to connected WAN sites. This value determines the maximum amount of time that can elapse before a remote WAN site is considered offline.</td>
<td>60000</td>
</tr>
<tr>
<td>socket-buffer-size</td>
<td>An integer value that sets the buffer size (in bytes) of the socket connection for this gateway receiver. This value should match the <code class="ph codeph">socket-buffer-size</code> setting of gateway senders that connect to this receiver.</td>
<td>32768</td>
</tr>
</tbody>
</table>

**Example:**

``` pre
<cache>
     <gateway-receiver start-port="1530" end-port="1551"> 
    <gateway-transport-filter>>
      <class-name>org.apache.geode.util.SampleTransportFilter</class-name>
      <parameter 
       name="param1">
        <string>"value1"</string>
      </parameter>
    </gateway-transport-filter>
  </gateway-receiver>
</cache>
```

## &lt;gateway-transport-filter&gt; {#gateway-receiver_gateway-transport-filter}
Use a GatewayTransportFilter implementation to process the TCP stream that sends a batch of events that is distributed from one @@product_name@@ cluster to another over a WAN. A GatewayTransportFilter is typically used to perform encryption or compression on the data that distributed. You install the same GatewayTransportFilter implementation on both a gateway sender and gateway receiver.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**Example:**

``` pre
<gateway-transport-filter>
      <class-name>org.apache.geode.util.SampleTransportFilter</class-name>
      <parameter 
       name="param1">
        <string>"value1"</string>
      </parameter>
</gateway-transport-filter>
```

## &lt;gateway-conflict-resolver&gt; {#gateway-conflict-resolver}
An event-handler plug-in that is called in order to determine whether a potentially conflicting WAN update should be applied to the local cache. A GatewayConflictResolver is invoked if the current value in a cache entry was established by a different cluster (with a different distributed-system-id) than an event that is attempting to modify the entry. It is not invoked if the event has the same distributed system ID as the event that last changed the entry. See [Resolving Conflicting Events](../../developing/events/resolving_multisite_conflicts#topic_E97BB68748F14987916CD1A50E4B4542)

Specify the Java class for the gateway conflict resolver plug-in and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**API:** `org.apache.geode.cache.util.GatewayConflictResolver`

**Example:**

``` pre
<gateway-conflict-resolver>
    <class-name>
     myPackage.MyConflictResolver
    </class-name>
  </gateway-conflict-resolver>
```

## &lt;async-event-queue&gt; {#async-event-queue}
Configures a queue for sending region events to an AsyncEventListener implementation (for example, for write-behind event handling).

**API:** `org.apache.geode.cache.asyncqueue.AsyncEventQueue`

**&lt;async-event-queue&gt; Attributes**

| Attribute | Description | Default |
|---|---|---|
| `id` | Unique identifier for the queue. This attribute is required. | null |
| `parallel` | Value of `true` or `false` that specifies the type of queue that is created. | false |
| `batch-size` | Maximum number of messages that a batch can contain. | 100 |
| `batch-time-interval` | Maximum time in milliseconds that can elapse before a batch is delivered when no events are available to reach the batch size. | 5 |
| `enable-batch-conflation` | Boolean that determines whether messages are conflated. | false |
| `disk-store-name` | Named disk store used for queue overflow or persistence. If null, the default disk store is used. | null (default disk store) |
| `disk-synchronous` | For regions that write to disk, specifies whether disk writes are synchronous. | true |
| `dispatcher-threads` | Number of dispatcher threads used to process region events from the queue. | 5 |
| `forward-expiration-destroy` | When true, forwards expiration destroy operations to `AsyncEventListener`. | false |
| `maximum-queue-memory` | Maximum memory in megabytes that the queue can consume before overflowing to disk. | 100 MB |
| `order-policy` | When `dispatcher-threads` is greater than 1, `order-policy` configures how multiple dispatcher threads process region events from the queue. Possible values:<br/><br/>- **key** – preserves the order of key updates.<br/>- **thread** – preserves the order in which a given thread added region events to the queue.<br/>- **partition** – valid for parallel event queues; preserves ordering per partition or queue.<br/><br/>You cannot configure `order-policy` for a parallel event queue because parallel queues cannot preserve global event ordering. Only ordering within a partition or queue can be preserved. | key |
| `pause-event-processing` | When true, event dispatching from the queue to the listener(s) is paused when the `AsyncEventQueue` is started. | false |
| `persistent` | Boolean that determines whether this queue is persisted. | false |


**Example:**

``` pre
<cache>
   <async-event-queue 
    id="sampleQueue" 
    persistent="true"
    disk-store-name="exampleStore" 
    parallel="false">
      <async-event-listener>
         <class-name>MyAsyncEventListener</class-name>
         <parameter name="url"> 
           <string>jdbc:db2:SAMPLE</string> 
         </parameter> 
         <parameter name="username"> 
           <string>gfeadmin</string> 
         </parameter> 
         <parameter name="password"> 
           <string>admin1</string> 
         </parameter>
      </async-event-listener>
   </async-event-queue>
    ...
</cache>
```

## &lt;async-event-listener&gt; {#async-event-listener}
An AsyncEventListener receives callbacks for events that change region data. You can use an AsyncEventListener implementation as a write-behind cache event handler to synchronize region updates with a database.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**API:** `org.apache.geode.cache.asyncqueue.AsyncEventListener`

**Example:**

``` pre
...
    <async-event-listener>
         <class-name>MyAsyncEventListener</class-name>
         <parameter name="url"> 
           <string>jdbc:db2:SAMPLE</string> 
         </parameter> 
         <parameter name="username"> 
           <string>gfeadmin</string> 
         </parameter> 
         <parameter name="password"> 
           <string>admin1</string> 
         </parameter> 
    </async-event-listener>
...
```

## &lt;cache-server&gt; {#cache-server}
Configures the cache to serve region data to clients in a client/server caching system. This element indicates the port the server listens on for client communication.

The `cacheserver` process uses only `cache.xml` configuration. For application servers, you can set the same configuration properties using the `org.apache.geode.cache.server.CacheServer` and `org.apache.geode.cache.Cache` interfaces. For detailed information, see the online Java API documentation.

**API:** `org.apache.geode.cache.server.CacheServer`

**&lt;cache-server&gt; Attributes**

| Attribute | Description | Default Value |
|---|---|---|
| `bind-address` | Hostname or IP address that the server listens on for client connections. If null, the server listens on the machine’s default address. | null |
| `hostname-for-clients` | Hostname or IP address passed to clients as the server location. When the server connects to the locator, it reports the host and port where it listens for client connections. If the default host cannot be resolved by the client, the client cannot route to the server. In that case, supply an alternate hostname for the locator to pass to the client. If null, the server’s `bind-address` is used. | null |
| `load-poll-interval` | Frequency, in milliseconds, to poll the load probe for server load information. | 5000<br/>(5 seconds) |
| `max-connections` | Maximum number of client connections. When reached, the server refuses additional connections.<br/><br/>*Note:* Set this at least as high as `max-threads`. | 800 |
| `max-threads` | Maximum number of threads used to service client connections. When reached, threads begin servicing multiple connections. A value of 0 uses one thread per connection.<br/><br/>*Note:* Set this no higher than `max-connections`. | 0 |
| `maximum-message-count` | Maximum number of messages allowed in a subscription queue. When the queue reaches this limit, messages block.<br/><br/>*Note:* Used only if `client-subscription` is not configured. | 230000 |
| `maximum-time-between-pings` | Maximum time in milliseconds between messages or pings indicating a client is healthy.<br/><br/>*Note:* A value of 0 or negative disables client health monitoring—use with caution. | 60000<br/>(1 minute) |
| `message-time-to-live` | For highly available subscription queues, the expiration time in seconds for non-durable messages in the secondary server’s client subscription queue. Messages older than this are removed. A value of 0 means messages are never removed.<br/><br/>*Note:* Set high enough to avoid losing valid messages during server failover. | 180<br/>(3 minutes) |
| `port` | Port that the server listens on for client communication. | 40404 |
| `socket-buffer-size` | Size of socket buffers used for server-to-client communication. | 32768 |
| `tcp-no-delay` | When true, enables `TCP_NODELAY` for server connections to clients. | false |


**Example:**

``` pre
<cache>
    <cache-server 
     port="40404" 
      />
   ...
</cache>
```

## &lt;client-subscription&gt; {#client-subscription}
Overflow specification for client subscription queues. Sets a capacity limit on the in-memory queue and specifies where to overflow when capacity is reached. By default no overflow is used. Specified in three parts:

**Default:** no overflow

**API:** `org.apache.geode.cache.server.ClientSubscriptionConfig`

**&lt;client-subscription&gt; Attributes**

| Attribute          | Description                                                                                                                                                                     | Default            |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| eviction-policy    | How the capacity is calculated. The options are mem for memory use, entry for message count, and null for no overflow.                                                          | null               |
| capacity           | Used if eviction-policy is not null. Specified in megabytes for mem and as a positive integer for entry.                                                                        | 1                  |
| disk-store-name    | Used if eviction-policy is not null. Default: default disk store. If specified, the disk-store-name must specify a disk store that is already defined in the cache.             | default disk store |

**Example:**

``` pre
<cache>
 <cache-server port=4444>
   <client-subscription eviction-policy="entry | mem" capacity=35 overflow-directory="OverflowDir"></client-subscription>
   ...
 </cache-server>
</cache>
```

## &lt;custom-load-probe&gt; {#custom-load-probe}
Application plug-in used to provide current and predicted server load information to the server locators.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**Default:** If this is not defined, the default @@product_name@@ load probe is used.

**API:** `org.apache.geode.cache.server.setLoadProbe`

**Example:**

``` pre
<custom-load-probe>
    <class-name>
     myPackage.MyLoadProbe
    </class-name>
  </custom-load-probe>
```

## &lt;pool&gt; {#pool}
Use for client caches. Defines a client's server pool used to communicate with servers running in a different cluster.

**API:** `org.apache.geode.cache.client.PoolFactory`

**&lt;pool&gt; Attributes**

| Attribute | Description | Default |
|---|---|---|
| `free-connection-timeout` | Time a thread waits for a pool connection before timing out. Prevents indefinite waits when `max-connections` is reached and all connections are in use. | 10000 |
| `idle-timeout` | Maximum time in milliseconds a pool connection can remain unused when there are more than `min-connections`. Pings do not count as use. A value of `-1` disables the timeout. | 5000 |
| `load-conditioning-interval` | Time in milliseconds a pool connection can remain open before being eligible for silent replacement by a less-loaded server. | 300000<br/>(5 minutes) |
| `max-connections` | Maximum number of pool connections. When reached, operations block until a connection is available or `free-connection-timeout` or `server-connection-timeout` is reached. A value of `-1` means no maximum. Must be greater than `min-connections`.<br/><br/>*Note:* If you cap pool connections, disable `pr-single-hop-enabled` to avoid thrashing and performance loss. | -1 |
| `min-connections` | Minimum number of pool connections maintained at all times. Used to establish the initial pool. A value of `0` creates connections only when needed. Must be ≥ 0. | 1 |
| `multiuser-authentication` | Enables multiple users within a single client. When true, each user accesses the cache through its own `RegionService`. When false, the client uses no authorization or a single set of credentials. | false |
| `name` | Name of the pool. Used by the client region `pool-name` to associate this pool with a region.<br/><br/>*Note:* Required with no default. | none |
| `ping-interval` | Frequency in milliseconds for client-to-server heartbeat communication. Pings occur only when no other client messages are sent.<br/><br/>*Note:* Set lower than the server’s `maximum-time-between-pings`. | 10000 |
| `pr-single-hop-enabled` | Improves access to partitioned region data by using metadata to send requests directly to the server hosting the key. Used for operations like put, get, and destroy. | true |
| `read-timeout` | Maximum time in milliseconds for the client to wait for a server response. | 10000 |
| `retry-attempts` | Number of times to retry a client request before giving up. If fewer servers are available than this value, failed servers are retried until the limit is reached. A value of `-1` tries each server once. | -1 |
| `server-connection-timeout` | Time a thread waits for a connection to a specific server before timing out. Prevents indefinite waits when `max-connections` is reached. | 0 |
| `server-group` | Logical server group used by the pool. A null value uses the global server group.<br/><br/>*Note:* Used only when the `locator` list is defined. | null |
| `socket-buffer-size` | Size of socket buffers for client-to-server communication. | 32768 |
| `statistic-interval` | Interval in milliseconds at which client statistics are sent to the server. A value of `-1` disables statistics. | -1 |
| `subscription-ack-interval` | Time in milliseconds between acknowledgments to the primary server for received events.<br/><br/>*Note:* Used only when `subscription-redundancy` is not `0`. | 100 |
| `subscription-enabled` | Indicates whether the server connects back to the client to send cache update events. Client bind address information is automatically passed to the server. | false |
| `subscription-message-tracking-timeout` | Time-to-live in milliseconds for entries in the client’s message tracking list. | 900000<br/>(15 minutes) |
| `subscription-redundancy` | Number of backup servers for highly available subscription queues. `0` = none, `-1` = all available servers. | 0 |


**Example:**

``` pre
<pool 
   name="publisher" 
   subscription-enabled="true">
     <locator 
       host="myLocatorAddress1" 
       port="12345"/>
     <locator 
       host="myLocatorAddress2" 
       port="45678"/>
</pool>
```

## &lt;locator&gt; {#locator}
Addresses and ports of the locators to connect to. You can define multiple locators for the pool.

**Note:**
Provide a locator list or `server` list, but not both.

**API:** `org.apache.geode.distributed.LocatorLauncher`

**&lt;locator&gt; Attributes**

| Attribute | Description                | Default |
|-----------|----------------------------|---------|
| host      | Hostname of the locator    | Â        |
| port      | Port number of the locator | Â        |

**Example:**

``` pre
<pool ...>
<locator 
       host="myLocatorHost" 
       port="12345"/>
```

## &lt;server&gt; {#server}
Addresses and ports of the servers to connect to.

**Note:**
Provide a server list or `locator` list, but not both.

**Default:**

**API:** `org.apache.geode.distributed.ServerLauncher`

**&lt;server&gt; Attributes**

| Attribute | Description               | Default |
|-----------|---------------------------|---------|
| host      | Hostname of the server    | Â        |
| port      | Port number of the server | Â        |

**Example:**

``` pre
<pool ...>
   <server 
       host="myServerHost" 
       port="123456"/>
</pool>
```

## &lt;disk-store&gt; {#disk-store}
Defines a pool of one or more disk stores, which can be used by regions, and client subscription queues.

**Default:** The cache default disk store, named "DEFAULT", is used when disk is used but no disk store is named.

**API:** `org.apache.geode.cache.DiskStore`

**&lt;disk-store&gt; Attributes**

<table>
<caption><span class="tablecap">Table 10. &lt;disk-store&gt; Attributes</span></caption>
<colgroup>
<col width="30%" />
<col width="50%" />
<col width="20%" />
</colgroup>
<thead>
<tr class="header">
<th>Attribute</th>
<th>Description</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td>name</td>
<td>The name of the Disk Store.</td>
<td>Â </td>
</tr>
<tr>
<td>auto-compact</td>
<td>Set to true to automatically compact the disk files.</td>
<td>Â </td>
</tr>
<tr>
<td>compaction-threshold</td>
<td>The threshold at which an oplog will become compactable. Until it reaches this threshold the oplog will not be compacted.
<p>The threshold is a percentage in the range 0 to 100.</p></td>
<td>Â </td>
</tr>
<tr>
<td>allow-force-compaction</td>
<td>Set to true to allow disk compaction to be forced on this disk store.</td>
<td>Â </td>
</tr>
<tr>
<td>max-oplog-size</td>
<td>The maximum size, in megabytes, of an oplog (operation log) file.</td>
<td>Â </td>
</tr>
<tr>
<td>time-interval</td>
<td>The number of milliseconds that can elapse before unwritten data is written to disk.</td>
<td>Â </td>
</tr>
<tr>
<td>write-buffer-size</td>
<td>The size of the write buffer that this disk store uses when writing data to disk. Larger values may increase performance but use more memory. The disk store allocates one direct memory buffer of this size.</td>
<td>Â </td>
</tr>
<tr>
<td>queue-size</td>
<td>Maximum number of operations that can be asynchronously queued to be written to disk.</td>
<td>Â </td>
</tr>
<tr>
<td>disk-usage-warning-percentage</td>
<td>Disk usage above this threshold generates a warning message. For example, if the threshold is set to 90%, then on a 1 TB drive falling under 100 GB of free disk space generates the warning.
<p>Set to &quot;0&quot; (zero) to disable.</p></td>
<td>90</td>
</tr>
<tr>
<td>disk-usage-critical-percentage</td>
<td>Disk usage above this threshold generates an error message and shuts down the member's cache. For example, if the threshold is set to 99%, then falling under 10 GB of free disk space on a 1 TB drive generates the error and shuts down the cache.
<p>Set to &quot;0&quot; (zero) to disable.</p></td>
<td>99</td>
</tr>
</tbody>
</table>

**Example:**

``` pre
<disk-store 
    name="DEFAULT" 
    allow-force-compaction="true">
     <disk-dirs>
        <disk-dir>/export/thor/customerData</disk-dir>
        <disk-dir>/export/odin/customerData</disk-dir>
        <disk-dir>/export/embla/customerData</disk-dir>
     </disk-dirs>
</disk-store>
```

## &lt;disk-dirs&gt; {#disk-dirs}
An element of a disk store that defines a set of `<disk-dir>` elements.

## &lt;disk-dir&gt; {#disk-dir}
Specifies a region or disk store's disk directory.

**&lt;disk-dir&gt; Attributes**

<table>
<colgroup>
<col width="30%" />
<col width="50%" />
<col width="20%" />
</colgroup>
<thead>
<tr class="header">
<th>Attribute</th>
<th>Description</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td>dir-size</td>
<td>Maximum amount of space to use for the disk store, in megabytes.</td>
<td>214748364
<p>(2 petabytes)</p></td>
</tr>
</tbody>
</table>

**Example:**

``` pre
<disk-dir 
    dir-size="20480">/host3/users/gf/memberA_DStore</disk-dir> 
```

## &lt;pdx&gt; {#pdx}
Specifies the configuration for the Portable Data eXchange (PDX) method of serialization.

**API:** `org.apache.geode.cache.CacheFactory.setPdxReadSerialized`, `setPdxDiskStore`, `setPdxPersistent`, `setPdxIgnoreUnreadFields` and `org.apache.geode.cache.ClientCacheFactory.setPdxReadSerialized`, `setPdxDiskStore`, `setPdxPersistent`, `setPdxIgnoreUnreadFields`

**&lt;pdx&gt; Attributes**

| Attribute            | Description                                                                                                                                                                                                | Default |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| read-serialized      | Set it to true if you want PDX deserialization to produce a PdxInstance instead of an instance of the domain class.                                                                                        | Â        |
| ignore-unread-fields | Set it to true if you do not want unread PDX fields to be preserved during deserialization. You can use this option to save memory. Set to true only in members that are only reading data from the cache. | Â        |
| persistent           | Set to true if you are using persistent regions. This causes the PDX type information to be written to disk.                                                                                               | Â        |
| disk-store-name      | If using persistence, this attribute allows you to configure the disk store that the PDX type data will be stored in. By default, the default disk store is used.                                          | Â        |

**Example:**

``` pre
<cache>
  <pdx persistent="true" disk-store-name="myDiskStore">
    <pdx-serializer>
      <class-name>
       org.apache.geode.pdx.ReflectionBasedAutoSerializer
      </class-name>
    <parameter name="classes">
      <string>com.company.domain.DomainObject</string>>
    </parameter>
  </pdx-serializer>
 </pdx>
  ...
</cache>
```

## &lt;pdx-serializer&gt; {#pdx-serializer_24898989679}
Allows you to configure the PdxSerializer for this Geode member.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**Default:**

**API:** `org.apache.geode.cache.CacheFactory.setPdxSerializer`

**Example:**

``` pre
<cache>
  <pdx>
    <pdx-serializer>
     <class-name>com.company.ExamplePdxSerializer</class-name>
    </pdx-serializer>
  </pdx> 
  ...
</cache>
```

## &lt;region-attributes&gt; {#region-attributes}
Specifies a region attributes template that can be named (by `id`) and referenced (by `refid`) later in the `cache.xml` and through the API.

**API:** `org.apache.geode.cache.RegionFactory` or `org.apache.geode.cache.ClientRegionFactory`

**&lt;region-attributes&gt; Attributes**

| Attribute | Description | Default |
|---|---|---|
| `concurrency-level` | Estimate of the max number of application threads that will concurrently access a region entry at one time. Does not apply to partitioned regions. Helps optimize system resources and reduce thread contention. Sets an initial parameter on the underlying `java.util.ConcurrentHashMap` used for storing region entries.<br/><br/>> **Note:** Before you modify this, read the concurrency level description, then see the Java API documentation for `java.util.ConcurrentHashMap`.<br/><br/>**API:** `setConcurrencyLevel`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes concurrency-level="10"><br/></region-attributes><br/>``` | 16 (threads) |
| `data-policy` | Specifies how the local cache handles region data. Controls behavior such as local data storage and region initialization.<br/><br/>> **Note:** Configure the most common options using region shortcuts: `RegionShortcut` and `ClientRegionShortcut`. The default `data-policy` of `normal` specifies local cache storage. The `empty` policy specifies no local storage. In region shortcuts, `empty` corresponds to `PROXY`. You can use an empty region for event delivery to and from the local cache without the memory overhead of data storage.<br/><br/>**Data policy values:**<br/><br/>- `empty` — No data storage in the local cache; region always appears empty. Use for “zero-footprint” producers/consumers that only distribute/receive events. To receive events, set the region’s `subscription-attributes` `interest-policy` to `all`.<br/>- `normal` — Data used locally (`get`, `put`, etc.) is stored in the local cache. Cache contents may differ from other caches.<br/>- `partition` — Data is partitioned across local and remote caches (partitioned region behavior). Additional config in `partition-attributes`.<br/>- `replicate` — Initializes from other caches; after init, all distributed region events are copied into the local region, maintaining a full replica. Operations that would cause divergence are not allowed. Compatible with local `scope` (behaves like normal).<br/>- `persistent-partition` — Like `partition`, plus persists to disk.<br/>- `persistent-replicate` — Like `replicate`, plus persists to disk.<br/>- `preloaded` — Initializes like replicated, then behaves like normal.<br/><br/>**API:** `setDataPolicy`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes data-policy="replicate"><br/></region-attributes><br/>```<br/><br/>This is similar to using a region shortcut with `refid`, however when you use the `REPLICATE` region shortcut, it automatically sets the region’s scope to `distributed-ack`.<br/><br/>```xml<br/><region-attributes refid="REPLICATE"><br/></region-attributes><br/>```<br/><br/>If you use `data-policy`, you must set the scope explicitly. | `normal` |
| `enable-async-conflation` | For TCP/IP peer distributions, controls whether asynchronous messages sent by the producer may be aggregated (conflated) when asynchronous queues are used for slow consumers. `false` disables conflation so all async messages are sent individually. Does not apply to client/server, UDP unicast, or multicast communication.<br/><br/>> **Note:** To use this attribute, the `multicast-enabled` region attribute and `disable-tcp` in `gemfire.properties` must be `false` (defaults). Also, async queues must be enabled for slow consumers (specified with the `async*` GemFire properties).<br/><br/>**API:** `setEnableAsyncConflation`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes enable-async-conflation="false"><br/></region-attributes><br/>``` | `true` |
| `enable-subscription-conflation` | For server regions, controls whether the server can conflate messages sent to the client. `true` enables conflation.<br/><br/>> **Note:** The client can override this with `conflate-events` in its `gemfire.properties`.<br/><br/>**API:** `setEnableSubscriptionConflation`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes enable-subscription-conflation="true"><br/></region-attributes><br/>``` | `false` |
| `gateway-sender-ids` | One or more gateway sender IDs used to distribute region events to remote sites. Multiple IDs are comma-separated.<br/><br/>**API:** `addGatewaySenderId`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes gateway-sender-ids="nwsender,swsender"><br/></region-attributes><br/>``` | not set |
| `async-event-queue-ids` | One or more async event queues used to distribute region events to an `AsyncEventListener` (for example, write-behind handling). Multiple IDs are comma-separated.<br/><br/>**API:** `addAsyncEventQueueId`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes async-event-queue-ids="customerqueue,ordersqueue"><br/></region-attributes><br/>``` | not set |
| `hub-id` | If `enable-gateway` is `true`, a comma-separated list of gateway hub IDs that receive events from the region.<br/><br/>Used only with GemFire 6.x gateway configs. For GemFire 7.0+, use `gateway-sender-id` on the `<region-attributes>` element. | `null` |
| `id` | Stores this region-attributes set in the cache under an identifier. Once stored, it can be retrieved using the region attribute `refid`.<br/><br/>**API:** `setId`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes id="persistent-replicated"><br/></region-attributes><br/>``` | not set |
| `ignore-jta` | Whether operations on this region participate in active JTA transactions (`false`) or ignore them and operate outside transactions (`true`). Commonly used by loaders/writers/listeners that must perform non-transactional operations (for example, caching a result set).<br/><br/>**API:** `setIgnoreJTA`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes ignore-jta="true"><br/></region-attributes><br/>``` | `false` |
| `index-update-type` | Whether indexes are maintained synchronously with region modifications or asynchronously in a background thread. In `cache.xml`, set `index-update-type` to `asynchronous` or `synchronous`. In API, use `setIndexMaintenanceSynchronous(boolean)`.<br/><br/>**API:** `setIndexMaintenanceSynchronous`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes index-update-type="asynchronous"><br/></region-attributes><br/>``` | synchronous updates |
| `initial-capacity` | Along with `load-factor`, sets initial parameters on the underlying `java.util.ConcurrentHashMap` used for storing region entries.<br/><br/>**API:** `setInitialCapacity`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes initial-capacity="20"><br/></region-attributes><br/>``` | 16 |
| `is-lock-grantor` | Whether this member designates itself as lock grantor at region creation time. Does not reflect current grantor state (which can change later). Relevant only for regions with `global` `scope` (locking allowed). Affects implicit and explicit locking.<br/><br/>**API:** `setLockGrantor`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes is-lock-grantor="true"><br/></region-attributes><br/>``` | `false` |
| `load-factor` | With `initial-capacity`, sets initial parameters on the underlying `java.util.ConcurrentHashMap`. Must be a floating-point number between 0 and 1 inclusive.<br/><br/>> **Note:** Before setting this, read the discussion of initial capacity and load factor, then see the Java API docs for `java.util.ConcurrentHashMap`.<br/><br/>**API:** `setLoadFactor`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes load-factor="0.85"><br/></region-attributes><br/>``` | 0.75 |
| `mirror-type` | Deprecated. | *(none)* |
| `multicast-enabled` | Whether distributed operations on a region should use multicasting. Requires multicast enabled for the cluster using the `mcast-port` setting in `gemfire.properties`.<br/><br/>**API:** `setMulticastEnabled`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes multicast-enabled="true"><br/></region-attributes><br/>``` | `false` |
| `pool-name` | Identifies the region as a client region and specifies the server pool it uses. The named pool must be defined before the region is created. If not set, the region does not connect to servers as a client region.<br/><br/>**API:** `setPoolName`<br/><br/>**Examples:**<br/><br/>Multiple pools defined — pool-name required:<br/><br/>```xml<br/><client-cache><br/>  <pool name="DatabasePool" subscription-enabled="true"><br/>    ...<br/>  </pool><br/>  <pool name="OtherPool" subscription-enabled="true"><br/>    ...<br/>  </pool><br/>  <region ...><br/>    <region-attributes pool-name="DatabasePool"><br/>    </region-attributes><br/>    ...<br/>  </region><br/></client-cache><br/>```<br/><br/>Single pool defined — pool-name implied:<br/><br/>```xml<br/><client-cache><br/>  <pool name="publisher" subscription-enabled="true"><br/>    ...<br/>  </pool><br/>  <region name="myRegion" refid="CACHING_PROXY"><br/>  </region><br/></client-cache><br/>``` | not set |
| `disk-store-name` | Assigns the region to a named disk store defined in the cache. Use persistent region definitions or overflow eviction to write to disk. Disk store controls directories, write behavior, and other maintenance settings. `disk-synchronous` controls sync vs async writes.<br/><br/>**API:** `setDiskStoreName`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes disk-store-name="myStoreA"><br/></region-attributes><br/>``` | `null` |
| `disk-synchronous` | For disk-writing regions, whether disk writes are synchronous.<br/><br/>**API:** `setDiskSynchronous`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes disk-store-name="myStoreA" disk-synchronous="true"><br/></region-attributes><br/>``` | `true` |
| `refid` | Initializes attributes using a region shortcut or a user-defined named region-attributes set.<br/><br/>**API:** `setRefId`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes refid="persistent-replicated"><br/>  <!-- Override any stored attribute settings that you need to ... --><br/></region-attributes><br/>``` | not set |
| `scope` | Determines how updates are distributed to other caches where the region/entry exist. Also affects remote invocation for some event handlers and whether region entry versions are used for consistent updates across replicated regions.<br/><br/>> **Note:** Many common options are available via region shortcuts in `RegionShortcut` and `ClientRegionShortcut`.<br/><br/>> **Note:** Server regions that are not partitioned must be replicated with `distributed-ack` or `global` scope. Shortcuts for `REPLICATE` use `distributed-ack` scope.<br/><br/>**Scope values:**<br/><br/>- `local` — No distribution; region visible only to threads in the member.<br/>- `distributed-no-ack` — Distributes events with no acknowledgment required.<br/>- `distributed-ack` — Distributes events with acknowledgment required; uses entry versions for consistent updates across members.<br/>- `global` — Distributes events with global locking to ensure consistency.<br/><br/>**API:** `setScope`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes scope="distributed-ack"><br/></region-attributes><br/>``` | `distributed-no-ack` |
| `statistics-enabled` | Whether to gather region statistics. Must be `true` to use expiration. Statistics are kept in `org.apache.geode.cache.CacheStatistics` and available via `Region.getStatistics` and `Region.Entry.getStatistics`.<br/><br/>**API:** `setStatisticsEnabled`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes statistics-enabled="true"><br/></region-attributes><br/>``` | `false` |
| `cloning-enabled` | How `fromDelta` applies deltas locally. When `true`, updates apply to a clone and the clone is stored. When `false`, the value is modified in place.<br/><br/>**API:** `setCloningEnabled`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes cloning-enabled="true"><br/></region-attributes><br/>``` | `false` |
| `concurrency-checks-enabled` | Whether members perform checks to handle concurrent or out-of-order updates consistently for distributed regions. See [Consistency for Region Updates](../../developing/distributed_regions/region_entry_versions#topic_CF2798D3E12647F182C2CEC4A46E2045).<br/><br/>> **Note:** Client-cache applications may disable concurrency checking to see all events. Servers can keep checks enabled while still passing all events to the client. This ensures the client sees all events but does not prevent the client cache from becoming out-of-sync. <br/><br/>**API:** `setConcurrencyChecksEnabled`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes concurrency-checks-enabled="true"><br/></region-attributes><br/>``` | `true` |
| `off-heap` | Stores entry values off-heap (including region entries and queue entries). Heap is still used for keys and the `ConcurrentHashMap`.<br/><br/>**API:** `setOffHeap`<br/><br/>**Example:**<br/><br/>```xml<br/><region-attributes off-heap="true"><br/></region-attributes><br/>``` | `false` |

## &lt;key-constraint&gt; {#key-constraint}
Defines the type of object to be allowed for the region entry keys. This must be a fully-qualified class name. The attribute ensures that the keys for the region entries are all of the same class. If key-constraint is not used, the region’s keys can be of any class. This attribute, along with value-constraint, is useful for querying and indexing because it provides object type information to the query engine.

**Note:**
Set the constraint in every cache where you create or update the region entries. For client/server installations, match constraints between client and server and between clusters. The constraint is only checked in the cache that does the entry `put` or `create` operation. To avoid deserializing the object, the constraint is not checked when the entry is distributed to other caches.

**Default:** not set

**API:** `org.apache.geode.cache.RegionFactory.setKeyConstraint`

**Example:**

``` pre
<region-attributes>
  <key-constraint>
   java.lang.String
  </key-constraint>
</region-attributes>
```

## &lt;value-constraint&gt; {#value-constraint}
Defines the type of object to be allowed for the region entry values. This must be a fully-qualified class name. If value constraint isn’t used, the region’s value can be of any class. This attribute, along with `key-constraint`, is useful for querying and indexing because it provides object type information to the query engine.

**Note:**
Set the constraint in every cache where you create or update the region entries. For client/server installations, match constraints between client and server and between clusters. The constraint is only checked in the cache that does the entry `put` or `create` operation. To avoid deserializing the object, the constraint is not checked when the entry is distributed to other caches.

**Default:** not set

**API:** `org.apache.geode.cache.RegionFactory.setValueConstraint`

**Example:**

``` pre
<region-attributes>
  <value-constraint>
   cacheRunner.Portfolio
  </value-constraint>
</region-attributes>
```

## &lt;region-time-to-live&gt; {#region-time-to-live}
Expiration setting that specifies how long the region can remain in the cache without anyone accessing or updating it.

**Default:** not set - no expiration of this type

**API:** `org.apache.geode.cache.RegionFactory.setRegionTimeToLive`

**Example:**

``` pre
<region-attributes 
  statistics-enabled="true">
  <region-time-to-live>
    <expiration-attributes 
      timeout="3600" 
      action="local-destroy"/>
  </region-time-to-live>
</region-attributes>
```

## &lt;expiration-attributes&gt; {#expiration-attributes}
Within the `entry-time-to-live` or `entry-idle-time` element, this element specifies the expiration rules for removing old region entries that you are not using. You can destroy or invalidate entries, either locally or across the cluster. Within the `region-time-to-live` or `region-idle-time` element, this element specifies the expiration rules for the entire region.

**API:** See APIs for `entry-time-to-live`, `entry-idle-time`, `region-time-to-live`, `region-idle-time`

**&lt;expiration-attributes&gt; Attributes**

| Attribute | Description | Default |
|---|---|---|
| `timeout` | Number of seconds before a region or an entry expires. If `timeout` is not specified, it defaults to `0` (which means no expiration). | `0` |
| `action` | Action that should take place when a region or an entry expires.<br/><br/>Select one of the following expiration actions:<br/><br/>- `local-destroy` — Removes the region or entry from the local cache, but does not distribute the removal operation to remote members. You cannot use this action on partitioned region entries.<br/>- `destroy` — Removes the region or entry completely from the cache. Destroy actions are distributed according to the region’s distribution settings. Use this option when the region or entry is no longer needed for any application in the cluster.<br/>- `invalidate` — Default expiration action. Marks an entry or all entries in the region as invalid. Distributes the invalidation according to the region’s scope. This is the proper choice when the region or the entry is no longer valid for any application in the cluster.<br/>- `local-invalidate` — Marks an entry or all entries in the region as invalid but does not distribute the operation. You cannot use this action on partitioned region entries. Local region invalidation is only supported for regions that are not configured as replicated regions. | `invalidate` |


**Example:**

``` pre
<region-attributes 
  statistics-enabled="true">
   <region-time-to-live>
      <expiration-attributes 
        timeout="60" 
        action="local-destroy"/>
   </region-time-to-live>
</region-attributes>
```

## &lt;custom-expiry&gt; {#custom-expiry}
Specifies the custom class that implements `org.apache.geode.cache.CustomExpiry`. You define this class in order to override the region-wide settings for specific entries. See [Configure Data Expiration](../../developing/expiration/configuring_data_expiration) for an example.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

**API:** `org.apache.geode.cache.RegionFactory.setCustomEntryIdleTimeout`, `setCustomeEntryTimeToLive`

**Example:**

``` pre
<region-attributes>
    <expiration-attributes 
       timeout="60" 
       action="local-destroy">
      <custom-expiry> 
        <class-name>
          com.megaconglomerate.mypackage.MyClass
        </class-name> 
      </custom-expiry>
</region-attributes>
```

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

## &lt;region-idle-time&gt; {#region-idle-time}
Expiration setting that specifies how long the region can remain in the cache without anyone accessing it.

**Note:**
To ensure reliable read behavior across the partitioned region, use `region-time-to-live` for region expiration instead of this setting.

**Default:** not set - no expiration of this type

**API:** `org.apache.geode.cache.RegionFactory.setRegionIdleTimeout`

**Example:**

``` pre
<region-attributes statistics-enabled="true">
  <region-idle-time>
    <expiration-attributes 
      timeout="3600" 
      action="local-destroy"/>
  </region-idle-time>
</region-attributes>
```

## &lt;expiration-attributes&gt; {#region-idle-time_expiration-attributes}
Within the `entry-time-to-live` or `entry-idle-time` element, this element specifies the expiration rules for removing old region entries that you are not using. You can destroy or invalidate entries, either locally or across the cluster. Within the `region-time-to-live` or `region-idle-time` element, this element specifies the expiration rules for the entire region.

**API:** See APIs for `entry-time-to-live`, `entry-idle-time`, `region-time-to-live`, `region-idle-time`

**&lt;expiration-attributes&gt; Attributes**

| Attribute | Description | Default |
|---|---|---|
| `timeout` | Number of seconds before a region or an entry expires. If `timeout` is not specified, it defaults to `0` (which means no expiration). | `0` |
| `action` | Action that should take place when a region or an entry expires.<br/><br/>Select one of the following expiration actions:<br/><br/>- `local-destroy` — Removes the region or entry from the local cache, but does not distribute the removal operation to remote members. You cannot use this action on partitioned region entries.<br/>- `destroy` — Removes the region or entry completely from the cache. Destroy actions are distributed according to the region's distribution settings. Use this option when the region or entry is no longer needed for any application in the cluster.<br/>- `invalidate` — Default expiration action. Marks an entry or all entries in the region as invalid. Distributes the invalidation according to the region's scope. This is the proper choice when the region or the entry is no longer valid for any application in the cluster.<br/>- `local-invalidate` — Marks an entry or all entries in the region as invalid but does not distribute the operation. You cannot use this action on partitioned region entries. Local region invalidation is only supported for regions that are not configured as replicated regions. | `invalidate` |


**Example:**

``` pre
<region-attributes 
  statistics-enabled="true">
   <region-idle-time>
      <expiration-attributes 
        timeout="60" 
        action="local-destroy"/>
   </region-idle-time>
</region-attributes>
```

## &lt;custom-expiry&gt; {#region-idle-time_custom-expiry}
Specifies the custom class that implements `org.apache.geode.cache.CustomExpiry`. You define this class in order to override the region-wide settings for specific entries. See [Configure Data Expiration](../../developing/expiration/configuring_data_expiration) for an example.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

**API:** `org.apache.geode.cache.RegionFactory.setCustomEntryIdleTimeout`, `setCustomeEntryTimeToLive`

**Example:**

``` pre
<region-attributes>
    <expiration-attributes 
       timeout="60" 
       action="local-destroy">
      <custom-expiry> 
        <class-name>
          com.megaconglomerate.mypackage.MyClass
        </class-name> 
      </custom-expiry>
</region-attributes>
```

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

## &lt;entry-time-to-live&gt; {#entry-time-to-live}
Expiration setting that specifies how long the region’s entries can remain in the cache without anyone accessing or updating them. See [&lt;expiration-attributes&gt;](#expiration-attributes) for details.

**Default:** not set - no expiration of this type.

**API:** `org.apache.geode.cache.RegionFactory.setEntryTimeToLive`

**Example:**

``` pre
<region-attributes
  statistics-enabled="true">
  <entry-time-to-live>
    <expiration-attributes
     timeout="60"
     action="local-destroy"/>
  </entry-time-to-live>
</region-attributes>
```

## &lt;expiration-attributes&gt; {#entry-time-to-live_expiration-attributes}
Within the `entry-time-to-live` or `entry-idle-time` element, this element specifies the expiration rules for removing old region entries that you are not using. You can destroy or invalidate entries, either locally or across the cluster. Within the `region-time-to-live` or `region-idle-time` element, this element specifies the expiration rules for the entire region.

**API:** See APIs for `entry-time-to-live`, `entry-idle-time`, `region-time-to-live`, `region-idle-time`

**&lt;expiration-attributes&gt; Attributes**

| Attribute | Default | Description |
|---|---:|---|
| `timeout` | `0` | Number of seconds before a region or an entry expires. If `timeout` is not specified, it defaults to `0` (which means no expiration). |
| `action` | `invalidate` | Action that should take place when a region or an entry expires. See the expiration actions below. |

**Expiration actions (for `action`):**

- `local-destroy` — Removes the region or entry from the local cache, but does not distribute the removal operation to remote members. You cannot use this action on partitioned region entries.
- `destroy` — Removes the region or entry completely from the cache. Destroy actions are distributed according to the region's distribution settings. Use this option when the region or entry is no longer needed for any application in the cluster.
- `invalidate` *(default)* — Marks an entry or all entries in the region as invalid. Distributes the invalidation according to the region's scope. This is the proper choice when the region or the entry is no longer valid for any application in the cluster.
- `local-invalidate` — Marks an entry or all entries in the region as invalid but does not distribute the operation. You cannot use this action on partitioned region entries. Local region invalidation is only supported for regions that are not configured as replicated regions.


**Example:**

``` pre
<region-attributes 
  statistics-enabled="true">
   <entry-time-to-live>
      <expiration-attributes 
        timeout="60" 
        action="local-destroy"/>
   </entry-time-to-live>
</region-attributes>
```

## &lt;custom-expiry&gt; {#entry-time-to-live_custom_expiry}
Specifies the custom class that implements `org.apache.geode.cache.CustomExpiry`. You define this class in order to override the region-wide settings for specific entries. See [Configure Data Expiration](../../developing/expiration/configuring_data_expiration) for an example.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

**API:** `org.apache.geode.cache.RegionFactory.setCustomEntryIdleTimeout`, `setCustomeEntryTimeToLive`

**Example:**

``` pre
<region-attributes>
    <expiration-attributes 
       timeout="60" 
       action="local-destroy">
      <custom-expiry> 
        <class-name>
          com.megaconglomerate.mypackage.MyClass
        </class-name> 
      </custom-expiry>
</region-attributes>
```

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

## &lt;entry-idle-time&gt; {#entry-idle-time}
Expiration setting that specifies how long the region’s entries can remain in the cache without anyone accessing them. See [&lt;expiration-attributes&gt;](#expiration-attributes) for details.

**Note:**
To ensure reliable read behavior across the partitioned region, use `entry-time-to-live` for entry expiration instead of this setting.

**API:** `org.apache.geode.cache.RegionFactory.setEntryIdleTimeout`

**Example:**

``` pre
<region-attributes 
  statistics-enabled="true">
  <entry-idle-time>
    <expiration-attributes 
      timeout="60" 
      action="local-invalidate"/>
    </expiration-attributes>
  </entry-idle-time>
</region-attributes>
```

## &lt;expiration-attributes&gt; {#entry-idle-time_expiration-attributes}
Within the `entry-time-to-live` or `entry-idle-time` element, this element specifies the expiration rules for removing old region entries that you are not using. You can destroy or invalidate entries, either locally or across the cluster. Within the `region-time-to-live` or `region-idle-time` element, this element specifies the expiration rules for the entire region.

**API:** See APIs for `entry-time-to-live`, `entry-idle-time`, `region-time-to-live`, `region-idle-time`

**&lt;expiration-attributes&gt; Attributes**

| Attribute | Description | Default |
|---|---|---|
| `timeout` | Number of seconds before a region or an entry expires. If `timeout` is not specified, it defaults to `0` (which means no expiration). | `0` |
| `action` | Action that should take place when a region or an entry expires. See expiration actions below. | `invalidate` |

**Expiration actions (for `action`):**

- `local-destroy` — Removes the region or entry from the local cache, but does not distribute the removal operation to remote members. You cannot use this action on partitioned region entries.
- `destroy` — Removes the region or entry completely from the cache. Destroy actions are distributed according to the region's distribution settings. Use this option when the region or entry is no longer needed for any application in the cluster.
- `invalidate` *(default)* — Marks an entry or all entries in the region as invalid. Distributes the invalidation according to the region's scope. This is the proper choice when the region or the entry is no longer valid for any application in the cluster.
- `local-invalidate` — Marks an entry or all entries in the region as invalid but does not distribute the operation. You cannot use this action on partitioned region entries. Local region invalidation is only supported for regions that are not configured as replicated regions.


**Example:**

``` pre
<region-attributes 
  statistics-enabled="true">
   <entry-idle-time>
      <expiration-attributes 
        timeout="60" 
        action="local-destroy"/>
   </entry-idle-time>
</region-attributes>
```

## &lt;custom-expiry&gt; {#entry-idle-time_custom-expiry}
Specifies the custom class that implements `org.apache.geode.cache.CustomExpiry`. You define this class in order to override the region-wide settings for specific entries. See [Configure Data Expiration](../../developing/expiration/configuring_data_expiration) for an example.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

**API:** `org.apache.geode.cache.RegionFactory.setCustomEntryIdleTimeout`, `setCustomeEntryTimeToLive`

**Example:**

``` pre
<region-attributes>
    <expiration-attributes 
       timeout="60" 
       action="local-destroy">
      <custom-expiry> 
        <class-name>
          com.megaconglomerate.mypackage.MyClass
        </class-name> 
      </custom-expiry>
</region-attributes>
```

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

## &lt;partition-attributes&gt; {#partition-attributes}
Defines the region as partitioned and controls partitioning behavior. This is set during the region creation in the first data store for the partitioned region.

**Note:**
With the exception of `local-max-memory`, all members defining a partitioned region must use the same partition attribute settings.

**API:** `org.apache.geode.cache.RegionFactory.setPartitionAttributes`

**&lt;partition-attributes&gt; Attributes**

| Attribute              | Description        | Default              |
|------------------------|--------------------|----------------------|
| colocated-with         | The full name of a region to colocate with this region. The named region must exist before this region is created.                                     | null                 |
| local-max-memory       | Maximum megabytes of memory set aside for this region in the local member. This is all memory used for this partitioned region - for primary buckets and any redundant copies. This value must be smaller than the Java settings for the initial or maximum JVM heap. When the memory use goes above this value, @@product_name@@ issues a warning, but operation continues. Besides setting the maximum memory to use for the member, this setting also tells @@product_name@@ how to balance the load between members where the region is defined. For example, if one member sets this value to twice the value of another member’s setting, @@product_name@@ works to keep the ratio between the first and the second at two-to-one, regardless of how little memory the region consumes. This is a local parameter that applies only to the local member. A value of 0 disables local data caching. | 90% (of local heap)  |
| recovery-delay         | Applies when `redundant-copies` is greater than zero. The number of milliseconds to wait after a member crashes before reestablishing redundancy for the region. A setting of -1 disables automatic recovery of redundancy after member failure.             | -1                   |
| redundant-copies       | Number of extra copies that the partitioned region must maintain for each entry. Range: 0-3. If you specify 1, this partitioned region maintains the original and one backup, for a total of two copies. A value of 0 disables redundancy. | 0                    |
| startup-recovery-delay | Applies when `redundant-copies` is greater than zero. The number of milliseconds a newly started member should wait before trying to satisfy redundancy of region data stored on other members. A setting of -1 disables automatic recovery of redundancy after new members join. | 0                    |
| total-max-memory       | Maximum combined megabytes of memory to be used by all processes hosting this region for all copies, primary and redundant. | ` Integer.MAX_VALUE` |
| total-num-buckets      | Total number of buckets or data storage areas allotted for the entire partitioned region in the distributed cache. As data moves from one member to another, the entries in a bucket move as one unit. This value should be a prime number at least four times the number of data stores. More buckets increases overhead, however, especially when redundant-copies = 2 or 3 .| 113                  |

**Example:**

``` pre
<region-attributes>
  <partition-attributes 
   redundant-copies="1" 
   total-num-buckets= "613"/>
</region-attributes>
```

## &lt;partition-resolver&gt; {#partition-resolver}
Describes a custom PartitionResolver for a region.

**API:** `org.apache.geode.cache.PartitionAttributesFactory.setPartitionResolver`

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**&lt;partition-resolver&gt; Attributes**

| Attribute | Description                                | Default |
|-----------|--------------------------------------------|---------|
| name      | The name of this custom PartitionResolver. |         |

**Example:**

``` pre
<region name="trades">
  <region-attributes>
      <partition-attributes>
          <partition-resolver name="TradesPartitionResolver"> 
              <class-name>myPackage.TradesPartitionResolver
              </class-name>
          </partition-resolver>
      </partition-attributes>
  </region-attributes>
</region>
```

## &lt;partition-listener&gt; {#partition-listener}
Defines a custom PartitionListener for a partitioned region.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**API:** `org.apache.geode.cache.PartitionAttributesFactory.PartitionListener`

**Example:**

``` pre
<partition-attributes redundant-copies="1">
     <partition-listener>
         <class-name>com.myCompany.ColocatingPartitionListener</class-name.
          <parameter name="viewRegions">
              <string>/customer/ViewA,/customer/ViewB</string>
          </parameter>             
     </partition-listener>
 </partition-attributes>
```

## &lt;fixed-partition-attributes&gt; {#fixed-partition-attributes}
Describes a partition in a Fixed Partitioned Region.

**API:** `org.apache.geode.cache.PartitionAttributesFactory.addFixedPartitionAttributes`

**&lt;fixed-partition-attributes&gt; Attributes**

| Attribute      | Description                                             | Default |
|----------------|---------------------------------------------------------|---------|
| partition-name | The name of this fixed partition.                       |         |
| is-primary     | Set to true if this partition is the primary partition. | false   |
| num-buckets    | The number of buckets assigned to this partition.       |         |


**Example:**

``` pre
<cache>
   <region name="Trades">
      <region-attributes>
         <partition-attributes 
          redundant-copies="1"> 
          <partition-resolver name="QuarterFixedPartitionResolver">
             <fixed-partition-attributes 
               partition-name="Q1" 
               is-primary="true"/>
             <fixed-partition-attributes 
               partition-name="Q3" 
               is-primary="false" 
               num-buckets="6"/>
         </partition-attributes> 
      </region-attributes>
   </region>
</cache>
```

## &lt;membership-attributes&gt; {#membership-attributes}
Establishes reliability requirements and behavior for a region. Use this to configure the region to require one or more membership roles to be running in the system for reliable access to the region. You can set up your own roles, such as producer or backup, specifying each role as a string. Membership attributes have no effect unless one or more required roles are specified.

**API:** `org.apache.geode.cache.RegionFactory.setMembershipAttributes`

**&lt;membership-attributes&gt; Attributes**

| Attribute | Description | Default |
|-----------|------------|---------|
| `loss-action` | Specifies how access to the region is affected when one or more required roles are lost. See loss actions below. | `no_access` |
| `resumption-action` | Specifies how the region is affected when missing required roles return to membership. See resumption actions below. | `reinitialize` |

### Loss Actions (`loss-action`)

- `full-access`  
  Access to the region is unaffected when required roles are missing.

- `limited-access`  
  Only local access to the region is allowed when required roles are missing.

- `no-access`  
  The region is unavailable when required roles are missing.

- `reconnect`  
  Loss of required roles causes the entire cache to be closed.

### Resumption Actions (`resumption-action`)

- `none`  
  No special action takes place when reliability resumes.

- `reinitialize`  
  Resumption of reliability clears all region data. Replicated regions perform a new `getInitialImage` operation to repopulate the region.

**Example:**

``` pre
<!-- If there is no "producer" member 
  running, do not allow access to the region -->
<region-attributes>
  <membership-attributes 
    loss-action="no-access" 
    resumption-action="none">
    <required-role 
      name="producer">
    </required-role>
  </membership-attributes>
</region-attributes>
```

## &lt;required-role&gt; {#required-role}
Specifies a role that is required for reliable access to the region.

**API:** `org.apache.geode.cache.MembershipAttributes`

**&lt;required-role&gt; Attributes**

| Attribute | Description                    | Default |
|-----------|--------------------------------|---------|
| name      | The name of the required role. |         |

**Example:**

``` pre
<membership-attributes 
  loss-action="no-access" 
  resumption-action="none">
    <required-role name="producer"/>
</membership-attributes>
```

## &lt;subscription-attributes&gt; {#subscription-attributes}
Specifies subscriber requirements and behavior for the region. There is one subscription attribute, `interest-policy`, that defines which distributed entry events are delivered to the local region.

**Note:**
The interest policy determines which events are delivered, but the `data-policy` determines how the events are applied to the cache.

**API:** `org.apache.geode.cache.RegionFactory.setSubscriptionAttributes`

**&lt;subscription-attributes&gt; Attributes**

| Attribute | Description | Default |
|-----------|------------|---------|
| `interest-policy` | Determines which events a client registers interest in. See options below. | `cache-content` |

### Interest Policy Options

- `cache-content`  
  *(Default)* Registers interest only in events for entries that are already present in the local region.  
  For partitioned regions, the local member must hold the **primary copy** of the entry’s data.

- `all`  
  Registers interest in events for **all entries** in the distributed or partitioned region,  
  regardless of whether they exist in the local cache.


**Example:**

``` pre
<region-attributes>
  <subscription-attributes 
   interest-policy="all"/>
</region-attributes>
```

## &lt;cache-loader&gt; {#topic_qsb_pnw_bm}
An event-handler plug-in that allows you to program for cache misses. At most, one cache loader can be defined in each member for the region. For distributed regions, a cache loader may be invoked remotely from other members that have the region defined. When an entry get results in a cache miss in a region with a cache loader defined, the loader’s <span class="keyword apiname">load</span> method is called. This method is usually programmed to retrieve data from an outside data source, but it can do anything required by your application.

For partitioned regions, if you want to have a cache loader, install an instance of the cache loader in every data store. Partitioned regions support partitioned loading, where each cache loader loads only the data entries in the local member. If data redundancy is configured, data is loaded only if the local member holds the primary copy.

**API:** `org.apache.geode.cache.RegionFactory.setCacheLoader`

**Example:**

``` pre
<region-attributes>
  <cache-loader>
    <class-name>quickstart.SimpleCacheLoader</class-name>
  </cache-loader>
</region-attributes>
```

## &lt;cache-writer&gt; {#topic_h53_pnw_bm}
An event-handler plug-in that allows you to receive before-event notification for changes to the region and its entries. It also has the ability to cancel events. At most, one cache writer can be defined in each member for the region. A cache writer may be invoked remotely from other members that have the region defined.

**API:** `org.apache.geode.cache.RegionFactory.setCacheWriter`

**Example:**

``` pre
<region-attributes>
  <cache-writer>
    <class-name>quickstart.SimpleCacheWriter</class-name>
  </cache-writer>
</region-attributes>
```

## &lt;cache-listener&gt; {#cache-listener}
An event-handler plug-in that receives after-event notification of changes to the region and its entries. Any number of cache listeners can be defined for a region in any member. @@product_name@@ offers several listener types with callbacks to handle data and process events. Depending on the `data-policy` and the `interest-policy` subscription attributes, a cache listener may receive only events that originate in the local cache, or it may receive those events along with events that originate remotely.

Specify the Java class for the cache listener and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**API:** `org.apache.geode.cache.RegionFactory.addCacheListener`

**Example:**

``` pre
<region-attributes>
  <cache-listener>
    <class-name>
      quickstart.SimpleCacheListener
    </class-name>
  </cache-listener>
</region-attributes>
```

## &lt;compressor&gt; {#topic_pcd_t25_44}
A compressor registers a custom class that extends `Compressor` to support compression on a region.

**Example:**

``` pre
 ...
<compressor>
<class-name>
            <parameter>
               <string>
               <declarable>
</compressor>
...
```

## &lt;eviction-attributes&gt; {#eviction-attributes}
Specifies whether and how to control a region’s size. Size is controlled by removing least recently used (LRU) entries to make space for new ones. This may be done through destroy or overflow actions. You can configure your region for lru-heap-percentage with an eviction action of local-destroy using stored region attributes.

**Default:** Uses the lru-entry-count algorithm.

**API:** `org.apache.geode.cache.RegionFactory.setEvictionAttributes`

**Example:**

``` pre
<region-attributes>
  <eviction-attributes> 
    <lru-entry-count 
      maximum="1000" 
      action="overflow-to-disk"/>
  </eviction-attributes>
</region-attributes
```

## &lt;lru-entry-count&gt; {#lru-entry-count}
Using the maximum attribute, specifies maximum region capacity based on entry count.

**&lt;lru-entry-count&gt; Attributes**

| Attribute | Description | Default |
|-----------|------------|---------|
| `action` | Eviction action to apply when the limit is reached. See options below. | `local-destroy` |
| `maximum` | Maximum number of entries allowed in the region. | — |

### Eviction Action Options

- `local-destroy`  
  Removes the entry from the **local cache only** and does not distribute the removal to remote members.
    - Can be applied to entries in a **partitioned region**, but **not recommended** when `redundant-copies > 0` because it can create inconsistencies between redundant buckets.
    - When used on a **replicated region**, Geode silently changes the region type to **preloaded** to allow the local modification.

- `overflow-to-disk`  
  Moves the entry’s **value** to disk and sets the in-memory value to `null`.  
  The **key remains in memory**.


## &lt;lru-heap-percentage&gt; {#lru-heap-percentage}
Runs evictions when the @@product_name@@ resource manager says to. The manager orders
evictions when the total cache size is over the heap or off-heap percentage limit specified in the resource manager
configuration. You can declare a Java class that implements the ObjectSizer interface to measure the
size of objects in the Region.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**&lt;lru-heap-percentage&gt; Attributes**

| Attribute | Description | Default |
|-----------|------------|---------|
| `action` | Eviction action to apply when the limit is reached. See options below. | `local-destroy` |

### Eviction Action Options

- `local-destroy`  
  Removes the entry from the **local cache only** and does not distribute the removal to remote members.
    - Can be applied to entries in a **partitioned region**, but **not recommended** when `redundant-copies > 0` because it can create inconsistencies between redundant buckets.
    - When used on a **replicated region**, Geode silently changes the region type to **preloaded** to allow the local modification.

- `overflow-to-disk`  
  Moves the entry’s **value** to disk and sets the in-memory value to `null`.  
  The **key remains in memory**.

## &lt;lru-memory-size&gt; {#lru-memory-size}
Using the maximum attribute, specifies maximum region capacity based on the amount of memory used, in megabytes. You can declare a Java class that implements the ObjectSizer interface to measure the size of objects in the Region.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**&lt;lru-memory-size&gt; Attributes**

| Attribute | Description | Default |
|-----------|------------|---------|
| `action` | Eviction action to apply when the limit is reached. See options below. | `local-destroy` |
| `maximum` | The maximum amount of memory used in the region, in megabytes. |  |

### Eviction Action Options

- `local-destroy`  
  Removes the entry from the **local cache only** and does not distribute the removal to remote members.
    - Can be applied to entries in a **partitioned region**, but **not recommended** when `redundant-copies > 0` because it can create inconsistencies between redundant buckets.
    - When used on a **replicated region**, Geode silently changes the region type to **preloaded** to allow the local modification.

- `overflow-to-disk`  
  Moves the entry’s **value** to disk and sets the in-memory value to `null`.  
  The **key remains in memory**.


## &lt;jndi-bindings&gt; {#jndi-bindings}
Specifies the binding for a data-source used in transaction management. See [Configuring Database Connections Using JNDI](../../developing/outside_data_sources/configuring_db_connections_using_JNDI).

**Example:**

``` pre
<jndi-bindings>
      <jndi-binding type="XAPooledDataSource" 
    jndi-name="newDB2trans" 
    init-pool-size="20" 
    max-pool-size="100"
    idle-timeout-seconds="20"
    blocking-timeout-seconds="5" 
    login-timeout-seconds="10"
    xa-datasource-class="org.apache.derby.jdbc.EmbeddedXADataSource"
    user-name="mitul" 
    password="encrypted(83f0069202c571faf1ae6c42b4ad46030e4e31c17409e19a)">
         <config-property>
          <config-property-name>Description</config-property-name>
          <config-property-type>java.lang.String</config-property-type>
          <config-property-value>pooled_transact</config-property-value>
       </config-property>
          <config-property>
             <config-property-name>DatabaseName</config-property-name>
             <config-property-type>java.lang.String</config-property-type>
             <config-property-value>newDB</config-property-value>
          </config-property>
          <config-property>
             <config-property-name>CreateDatabase</config-property-name>
             <config-property-type>java.lang.String</config-property-type>
             <config-property-value>create</config-property-value>
          </config-property>         
       . . .
      </jndi-binding>
   </jndi-bindings>
```

## &lt;jndi-binding&gt; {#jndi-binding}
For every datasource that is bound to the JNDI tree, there should be one `<jndi-binding>` element. This element describes the property and the configuration of the datasource. @@product_name@@ uses the attributes of the `<jndi-binding>` element for configuration. Use the `<config-property>` element to configure properties for the datasource.

We recommend that you set the username and password with the `user-name` and `password` jndi-binding attributes rather than using the `<config-property>` element.

**&lt;jndi-binding&gt; Attributes**

| Attribute | Description | Default |
|-----------|------------|---------|
| `blocking-timeout-seconds` | Number of seconds a connection remains associated with a transaction before being disassociated. | `120` |
| `conn-pooled-datasource-class` | Java class used for the `PooledDataSource` type. |  |
| `connection-url` | URL for connecting to the datasource. **Note:** For XA drivers (`XAPooledDataSource`), do not use this attribute. Instead define `<config-property>` database properties. |  |
| `idle-timeout-seconds` | Maximum number of seconds a connection can remain idle in a pool before removal. | `600` |
| `init-pool-size` | Initial pool size of a `PooledConnection` (XA or non-XA). | `10` |
| `jdbc-driver-class` | Java class used for the `SimpleDataSource` type. |  |
| `jndi-name` | JNDI binding key. A `DataSource` is bound as `java:/<name>`. Logs a warning if binding fails at runtime. |  |
| `login-timeout-seconds` | Maximum time a thread waits for a pooled connection before a `PoolException` is thrown. Returns immediately if a connection is available or can be created. | `30` |
| `managed-conn-factory-class` | Used when the resource adapter type is `ManagedDataSource`. Provides the `PooledConnection` source (J2CA). |  |
| `max-pool-size` | Maximum number of pooled connections. | `30` |
| `password` | Password for the datasource. |  |
| `transaction-type` | Transaction behavior for `ManagedDataSource`. See options below. | `none` |
| `type` | Datasource type. See options below. | `none` |
| `user-name` | Username for the datasource. |  |
| `xa-datasource-class` | Java class used for the `XAPooledDataSource` type. |  |

### `transaction-type` Options

- `XATransaction`  
  Uses a `ManagedConnection` with a Java Transaction Manager.  
  Allows the datasource to participate in cache transactions.

- `NoTransaction`  
  No transactional behavior.

- `LocalTransaction`  
  Uses a `ManagedDataSource` without a Java Transaction Manager.

### `type` Options

- `XAPooledDataSource`  
  Pooled SQL connections. Requires `xa-datasource-class`.

- `ManagedDataSource`  
  JCA JNDI binding type using `ManagedConnectionFactory`.

- `PooledDataSource`  
  Pooled SQL connections. Requires `conn-pooled-datasource-class`.

- `SimpleDataSource`  
  Single non-pooled SQL connection. Requires `jdbc-driver-class`.

## &lt;config-property&gt; {#config-property}
A configuration property of the datasource. Use the sub-elements to identify the name, datatype, and value of the property.

**Default:**

**Example:**

``` pre
<config-property>
     <config-property-name>DatabaseName</config-property-name>
     <config-property-type>java.lang.String</config-property-type>
     <config-property-value>newDB</config-property-value>
</config-property>
```

Configuration properties vary depending on the database vendor. See [Configuring Database Connections Using JNDI](../../developing/outside_data_sources/configuring_db_connections_using_JNDI) for examples of different configuration property configurations.

## &lt;config-property-name&gt; {#config-property-name}
The name of this datasource property.

## &lt;config-property-type&gt; {#config-property-type}
The data type of this datasource property.

## &lt;config-property-value&gt; {#config-property-value}
The value of this datasource property.

## &lt;region&gt; {#region}
Defines a region in the cache. See [&lt;region-attributes&gt;](#region-attributes) for more details on configuring regions. You can specify zero or more subregions within a region. See [Create and Access Data Subregions](../../basic_config/data_regions/managing_data_regions#data_regions__section_jn1_sry_5m) for restrictions on creating subregions. For example, you cannot create a partitioned subregion.

**Default:**

**API:** `org.apache.geode.cache.RegionFactory` or `org.apache.geode.cache.ClientRegionFactory`

**&lt;region&gt; Attributes**

| Attribute | Description | Default |
|-----------|-------------|---------|
| name      | Specify the name for the region. See [Region Management](../../basic_config/data_regions/managing_data_regions) for details. | Â        |
| refid     | Used to apply predefined attributes to the region being defined. If the nested "region-attributes" element has its own "refid", then it will cause the "refid" on the region to be ignored. The "refid" region attriibute can be set to the name of a RegionShortcut or a ClientRegionShortcut. For more information, see [Region Shortcuts and Custom Named Region Attributes](../../basic_config/data_regions/region_shortcuts) and [Storing and Retrieving Region Shortcuts and Custom Named Region Attributes](../../basic_config/data_regions/store_retrieve_region_shortcuts). | Â        |

**Example:**

``` pre
<!--Using region shortcut-->
<region 
  name="PartitionedRegion" 
  refid="PARTITION_REDUNDANT">
...
</region>

<!-- Retrieving and storing attributes -->
<region-attributes 
  id="myPartition" 
  refid="PARTITION_REDUNDANT">
    <partition-attributes 
   local-max-memory="512"/>
</region-attributes>

<!-- Attributes are retrieved and applied in the first region -->
<region name="PartitionedRegion1" refid="myPartition"/>
```

See [&lt;region-attributes&gt;](#region-attributes) for a complete listing of region attributes.


## &lt;index&gt; {#index}
Describes an index to be created on a region. The index node, if any, should all come immediately after the "region-attributes" node. The "name" attribute is a required field which identifies the name of the index. See [Working with Indexes](../../developing/query_index/query_index) for more information on indexes.

**Default:**

**API:** `org.apache.geode.cache.query.QueryService.createIndex, createKeyIndex, createHashIndex`

**&lt;index&gt; Attributes**

| Attribute   | Description | Default |
|-------------|-------------|---------|
| name        | Required. Name of the index. | Â        |
| from-clause | Specifies the collection(s) of objects that the index ranges over. The from-clause must only contain one and only one region path. | Â        |
| expression  | Specifies the lookup value of the index. | Â        |
| imports     | String containing the imports used to create the index. String should be specified in the query language syntax with each import statement separated by a semicolon. The imports statement provides packages and classes used in variable typing in the indexed and FROM expressions. | Â        |
| key-index   | True or false. Whether the index should be a key index. If true, the region key specified in the indexed expression is used to evaluate queries | Â        |
| type        | Possible values are "hash" or "range". | range   |

**Example:**

``` pre
<region name=exampleRegion>
 <region-attributes . . . >
 </region-attributes>
 <index 
  name="myIndex" 
  from-clause="/exampleRegion" 
  expression="status"/>
 <index 
  name="myKeyIndex" 
  from-clause="/exampleRegion" 
  expression="id" key-index="true"/>
 <index 
  name="myHashIndex" 
  from-clause="/exampleRegion p" 
  expression="p.mktValue" type="hash"/>
 ...
</region>
```

<!-- start of Lucene index description -->
## &lt;lucene:index&gt; {#luceneindex}
Describes a Lucene index to be created on a region. The `lucene` namespace
and the scoping operator (`:`) must be specified, as the @@product_name@@ `cache`
namespace also defines an `index` element (for OQL indexes).

**API:** `org.apache.geode.cache.lucene` package

**&lt;lucene:index&gt; Attributes**
| Attribute   | Description                                                                                                                                                                                                                                                                           | Default |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| name        | Required. Name of the Lucene index.   | Â        |

**Example:**

``` pre
<cache
    xmlns="http://geode.apache.org/schema/cache"
    xmlns:lucene="http://geode.apache.org/schema/lucene"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://geode.apache.org/schema/cache
        http://geode.apache.org/schema/cache/cache-1.0.xsd
        http://geode.apache.org/schema/lucene
        http://geode.apache.org/schema/lucene/lucene-1.0.xsd"
    version="1.0">

    <region name="regionA" refid="PARTITION">
        <lucene:index name="myIndex">
            <lucene:field name="x" />
            <lucene:field name="y" />
        </lucene:index>
    </region>
</cache>
```
<!-- end of Lucene index description -->

<!-- start of Lucene field description -->
## &lt;lucene:field&gt; {#lucenefield}
Describes a field to be included in a Lucene index. Including the
`lucene` namespace and the scoping operator (`:`) clarifies,
but is not required.

**API:** `org.apache.geode.cache.lucene` package

**&lt;lucene:field&gt Attributes**
| Attribute   | Description | Default |
|-------------|-------------|---------|
| name        | Required. A string that defines the name of the field. If a single field is defined by the value `"__REGION_VALUE_FIELD"`, then the entire value is used as a single field.   | Â        |
| analyzer    | A string that provides the path to the analyzer to use for this field. A value of `"null"` uses the default analyzer.  | `"null"` |

**Example:**

``` pre
<region name="dataregion" refid="PARTITION_REDUNDANT">
   <lucene:index name="full_value_index">
     <lucene:field name="__REGION_VALUE_FIELD"/>
   </lucene:index>
</region>
```

<!-- end of Lucene field description -->

## &lt;entry&gt; {#entry}
An "entry" element describes an entry to be added to a region. Note that if an entry with the given key already exists in the region, it will be replaced.

**Default:**

**API:** `org.apache.geode.cache.Region.create`, `put`, `get`, `putAll`, `getAll`

**Example:**

``` pre
<region ...>
 <region-attributes ...>
   ...
 </region-attributes>
 <entry>
   <key><string>MyKey</string></key>
   <value><string>MyValue</string></value>
 </entry>
</region>
```

## &lt;key&gt; {#key}
Required. Describes the key in a region entry. A key can contain either a &lt;string&gt; or a &lt;declarable&gt; sub-element.

## &lt;string&gt; {#topic_A078318F712F4247949DAE2287AB200A}
Specifies a String to be placed in a Region entry.

**Example:**

``` pre
<region ...>
 <region-attributes ...>
   ...
 </region-attributes>
 <entry>
   <key><string>MyKey</string></key>
   <value><string>MyValue</string></value>
 </entry>
</region>
```

## &lt;declarable&gt; {#topic_F13E9F4907E6424E8BB117CE45BD8D42}
Specifies a Declarable object to be placed in a Region entry.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

**API:** `Declarable`

**Example:**

``` pre
<parameter name="cacheserver">
  <declarable>
    <class-name>org.apache.geode.addon.cache.CacheServerInitializer</class-name>
    <parameter name="system.property.prefix">
    <string>cacheserver</string>
    </parameter>
  </declarable>
</parameter>
```

## &lt;value&gt; {#value}
Required. Describes the value of a region entry. A `<value>` can contain either a `<string>` or a `<declarable>` sub-element.

## &lt;string&gt; {#topic_356674E93DE14A93849E2142ED363079}
Specifies a String to be placed in a Region entry.

**Example:**

``` pre
<region ...>
 <region-attributes ...>
   ...
 </region-attributes>
 <entry>
   <key><string>MyKey</string></key>
   <value><string>MyValue</string></value>
 </entry>
</region>
```

## &lt;declarable&gt; {#topic_37650AC8AB054B6092458D8D0281D6C5}
Specifies a Declarable object to be placed in a Region entry.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

**API:** `Declarable`

**Example:**

``` pre
<parameter name="cacheserver">
  <declarable>
    <class-name>org.apache.geode.addon.cache.CacheServerInitializer</class-name>
    <parameter name="system.property.prefix">
    <string>cacheserver</string>
    </parameter>
  </declarable>
</parameter>
```

## &lt;region&gt; {#region_region}
When nested within a `<region>` element, defines a subregion. See [Create and Access Data Subregions](../../basic_config/data_regions/managing_data_regions#data_regions__section_jn1_sry_5m) for restrictions on creating subregions. For example, you cannot create a partitioned subregion.

See [&lt;region&gt;](cache_xml#region)

## &lt;function-service&gt; {#function-service}
Configures the behavior of the function execution service.

**Example:**

``` pre
<cache>
    ...
    </region>
<function-service>
  <function>
    <class-name>com.myCompany.tradeService.cache.func.TradeCalc</class-name>
  </function>
</function-service>
```

## &lt;function&gt; {#function}
Defines a function for registration in the function service

Specify the Java class for the function and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**Default:**

**API:** `org.apache.geode.cache.execute.FunctionService`

**Example:**

``` pre
<function>
  <class-name>
    com.myCompany.tradeService.cache.func.TradeCalc
  </class-name>
</function>
```

## &lt;resource-manager&gt; {#resource-manager}
A memory monitor that tracks cache size as a percentage of total heap or off-heap memory and controls size by restricting access to the cache and prompting eviction of old entries from the cache. For tenured heap, used in conjunction with settings for JVM memory and Java garbage collection. For off-heap memory, used with the off-heap memory manager.

**API:** `org.apache.geode.cache.control.ResourceManager`

**&lt;resource-manager&gt; Attributes**

| Attribute | Description | Default |
|-----------|------------|---------|
| `critical-heap-percentage` | Percentage of heap at or above which the cache is considered in danger of becoming inoperable due to GC pauses or out-of-memory errors. Only one change is allowed at a time, and the effect must be realized before another change. Requires additional VM flags. See `setCriticalHeapPercentage()`. | `0` |
| `eviction-heap-percentage` | Percentage of heap at or above which eviction begins for regions configured with HeapLRU. Changing this value may trigger immediate eviction. <br/><br/>Default behavior: <ul><li>`0` if no region uses heap eviction</li><li>5% less than `critical-heap-percentage` if it is set</li><li>`80%` if `critical-heap-percentage` is not configured</li></ul> | `0` |
| `critical-off-heap-percentage` | Percentage of off-heap memory at or above which the cache is considered in danger of becoming inoperable due to GC pauses or out-of-memory errors. | `0` |
| `eviction-off-heap-percentage` | Percentage of off-heap memory at or above which eviction begins for regions configured with HeapLRU. <br/><br/>Default behavior: <ul><li>`0` if no region uses heap eviction</li><li>5% less than `critical-off-heap-percentage` if it is set</li><li>`80%` if `critical-off-heap-percentage` is not configured</li></ul> | `0` |

**Example:**

``` pre
<cache>
...
   <resource-manager 
      critical-heap-percentage="99.9" 
      eviction-heap=-percentage="85"/>
...
</cache>
```

## &lt;serialization-registration&gt; {#serialization-registration}
Set of serializer or instantiator tags to register customer DataSerializer extensions or DataSerializable implementations respectively.

**Example:**

``` pre
<serialization-registration>
    <instantiator id="30">        
       <class-name>com.package.MyClass</class-name>
    </instantiator>
</serialization-registration> 
```

## &lt;serializer&gt; {#serializer}
Allows you to configure the DataSerializer for this @@product_name@@ member. It registers a custom class which extends DataSerializer to support custom serialization of non-modifiable object types inside @@product_name@@.

Specify the Java class for the `DataSerializer` and its initialization parameters with the `<class-name>` sub-element.

**API:** You can also register a `DataSerializer` by using the `org.apache.geode.DataSerializer.register` API. Use the `org.apache.geode.Instantiator` API to register a `DataSerializable` implementation.

## &lt;instantiator&gt; {#instantiator}
An Instantiator registers a custom class which implements the `DataSerializable` interface to support custom object serialization inside @@product_name@@.

Specify the Java class and its initialization parameters with the `<class-name>` sub-element.

**API:** `DataSerializable`

You can also directly specify `<instantiator>` as a sub-element of `<cache>`. Use the `org.apache.geode.Instantiator` API to register a `DataSerializable` implementation as the serialization framework for the cache. The following table lists the attribute that can be specified for an `<instantiator>`.

**&lt;instantiator&gt; Attributes**

| Attribute | Description                                                                           | Default |
|-----------|---------------------------------------------------------------------------------------|---------|
| id        | Required. ID that the Instantiator should associate with the `DataSerializable` type. | Â        |


## &lt;backup&gt; {#backup}
Defines additional files or directories that should be backed up when the system wide backup command is invoked. Disk stores with persistent data are automatically backed up and do not need to be listed with this element.

**Example:**

``` pre
<backup>./systemConfig/gf.jar</backup>
<backup>/users/jpearson/gfSystemInfo/myCustomerConfig.doc</backup>
```

## &lt;initializer&gt; {#initializer}
Used to specify a callback class (and optionally its parameters) that will be run after the cache is initialized. This element can be specified for both server and client caches.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](#class-name_parameter).

**Default:**

**API:** `Declarable`

**Example:**

``` pre
<initializer>
   <class-name>MyInitializer</class-name>
      <parameter name="members">
         <string>2</string>
      </parameter>
</initializer>
```

## &lt;declarable&gt; {#topic_BDE840596CD24A7A8754A56E7D31FE3F}
Specifies a Declarable object to be placed in a Region entry.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

**API:** `Declarable`

**Example:**

``` pre
<parameter name="cacheserver">
  <declarable>
    <class-name>org.apache.geode.addon.cache.CacheServerInitializer</class-name>
    <parameter name="system.property.prefix">
    <string>cacheserver</string>
    </parameter>
  </declarable>
</parameter>
```

## &lt;class-name&gt; and &lt;parameter&gt; {#class-name_parameter}
Specify the name of a Java class with the `<class-name>` sub-element.

Specify initialization parameters for the class using the `<parameter>` sub-element. Use the `name` attribute to specify the name of the parameter and specify its value in the content of the [&lt;string&gt;](cache_xml#string) sub-element or by specifying a Java class with the [&lt;declarable&gt;](cache_xml#declarable) sub-element.

**Example:**

The following transaction writer configuration example specifies a Java class named `com.company.data.MyTransactionWritet`. The class is initialized with a parameter named `URL` whose value is `jdbc:cloudscape:rmi:MyData`.

``` pre
<transaction-writer>
       <class-name>com.company.data.MyTransactionWriter</class-name>
       <parameter name="URL">
         <string>jdbc:cloudscape:rmi:MyData</string>
       </parameter>
</transaction-writer>
```

## &lt;declarable&gt; {#declarable}
Specifies a Declarable object to be placed in a Region entry.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements.

**API:** `Declarable`

**Example:**

``` pre
<parameter name="cacheserver">
  <declarable>
    <class-name>org.apache.geode.addon.cache.CacheServerInitializer</class-name>
    <parameter name="system.property.prefix">
    <string>cacheserver</string>
    </parameter>
  </declarable>
</parameter>
```

## &lt;string&gt; {#string}
Specifies a String to be placed in a Region entry.

**Example:**

``` pre
<region ...>
 <region-attributes ...>
   ...
 </region-attributes>
 <entry>
   <key><string>MyKey</string></key>
   <value><string>MyValue</string></value>
 </entry>
</region>
```
