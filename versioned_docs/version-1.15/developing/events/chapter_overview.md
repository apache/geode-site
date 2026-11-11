---
title:  Events and Event Handling
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
--> Geode provides versatile and reliable event distribution and handling for your cached data and system member events.

-   **[How Events Work](how_events_work)**

    Members in your cluster receive cache updates from other members through cache events. The other members can be peers to the member, clients or servers or other clusters.

-   **[Implementing Geode Event Handlers](event_handlers/event_handler_overview)**

    You can specify event handlers for region and region entry operations and for administrative events.

-   **[Configuring Peer-to-Peer Event Messaging](configure_p2p_event_messaging)**

    You can receive events from cluster peers for any region that is not a local region. Local regions receive only local cache events.

-   **[Configuring Client/Server Event Messaging](client_server_events/configure_client_server_event_messaging)**

    You can receive events from your servers for server-side cache events and query result changes.

-   **[Configuring Multi-Site (WAN) Event Queues](client_server_events/multi_site/configure_multisite_event_messaging)**

    In a multi-site (WAN) installation, Geode uses gateway sender queues to distribute events for regions that are configured with a gateway sender. AsyncEventListeners also use an asynchronous event queue to distribute events for configured regions. This section describes additional options for configuring the event queues that are used by gateway senders or AsyncEventListener implementations.


