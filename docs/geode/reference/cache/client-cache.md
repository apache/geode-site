---
title: "<client-cache> Element Reference"
sidebar_label: "<client-cache> Element Reference"
sidebar_position: 5
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

This section documents all `cache.xml` elements that you use to configure Geode clients. All elements are sub-elements of the `<client-cache>` element.

For Geode server configuration, see [&lt;cache&gt; Element Reference](cache_xml).

API: `org.apache.geode.cache.client.ClientCacheFactory` and `PoolFactory` interfaces.

**&lt;client-cache&gt; Attributes**

| Attribute | Definition | Default |
|-----------|------------|---------|
| `copy-on-read` | Boolean indicating whether entry value retrieval returns direct references (`false`) or copies (`true`). | `false` |

**Example:**

``` pre
<client-cache>
  <pool 
    name="client" 
    subscription-enabled="true">
    <locator host="localhost" port="41111"/>
  </pool>
  <region-attributes 
    id="clientAttributes" 
    pool-name="client" 
    refid="CACHING_PROXY"/> 
  <region name="root">
    <region-attributes scope="local"/>
    <region name="cs_region">
      <region-attributes refid="clientAttributes"/>
    </region>
  </region>
</client-cache>
```

## &lt;cache-transaction-manager&gt; {#cc-cache-transaction-manager}
Specifies a transaction listener.

**API:** `CacheTransactionManager`

**Example:**

``` pre
<client-cache search-timeout="60">
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
</client-cache>
```

