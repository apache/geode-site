---
title:  GET /geode/v1/queries/adhoc?q=<OQL-statement>
sidebar_label: GET /geode/v1/queries/adhoc?q=<OQL-statement>
sidebar_position: 6
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

Run an unnamed (unidentified), ad-hoc query passed as a URL parameter.

## Resource URL

``` pre
http://<hostname_or_http-service-bind-address>:<http-service-port>/geode/v1/queries/adhoc?q=<OQL-statement>
```

## Parameters

| Parameter | Description                                                                                                                                                                                                                     | Example Values                                                                                                                                                                                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `q`       | **Required.** OQL query statement. <br/><br/>**Note:** Because the query is passed in the URL, it must be **URL-encoded**. Some HTTP clients (like web browsers) do this automatically. Otherwise, you must encode it manually. | `SELECT o FROM /orders o WHERE o.quantity > 2 AND o.totalprice > 110.00` <br/><br/>URL-encoded: `SELECT%20o%20FROM%20%2Forders%20o%20WHERE%20o.quantity%20%3E%202%20AND%20o.totalprice%20%3E%20110.00` <br/><br/>`SELECT * FROM /customers` <br/><br/>URL-encoded: `SELECT%20*%20FROM%20%2Fcustomers` |

## Example Request

``` pre
curl -i "http://localhost:8080/geode/v1/queries/adhoc?q=select%20*%20%20from%20/customers"
```

## Example Success Response

``` pre
Response Payload: application/json

200 OK
Content-Length: <#-of-bytes>
Content-Type: application/json
[
    {
        "firstName":  "John",
         "lastName":  "Doe",
         "customerId": 101,
    },
    {
         "firstName":  "Jane",
         "lastName":  "Doe",
         "customerId": 102,
    },
    {
       ....
    }
]
```

## Error Codes

| Status Code                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `401 UNAUTHORIZED`          | Invalid username or password                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `403 FORBIDDEN`             | Insufficient privileges for the operation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `500 INTERNAL SERVER ERROR` | Error encountered on the server. Check the HTTP response body for a stack trace. Possible causes include:<br/><br/>• A function was applied to an improper parameter<br/>• Bind parameter is not of the expected type<br/>• Name in the query cannot be resolved<br/>• Number of bound parameters does not match the placeholders<br/>• Query is not permitted on this region type<br/>• Query exceeded `gemfire.Cache.MAX_QUERY_EXECUTION_TIME`<br/>• Data in the `FROM` clause is not available for querying<br/>• Query canceled due to low memory (critical heap reached)<br/>• Server error while executing an ad hoc query |





