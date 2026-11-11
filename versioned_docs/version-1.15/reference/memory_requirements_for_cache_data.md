---
title:  Memory Requirements for Cached Data
sidebar_label: Memory Requirements for Cached Data
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

@@product_name@@ solutions architects need to estimate resource requirements for meeting application performance, scalability and availability goals.

These requirements include estimates for the following resources:

-   memory
-   number of machines
-   network bandwidth

The information here is only a guideline, and assumes a basic understanding of @@product_name@@. While no two applications or use cases are exactly alike, the information here should be a solid starting point, based on real-world experience. Much like with physical database design, ultimately the right configuration and physical topology for deployment is based on the performance requirements, application data access characteristics, and resource constraints (i.e., memory, CPU, and network bandwidth) of the operating environment.
## {#topic_ipt_dqz_j4}
# Core Guidelines for @@product_name@@ Data Region Design

The following guidelines apply to region design:

-   For 32-bit JVMs: If you have a small data set (&lt; 2GB) and a read-heavy requirement, you should be using replicated regions.
-   For 64-bit JVMs: If you have a data set that is larger than 50-60% of the JVM heap space you can use replicated regions. For read heavy applications this can be a performance win. For write heavy applications you should use partitioned caches.
-   If you have a large data set and you are concerned about scalability you should be using partitioned regions.
-   If you have a large data set and can tolerate an on-disk subset of data, you should be using either replicated regions or partitioned regions with overflow to disk.
-   If you have different data sets that meet the above conditions, then you might want to consider a hybrid solution mixing replicated and partition regions. Do not exceed 50 to 75% of the JVM heap size depending on how write intensive your application is.

## Memory Usage Overview {#topic_ppn_pqz_j4}
The following guidelines should provide a rough estimate of the amount of memory consumed by your system.

Memory calculation about keys and entries (objects) and region overhead for them can be divided by the number of members of the cluster for data placed in partitioned regions only. For other regions, the calculation is for each member that hosts the region. Memory used by sockets, threads, and the small amount of application overhead for @@product_name@@ is per member.

For each entry added to a region, the @@product_name@@ cache API consumes a certain amount of memory to store and manage the data. This overhead is required even when an entry is overflowed or persisted to disk. Thus objects on disk take up some JVM memory, even when they are paged to disk. The Java cache overhead introduced by a region, using a 32-bit JVM, can be approximated as listed below.

Actual memory use varies based on a number of factors, including the JVM you are using and the platform you are running on. For 64-bit JVMs, the usage will usually be larger than with 32-bit JVMs. As much as 80% more memory may be required for 64-bit JVMs, due to object references and headers using more memory.

There are several additional considerations for calculating your memory requirements:

