---
title:  connect
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

Connect to a JMX manager either directly or via a locator.
## {#concept_C2DCEE6743304549825C9B62E66DBADF__section_C27BE964CE554180A65968DBEBF50B23}
If you are connecting via a locator, and a JMX manager does not already exist, the locator starts one.

gfsh connects as a discovery client to the locator service and asks where the JMX Manager is. The
locator knows when there is no member currently configured as the JMX manager and simply starts up
the JMX manager service within itself. gfsh connects as a JMX client to the locator's JMX RMI port.

You can also connect to a remote locator using the HTTP protocol, as illustrated by the second example below.

You can use this version of gfsh to connect to the JMX manager of Geode version 1.10 or newer. If a command
is not supported by the JMX manager to which it is connected, the command will fail with a detailed error message.

**Availability:** Offline. You will receive a notification "Already connected to: host\[port\]" if you are already connected.

**Syntax:**

``` pre
connect [--locator=value] [--jmx-manager=value] [--use-http(=value)?] [--url=value]
    [--username=value] [--password=value] [--token=value]
    [--key-store=value] [--key-store-password=value]
    [--trust-store=value] [--trust-store-password=value] [--ciphers=value]
    [--protocols=value] [--security-properties-file=value] [--use-ssl(=value)?]
    [--skip-ssl-validation(=value)?]
```
## {#concept_C2DCEE6743304549825C9B62E66DBADF__table_B25D38C67FA047EB8F00A521573F1375}
**Table 1. Connect Parameters**

| Name | Description | Default |
|---|---|---|
| `--locator` | Network address of the Locator in the form `host[port]`. | `localhost[10334]` |
| `--jmx-manager` | Network address of the JMX manager in the form `host[port]`. |  |
| `--use-http` | **Deprecated: inferred by the presence of `--url`.** Connects to a JMX manager HTTP service using the HTTP protocol. |  |
| `--url` | URL used to connect to a JMX manager's HTTP service. |  |
| `--username`, `--user` | The user name for authentication when connecting to the JMX manager. If specified without `--password`, `gfsh` prompts for the password. Cannot be used with `--token`. |  |
| `--password` | The password for authentication when connecting to the JMX manager. Cannot be used with `--token`. |  |
| `--token` | OAuth token used for authentication. Passed to `SecurityManager.authenticate` on the JMX manager. Cannot be used with `--user` or `--password`. |  |
| `--key-store` | Java keystore file containing this application's certificate and private key. If `--key-store-password` is not specified, `gfsh` prompts for it. |  |
| `--key-store-password` | Password to access the private key from the keystore specified by `--key-store`. |  |
| `--trust-store` | Java keystore file containing trusted CA certificates. If `--trust-store-password` is not specified, `gfsh` prompts for it. |  |
| `--trust-store-password` | Password to unlock the keystore specified by `--trust-store`. |  |
| `--ciphers` | SSL/TLS ciphers used when encrypting the connection. | `any` |
| `--protocols` | SSL/TLS protocol versions to enable when encrypting the connection. | `any` |
| `--security-properties-file` | Path to `gfsecurity.properties` for configuring `gfsh` to connect to the Locator/Manager. Can be absolute or relative to the current `gfsh` directory. |  |
| `--use-ssl` | Whether to use SSL for communication with the Locator and/or JMX Manager. If `true`, the command also reads `gfsecurity.properties`. SSL options take precedence over values in the properties file. | If not specified: `false`<br/>If specified without a value: `true` |
| `--skip-ssl-validation` | When SSL is enabled and this option is `true`, the client accepts any SSL certificate. Intended for testing only, not production. | `false` |


<span class="tablecap">Table 1. Connect Parameters</span>

**Example Commands:**

If you do not specify a locator or JMX manager, `gfsh` connects to the locator on the localhost at the default port.

``` pre
gfsh>connect
```

**Sample Output:**

``` pre
gfsh>connect
Connecting to Locator at [host=localhost, port=10334] ..
Connecting to Manager at [host=GeodeStymon, port=1099] ..
Successfully connected to: [host=GeodeStymon, port=1099]
```

**Example of connecting to a remote locator over HTTP:**

``` pre
gfsh>connect --url="http://myLocatorHost.example.com:8080/geode-mgmt/v1"
Successfully connected to: Geode Manager's HTTP service @
http://myLocatorHost.example.com:8080/geode-mgmt/v1
```

**Error Messages:**

``` pre
"Locator could not find a JMX Manager";
"jmx password must be specified.";
"Could not connect to : {0}. {1}";
"Could not find a Geode jmx-manager service running at {0}.";
"--token requires a value, for example --token=foo";
"--token cannot be combined with --user or --password";
"Could not connect to Geode Locator service at {0}."
```
