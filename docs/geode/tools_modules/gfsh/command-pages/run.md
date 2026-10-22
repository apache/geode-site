---
title:  run
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

Execute a set of GFSH commands.

Commands that normally prompt for additional input will instead use default values.

**Availability:** Online or offline.

**Note:**
Some commands specified in the file require online status.

**Syntax:**

``` pre
run --file=value [--quiet(=value)?] [--continue-on-error(=value)?]
```
## {#concept_970BC9839C8243AF86CAEAAB22FDF40C__table_zyc_clf_2w}
| Name | Description | Default Value |
|---|---|---|
| `--file` | **Required.** Path to the script file containing `gfsh` commands. Path may be relative or absolute. |  |
| `--quiet` | Controls whether command output is shown. **Note:** All commands run non-interactively when using `run`; this option does not change that behavior. | `false` |
| `--continue-on-error` | Continues executing the script if a command fails. | `false` |

<span class="tablecap">Table 1. Run Parameters</span>

**Example Commands:**

``` pre
run --file=create-regions.gfsh --quiet=true

(2) From command line:
prompt> /home/user1/gemfire70/bin/gfsh run ./create-regions.gfsh --quiet=true
prompt> /home/user1/gemfire70/bin/gfsh run ./create-regions.gfsh 
--continue-on-error=true
```

**Sample Output:**

``` pre
gfsh>run --file=create-regions.gfsh
1. Executing - create region --name=region4 --type=REPLICATE

Member  | Status
------- | --------------------------------------
server2 | Region "/region4" created on "server2"
server1 | Region "/region4" created on "server1"

2. Executing - create region --name=region1/subregion1 --type=LOCAL

Parent region for "region1/subregion1" doesn't exist. 
```
