---
title: Writing and Executing a Query in OQL
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
## {#running_a_querying__section_C285160AF91C4486A39444C3A22D6475}
The @@product_name@@ QueryService provides methods to create the Query object. You can then use the Query object to perform query-related operations.

The QueryService instance you should use depends on whether you are querying the local cache of an application or if you want your application to query the server cache.

## Querying a Local Cache {#running_a_querying__section_8B9C3F5BFBA6421A81EEB404DBE512C2}
To query the application's local cache or to query other members, use `org.apache.geode.cache.Cache.getQueryService`.

**Sample Code**

``` pre
 // Identify your query string.
 String queryString = "SELECT DISTINCT * FROM /exampleRegion";
 
 // Get QueryService from Cache.
 QueryService queryService = cache.getQueryService();
 
 // Create the Query Object.
 Query query = queryService.newQuery(queryString);
 
 // Execute Query locally. Returns results set.
 SelectResults results = (SelectResults)query.execute();
 
 // Find the Size of the ResultSet.
 int size = results.size();
 
 // Iterate through your ResultSet.
 Portfolio p = (Portfolio)results.iterator().next(); /* Region containing Portfolio object. */
```

## Querying a Server Cache from a Client {#running_a_querying__section_BAD35A249F784095857CC6848F91F6A4}
To perform a client to server query, use `org.apache.geode.cache.client.Pool.getQueryService`.

**Sample Code**

``` pre
// Identify your query string.
 String queryString = "SELECT DISTINCT * FROM /exampleRegion";
 
 // Get QueryService from client pool.
 QueryService queryService = pool.getQueryService();
 
 // Create the Query Object.
 Query query = queryService.newQuery(queryString);
 
 // Execute Query locally. Returns results set.
 SelectResults results = (SelectResults)query.execute();
 
 // Find the Size of the ResultSet.
 int size = results.size();
 
 // Iterate through your ResultSet.
 Portfolio p = (Portfolio)results.iterator().next(); /* Region containing Portfolio object. */
```

Refer to the following JavaDocs for specific APIs:

-   [Query package](/org/apache/geode/cache/query/package-summary)
-   [QueryService](/org/apache/geode/cache/query/QueryService)

**Note:**
You can also perform queries using the gfsh `query` command. See [query](../../tools_modules/gfsh/command-pages/query).

## Next Steps {#quering-next-steps}
- **[Building a Query String](what_is_a_query_string)**

To build a query string, you combine supported keywords, expressions, and operators to create an expression that returns the information you require.

- **[OQL Syntax and Semantics](../query_additional/query_language_features)**

This section covers the following querying language features.

- **[Query Language Restrictions and Unsupported Features](restrictions_and_unsupported_features)**

This section describes some limitations of which developers should be aware when composing queries in OQL.