-   **Size of your stored data.** To estimate the size of your stored data, determine first whether you are storing the data in serialized or non-serialized form. In general, the non-serialized form will be the larger of the two. See [Determining Object Serialization Overhead](#topic_psn_5tz_j4)

    Objects in @@product_name@@ are serialized for storage into partitioned regions and for all distribution activities, including moving data to disk for overflow and persistence. For optimum performance, @@product_name@@ tries to reduce the number of times an object is serialized and deserialized, so your objects may be stored in serialized or non-serialized form in the cache.

-   **Application object overhead for your data.** When calculating application overhead, make sure to count the key as well as the value, and to count every object if the key and/or value is a composite object.

    The following section "Calculating Application Object Overhead" provides details on how to estimate the memory overhead of the keys and values stored in the cache.

## Calculating Application Object Overhead {#topic_kjx_brz_j4}
To compute the memory overhead of a Java object, perform the following steps:

1.  **Determine the object header size.** Each Java object has an object header. For a 32-bit JVM, it is 8 bytes. For a 64-bit JVM with a heap less than or equal to 32GB, it is 12 bytes. For a 64-bit JVM with a heap greater than 32GB, it is 16 bytes.
2.  **Determine the memory overhead of the fields of the object.** For every instance field (including fields from super classes), add in the field's size. For primitive fields the sizes are:
    -   8 for long and double
    -   4 for int and float
    -   2 for char and short
    -   1 for byte and boolean

    For object reference fields, the size is 8 bytes for 64-bit JVM with a heap greater than 32GB. For all other JVMs, use 4 bytes.
3.  **Add up the numbers from Step 1 and 2 and round it up to the next multiple of 8.** The result is the memory overhead of that Java object.

**Java arrays.** To compute the memory overhead of a Java array, you would add the object header (since the array is an object) and a primitive int field that contains its size. Treat each element of the array as if it was an instance field. For example, a byte array of the size 100 bytes would have one object header, one int field, and 100 byte fields. Use the three step process described above to do the computation.

**Serialized objects.** When computing the memory overhead of a serialized value, remember that the serialized form is stored in a byte array. Therefore, to figure out how many bytes the serialized form contains, compute the memory overhead of a Java byte array of that size and then add in the size of the serialized value wrapper.

When a value is initially stored in the cache in serialized form, a wrapper around the value is introduced that is kept in memory for the life of that value even if the value is later deserialized. Although this wrapper is only used internally, it does add to the memory footprint. The wrapper is an object with one int field and one object reference.

If you are using partitioned regions, every value is initially stored in serialized form. For other region types only values that come from a remote member (peers or clients) are initially stored in serialized form. (This is the most common case.) However, if a local operation stores the value in the local JVM's cache, then the value will be stored in object form. A large number of operations can cause a value stored in serialized form to be deserialized. Any operation that needs the object form of the value to be local can cause this deserialization. If such operations are performed, then that value will be stored in object form (with the additional serialized wrapper) and the serialized form becomes garbage.

**Note:**
An exception to this is if the serialized from is encoded with PDX, then setting `read-serialized` to true will keep the serialized form in the cache.

See [Determining Object Serialization Overhead](#topic_psn_5tz_j4) for additional information on how to calculate memory usage requirements for storing serialized objects.

## Using Key Storage Optimization {#topic_exn_2tz_j4}
Keys are stored in object form except for certain classes where the storage of keys is optimized. Key storage is optimized by replacing the entry's object reference to the key with one or two primitive fields on the entry that store the key's data "inline". The following rules apply to determine whether a key is stored "inline":

-   If the key's class is `java.lang.Integer`, `java.lang.Long`, or `java.util.UUID`, then the key is always stored inline. The memory overhead for an inlined Integer or Long key is 0 (zero). The memory overhead for an inlined UUID is 8.
-   If the key's class is `java.lang.String`, then the key will be inlined if the string's length is small enough.

    -   For ASCII strings whose length is less than 8, the inline memory overhead is 0 (zero).
    -   For ASCII strings whose length is less than 16, the inline memory overhead is 8.
    -   For non-ASCII strings whose length is less then 4, the inline memory overhead is 0 (zero).
    -   For non-ASCII strings whose length is less then 8 the inline memory overhead is 8.

    All other strings are not inlined.

**When to disable inline key storage.** In some cases, storing keys inline may introduce extra memory or CPU usage. If all of your keys are also referenced from some other object, then it is better to not inline the key. If you frequently ask for the key from the region, then you may want to keep the object form stored in the cache so that you do not need to recreate the object form constantly. Note that the basic operation of checking whether a key is in a region does not require the object form but uses the inline primitive data.

The key inlining feature can be disabled by specifying the following @@product_name@@ property upon member startup:

``` pre
-Dgemfire.DISABLE_INLINE_REGION_KEYS=true
```

## Measuring Cache Overhead {#topic_ac4_mtz_j4}
This table gives estimates for the cache overhead in a 32-bit JVM. The overhead is required even when an entry is overflowed or persisted to disk. Actual memory use varies based on a number of factors, including the JVM type and the platform you run on. For 64-bit JVMs, the usage will usually be larger than with 32-bit JVMs and may be as much as 80% more.

| When calculating cache overhead…                                                                                | You should…                                                                   |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| For each region *(note: object header/reference sizes vary by 64-bit JVM, JVM implementation, and JDK version)* | add **64 bytes per entry**                                                    |
| And concurrency checking is disabled *(enabled by default)*                                                     | subtract **16 bytes per entry**                                               |
| And statistics are enabled for the region                                                                       | add **16 bytes per entry**                                                    |
| And the region is persisted                                                                                     | add **52 bytes per entry**                                                    |
| And the region is overflow only                                                                                 | add **44 bytes per entry**                                                    |
| And the region has an LRU eviction controller                                                                   | add **16 bytes per entry**                                                    |
| And the region has global scope                                                                                 | add **110 bytes per entry**                                                   |
| And the region has entry expiration configured                                                                  | add **112 bytes per entry**                                                   |
| For each optional user attribute                                                                                | add **40 bytes per entry** + the memory overhead of the user attribute object |


For indexes used in querying, the overhead varies greatly depending on the type of data you are storing and the type of index you create. You can roughly estimate the overhead for some types of indexes as follows:

-   If the index has a single value per region entry for the indexed expression, the index introduces at most 243 bytes per region entry. An example of this type of index is: `fromClause="/portfolios",               indexedExpression="id"`. The maximum of 243 bytes per region entry is reached if each entry has a unique value for the indexed expression. The overhead is reduced if the entries do not have unique index values.
-   If each region entry has more than one value for the indexed expression, but no two region entries have the same value for it, then the index introduces at most 236 C + 75 bytes per region entry, where C is the average number of values per region entry for the expression.
-   Lucene indexes add approximately 737 bytes per entry.
The other index overhead estimates listed here also apply to Lucene indexes.

## Estimating Management and Monitoring Overhead {#topic_i1m_stz_j4}
The @@product_name@@ JMX management and monitoring system contributes to memory overhead and should be accounted for when establishing the memory requirements for your deployment. Specifically, the memory footprint of any processes (such as locators) that are running as JMX managers can increase.

For each resource in the cluster that is being managed and monitored by the JMX Manager (for example, each MXBean such as MemberMXBean, RegionMXBean, DiskStoreMXBean, LockServiceMXBean and so on), you should add 10 KB of required memory to the JMX Manager node.

## Determining Object Serialization Overhead {#topic_psn_5tz_j4}
@@product_name@@ PDX serialization can provide significant space savings over Java Serializable in addition to better performance. In some cases we have seen savings of up to 65%, but the savings will vary depending on the domain objects. PDX serialization is most likely to provide the most space savings of all available options. DataSerializable is more compact, but it requires that objects are deserialized on access, so that should be taken into account. On the other hand, PDX serializable does not require deserialization for most operations, and because of that, it may provide greater space savings.

In any case, the kinds and volumes of operations that would be done on the server side should be considered in the context of data serialization, as @@product_name@@ has to deserialize data for some types of operations (access). For example, if a function invokes a get operation on the server side, the value returned from the get operation will be deserialized in most cases (the only time it will not be deserialized is when PDX serialization is used and the read-serialized attribute is set). The only way to find out the actual overhead is by running tests, and examining the memory usage.

Some additional serialization guidelines and tips:

-   If you are using compound objects, do not mix using standard Java serialization with with @@product_name@@ serialization (either DataSerializable or PDX). Standard Java serialization functions correctly when mixed with @@product_name@@ serialization, but it can end up producing many more serialized bytes.

    To determine if you are using standard Java serialization, specify the `-DDataSerializer.DUMP_SERIALIZED=true` upon process execution. Then check your log for messages of this form:

    ``` pre
    DataSerializer Serializing an instance of <className>
    ```

    Any classes list are being serialized with standard Java serialization. You can optimize your serialization by handling those classes in a `PdxSerializer` or a `DataSerializer` or changing the class to be `PdxSerializable` or `DataSerializable`.

-   A simple way to determine the serialized size of an object is to create an instance of that object and then call `DataSerializer.writeObject(obj dataOutput)` where "dataOutput" wraps a `ByteArrayOutputStream`. You can then ask the stream for its size, and it will return the serialized size. Make sure you have configured your `PdxSerializer` and/or `DataSerializer`(s) configured before you calling `writeObject`.

If you do want to estimate memory usage for PDX serialized data, the following table provides estimated sizes for various types when using PDX serialization:

| Type          | Memory Usage                                                                                                                                       |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| boolean       | 1 byte                                                                                                                                             |
| byte          | 1 byte                                                                                                                                             |
| char          | 2 bytes                                                                                                                                            |
| short         | 2 bytes                                                                                                                                            |
| int           | 4 bytes                                                                                                                                            |
| long          | 8 bytes                                                                                                                                            |
| float         | 8 bytes                                                                                                                                            |
| String        | String.length + 3 bytes                                                                                                                            |
| Domain Object | 9 bytes (for PDX header) + object serialization length (total all member fields) + 1 to 4 extra bytes (depends on the total size of Domain object) |

A note of caution: If the domain object contains many domain objects as member fields, then the memory overhead of PDX serialization can be considerably more than other types of serialization.

## Calculating Socket Memory Requirements {#topic_d3g_c5z_j4}
Servers always maintain two outgoing connections to each of their peers. So for each peer a server has, there are four total connections: two going out to the peer and two coming in from the peer.

The server threads that service client requests also communicate with peers to distribute events and forward client requests. If the server's @@product_name@@ connection property *conserve-sockets* is set to true, these threads use the already-established peer connections for this communication.

If *conserve-sockets* is false (the default), each thread that services clients establishes two of its own individual connections to its server peers, one to send, and one to receive. Each socket uses a file descriptor, so the number of available sockets is governed by two operating system settings:

-   maximum open files allowed on the system as a whole
-   maximum open files allowed for each session

In servers with many threads servicing clients, if *conserve-sockets* is set to false, the demand for connections can easily overrun the number of available sockets. Even with *conserve-sockets* set to false, you can cap the number of these connections by setting the server's *max-threads* parameter.

Since each client connection takes one server socket on a thread to handle the connection, and since that server acts as a proxy on partitioned regions to get results, or execute the function service on behalf of the client, for partitioned regions, if conserve-sockets is set to false, this also results in a new socket on the server being opened to each peer. Thus N sockets are opened, where N is the number of peers. Large number of clients simultaneously connecting to a large set of peers with a partitioned region with conserve sockets set to false can cause a large amount of memory to be consumed by sockets.

**Note:**
There is also JVM overhead for the thread stack for each client connection being processed, set at 256KB or 512KB for most JVMs . On some JVMs you can reduce it to 128KB. You can use the @@product_name@@ `max-threads` property or the @@product_name@@ `max-connections` property to limit the number of client threads and thus both thread overhead and socket overhead.

The following table lists the memory requirements based on connections.

| Connections                                                                       | Memory requirements                                                                                                                                                           |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Per socket                                                                        | **32,768 bytes per socket** (configurable). <br/>Recommended default: `> 100 + sizeof(largest object in region) + sizeof(largest key)`                                        |
| If server (has clients)                                                           | `min(max-threads, max-connections) * (socket buffer size + JVM thread overhead)`                                                                                              |
| Per cluster member when `conserve-sockets = true`                                 | `4 * number of peers`                                                                                                                                                         |
| Per cluster member when `conserve-sockets = false`                                | `4 * number of peers hosting the region * number of threads`                                                                                                                  |
| Partitioned Region + `conserve-sockets = false` + server *(in addition to above)* | `<= max-threads * 2 * number of peers` <br/><br/>**Note:** effectively `2 * current number of connected clients * number of peers` (each connection spawns a thread)          |
| **Subscription queues (per server)**                                              | Queue size is configurable (entries or MB). Minimum **~1 MB+**. Memory includes key, value/reference, client/thread ID, and operation metadata.                               |
| **Classes and JVM overhead**                                                      | ~**50 MB**                                                                                                                                                                    |
| **Thread overhead**                                                               | Each concurrent client connection creates a thread (up to `max-threads`). <br/>Thread stack overhead: **~256 KB–512 KB** per thread (can be reduced to ~128 KB on many JVMs). |



