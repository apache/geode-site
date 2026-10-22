---
title:  List of Event Handlers and Events
sidebar_label: List of Event Handlers and Events
sidebar_position: 4
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

@@product_name@@ provides many types of events and event handlers to help you manage your different data and application needs.

## Event Handlers {#event_handlers_and_events__section_E7B7502F673B43E794884D0F6BF537CF}
Use either cache handlers or membership handlers in any single application. Do not use both. The event handlers in this table are cache handlers unless otherwise noted.

| Handler API | Events received | Description |
|---|---|---|
| `AsyncEventListener` | `AsyncEvent` | Tracks changes in a region for write-behind processing. Extends the `CacheCallback` interface. You install a write-back cache listener to an `AsyncEventQueue` instance. You can then add the `AsyncEventQueue` instance to one or more regions for write-behind processing. See [Implementing an AsyncEventListener for Write-Behind Cache Event Handling](implementing_write_behind_event_handler#implementing_write_behind_cache_event_handling). |
| `CacheCallback` | — | Superinterface of all cache event listeners. Functions only to clean up resources that the callback allocated. |
| `CacheListener` | `RegionEvent`, `EntryEvent` | Tracks changes to a region and its data entries. Responds synchronously. Extends `CacheCallback`. Installed in a region. Receives only local cache events. Install one in every member where you want the events handled. In a partitioned region, the cache listener fires only in the primary data store. Listeners on secondaries are not fired. |
| `CacheWriter` | `RegionEvent`, `EntryEvent` | Receives events for *pending* changes to the region and its data entries in this member or one of its peers. Can cancel the operation. Extends `CacheCallback`. Installed in a region. Receives events from anywhere in the distributed region, so you can install one in a single member for the entire distributed region. In partitioned regions, events are received only in the primary data store, so install one in every data store. |
| `ClientMembershipListener` | `ClientMembershipEvent` | One of the interfaces that replaces the deprecated Admin APIs. Receives membership events only about clients. Callback methods are invoked when this process detects connection changes to clients, including `memberCrashed`, `memberJoined`, and `memberLeft` (graceful exit). |
| `CqListener` | `CqEvent` | Receives events from the server cache that satisfy a client-specified query. Extends `CacheCallback`. Installed in the client inside a `CqQuery`. |
| `GatewayConflictResolver` | `TimestampedEntryEvent` | Decides whether to apply a potentially conflicting event to a region distributed over a WAN configuration. Called only when the distributed system ID of an update event differs from the ID that last updated the region entry. |
| `MembershipListener` | `MembershipEvent` | Receives membership events only about peers. Callback methods are invoked when peer members join or leave the cluster, including `memberCrashed`, `memberJoined`, and `memberLeft` (graceful exit). |
| `RegionMembershipListener` | `RegionEvent` | Provides after-event notification when a region with the same name is created in another member and when other members hosting the region join or leave the cluster. Extends `CacheCallback` and `CacheListener`. Installed in a region as a `CacheListener`. |
| `TransactionListener` | `TransactionEvent` with embedded list of `EntryEvent` | Tracks the outcome of transactions and changes to data entries in the transaction. <br/><br/>:::note<br/>Multiple transactions on the same cache can cause concurrent invocation of `TransactionListener` methods, so implement appropriate synchronization for thread-safe operation.<br/>:::<br/><br/>Extends `CacheCallback`. Installed in the cache using the transaction manager. Works with region-level listeners if needed. |
| `TransactionWriter` | `TransactionEvent` with embedded list of `EntryEvent` | Receives events for *pending* transaction commits and can cancel the transaction. Extends `CacheCallback`. Installed in the cache using the transaction manager. At most one writer is called per transaction. Install a writer in every transaction host. |
| `UniversalMembershipListenerAdapter` | `MembershipEvent`, `ClientMembershipEvent` | Replaces deprecated Admin APIs. Provides a wrapper for `MembershipListener` and `ClientMembershipListener` callbacks for both clients and peers. |


## Events {#event_handlers_and_events__section_48C81FE4C1934DBBB287925A6F7A473D}
The events in this table are cache events unless otherwise noted.

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="50%" />
</colgroup>
<thead>
<tr>
<th>Event</th>
<th>Passed to handler ...</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code class="ph codeph">AsyncEvent</code></td>
<td><code class="ph codeph">AsyncEventListener</code></td>
<td>Provides information about a single event in the cache for asynchronous, write-behind processing.</td>
</tr>
<tr>
<td><code class="ph codeph">CacheEvent</code></td>
<td> </td>
<td>Superinterface to <code class="ph codeph">RegionEvent</code> and <code class="ph codeph">EntryEvent</code>. This defines common event methods, and contains data needed to diagnose the circumstances of the event, including a description of the operation being performed, information about where the event originated, and any callback argument passed to the method that generated this event.</td>
</tr>
<tr>
<td><code class="ph codeph">ClientMembershipEvent</code></td>
<td><code class="ph codeph">ClientMembershipListener</code></td>
<td>An event delivered to a <code class="ph codeph">ClientMembershipListener</code> when this process detects connection changes to servers or clients.</td>
</tr>
<tr>
<td><code class="ph codeph">CqEvent</code></td>
<td><code class="ph codeph">CqListener</code></td>
<td>Provides information about a change to the results of a continuous query running on a server on behalf of a client. <code class="ph codeph">CqEvent</code>s are processed on the client.</td>
</tr>
<tr>
<td><code class="ph codeph">EntryEvent</code></td>
<td><code class="ph codeph">CacheListener</code>, <code class="ph codeph">CacheWriter</code>, <code class="ph codeph">TransactionListener</code> (inside the <code class="ph codeph">TransactionEvent</code>)</td>
<td>Extends <code class="ph codeph">CacheEvent</code> for entry events. Contains information about an event affecting a data entry in the cache. The information includes the key, the value before this event, and the value after this event. <code class="ph codeph">EntryEvent.getNewValue</code> returns the current value of the data entry. <code class="ph codeph">EntryEvent.getOldValue</code> returns the value before this event if it is available. For a partitioned region, returns the old value if the local cache holds the primary copy of the entry. <code class="ph codeph">EntryEvent</code> provides the @@product_name@@ transaction ID if available.
<p>You can retrieve serialized values from <code class="ph codeph">EntryEvent</code> using the <code class="ph codeph">getSerialized</code>* methods. This is useful if you get values from one region’s events just to put them into a separate cache region. There is no counterpart <code class="ph codeph">put</code> function as the put recognizes that the value is serialized and bypasses the serialization step.</p></td>
</tr>
<tr>
<td><code class="ph codeph">MembershipEvent</code> (membership event)</td>
<td><code class="ph codeph">MembershipListener</code></td>
<td><p>An event that describes the member that originated this event. Instances of this are delivered to a <code class="ph codeph">MembershipListener</code> when a member has joined or left the cluster.</p></td>
</tr>
<tr>
<td><code class="ph codeph">RegionEvent</code></td>
<td><code class="ph codeph">CacheListener</code>, <code class="ph codeph">CacheWriter</code>, <code class="ph codeph">RegionMembershipListener</code></td>
<td>Extends <code class="ph codeph">CacheEvent</code> for region events. Provides information about operations that affect the whole region, such as reinitialization of the region after being destroyed.</td>
</tr>
<tr>
<td><code class="ph codeph">TimestampedEntryEvent</code></td>
<td><code class="ph codeph">GatewayConflictResolver</code></td>
<td>Extends <code class="ph codeph">EntryEvent</code> to include a timestamp and distributed system ID associated with the event. The conflict resolver can compare the timestamp and ID in the event with the values stored in the entry to decide whether the local system should apply the potentially conflicting event.</td>
</tr>
<tr>
<td><code class="ph codeph">TransactionEvent</code></td>
<td><code class="ph codeph">TransactionListener</code>, <code class="ph codeph">TransactionWriter</code></td>
<td>Describes the work done in a transaction. This event may be for a pending or committed transaction, or for the work abandoned by an explicit rollback or failed commit. The work is represented by an ordered list of <code class="ph codeph">EntryEvent</code> instances. The entry events are listed in the order in which the operations were performed in the transaction.
<p>As the transaction operations are performed, the entry events are conflated, with only the last event for each entry remaining in the list. So if entry A is modified, then entry B, then entry A, the list will contain the event for entry B followed by the second event for entry A.</p></td>
</tr>
</tbody>
</table>
