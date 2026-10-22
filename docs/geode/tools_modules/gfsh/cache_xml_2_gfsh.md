---
title:  Mapping cache.xml Elements to gfsh Configuration Commands
sidebar_label: Mapping cache.xml Elements to gfsh Configuration Commands
sidebar_position: 12
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

You can configure a Geode cluster using either cache.xml files,
or you can use gfsh and the cluster configuration service
to configure a cluster.
This table maps `cache.xml` elements to the gfsh commands that
configure and manage a cluster.
## {#reference_qvw_zyq_54__table_in3_dzq_54}
| cache.xml Element | gfsh Command |
|---|---|
| `<cache>`, `<cache-server>` | • `start server`<br/>• `status server`<br/>• `stop server`<br/>• `alter runtime` |
| `<async-event-queue>` | • `alter async-event-queue`<br/>• `create async-event-queue`<br/>• `destroy async-event-queue`<br/>• `list async-event-queues`<br/>• `resume async-event-queue-dispatching` |
| `<pdx>` | • `configure pdx` |
| `<region>` | • `create region`<br/>• `alter region`<br/>• `destroy region`<br/>• `describe region`<br/>• `list regions`<br/>• `rebalance` |
| `<index>` | • `create index`<br/>• `destroy index`<br/>• `list indexes` |
| `<disk-store>` | • `create disk-store`<br/>• `alter disk-store`<br/>• `backup disk-store`<br/>• `compact disk-store`<br/>• `compact offline-disk-store`<br/>• `describe disk-store`<br/>• `describe offline-disk-store`<br/>• `destroy disk-store`<br/>• `list disk-stores`<br/>• `revoke missing-disk-store`<br/>• `show missing-disk-stores`<br/>• `validate offline-disk-store` |
| `<query-config-service>` | • `alter query-service` |



<span class="tablecap">Table 1. Migrating cache.xml elements to gfsh commands</span>