## &lt;transaction-listener&gt; {#cc-transaction-listener}
When a transaction ends, its thread calls the TransactionListener to perform the appropriate follow-up for successful commits, failed commits, or voluntary rollbacks.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](cache_xml#class-name_parameter).

## &lt;transaction-writer&gt; {#cc-transaction-writer}
When you commit a transaction, a TransactionWriter can perform additional tasks, including cancelling the transaction.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](cache_xml#class-name_parameter).

## &lt;pool&gt; {#cc-pool}
Use for client caches. Defines a client's server pool used to communicate with servers running in a different cluster.

**API:** `org.apache.geode.cache.client.PoolFactory`

**&lt;pool&gt; Attributes**
| Attribute | Description | Default |
|-----------|-------------|---------|
| `free-connection-timeout` | Time a thread waits for a pool connection before timing out. Prevents indefinite waits when `max-connections` is reached. | `10000` |
| `idle-timeout` | Max time (ms) a connection can stay unused when above `min-connections`. `-1` disables. | `5000` |
| `load-conditioning-interval` | Time (ms) before a connection is eligible for replacement with a less-loaded server. | `300000 (5 minutes)` |
| `max-connections` | Maximum pool connections. Blocks when reached. <br/><br/>**Note:** Disable `pr-single-hop-enabled` if using this to cap connections. | `-1` |
| `min-connections` | Minimum connections kept in pool. | `1` |
| `multiuser-authentication` | Enables multiple authenticated users per client via `RegionService`. | `false` |
| `name` | Pool name used by `pool-name` in regions. <br/><br/>**Required** | — |
| `ping-interval` | Interval (ms) to send client health pings. <br/><br/>**Note:** Set lower than server `maximum-time-between-pings`. | `10000` |
| `pr-single-hop-enabled` | Sends operations directly to the server hosting the key. | `true` |
| `read-timeout` | Max wait (ms) for server response. | `10000` |
| `retry-attempts` | Number of retries before giving up. `-1` tries each server once. | `-1` |
| `server-connection-timeout` | Wait time for a connection to a specific server. | `0` |
| `server-group` | Logical server group name. Used only when locators are defined. | `null` |
| `socket-buffer-size` | Client → server socket buffer size. | `32768` |
| `socket-connect-timeout` | Timeout (ms) for socket connect. `0` = infinite. | `59000` |
| `statistic-interval` | Interval (ms) to send client statistics. `-1` disables. | `-1` |
| `subscription-ack-interval` | Time (ms) between event ACKs. Used when redundancy > 0. | `100` |
| `subscription-enabled` | Enables server → client event delivery. | `false` |
| `subscription-message-tracking-timeout` | TTL (ms) for message tracking entries. | `900000 (15 minutes)` |
| `subscription-redundancy` | Number of backup servers. `-1` = all. | `0` |
| `subscription-timeout-multiplier` | Missing ping count before timeout. `0` disables. | `0` |


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

## &lt;locator&gt; {#cc-locator}
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

## &lt;server&gt; {#cc-server}
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
## &lt;socket-factory&gt; {#cc-socket-factory}
Defines a factory to create socket connections to locators and servers.  A typical use of this element is to redirect connections to an ingress gateway such as Istio or HAProxy in a cluster where the TLS (SSL) Server Name Indication (SNI) field is set to indicate the actual locator or server the client is trying to reach.  This allows you to expose only the gateway hostname:port without the client needing to be able to resolve the names of the locator and server machines.

**Note:**
This setting may be used with either a Server list or a Locator list.  It will be used to form connections to either.

**Default:**

**API:** `org.apache.geode.cache.client.proxy.ProxySocketFactories`

**Example:**

``` pre
<pool ...>
 <socket-factory>
    <class-name>org.apache.geode.cache.client.proxy.SniProxySocketFactory</class-name>
    <parameter name="hostname">
      <string>my-gateway-address</string>
    </parameter>
    <parameter name="port">
      <string>12345</string>
    </parameter>
  </socket-factory>
</pool>
```

## &lt;disk-store&gt; {#cc-disk-store}
Defines a pool of one or more disk stores, which can be used by regions, and client subscription queues.

**Default:** The cache default disk store, named "DEFAULT", is used when disk is used but no disk store is named.

**API:** `org.apache.geode.cache.DiskStore`

**&lt;disk-store&gt; Attributes**

| Attribute | Description | Default |
|-----------|-------------|---------|
| `name` | Disk store name. | — |
| `auto-compact` | Automatically compacts disk files. | — |
| `compaction-threshold` | % threshold for oplog compaction. | — |
| `allow-force-compaction` | Allows manual compaction. | — |
| `max-oplog-size` | Max oplog size (MB). | — |
| `time-interval` | Max ms before unwritten data is flushed. | — |
| `write-buffer-size` | Disk write buffer size. | — |
| `queue-size` | Max async disk operations queued. | — |
| `disk-usage-warning-percentage` | Warn when disk usage exceeds threshold. | `90` |
| `disk-usage-critical-percentage` | Error + shutdown when exceeded. | `99` |

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

## &lt;disk-dirs&gt; {#cc-disk-dirs}
An element of a disk store that defines a set of `<disk-dir>` elements.

## &lt;disk-dir&gt; {#cc-disk-dir}
Specifies a region or disk store's disk directory.

**&lt;disk-dir&gt; Attributes**

| Attribute | Description | Default |
|-----------|-------------|---------|
| `dir-size` | Max disk store space (MB). | `214748364 (2 PB)` |


**Example:**

``` pre
<disk-dir 
    dir-size="20480">/host3/users/gf/memberA_DStore</disk-dir> 
```

## &lt;pdx&gt; {#cc-pdx}
Specifies the configuration for the Portable Data eXchange (PDX) method of serialization.

**API:** `org.apache.geode.cache.CacheFactory.setPdxReadSerialized`, `setPdxDiskStore`, `setPdxPersistent`, `setPdxIgnoreUnreadFields` and `org.apache.geode.cache.ClientCacheFactory.setPdxReadSerialized`, `setPdxDiskStore`, `setPdxPersistent`, `setPdxIgnoreUnreadFields`

| Attribute            | Description                                                                                                                                                                                                | Default |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| read-serialized      | Set it to true if you want PDX deserialization to produce a PdxInstance instead of an instance of the domain class.                                                                                        | Â        |
| ignore-unread-fields | Set it to true if you do not want unread PDX fields to be preserved during deserialization. You can use this option to save memory. Set to true only in members that are only reading data from the cache. | Â        |
| persistent           | Set to true if you are using persistent regions. This causes the PDX type information to be written to disk.                                                                                               | Â        |
| disk-store-name      | If using persistence, this attribute allows you to configure the disk store that the PDX type data will be stored in. By default, the default disk store is used.                                          | Â        |

**Example:**

``` pre
<client-cache>
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
</client-cache>
```

## &lt;pdx-serializer&gt; {#cc-pdx-serializer}
Allows you to configure the PdxSerializer for this Geode member.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](cache_xml#class-name_parameter).

**Default:**

**API:** `org.apache.geode.cache.CacheFactory.setPdxSerializer`

**Example:**

``` pre
<client-cache>
  <pdx>
    <pdx-serializer>
     <class-name>com.company.ExamplePdxSerializer</class-name>
    </pdx-serializer>
  </pdx> 
  ...
</client-cache>
```

## &lt;region-attributes&gt; {#cc-region-attributes}
Specifies a region attributes template that can be named (by `id`) and referenced (by `refid`) later in the `cache.xml` and through the API.

**API:** `org.apache.geode.cache.RegionFactory` or `org.apache.geode.cache.ClientRegionFactory`

**&lt;region-attributes&gt; Attributes**

| Attribute                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Default              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `concurrency-level`              | Gives an estimate of the maximum number of application threads that will concurrently access a region entry at one time. This does not apply to partitioned regions. Helps optimize system resources and reduce contention by setting the initial parameter on the underlying `java.util.ConcurrentHashMap`. <br/><br/> **Note:** Read the concurrency level description and the Java API docs for `ConcurrentHashMap` before modifying. <br/><br/> **API:** `setConcurrencyLevel` <br/><br/> **Example:**<br/>`xml<br/><region-attributes concurrency-level="10"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 16 (threads)         |
| `data-policy`                    | Specifies how the local cache handles region data (local storage, distribution, persistence). Use `RegionShortcut` and `ClientRegionShortcut` for common configs. Default `normal` stores data locally. `empty` (PROXY) stores no data and is useful for event-only regions. <br/><br/> **Policies:**<br/><br/> **`empty`** – No local storage; event-only (set subscription interest to `all`).<br/> **`normal`** – Local storage; caches may differ.<br/> **`partition`** – Data partitioned across members (see `partition-attributes`).<br/> **`replicate`** – Full copy on all members; must stay consistent.<br/> **`persistent-partition`** – Partitioned + disk persistence.<br/> **`persistent-replicate`** – Replicated + disk persistence.<br/> **`preloaded`** – Starts replicated, then behaves like normal.<br/><br/> **API:** `setDataPolicy` <br/><br/> **Example:**<br/>`xml<br/><region-attributes data-policy="replicate"> <br/></region-attributes><br/>` <br/>Using `REPLICATE` shortcut also sets `scope="distributed-ack"`. | `normal`             |
| `enable-async-conflation`        | For TCP peer distribution, allows aggregation of async messages for slow consumers. Does not apply to client/server or UDP/multicast. <br/><br/> **Note:** Requires `disable-tcp=false`, multicast disabled, and async queues enabled. <br/><br/> **API:** `setEnableAsyncConflation` <br/><br/> **Example:**<br/>`xml<br/><region-attributes enable-async-conflation="false"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `true`               |
| `enable-gateway`                 | Sends region events to gateway hubs (GemFire 6.x only). Use `gateway-sender-id` for 7.0+.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false`              |
| `enable-subscription-conflation` | Allows server to conflate messages to clients. Client can override with `conflate-events` in `gemfire.properties`. <br/><br/> **API:** `setEnableSubscriptionConflation` <br/><br/> **Example:**<br/>`xml<br/><region-attributes enable-subscription-conflation="true"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`              |
| `gateway-sender-ids`             | Comma-separated gateway sender IDs for WAN distribution. <br/><br/> **API:** `addGatewaySenderId` <br/><br/> **Example:**<br/>`xml<br/><region-attributes gateway-sender-ids="nwsender,swsender"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | not set              |
| `async-event-queue-ids`          | Comma-separated async event queues for `AsyncEventListener` (e.g., write-behind). <br/><br/> **API:** `addAsyncEventQueueId` <br/><br/> **Example:**<br/>`xml<br/><region-attributes async-event-queue-ids="customerqueue,ordersqueue"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | not set              |
| `hub-id`                         | Comma-separated gateway hub IDs (GemFire 6.x only).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `null`               |
| `id`                             | Stores region attributes under an identifier for reuse via `refid`. <br/><br/> **API:** `setId` <br/><br/> **Example:**<br/>`xml<br/><region-attributes id="persistent-replicated"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | not set              |
| `ignore-jta`                     | If `true`, region operations ignore active JTA transactions (useful for loaders/writers doing non-transactional work). <br/><br/> **API:** `setIgnoreJTA` <br/><br/> **Example:**<br/>`xml<br/><region-attributes ignore-jta="true"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `false`              |
| `index-update-type`              | `synchronous` or `asynchronous` index maintenance. API uses boolean `setIndexMaintenanceSynchronous`. <br/><br/> **Example:**<br/>`xml<br/><region-attributes index-update-type="asynchronous"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | synchronous          |
| `initial-capacity`               | Initial `ConcurrentHashMap` capacity (with `load-factor`). <br/><br/> **API:** `setInitialCapacity` <br/><br/> **Example:**<br/>`xml<br/><region-attributes initial-capacity="20"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `16`                 |
| `is-lock-grantor`                | Defines member as lock grantor at region creation (only for `global` scope). <br/><br/> **API:** `setLockGrantor` <br/><br/> **Example:**<br/>`xml<br/><region-attributes is-lock-grantor="true"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `false`              |
| `load-factor`                    | `ConcurrentHashMap` load factor (0–1). <br/><br/> **API:** `setLoadFactor` <br/><br/> **Example:**<br/>`xml<br/><region-attributes load-factor="0.85"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `.75`                |
| `mirror-type`                    | Deprecated                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | —                    |
| `multicast-enabled`              | Uses multicast for distributed operations (requires `mcast-port`). <br/><br/> **API:** `setMulticastEnabled` <br/><br/> **Example:**<br/>`xml<br/><region-attributes multicast-enabled="true"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `false`              |
| `pool-name`                      | Marks region as client region using the named server pool. Required if multiple pools exist. <br/><br/> **API:** `setPoolName`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | not set              |
| `disk-store-name`                | Assigns region to a disk store for persistence or overflow. Controlled with `disk-synchronous`. <br/><br/> **API:** `setDiskStoreName` <br/><br/> **Example:**<br/>`xml<br/><region-attributes disk-store-name="myStoreA"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `null`               |
| `disk-synchronous`               | Synchronous disk writes for disk regions. <br/><br/> **API:** `setDiskSynchronous` <br/><br/> **Example:**<br/>`xml<br/><region-attributes disk-store-name="myStoreA" disk-synchronous="true"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `true`               |
| `refid`                          | References a stored region attribute set or shortcut. <br/><br/> **API:** `setRefId` <br/><br/> **Example:**<br/>`xml<br/><region-attributes refid="persistent-replicated"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | not set              |
| `scope`                          | Controls distribution and consistency behavior. <br/><br/> **Values:**<br/> **`local`** – No distribution<br/> **`distributed-no-ack`** – No ack required<br/> **`distributed-ack`** – Ack required, versioned updates<br/> **`global`** – Distributed locking<br/><br/> **API:** `setScope` <br/><br/> **Example:**<br/>`xml<br/><region-attributes scope="distributed-ack"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `distributed-no-ack` |
| `statistics-enabled`             | Enables region statistics (required for expiration). Accessible via `Region.getStatistics`. <br/><br/> **API:** `setStatisticsEnabled` <br/><br/> **Example:**<br/>`xml<br/><region-attributes statistics-enabled="true"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false`              |
| `cloning-enabled`                | Applies deltas to a clone (`true`) or in place (`false`). <br/><br/> **API:** `setCloningEnabled` <br/><br/> **Example:**<br/>`xml<br/><region-attributes cloning-enabled="true"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `false`              |
| `concurrency-checks-enabled`     | Enables version checks for concurrent/out-of-order updates. Clients may disable to receive all events. <br/><br/> **API:** `setConcurrencyChecksEnabled` <br/><br/> **Example:**<br/>`xml<br/><region-attributes concurrency-checks-enabled="true"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `true`               |
| `off-heap`                       | Stores values in off-heap memory (keys and map remain on heap). <br/><br/> **API:** `setOffHeap` <br/><br/> **Example:**<br/>`xml<br/><region-attributes off-heap="true"> <br/></region-attributes><br/>`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false`              |


## &lt;key-constraint&gt; {#cc-key-constraint}
Defines the type of object to be allowed for the region entry keys. This must be a fully-qualified class name. The attribute ensures that the keys for the region entries are all of the same class. If key-constraint is not used, the region's keys can be of any class. This attribute, along with value-constraint, is useful for querying and indexing because it provides object type information to the query engine.

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

## &lt;value-constraint&gt; {#cc-value-constraint}
Defines the type of object to be allowed for the region entry values. This must be a fully-qualified class name. If value constraint isnâ€™t used, the region's value can be of any class. This attribute, along with `key-constraint`, is useful for querying and indexing because it provides object type information to the query engine.

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

## &lt;region-time-to-live&gt; {#cc-region-time-to-live}
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

## &lt;expiration-attributes&gt; {#cc-expiration-attributes}
Within the `entry-time-to-live` or `entry-idle-time` element, this element specifies the expiration rules for removing old region entries that you are not using. You can destroy or invalidate entries, either locally or across the cluster. Within the `region-time-to-live` or `region-idle-time` element, this element specifies the expiration rules for the entire region.

**API:** See APIs for `entry-time-to-live`, `entry-idle-time`, `region-time-to-live`, `region-idle-time`

**&lt;expiration-attributes&gt; Attributes**

| Attribute | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `timeout` | Number of seconds before a region or an entry expires. If not specified, defaults to `0` (no expiration).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `0`          |
| `action`  | Action to perform when a region or entry expires. <br/><br/> **Options:**<br/><br/> **`local-destroy`** – Removes the region or entry from the *local* cache only. Not distributed to remote members. Not valid for partitioned region entries.<br/><br/> **`destroy`** – Removes the region or entry completely from the cache and distributes the operation according to the region’s distribution settings. Use when the data is no longer needed anywhere in the cluster.<br/><br/> **`invalidate`** *(default)* – Marks an entry (or all entries in a region) as invalid and distributes the invalidation according to the region scope. Use when the data is no longer valid but the entry should remain.<br/><br/> **`local-invalidate`** – Marks an entry or region as invalid locally only. Not distributed. Not valid for partitioned entries and not supported for replicated regions. | `invalidate` |


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

## &lt;custom-expiry&gt; {#cc-custom-expiry}
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

## &lt;region-idle-time&gt; {#cc-region-idle-time}
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

## &lt;expiration-attributes&gt; {#cc-rit-expiration-attributes}
Within the `entry-time-to-live` or `entry-idle-time` element, this element specifies the expiration rules for removing old region entries that you are not using. You can destroy or invalidate entries, either locally or across the cluster. Within the `region-time-to-live` or `region-idle-time` element, this element specifies the expiration rules for the entire region.

**API:** See APIs for `entry-time-to-live`, `entry-idle-time`, `region-time-to-live`, `region-idle-time`

**&lt;expiration-attributes&gt; Attributes**

| Attribute | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Default      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `timeout` | Number of seconds before a region or an entry expires. If not specified, defaults to `0` (no expiration).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `0`          |
| `action`  | Action to perform when a region or entry expires. <br/><br/> **Available actions:**<br/><br/> • **`local-destroy`** – Removes the region or entry from the *local* cache only. The operation is **not distributed** to other members. Not valid for partitioned region entries.<br/><br/> • **`destroy`** – Removes the region or entry completely from the cache. The destroy operation **is distributed** according to the region’s distribution settings. Use when the data is no longer needed anywhere in the cluster.<br/><br/> • **`invalidate`** *(default)* – Marks the entry (or all entries in a region) as **invalid** and distributes the invalidation according to the region scope. Use when the data is no longer valid but the entry should remain.<br/><br/> • **`local-invalidate`** – Marks the entry or region as **invalid locally only**. Not distributed. Not valid for partitioned entries and not supported for replicated regions. | `invalidate` |


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

## &lt;custom-expiry&gt; {#cc-rit-custom-expiry}
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

## &lt;entry-time-to-live&gt; {#cc-entry-time-to-live}
Expiration setting that specifies how long the region's entries can remain in the cache without anyone accessing or updating them. See [&lt;expiration-attributes&gt;](cache_xml#expiration-attributes) for details.

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

## &lt;expiration-attributes&gt; {#cc-ettl-expiration-attributes}
Within the `entry-time-to-live` or `entry-idle-time` element, this element specifies the expiration rules for removing old region entries that you are not using. You can destroy or invalidate entries, either locally or across the cluster. Within the `region-time-to-live` or `region-idle-time` element, this element specifies the expiration rules for the entire region.

**API:** See APIs for `entry-time-to-live`, `entry-idle-time`, `region-time-to-live`, `region-idle-time`

**&lt;expiration-attributes&gt; Attributes**

| Attribute | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `timeout` | Number of seconds before a region or an entry expires. If not specified, it defaults to `0` (no expiration).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `0`          |
| `action`  | Action that occurs when a region or an entry expires. <br/><br/> **Expiration actions:**<br/><br/> **`local-destroy`** – Removes the region or entry from the **local cache only**. The removal is **not distributed** to other members. Not valid for partitioned region entries.<br/><br/> **`destroy`** – Removes the region or entry completely from the cache. The destroy operation **is distributed** according to the region’s distribution settings. Use when the data is no longer needed anywhere in the cluster.<br/><br/> **`invalidate`** *(default)* – Marks an entry (or all entries in a region) as **invalid** and distributes the invalidation according to the region’s scope. Use when the data is no longer valid but the entry should remain.<br/><br/> **`local-invalidate`** – Marks an entry or region as **invalid locally only**. The operation is **not distributed**. Not valid for partitioned entries and not supported for replicated regions. | `invalidate` |


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

## &lt;custom-expiry&gt; {#cc-ettl-custom-expiry}
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

## &lt;entry-idle-time&gt; {#cc-entry-idle-time}
Expiration setting that specifies how long the region's entries can remain in the cache without anyone accessing them. See [&lt;expiration-attributes&gt;](cache_xml#expiration-attributes) for details.

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

## &lt;expiration-attributes&gt; {#cc-eit-expiration-attributes}
Within the `entry-time-to-live` or `entry-idle-time` element, this element specifies the expiration rules for removing old region entries that you are not using. You can destroy or invalidate entries, either locally or across the cluster. Within the `region-time-to-live` or `region-idle-time` element, this element specifies the expiration rules for the entire region.

**API:** See APIs for `entry-time-to-live`, `entry-idle-time`, `region-time-to-live`, `region-idle-time`

**&lt;expiration-attributes&gt; Attributes**

| Attribute | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `timeout` | Number of seconds before a region or an entry expires. If not specified, it defaults to `0` (no expiration).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `0`          |
| `action`  | Action that occurs when a region or an entry expires. <br/><br/> **Valid actions:**<br/><br/> **`local-destroy`** – Removes the region or entry from the **local cache only**. The operation is **not distributed** to other members. Not valid for partitioned region entries.<br/><br/> **`destroy`** – Removes the region or entry completely from the cache. The destroy operation **is distributed** according to the region’s distribution settings. Use when the data is no longer needed anywhere in the cluster.<br/><br/> **`invalidate`** *(default)* – Marks an entry (or all entries in a region) as **invalid** and distributes the invalidation according to the region’s scope. Use when the data is no longer valid but the entry should remain.<br/><br/> **`local-invalidate`** – Marks an entry or region as **invalid locally only**. The operation is **not distributed**. Not valid for partitioned entries and not supported for replicated regions. | `invalidate` |


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

## &lt;custom-expiry&gt; {#cc-eit-custom-expiry}
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

## &lt;cache-loader&gt; {#cc-id_uqb_3qw_bm}
An event-handler plug-in that allows you to program for cache misses. At most, one cache loader can be defined in each member for the region. For distributed regions, a cache loader may be invoked remotely from other members that have the region defined. When an entry get results in a cache miss in a region with a cache loader defined, the loaderâ€™s <span class="keyword apiname">load</span> method is called. This method is usually programmed to retrieve data from an outside data source, but it can do anything required by your application.

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

## &lt;cache-writer&gt; {#cc-id_k3w_3qw_bm}
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

## &lt;cache-listener&gt; {#cc-cache-listener}
An event-handler plug-in that receives after-event notification of changes to the region and its entries. Any number of cache listeners can be defined for a region in any member. Geode offers several listener types with callbacks to handle data and process events. Depending on the `data-policy` and the `interest-policy` subscription attributes, a cache listener may receive only events that originate in the local cache, or it may receive those events along with events that originate remotely.

Specify the Java class for the cache listener and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](cache_xml#class-name_parameter).

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

## &lt;eviction-attributes&gt; {#cc-eviction-attributes}
Specifies whether and how to control a regionâ€™s size. Size is controlled by removing least recently used (LRU) entries to make space for new ones. This may be done through destroy or overflow actions. You can configure your region for lru-heap-percentage with an eviction action of local-destroy using stored region attributes.

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

## &lt;lru-entry-count&gt; {#cc-lru-entry-count}
Using the maximum attribute, specifies maximum region capacity based on entry count.

**&lt;lru-entry-count&gt; Attributes**

| Attribute | Description                                                                                                                                                                                                                                                                                                                                                                        | Default         |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `action`  | Eviction action to perform when the limit is reached. <br/><br/> **Options:**<br/><br/> **`local-destroy`** – Entry is destroyed locally. Not available for replicated regions.<br/><br/> **`overflow-to-disk`** – Entry is overflowed to disk and the in-memory value is set to `null`. For partitioned regions, this provides the most reliable read behavior across the region. | `local-destroy` |
| `maximum` | The maximum number of entries allowed in a region.                                                                                                                                                                                                                                                                                                                                 | —               |

## &lt;lru-heap-percentage&gt; {#cc-lru-heap-percentage}
Runs evictions when the Geode resource manager says to. The manager orders evictions when the total cache size is over the heap percentage limit specified in the manager configuration. You can declare a Java class that implements the ObjectSizer interface to measure the size of objects in the Region.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](cache_xml#class-name_parameter).

**&lt;lru-heap-percentage&gt; Attributes**

| Attribute | Description                                                                                                                                                                                                                                                                                                                                                                                             | Default         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `action`  | Eviction action to perform when the configured limit is reached. <br/><br/> **Available actions:**<br/><br/> **`local-destroy`** – Entry is destroyed locally. Not available for replicated regions.<br/><br/> **`overflow-to-disk`** – Entry is overflowed to disk and the in-memory value is set to `null`. For partitioned regions, this provides the most reliable read behavior across the region. | `local-destroy` |


## &lt;lru-memory-size&gt; {#cc-lru-memory-size}
Using the maximum attribute, specifies maximum region capacity based on the amount of memory used, in megabytes. You can declare a Java class that implements the ObjectSizer interface to measure the size of objects in the Region.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](cache_xml#class-name_parameter).

**&lt;lru-memory-size&gt; Attributes**

| Attribute | Description                                                                                                                                                                                                                                                                                                                                                                                             | Default         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `action`  | Eviction action to perform when the configured limit is reached. <br/><br/> **Available actions:**<br/><br/> **`local-destroy`** – Entry is destroyed locally. Not available for replicated regions.<br/><br/> **`overflow-to-disk`** – Entry is overflowed to disk and the in-memory value is set to `null`. For partitioned regions, this provides the most reliable read behavior across the region. | `local-destroy` |
| `maximum` | The maximum amount of memory used in the region, in megabytes.                                                                                                                                                                                                                                                                                                                                          | —               |


## &lt;jndi-bindings&gt; {#cc-jndi-bindings}
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

## &lt;jndi-binding&gt; {#cc-jndi-binding}
For every datasource that is bound to the JNDI tree, there should be one `<jndi-binding>` element. This element describes the property and the configuration of the datasource. Geode uses the attributes of the `<jndi-binding>` element for configuration. Use the `<config-property>` element to configure properties for the datasource.

We recommend that you set the username and password with the `user-name` and `password` jndi-binding attributes rather than using the `<config-property>` element.

**&lt;jndi-binding&gt; Attributes**

| Attribute                      | Description                                                                                                                                                                                                                                                                                                                                                                                            | Default |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `blocking-timeout-seconds`     | Number of seconds a connection remains associated with a transaction. If exceeded, the connection is disassociated.                                                                                                                                                                                                                                                                                    | `120`   |
| `conn-pooled-datasource-class` | Java class used for the `PooledDataSource` type.                                                                                                                                                                                                                                                                                                                                                       | —       |
| `connection-url`               | URL for connecting to the data source. <br/><br/> **Note:** When using a JCA XA driver (`XAPooledDataSource`), do **not** use this attribute. Instead define database properties using `<config-property>`.                                                                                                                                                                                            | —       |
| `idle-timeout-seconds`         | Maximum number of seconds a connection can remain idle in the pool before being removed.                                                                                                                                                                                                                                                                                                               | `600`   |
| `init-pool-size`               | Initial pool size for `PooledConnection` (XA or non-XA).                                                                                                                                                                                                                                                                                                                                               | `10`    |
| `jdbc-driver-class`            | Java class used for the `SimpleDataSource` type.                                                                                                                                                                                                                                                                                                                                                       | —       |
| `jndi-name`                    | Key binding parameter. Bound as `java:/<name>`. Logs a warning if binding fails at runtime.                                                                                                                                                                                                                                                                                                            | —       |
| `login-timeout-seconds`        | Maximum time a thread waits for a pooled connection before a `PoolException` is thrown. Returns immediately if a connection is available or a new one can be created within pool limits.                                                                                                                                                                                                               | `30`    |
| `managed-conn-factory-class`   | Used when `type="ManagedDataSource"`. Provides the `PooledConnection` via JCA `ManagedConnectionFactory`.                                                                                                                                                                                                                                                                                              | —       |
| `max-pool-size`                | Maximum size of the connection pool.                                                                                                                                                                                                                                                                                                                                                                   | `30`    |
| `password`                     | Password used to access the data source.                                                                                                                                                                                                                                                                                                                                                               | —       |
| `transaction-type`             | Used when `type="ManagedDataSource"`. <br/><br/> **Options:**<br/> **`XATransaction`** – Participates in JTA transactions with the cache.<br/> **`NoTransaction`** – No transactional behavior.<br/> **`LocalTransaction`** – Local transactions not managed by JTA.                                                                                                                                   | `none`  |
| `type`                         | JNDI data source type. <br/><br/> **Options:**<br/> **`XAPooledDataSource`** – Pooled SQL connections; requires `xa-datasource-class`.<br/> **`ManagedDataSource`** – JCA `ManagedConnectionFactory` binding.<br/> **`PooledDataSource`** – Pooled SQL connections; requires `conn-pooled-datasource-class`.<br/> **`SimpleDataSource`** – Single non-pooled connection; requires `jdbc-driver-class`. | `none`  |
| `user-name`                    | User name used to access the data source.                                                                                                                                                                                                                                                                                                                                                              | —       |
| `xa-datasource-class`          | Java class used for the `XAPooledDataSource` type.                                                                                                                                                                                                                                                                                                                                                     | —       |


## &lt;config-property&gt; {#cc-config-property}
A configuration property of the datasource. Use the sub-elements to identify the name, datatype, and value of the property.

**Default:**

**API:** ``

**Example:**

``` pre
<config-property>
     <config-property-name>DatabaseName</config-property-name>
     <config-property-type>java.lang.String</config-property-type>
     <config-property-value>newDB</config-property-value>
</config-property>
```

Configuration properties vary depending on the database vendor. See [Configuring Database Connections Using JNDI](../../developing/outside_data_sources/configuring_db_connections_using_JNDI) for examples of different configuration property configurations.

## &lt;config-property-name&gt; {#cc-config-property-name}
The name of this datasource property.

## &lt;config-property-type&gt; {#cc-config-property-type}
The data type of this datasource property.

## &lt;config-property-value&gt; {#cc-config-property-value}
The value of this datasource property.

## &lt;region&gt; {#cc-region}
Defines a region in the cache. See [&lt;region-attributes&gt;](cache_xml#region-attributes) for more details on configuring regions. You can specify zero or more subregions within a region. See [Create and Access Data Subregions](../../basic_config/data_regions/managing_data_regions#data_regions__section_jn1_sry_5m) for restrictions on creating subregions. For example, you cannot create a partitioned subregion.

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

See[&lt;region-attributes&gt;](cache_xml#region-attributes) for a complete listing of region attributes.

## &lt;region-attributes&gt; {#cc-r-region-attributes}
Specifies a region attributes template that can be named (by `id`) and referenced (by `refid`) later in the `cache.xml` and through the API.

**API:** `org.apache.geode.cache.RegionFactory` or `org.apache.geode.cache.ClientRegionFactory`

**&lt;region-attributes&gt; Attributes**

| Attribute                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Default              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `concurrency-level`              | Estimate of maximum concurrent threads accessing a region entry. Not used for partitioned regions. Sets the initial parameter for the underlying `java.util.ConcurrentHashMap`. <br/><br/> **Note:** Review `ConcurrentHashMap` docs before modifying. <br/><br/> **API:** `setConcurrencyLevel` <br/><br/> **Example:**<br/>`xml<br/><region-attributes concurrency-level="10"><br/></region-attributes><br/>`                                                                                                                                                                                            | `16`                 |
| `data-policy`                    | Controls how the local cache stores and distributes data. <br/><br/> **Policies:**<br/>• `empty` – No local storage (event-only, PROXY).<br/>• `normal` – Local storage; caches may differ.<br/>• `partition` – Data partitioned across members.<br/>• `replicate` – Full copy on all members.<br/>• `persistent-partition` – Partitioned + disk.<br/>• `persistent-replicate` – Replicated + disk.<br/>• `preloaded` – Starts replicated, then normal.<br/><br/> **API:** `setDataPolicy` <br/><br/> **Example:**<br/>`xml<br/><region-attributes data-policy="replicate"><br/></region-attributes><br/>` | `normal`             |
| `enable-async-conflation`        | Enables aggregation of async TCP peer messages for slow consumers. Not used for client/server or UDP/multicast. Requires async queues and `disable-tcp=false`. <br/><br/> **API:** `setEnableAsyncConflation`                                                                                                                                                                                                                                                                                                                                                                                              | `true`               |
| `enable-gateway`                 | Sends region events to gateway hubs (GemFire 6.x). Use `gateway-sender-ids` for newer configs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `false`              |
| `enable-subscription-conflation` | Allows server to conflate messages to clients. Client can override via `conflate-events`. <br/><br/> **API:** `setEnableSubscriptionConflation`                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`              |
| `gateway-sender-ids`             | Comma-separated WAN gateway sender IDs. <br/><br/> **API:** `addGatewaySenderId`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | not set              |
| `async-event-queue-ids`          | Comma-separated async event queues for `AsyncEventListener` (write-behind). <br/><br/> **API:** `addAsyncEventQueueId`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | not set              |
| `hub-id`                         | Gateway hub IDs (GemFire 6.x only).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `null`               |
| `id`                             | Stores region attributes for reuse via `refid`. <br/><br/> **API:** `setId`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | not set              |
| `ignore-jta`                     | If `true`, region operations ignore active JTA transactions. Useful for loaders/writers doing non-transactional work. <br/><br/> **API:** `setIgnoreJTA`                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `false`              |
| `index-update-type`              | `synchronous` or `asynchronous` index maintenance. <br/><br/> **API:** `setIndexMaintenanceSynchronous`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `synchronous`        |
| `initial-capacity`               | Initial `ConcurrentHashMap` capacity (used with `load-factor`). <br/><br/> **API:** `setInitialCapacity`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `16`                 |
| `is-lock-grantor`                | Defines member as lock grantor at region creation (only for `global` scope). <br/><br/> **API:** `setLockGrantor`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false`              |
| `load-factor`                    | `ConcurrentHashMap` load factor (0–1). <br/><br/> **API:** `setLoadFactor`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `.75`                |
| `mirror-type`                    | Deprecated.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | —                    |
| `multicast-enabled`              | Uses multicast for distributed operations (requires `mcast-port`). <br/><br/> **API:** `setMulticastEnabled`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `false`              |
| `pool-name`                      | Marks region as a client region and specifies the server pool. Required if multiple pools exist. <br/><br/> **API:** `setPoolName`                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | not set              |
| `disk-store-name`                | Assigns region to a disk store for persistence or overflow. <br/><br/> **API:** `setDiskStoreName`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `null`               |
| `disk-synchronous`               | Enables synchronous disk writes. <br/><br/> **API:** `setDiskSynchronous`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `true`               |
| `refid`                          | References a stored attribute set or region shortcut. <br/><br/> **API:** `setRefId`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | not set              |
| `scope`                          | Controls distribution behavior. <br/><br/> **Values:**<br/>• `local` – No distribution.<br/>• `distributed-no-ack` – No ack required.<br/>• `distributed-ack` – Ack + versioning.<br/>• `global` – Distributed locking.<br/><br/> **API:** `setScope`                                                                                                                                                                                                                                                                                                                                                      | `distributed-no-ack` |
| `statistics-enabled`             | Enables region statistics (required for expiration). <br/><br/> **API:** `setStatisticsEnabled`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`              |
| `cloning-enabled`                | Applies deltas to a clone (`true`) or in place (`false`). <br/><br/> **API:** `setCloningEnabled`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `false`              |
| `concurrency-checks-enabled`     | Enables version checks for concurrent/out-of-order updates. Clients may disable to receive all events. <br/><br/> **API:** `setConcurrencyChecksEnabled`                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `true`               |
| `off-heap`                       | Stores values in off-heap memory (keys and map remain on heap). <br/><br/> **API:** `setOffHeap`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `false`              |

## &lt;index&gt; {#cc-index}
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

## &lt;entry&gt; {#cc-entry}
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

## &lt;key&gt; {#cc-key}
Required. Describes the key in a region entry. A key can contain either a &lt;string&gt; or a &lt;declarable&gt; sub-element.

## &lt;string&gt; {#cc-string}
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

## &lt;declarable&gt; {#cc-declarable}
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

## &lt;value&gt; {#cc-value}
Required. Describes the value of a region entry. A `<value>` can contain either a `<string>` or a `<declarable>` sub-element.

## &lt;string&gt; {#cc-v-string}
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

## &lt;declarable&gt; {#cc-v-declarable}
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

## &lt;region&gt; {#cc-ra-region}
Defines a region in the cache. See [&lt;region-attributes&gt;](cache_xml#region-attributes) for more details on configuring regions. You can specify zero or more subregions within a region. See [Create and Access Data Subregions](../../basic_config/data_regions/managing_data_regions#data_regions__section_jn1_sry_5m) for restrictions on creating subregions. For example, you cannot create a partitioned subregion.

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

See[&lt;region-attributes&gt;](cache_xml#region-attributes) for a complete listing of region attributes.

## &lt;function-service&gt; {#cc-function-service}
Configures the behavior of the function execution service.

**Example:**

``` pre
<client-cache>
  ...
    </region>
  <function-service>
    <function>
      <class-name>com.myCompany.tradeService.cache.func.TradeCalc</class-name>
    </function>
  </function-service>
  ...
</client-cache>
```

## &lt;function&gt; {#cc-function}
Defines a function for registration in the function service

Specify the Java class for the function and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](cache_xml#class-name_parameter).

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

## &lt;resource-manager&gt; {#cc-resource-manager}
A memory monitor that tracks cache size as a percentage of total heap or off-heap memory and controls size by restricting access to the cache and prompting eviction of old entries from the cache. For tenured heap, used in conjunction with settings for JVM memory and Java garbage collection. For off-heap memory, used with the off-heap memory manager.

**API:** `org.apache.geode.cache.control.ResourceManager`

**&lt;resource-manager&gt; Attributes**

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
<td>critical-heap-percentage</td>
<td>Percentage of heap at or above which the cache is considered in danger of becoming inoperable due to garbage collection pauses or out of memory exceptions.
<p>Only one change to this attribute or critical heap percentage will be allowed at any given time and its effect will be fully realized before the next change is allowed. This feature requires additional VM flags to perform properly. See <code class="ph codeph">setCriticalHeapPercentage()</code> for details.</p></td>
<td>0</td>
</tr>
<tr>
<td>eviction-heap-percentage</td>
<td><p>Set the percentage of heap at or above which the eviction should begin on Regions configured for HeapLRU eviction.</p>
<p>Changing this value may cause eviction to begin immediately.</p></td>
<td><ul>
<li>0, If no region is configured with heap eviction</li>
<li>If <code class="ph codeph">critical-heap-percentage</code> is set to a non-zero value, 5% less than that value.</li>
<li>80%, if <code class="ph codeph">critical-heap-percentage</code> is not configured.</li>
</ul></td>
</tr>
<tr>
<td>critical-off-heap-percentage</td>
<td>Percentage of off-heap memory at or above which the cache is considered in danger of becoming inoperable due to garbage collection pauses or out of memory exceptions.</td>
<td>0</td>
</tr>
<tr>
<td>eviction-off-heap-percentage</td>
<td>Set the percentage of off-heap memory at or above which the eviction should begin on Regions configured for HeapLRU eviction.</td>
<td><ul>
<li>0, If no region is configured with heap eviction</li>
<li>If <code class="ph codeph">critical-off-heap-percentage</code> is set to a non-zero value, 5% less than that value.</li>
<li>80%, if <code class="ph codeph">critical-off-heap-percentage</code> is not configured.</li>
</ul></td>
</tr>
</tbody>
</table>

**Example:**

``` pre
<client-cache>
...
   <resource-manager 
      critical-heap-percentage="99.9" 
      eviction-heap=-percentage="85"/>
...
</client-cache>
```

## &lt;serialization-registration&gt; {#cc-serialization-registration}
Set of serializer or instantiator tags to register customer DataSerializer extensions or DataSerializable implementations respectively.

**Example:**

``` pre
<serialization-registration>
  Â  <instantiator id="30">     Â Â Â 
       <class-name>com.package.MyClass</class-name>
  Â  </instantiator>
</serialization-registration> 
```

## &lt;serializer&gt; {#cc-serializer}
Allows you to configure the DataSerializer for this Geode member. It registers a custom class which extends DataSerializer to support custom serialization of non-modifiable object types inside Geode .

Specify the Java class for the `DataSerializer` and its initialization parameters with the `<class-name>` sub-element.

**API:** You can also register a `DataSerializer` by using the `org.apache.geode.DataSerializer.register` API. Use the `org.apache.geode.Instantiator` API to register a `DataSerializable` implementation.

## &lt;instantiator&gt; {#cc-instantiator}
An Instantiator registers a custom class which implements the `DataSerializable` interface to support custom object serialization inside Geode .

Specify the Java class and its initialization parameters with the `<class-name>` sub-element.

**API:** `DataSerializable`

You can also directly specify `<instantiator>` as a sub-element of `<client-cache>`. Use the `org.apache.geode.Instantiator` API to register a `DataSerializable` implementation as the serialization framework for the cache. The following table lists the attribute that can be specified for an `<instantiator>`.

**&lt;instantiator&gt; Attributes**

| Attribute | Description                                                                           | Default |
|-----------|---------------------------------------------------------------------------------------|---------|
| id        | Required. ID that the Instantiator should associate with the `DataSerializable` type. | Â        |


## &lt;initializer&gt; {#cc-initializer}
Used to specify a callback class (and optionally its parameters) that will be run after the cache is initialized. This element can be specified for both server and client caches.

Specify the Java class and its initialization parameters with the `<class-name>` and `<parameter>` sub-elements. See [&lt;class-name&gt; and &lt;parameter&gt;](cache_xml#class-name_parameter).

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



