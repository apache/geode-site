---
title:  Glossary
sidebar_label: Glossary
sidebar_position: 13
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

This glossary defines terms used in @@product_name_long@@ documentation.

## ACK wait threshold {#glossary__section_DAFADE21D316465481B71C795FF77AD5}
A time-to-wait for message acknowledgment between system members.

## administrative event {#glossary__section_C3F8A17C6458419AAE109F6E4719FFB1}
See [event](glossary#glossary__section_2AF9B98BC1CA402A9F24E552EE9C9ACF).

## API {#glossary__section_E54C1FFAF4644954B54FA78A4EE5FC44}
Application Programming Interface. @@product_name@@ provides APIs to cached data for Java applications.

## application program {#glossary__section_1DCB29DBB9064E82A4CC0A6413191820}
A program designed to perform a specific function directly for the user or, in some cases, for another application program. @@product_name@@ applications use the @@product_name@@ application programming interfaces (APIs) to modify cached data.

## attribute {#glossary__section_1E6C71FF293148BE853D0C7D657F90ED}
Querying: A named member of a data object. The public fields and methods of an object may be accessed as attributes in the context of a query.

Region: See [region attributes](glossary#glossary__section_7398A81EE9034E7FBDF7B592314586B3).

## attribute path {#glossary__section_8B77F26807044FAD96134DEB21AD0590}
A sequence of attributes separated by a dot (.), applied to objects where the value of each attribute is used to apply the next attribute.

## blocking {#glossary__section_D86690A5E9B444CE969AB6D92BC25127}
A behavior associated with synchronization functions. Blocking behavior is exhibited as waiting for a signal to proceed, regardless of how long it takes. See also [timeout](glossary#glossary__section_311C7AE4126A4B1899D6EA1C4E804F57).

## cache {#glossary__section_938DF854708546878D59694A4C68604C}
In-memory @@product_name@@ data storage created by an application or cache server for data storage, distribution, and management. This is the point of access for Java applications for all caching features, and the only view of the cache that is available to the application. Cache creation creates a connection to the cluster. See also [local](glossary#glossary__section_598D82A75D9842438BB934E01E77266E) and [remote](glossary#glossary__section_CC864725C0014791805D2549D87DA545).

## cache-local {#glossary__section_F63DF98EB5D04EB5BBF9C6AD923341F5}
Residing or occurring in the local cache.

## cache.xml {#glossary__section_3527F588E0B844F783D4A98E248F0E4B}
Common name for the XML file that declares the initial configuration of a cache. This file is used to customize the behavior of the @@product_name@@ cache server process and can be used by any Java application. Applications can also configure the cache through the @@product_name@@ Java APIs. You can give this file any name.

## cache event {#glossary__section_61C824936B6E495D9214EE7E0F0C0F63}
See [event](glossary#glossary__section_2AF9B98BC1CA402A9F24E552EE9C9ACF).

## cache listener {#glossary__section_688E118C48B246AF9D2AAB64AE9481D4}
User-implemented plug-in for receiving and handling region entry events. A region’s cache listener is called after an entry in the local cache is modified. See also [cache writer](glossary#glossary__section_40FFA1BD5E4A4E3084AE8B257C612EDE).

## cache loader {#glossary__section_9CAA8CD20DBF4F948E20E384C987D0C8}
User-implemented plug-in for loading data into a region. A region’s cache loader is used to load data that is requested of the region but is not available in the cluster. For a distributed region, the loader that is used can be in a different cache from the one where the data-request operation originated. See also [netSearch](glossary#glossary__section_B9B118509831405D9AB4069503119DFB) and [netLoad](glossary#glossary__section_BFFF4BF9D6414AA392F7AEAC1256C112).cache misses, where a requested key is not present or has a null value in the local cache.

## cache miss {#glossary__section_6D9FA50812AC45BCADA7755E4368A5C4}
The situation where a key’s value is requested from a cache and the requested key is not present or has a null value. @@product_name@@ responds to cache misses in various ways, depending on the region and system configuration. For example, a client region goes to its servers to satisfy cache misses. A region with local scope uses its data loader to load the value from an outside data source, if a loader is installed on the region.

## cache server {#glossary__section_cache_server}
A long-lived, configurable @@product_name@@ cluster member process that can service client connections.

## cache transaction {#glossary__section_cache_transaction}
A native @@product_name@@ transaction, managed by @@product_name@@ and not by JTA. This type of transaction operates only on data available from the @@product_name@@ cache in the local member. See also [JTA](glossary#glossary__section_2B4ADA311CA946839F3E8F3B071D4E74) and [global transaction](glossary#glossary__section_CDA3C2530A74433CBE0204D588C237AC).

## cache writer {#glossary__section_40FFA1BD5E4A4E3084AE8B257C612EDE}
User-implemented plug-in intended for synchronizing the cache with an outside data source. A region’s cache writer is a synchronous listener to cache data events. The cache writer has the ability to cancel a data modification. See also [cache listener](glossary#glossary__section_688E118C48B246AF9D2AAB64AE9481D4) and [netWrite](glossary#glossary__section_3B75FF1066664923B2C9A61BDA133559).

## client {#glossary__section_109B7961FDFC4EED8C1802E84031B38D}
A @@product_name@@ application that is configured as a standalone cluster member, with regions configured as client regions. Client configuration uses the &lt;client-cache&gt; `cache.xml` element and the ClientCache API.

## client region {#glossary__section_A586ED6889724255957630F01B2E54F4}
A @@product_name@@ cache region that is configured to go to one or more @@product_name@@ servers, in a separate @@product_name@@ cluster, for all data distribution activities. Among other things, client regions go to servers to satisfy cache misses, distribute data modifications, and to run single queries and continuous queries.

## cluster configuration service

The cluster configuration service saves cluster configurations created by gfsh commands to the locators in a cluster and distributes the configurations to members of the cluster.

## collection {#glossary__section_054DE9007EFB49119CE9B4725DCA6C14}
Used in the context of a query for a group of distinct objects of homogeneous type, referred to as elements. Valid collections include the `java.util.Collection` as well as Set, Map, List, and arrays. The elements in a collection can be iterated over. Iteration over a Map traverses its entries as instances of Map.Entry. A region can also be treated as a collection of its values.

## commit {#glossary__section_F8C00E335E9C4F1EA717F717B2A0E7FE}
A transactional operation that merges a transaction’s result into the cache. Changes are made in an "all or none" fashion. Other changes from outside the current transaction are kept separate from those being committed.

## concurrency-level {#glossary__section_3699AD8BD21249178882247DF7C12104}
Region attribute that specifies an estimate of the number of threads ever expected to concurrently modify values in the region. The actual concurrency may vary; this value is used to optimize the allocation of system resources.

## conflation {#glossary__section_3FEC7A097CE247299F47EA209C5F91B8}
Combining entries in a message queue for better performance. When an event is added to queue, if a similar event exists in the queue, there are two ways to conflate the events. One way is to remove the existing entry from wherever it resides in the queue, and add the new entry to the end of the queue. The other way is to replace the existing entry with the new entry, where it resides in the queue, and add nothing to the end of the queue. In @@product_name@@, region entry update events, server events going to clients, and gateway sender events going to remote clusters can all be conflated.

## connection {#glossary__section_6D18D4A3D0D046E6B3664B4C95065EB3}
The connection used by an application to access a @@product_name@@ system. A Java application connects to its @@product_name@@ cluster when it creates its cache. The application must connect to a cluster to gain access to the @@product_name@@ functionalities. A client connects to a running @@product_name@@ server to distribute data and events between itself and the server tier. These client connections are managed by server connection pools within the client applications. Gateway senders connect to a remote gateway receiver to distribute data events between sites.

## consumer {#glossary__section_32D2C413690A4F44BA8F7B0F2AF3CD1A}
@@product_name@@ member process that receives data and/or events from other members. Peer consumers are often configured with replicated regions, so all changes in the cluster arrive into the local cache. Client consumers can register subscriptions with their servers so that updates are automatically forwarded from the server tier. See [producer](glossary#glossary__section_8742E7E064364DED98D4D399B98DBCF3).

## coordinator {#glossary__section_E02DBBD928D54E8C82EC59B5CCC528EF}
The member of the cluster that sends out membership views. This is typically the locator in @@product_name@@.

## data accessor {#glossary__section_6049C4E876C24615B245D8E2A92E3D89}
In the context of a region, a member configured to use a region, but not store any data for it in the member’s local cache. Common use cases for data accessors are thin clients, and thin producer and consumer applications. Accessors can put data into the region and receive events for the region from remote members or servers, but they store no data in the application. See also [data store](glossary#glossary__section_CC99958C53D84AD38E15E3BEDEA5F61D).

## data entry {#glossary__section_A8EE060D11E645D3B3FCDE0E5181F163}
See [entry](glossary#glossary__section_5D8ED880C9BD4062BE6F0404B28FA005).

## data fabric {#glossary__section_6D48D75AAC28486697EA3A5E66AEEF04}
Also referred to as an in-memory data grid or an enterprise data fabric. @@product_name@@ is an implementation of a data fabric. A data fabric is a distributed, memory-based data management platform that uses cluster-wide resources -- memory, CPU, network bandwidth, and optionally local disk -- to manage application data and application logic (behavior). The data fabric uses dynamic replication and data partitioning techniques to offer continuous availability, very high performance, and linear scalability for data intensive applications, all without compromising on data consistency even when exposed to failure conditions.

## data-policy {#glossary__section_41C4996366BF4CD4BF290E6DF6E2F20D}
Region attribute used to determine what events the region receives from remote caches, whether data is stored in the local cache, and whether the data is persisted to disk. For disk persistence, writes are performed according to the cache disk-store configuration.

## data region (region) {#glossary__section_348DF8B2F8984813897E1BCEB2CEDD59}
A logical grouping of data within a cache. Regions usually contain data entries (see entry). Each region has a set of region attributes governing activities such as expiration, distribution, data loading, events, and capacity control. In addition, a region can have an application-defined user attribute.

## data store {#glossary__section_CC99958C53D84AD38E15E3BEDEA5F61D}
In the context of a region, a member configured to store data for the region. This is used mostly for partitioned regions, where data is spread across the cluster among the data stores. See also [data accessor](glossary#glossary__section_6049C4E876C24615B245D8E2A92E3D89).

## deadlock {#glossary__section_53D31D86FA12426E8412A2F45BBAE34A}
A situation in which two or more processes are waiting indefinitely for events that will never occur.

## destroy {#glossary__section_179D08FF635F4A939F59C44914254410}
Distributed: To remove a cached object across the distributed cache.

Local: To remove a cached object from the local cache only.

## disk region {#glossary__section_C2B05EDE9FDB478AB99C8DCD290A91B3}
A persistent region.

## disk-store {#glossary__section_672E5F70BE09465589253DEA25FA90EA}
Cache element specifying location and write behavior for disk storage. Used for persistence and overflow of data. The cache can have multiple disk stores, which are specified by name for region attributes, client subscription queues (for servers), and WAN gateway sender queues.

## distributed cache {#glossary__section_1BE6131144994E89A8F68685D8DCF490}
A collection of caches spread across multiple machines and multiple locations that functions as a single cache for the individual applications.

## distributed system {#glossary__section_94901F2666594813BAE6761DF4CEF0ED}
One or more @@product_name@@ system members or clusters that have been configured to communicate cache events with each other, forming a single, logical system.

## distributed-ack scope {#glossary__section_FC39A1F63F4D40FC9B3DF00F1A75282E}
Data distribution setting that causes synchronous distribution operations, which wait for acknowledgment from other caches before continuing. Operations from multiple caches can arrive out of order. This scope is slower but more reliable than distributed-no-ack.

## distributed-no-ack scope {#glossary__section_35D0344DB4684FD69EFC01F599F2F349}
Data distribution setting that causes asynchronous distribution operations, which return without waiting for a response from other caches. This scope produces the best performance, but is prone to race conditions.

## entry {#glossary__section_5D8ED880C9BD4062BE6F0404B28FA005}
A data object in a region consisting of a key and a value. The value is either null (invalid) or a Java object. A region entry knows what region it is in. An entry can have an application-defined user attribute. See also [region data](glossary#glossary__section_CDA009928A3041F2AEE914F7BD3590C7), [entry key](glossary#glossary__section_1B630E274E6B45D2850A405276A39307), and [entry value](glossary#glossary__section_C79B084B7945436C89518D64E75E1D8E).

## entry key {#glossary__section_1B630E274E6B45D2850A405276A39307}
The unique identifier for an entry in a region.

## entry value {#glossary__section_C79B084B7945436C89518D64E75E1D8E}
The data contained in an entry.

## event {#glossary__section_2AF9B98BC1CA402A9F24E552EE9C9ACF}
An action recognized by the @@product_name@@ system members, which can respond by executing callback methods. The @@product_name@@ API produces two types of events: cache events for detail-level management of applications with data caches and administrative events for higher-level management of the cluster and its components. An operation can produce administrative events, cache events, or both.

## eviction-attributes {#glossary__section_1B57CC3632B843AA89CB321489C3B91C}
Region attribute that causes the cache to limit the size of the region by removing old entries to make space for new ones.

## expiration {#glossary__section_FA56C0CD24254B18B6B428BAD00F45D0}
A cached object expires when its time-to-live or idle timeout counters are exhausted. A region has one set of expiration attributes for itself and one set for all of its entries.

## expiration action {#glossary__section_5ADAA5E628FB421999C286D38A2AA1DD}
The action to be taken when a cached object expires. The expiration action specifies whether the object is to be invalidated or destroyed and whether the action is to be performed only in the local cache or throughout the cluster. A destroyed object is completely removed from the cache. A region is invalidated by invalidating all entries contained in the region. An entry is invalidated by having its value marked as invalid. Region.getEntry.getValue returns null for an invalid entry.

In @@product_name@@, expiration attributes are set at the region level for the region and at the entry level for entries. See also idle timeout and time-to-live.

## factory method {#glossary__section_5CFFD2274BAD4A73849B3AA854BA4661}
An interface for creating an object which at creation time can let its subclasses decide which class to instantiate. The factory method helps instantiate the appropriate subclass by creating the correct object from a group of related classes.

## forced disconnect {#glossary__section_87AAD34154CB49C4A47B88FFDAAFE690}
Forcible removal of a member from membership without the member’s consent.

## gateway receiver {#glossary__section_A4B70DE75E364C4796B1ADA75A09E935}
A gateway receiver defines connection information for receiving region events that were distributed from a gateway sender in a multi-site deployment.

## gateway sender {#glossary__section_1AAED2CD15094B2FBE7B6064176884CD}
A gateway sender defines a single remote cluster site and an associated queue for distributing region events in a multi-site deployment.

## gemfire.properties {#glossary__section_B7B1440197B84F72B1145A44032768C4}
Common name for the file used for cluster configuration, including system member connection and communication behavior, logging and statistics files and settings, and security settings. Applications can also configure the cluster through the @@product_name@@ Java APIs. You can give this file any name.

## global scope {#glossary__section_6838A6C252464E94965F05E285A94689}
Data distribution setting that provides locking across the cluster for load, create, put, invalidate, and destroy operations on the region and its entries. This scope is the slowest, but it guarantees consistency across the cluster.

## global transaction {#glossary__section_CDA3C2530A74433CBE0204D588C237AC}
A JTA-controlled transaction in which multiple resources, such as the @@product_name@@ cache and a JDBC database connection, participate. JTA coordinates the completion of the transaction with each of the transaction’s resources. See also [JTA](glossary#glossary__section_2B4ADA311CA946839F3E8F3B071D4E74) and [cache transaction](glossary#glossary__section_cache_transaction).

## HTTP {#glossary__section_46D4C19244A3481290BF5C54E4DFE951}
World Wide Web’s Hypertext Transfer Protocol. A standard protocol used to request and transmit information over the Internet or other computer network.

## idle timeout {#glossary__section_F47AA14129D547A1902ABB187FB2C5C6}
The amount of time a region or region entry may remain in the cache without being accessed before being expired. Access to an entry includes any get operation and any operation that resets the entry’s time-to-live counter. Region access includes any operation that resets an entry idle timeout and any operation that resets the region’s time-to-live.

Idle timeout attributes are set at the region level for the region and at the entry level for entries. See also [time-to-live](glossary#glossary__section_5FAE668DDCBE4DAAA8484D1AF7B56BA1) and [expiration action](glossary#glossary__section_5ADAA5E628FB421999C286D38A2AA1DD).

## initial capacity {#glossary__section_63AEBDFB0E8D40F997CEB0AA8FCEF9D9}
Region attribute. The initial capacity of the map used for storing region entries.

## invalid {#glossary__section_BF6876F505F041BFB659CEBB90FD3EB0}
The state of an object when the cache holding it does not have the current value of the object.

## invalidate {#glossary__section_D495B444E5CF4BDFB47BEA591717D6F5}
Distributed: To mark an object as being invalid across the distributed cache.

Local: To mark an object as being invalid in the local cache only.

## JDBC {#glossary__section_CD699284896148BA9FEB9E5FC0219473}
Java DataBase Connectivity. A programming interface that lets Java applications access a database via the SQL language.

## JMX {#glossary__section_32730D08B6BA4C02A3FE8F164449437E}
Java Management eXtensions. A set of specifications for dynamic application and network management in the J2EE development and application environment.

## JNDI {#glossary__section_979B07C140C2480CAC56D7AE3D0F1402}
Java Naming and Directory Interface. An interface to naming and directory services for Java applications. Applications can use JNDI to locate data sources, such as databases to use in global transactions. @@product_name@@ allows its JNDI to be configured in a `cache.xml` configuration file.

## JTA {#glossary__section_2B4ADA311CA946839F3E8F3B071D4E74}
Java Transaction API. The local Java interfaces between a transaction manager (JTS) and the parties involved in a global transaction. @@product_name@@ can be a member of a JTA global transaction. See also [global transaction](glossary#glossary__section_CDA3C2530A74433CBE0204D588C237AC).

## JVM {#glossary__section_731F788890994955863C24BF1FED7F56}
Java Virtual Machine. A virtual machine capable of handling Java bytecode.

## key constraint {#glossary__section_28D0F94F67CA4976A837210B21941A42}
Enforcing a specific entry key type. The key-constraint region attribute, when set, constrains the entries in the region to keys of the specified object type.

## listener {#glossary__section_62EFBE99B8FD4B0FBF4C766973720318}
An event handler. The listener registers its interest in one or more events, such as region entry updates, and is notified when the events occur.

## load factor {#glossary__section_FEC5A706B30741AF9305678DD840846E}
Region attribute. The load factor of the map used for storing entries.

## local {#glossary__section_598D82A75D9842438BB934E01E77266E}
Local cache: The part of the distributed cache that is resident in the current member’s memory. This term is used to differentiate the cache where a specific operation is being performed from other caches in the same cluster or in another cluster. See also [remote](glossary#glossary__section_CC864725C0014791805D2549D87DA545).

Region with local scope: A region whose scope is set to local. This type of region does not distribute anything with other members in the cluster.

Region shortcuts: In the RegionShortcut and settings, LOCAL means the scope is set to local. All client regions have local scope. In the ClientRegionShortcut settings, LOCAL means the region does not connect to the client’s servers.

## local scope {#glossary__section_6EF84234B9A4453299A218BE10DA516F}
Data distribution setting that keeps data private and visible only to threads running within the local member. A region with local scope is completely contained in the local cache. Client regions are automatically given local scope.

## locator {#glossary__section_32B3520764624A87976126603BC8AFE6}
@@product_name@@ process that tracks system members and provides current membership information to joining members so they can establish communication. For server systems, the locator also tracks servers and server load and, when a client requests a server connection, the locator sends the client to one of the least loaded servers. .

## LRU {#glossary__section_AED421A3C46349168730605059F9B2B0}
Least recently used. Used to refer to region entry or entries most eligible for eviction due to lack of interest by client applications. @@product_name@@ offers eviction controllers that use the LRU status of a region’s entries to determine which to evict to free up space. Possible eviction actions are local destroy and overflow. See also [resource manager](glossary#glossary__section_A8EA732962854C499CA06CAD40084AA2).

## machine {#glossary__section_ACCE0EBD75C64DEA9563ECA18802E3EC}
Any @@product_name@@-supported physical machine or Virtual Machine.

## member {#glossary__section_51E160ED7FEF40469FD3D6BA80792393}
A process that has defined a connection to a @@product_name@@ cluster and created a @@product_name@@ cache. This can be a Java or Native Client application. This can also be a @@product_name@@ process such as a locator or cacheserver. The minimal @@product_name@@ process configuration is a single member that is connected to a cluster.

## message queue {#glossary__section_B43A3D6E64AF487480B32B78567C06E7}
A first-in, first-out data structure in a @@product_name@@ system member that stores messages for distribution in the same order that the original operations happened in the local member. Each thread has its own queue. Depending on the kind of queue, the messages could be going between two members of a cluster, a client and server, or two members in different clusters. See also [conflation](glossary#glossary__section_3FEC7A097CE247299F47EA209C5F91B8).

## mirroring {#glossary__section_012843121ADE4BB883151BA8C8425C6C}
See [replicate](glossary#glossary__section_9B9E43530AD3486BB1B5EB035B0CED73).

## multicast {#glossary__section_66112989304F4BE6B48C47B0BB535724}
A form of UDP communications where a datagram is sent to multiple processes in one network operation.

## named region attributes {#glossary__section_3C8EB8194A494BF2978CC0495C3B3443}
Region attributes that are stored in the member memory and can be retrieved through their region attributes refid setting. @@product_name@@ provides standard predefined named region attributes, that are stored using region shortcut refids. You can use any stored attributes that you wish, setting an id when you create them and using the id setting in the refid you want to use to retrieve them.

## netLoad {#glossary__section_BFFF4BF9D6414AA392F7AEAC1256C112}
The method used by @@product_name@@ to load an entry value into a distributed region. The netLoad operation invokes all remote cache loaders defined for the region until either the entry value is successfully loaded or all loaders have been tried.

## netSearch {#glossary__section_B9B118509831405D9AB4069503119DFB}
The method used by @@product_name@@ to search remote caches for a data entry that is not found in the member’s local cache region. This method operates only on distributed regions with a data-policy of empty, normal and preloaded.

## netWrite {#glossary__section_3B75FF1066664923B2C9A61BDA133559}
The method used by @@product_name@@ to invoke a cache writer for region and region entry events. This method operates only on distributed regions. For each event, if any cache writer is defined for the region, the netWrite operation invokes exactly one of them.

## network partitioning {#glossary__section_ECBDD95CCC6445B2ADDFC8F4010BD459}
A situation that arises from a communications partition that causes processes to become unaware of one another.

## OQL {#glossary__section_481A0A6447C94013B53A0C662D6A0EF4}
Object Query Language, SQL-92 extended for querying object data. @@product_name@@ supports a subset of OQL.

## off-heap memory

Memory that is not on the standard Java heap and that is not managed by the JVM and its garbage collector.

## overflow {#glossary__section_7280947960B243108B9C0764EE5BB678}
Eviction option for eviction controllers. This causes the values of LRU entries to be moved to disk when the region reaches capacity. Writes are performed according to the cache disk-store configuration.

## oplog / operation log {#glossary__section_F583E7A1E181482190E73CE03A205090}
The files in a disk-store used for the cache operations.

## partition {#glossary__section_A8F0CD8F7EA94FBC8BF954A8A8EEC8E5}
The memory in each member that is reserved for a specific partitioned region’s use.

## partitioned region {#glossary__section_297905699D6A47C1BF456651582C2D69}
A region that manages large volumes of data by partitioning it into manageable chunks and distributing it across multiple machines. Defining partition attributes or setting the region attribute data-policy to partition makes the region a partitioned region.

## peer {#glossary__section_B291531710DE4C0FA9D98263C6756AAB}
A @@product_name@@ member application that is not configured as a client. Peer configuration uses the &lt;cache&gt; `cache.xml` element and the Cache API. Peers can also be configured as servers to client applications and as gateway-receivers or gateway-senders to remote clusters.

## persistent region {#glossary__section_244F67CD366141858D3B3771E3E58889}
A region with the attribute data-policy set to persistent-replicate.

## persistent-partition {#glossary__section_9B0A50A73A5A4B02A18E9557BF73A6B9}
A region attribute setting identifying a region as a partitioned region whose data is persisted to disk. With persistence, all region entry keys and values are stored in an operation log on disk as well as being stored in memory. Also referred to as disk region. Writes are performed according to the cache disk-store configuration.

## persistent-replicate {#glossary__section_A600283F2A314BB5A06E2FBE55BD74EE}
A region attribute setting identifying a region as a replicate whose data is persisted to disk. With persistence, all region entry keys and values are stored in an operation log on disk as well as being stored in memory. Also referred to as disk region. Writes are performed according to the cache disk-store configuration.

## producer {#glossary__section_8742E7E064364DED98D4D399B98DBCF3}
A @@product_name@@ member process that puts data into the cache for consumption by other members. Producers may be configured with empty regions, where the data they put into the cache is not stored locally, but causes cache update events to be sent to other members. This is a common configuration in peer members and for client processes. See [consumer](glossary#glossary__section_32D2C413690A4F44BA8F7B0F2AF3CD1A).

## pull model {#glossary__section_900E459B58914FBFB20480F722F4F46E}
Data distribution model where each process receives updates only for the data in which the process has explicitly expressed interest. In a @@product_name@@ peer member, this is accomplished using a distributed, non-replicated region and creating the data entries that are of interest in the local region. When updates happen for the region in remote caches, the only updates that are forwarded to the local cache are those for entries that are already defined in the local cache. In a @@product_name@@ client, you get pull behavior by specifically subscribing to the entries of interest. See [push model](glossary#glossary__section_B8D00D2F5F574FB4B8D082FA62384D9F).

## push model {#glossary__section_B8D00D2F5F574FB4B8D082FA62384D9F}
Data distribution model where each process receives updates for everything in the data set. In a @@product_name@@ peer member, this is accomplished using a replicated region. All data modifications, creations, and deletes in remote caches are pushed to the replicated region. In a @@product_name@@ client, you get push behavior by registering interest in all keys in the region. See [pull model](glossary#glossary__section_900E459B58914FBFB20480F722F4F46E).

## query string {#glossary__section_1C769F32BEFD4760B325D7B0730E878C}
A fully-formed SQL statement that can be passed to a query engine and executed against a data set. A query string may or may not contain a SELECT statement.

## race condition {#glossary__section_6F3899F6F9CB41668471CFB931D33F4B}
Anomalous behavior caused by the unexpected dependence on the relative timing of events. Race conditions often result from incorrect assumptions about possible ordering of events.

## range-index {#glossary__section_E21653B0F7CD4E7E9C51731EB0362228}
An XPath index optimized for range-queries with the added index maintenance expense of sorting the set of values. A range index allows faster retrieval of the set of nodes with values in a certain range. See also [structure-index](glossary#glossary__section_78C4D8B8C40E4A5688F2426A3F46A234) and [value-index](glossary#glossary__section_927F5452A1C840B9BFA119693CA5B26F).

## region {#glossary__section_601C6D4BA8384E8EB245421BDEE1CBDF}
A logical grouping of data within a cache. Regions usually contain data entries (see [entry](glossary#glossary__section_5D8ED880C9BD4062BE6F0404B28FA005)). Each region has a set of region attributes governing activities such as expiration, distribution, data loading, events, and capacity control. In addition, a region can have an application-defined user attribute.

## region attributes {#glossary__section_7398A81EE9034E7FBDF7B592314586B3}
The class of attributes governing the creation, distribution, and management of a region and its entries.

## region data {#glossary__section_CDA009928A3041F2AEE914F7BD3590C7}
All of the entries directly contained in the region.

## region entry {#glossary__section_35F856172C7A4FD89BA3873750B41605}
See [entry](glossary#glossary__section_5D8ED880C9BD4062BE6F0404B28FA005).

## region shortcut {#glossary__section_982788E772C540368610D43AF4AF6046}
Enums RegionShortcut and ClientRegionShortcut defining the main region types in @@product_name@@ for peers/servers and clients, respectively. Region shortcuts are predefined named region attributes.

## remote {#glossary__section_CC864725C0014791805D2549D87DA545}
Resident or running in a cache other than the current member’s cache, but connected to the current member’s cache through @@product_name@@. For example, if a member does not have a data entry in the region in its local cache, it can do a netSearch in an attempt to retrieve the entry from the region in a remote cache within the same cluster. Or, if the member is a client, it can send a request to a server in an attempt to retrieve the entry from the region in a remote server cache in the server’s cluster. In multi-site installations, a gateway sends events from the local cache to remote caches in other clusters. See also [local](glossary#glossary__section_598D82A75D9842438BB934E01E77266E).

## replicated region {#glossary__section_90D41320BD05471D81382209A4D5F4D8}
A region with data-policy set to replicate or persistent-replicate.

## replicate {#glossary__section_9B9E43530AD3486BB1B5EB035B0CED73}
Region data-policy specification indicating to copy all distributed region data into the local cache at region creation time and to keep the local cache consistent with the distributed region data.

## resource manager {#glossary__section_A8EA732962854C499CA06CAD40084AA2}
@@product_name@@ process that works with your JVM’s tenured garbage collection (GC) to control heap use and protect your JVM from hangs and crashes due to memory overload. The manager prevents the cache from consuming too much memory by evicting old data and, if the collector is unable to keep up, by refusing additions to the cache until the collector has freed an adequate amount of memory. Eviction is done for regions configured for LRU eviction based on heap percentage. See also [LRU](glossary#glossary__section_AED421A3C46349168730605059F9B2B0) and [eviction-attributes](glossary#glossary__section_1B57CC3632B843AA89CB321489C3B91C).

## rollback {#glossary__section_82276B0AED4543518C98E173C1528735}
A transactional operation that excludes a transaction’s changes from the cache, leaving the cache undisturbed.

## scope {#glossary__section_4EFDFCCA6AA84AEB9B96E3D0345AD910}
Region attribute: In non-partitioned regions, a distribution property for data identifying whether it is distributed and, if so, whether distribution acknowledgements are required and whether distributed synchronization is required. A distributed region’s cache loader and cache writer (defined in the local cache) can be invoked for operations originating in remote caches. A region that is not distributed has a local scope. See also [replicate](glossary#glossary__section_9B9E43530AD3486BB1B5EB035B0CED73).

Querying: The data context for the part of the query currently under evaluation. The expressions in a SELECT statement’s FROM clause can add to the data that is in scope in the query.

## SELECT statement {#glossary__section_C9C6FDAD0D7846F5BC794C7D29E2524A}
A statement of the form SELECT projection\_list FROM expressions WHERE expressions that can be passed to the query engine, parsed, and executed against data in the local cache.

## serialization {#glossary__section_68A1E3D86A8D4FD0834A5030C36840D4}
The process of converting an object or object graph to a stream of bytes.

## server {#glossary__section_24A690A7422E460EB61D3B95795A89F0}
A @@product_name@@ member application that is configured as a peer in its own system and as a server to connecting @@product_name@@ client applications.

## server group {#glossary__section_3A6AB71E3D844134AB8B51D676F84AEE}
An optional logical grouping of servers in a server clusters. There is always the default server group made up of all available server in the server clusters. Clients can specify the server group in their server pool configuration. Then the pool only connects to those servers. If no group is specified, the default is used.

## server connection pool {#glossary__section_C344F00B5D234CD8A44DD8814ACBD165}
The cache entity that manages client connections to servers.

## socket {#glossary__section_344B1F6D6E79455788D593600732AD6F}
The application interface for TCP/IP communications. UDP provides unicast and multicast datagram sockets, while TCP provides server and connection sockets. TCP server sockets are used by server processes to create connection sockets between the server and a client.

## SQL {#glossary__section_CE71B3F4A6374257B88A357736DAE07A}
Structured Query Language.

## SSL {#glossary__section_7CBAA2DDAA9E45B99537BE3638E3B3DB}
Secure Socket Layer. A protocol for secure communication between Java VMs.

## standalone distributed system {#glossary__section_D7E92873D90C4D698E812BA9DCB85392}
A cluster configured for no communication with peers. Client applications are generally defined with standalone clusters, so there is no peer communication and all event and data communication is done between the client member and the server tier.

## statistics enabled {#glossary__section_6215C25884CB4E68BECEEED11E7F7FA1}
Region attribute. Specifies whether to collect statistics for the region.

## struct {#glossary__section_78D2AEF29750400E9F3703B5ABFD6AED}
A data type that has a fixed number of elements, each of which has a field name and can contain an object value.

## structure-index {#glossary__section_78C4D8B8C40E4A5688F2426A3F46A234}
An XPath index that is basically a pre-computed query. Any legal XPath expression can be used. The index maintains lists of all nodes that match the expression used to create it. If a query is performed that has the same expression as the index then the result is available without XPath evaluation. See also [range-index](glossary#glossary__section_E21653B0F7CD4E7E9C51731EB0362228) and [value-index](glossary#glossary__section_927F5452A1C840B9BFA119693CA5B26F).

## system member {#glossary__section_DAE92AE0BD1F44188F419A1DE7FBF671}
See [member](glossary#glossary__section_ACCE0EBD75C64DEA9563ECA18802E3EC).

## TCP {#glossary__section_574E58CDEB9D4E93B0F042883A780B74}
The Transmission Control Protocol is a part of the internet protocol (IP) suite that provides unicast communications with guaranteed delivery. The TCP protocol is connection-based, meaning that a TCP socket can only be used to send messages between one pair of processes at a time. Compare to [UDP](glossary#glossary__section_DB1CE436E9A4430E8B0E8C8AFE13D780).

## timeout {#glossary__section_311C7AE4126A4B1899D6EA1C4E804F57}
A behavior associated with synchronization functions. Timeout behavior is exhibited as refusal to wait longer than a specified time for a signal to proceed. See also [blocking](glossary#glossary__section_D86690A5E9B444CE969AB6D92BC25127).

## time-to-live {#glossary__section_5FAE668DDCBE4DAAA8484D1AF7B56BA1}
The amount of time a region or region entry may remain in the cache without being modified before being expired. Entry modification includes creation, update, and removal. Region modification includes creation, update, or removal of the region or of any of its entries.

Time-to-live attributes are set at the region level for the region and at the entry level for entries. See also [idle timeout](glossary#glossary__section_F47AA14129D547A1902ABB187FB2C5C6) and [expiration action](glossary#glossary__section_5ADAA5E628FB421999C286D38A2AA1DD).

## transaction {#glossary__section_14E906988DCF4ED4970F042C6FF4270E}
See [cache transaction](glossary#glossary__section_cache_transaction) and [global transaction](glossary#glossary__section_CDA3C2530A74433CBE0204D588C237AC).

## transaction listener {#glossary__section_E61321FA86384399AD7A8A7CF0D890AD}
User-implemented plug-in for receiving and handling transaction events. A transaction listener is called after a transaction commits. See also [transaction writer](glossary#glossary__section_2D8954C87A83480799694F72CC82D206).

## transaction writer {#glossary__section_2D8954C87A83480799694F72CC82D206}
User-implemented plug-in intended for synchronizing the cache with an outside data source. A transaction writer is a synchronous listener to cache transactions. The transaction writer has the ability to veto a transaction. See also [transaction listener](glossary#glossary__section_E61321FA86384399AD7A8A7CF0D890AD).

## transactional view {#glossary__section_ABDC26632C2D46B5B7AE726AD23DB278}
The result of a history of transactional operations for a given open transaction.

## transport layer {#glossary__section_975C7D9AC377453B96F2DEC3B341C644}
The network used to connect the @@product_name@@ system members in a @@product_name@@ system.

## TTL {#glossary__section_94B886825B1640269017386D5731A086}
See [time-to-live](glossary#glossary__section_5FAE668DDCBE4DAAA8484D1AF7B56BA1).

## UDP {#glossary__section_DB1CE436E9A4430E8B0E8C8AFE13D780}
The User Datagram Protocol is a part of the internet protocol (IP) suite that provides simple, unreliable transmission of datagram messages from one process to another. Reliability must be implemented by applications using UDP. The UDP protocol is connectionless, meaning that the same UDP socket can be used to send or receive messages to or from more than one process. Compare to [TCP](glossary#glossary__section_574E58CDEB9D4E93B0F042883A780B74).

## unicast {#glossary__section_9EF1D3F165554BF2BA8C4A8BFC2AA9E1}
A message sent from one process to another process (point-to-point communications). Both UDP and TCP provide unicast messaging.

## URI {#glossary__section_FB9A30181A9A481594848CABA28EE1FC}
Uniform Resource Identifier. A unique identifier for abstract or physical resources on the World Wide Web.

## user attribute {#glossary__section_6D2DED48DC5D464CA4959668C3BA38D5}
An optional object associated with a region or a data entry where an application can store data about the region or entry. The data is accessed by the application only. @@product_name@@ does not use these attributes. Compare to region attributes, which are used by @@product_name@@.

## value constraint {#glossary__section_8386E2FB49424CA4B5F0343F9E6A04E5}
Enforcing a specific entry value type. The value-constraint region attribute, when set, constrains the entries in the region to values of the specified object type. Value constraints can be used to provide object typing for region querying and indexing. The value-constraint is only checked in the cache that does the entry put or create operation. When the entry is distributed to other caches, the value constraint is not checked.

## value-index {#glossary__section_927F5452A1C840B9BFA119693CA5B26F}
An XPath index that operates much as a structure-index does, but that separates the nodes that match the XPath expression into sets mapped by each node’s value. This allows further filtering of the nodes to be evaluated in a query by going directly to those with a specific value. See also [structure-index](glossary#glossary__section_78C4D8B8C40E4A5688F2426A3F46A234) and [range-index](glossary#glossary__section_E21653B0F7CD4E7E9C51731EB0362228).

## view {#glossary__section_01EEADCCE78645829342A441E7524857}
A collection of member identifiers that defines the membership group.

## Virtual Machine {#glossary__section_E49E2FFF34FC4B2A9E3FF1FF77DCE5DF}
A completely isolated operating system installation within your normal operating system. This is generally implemented by software emulation or hardware virtualization.

## VMware virtual machine {#glossary__section_754A470EEE424D42A9981D068936631B}
Also referred to as a VMware VM. A VMware VM is a tightly isolated software container that can run its own operating systems and applications as if it were a physical computer. A VMware VM behaves exactly like a physical computer and contains it own virtual (ie, software-based) CPU, RAM hard disk and network interface card (NIC). An operating system can't tell the difference between a VMware VM and a physical machine, nor can applications or other computers on a network. Even the VMware VM thinks it is a "real" computer. Nevertheless, a VMware VM is composed entirely of software and contains no hardware components whatsoever.

## XML {#glossary__section_B7758E29850D459DA197C0FDF25508E1}
EXtensible Markup Language. An open standard for describing data, XML is a markup language similar to. Both are designed to describe and transform data, but where uses predefined tags, XML allows tags to be defined inside the XML document itself. Thus, virtually any data item can be identified. The XML programmer creates and implements data-appropriate tags whose syntax is defined in a DTD file or an XSD (XML schema definition.)

## XML schema definition {#glossary__section_B65D71221D6F4F02B829EE4DB12FFCAB}
The definition of the structure, content, and semantics used in an XML document. The definition can be used to verify that each item of content in a document adheres to the specification of the element in which the content is placed. The XML schema is a superset of DTD. Unlike DTD, XML schemas are written in XML syntax, which, although more verbose than DTD, are more descriptive and can have stronger typing. Files containing XML schema definitions generally have the XSD extension.

## XPath {#glossary__section_36183B68888F4C49B5E5F36D16C12710}
A language that describes a way to locate and process items in Extensible Markup Language (XML) documents by using an addressing syntax based on a path through the document's logical structure or hierarchy.

## XSD

See XML schema definition.
