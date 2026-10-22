---
title:  POST /geode/v1/queries/{queryId}
sidebar_label: POST /geode/v1/queries/{queryId}
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

Execute the specified named query passing in scalar values for query parameters in the POST body.

## Resource URL

``` pre
http://<hostname_or_http-service-bind-address>:<http-service-port>/geode/v1/queries/{queryId}
```

## Parameters

| Parameter | Description | Example Values |
|---|---|---|
| `{queryId}` | Query ID for named query. | `selectOrders` |
| *query bind parameter values* | Bind parameters for the query are specified in the request body (JSON). | Specify the parameter `@type` and `@value` for each bind parameter. For example, to provide values to the following query:<br/><br/>```pre<br/>SELECT o FROM /orders o WHERE o.quantity > $1 AND o.totalprice > $2<br/>```<br/>You could pass in the following JSON in the request body as the bind parameters:<br/><br/>```json<br/>[<br/>  {<br/>    "@type": "int",<br/>    "@value": 2<br/>  },<br/>  {<br/>    "@type": "double",<br/>    "@value": 110.00<br/>  }<br/>]<br/>``` |


## Example Request

``` pre
POST /geode/v1/queries/selectOrders
Accept: application/json
Content-Type: application/json

[
        {
             "@type":  "int ",
             "@value": 2
        },
        { 
            "@type":  "double ",
             "@value": 110.00
        }
]
```

## Example Success Response

``` pre
Response Payload: application/json

200 OK
Content-Length: <#-of-bytes>
Content-Type: application/json

[
    {
        "description":  "Purchase order for  company - B",
         "totalPrice": 350,
         "purchaseOrderNo": 1112,
         "customerId": 102,
         "deliveryDate":  "Thu Feb 20 00:00:00 IST 2014",
         "contact":  "John Doe",
         "email":  "John.Doe@pivotal.io",
         "phone":  "01-2048096",
         "items": [
            {
                 "description":  "Product-AAAA",
                 "quantity": 10,
                 "itemNo": 1,
                 "unitPrice": 20,
                 "totalPrice": 200,
                 "type-class":  "org.apache.geode.web.rest.domain.Item"
            },
            {
                 "description":  "Product-BBB",
                 "quantity": 15,
                 "itemNo": 2,
                 "unitPrice": 10,
                 "totalPrice": 150,
                 "type-class":  "org.apache.geode.web.rest.domain.Item"
            }
        ],
         "orderDate":  "Mon Feb 10 00:00:00 IST 2014",
         "type-class":  "org.apache.geode.web.rest.domain.Order"
    },
    {...},
    {...}
}
```

## Error Codes

| Status Code | Description |
|---|---|
| `400 BAD REQUEST` | JSON document in the request body (specifying query bind params) is invalid |
| `401 UNAUTHORIZED` | Invalid username or password |
| `403 FORBIDDEN` | Insufficient privileges for operation |
| `404 NOT FOUND` | Query with specified ID could not be found |
| `500 INTERNAL SERVER ERROR` | Encountered error at server:<br/><br/>• Syntax of the OQL `queryString` is invalid<br/>• A function was applied to a parameter that is improper for that function<br/>• Bind parameter is not of the expected type<br/>• Name in the query cannot be resolved<br/>• The number of bound parameters does not match the number of placeholders<br/>• Query is not permitted on this type of region<br/>• Query execution time has exceeded max query execution time (`gemfire.Cache.MAX_QUERY_EXECUTION_TIME`) configured<br/>• Data referenced in `from` clause is not available for querying<br/>• Query execution gets canceled due to low memory conditions and the resource manager critical heap percentage has been set<br/>• Error encountered while executing named query |
