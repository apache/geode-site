---
title:  Building a Query String
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
## {#what_is_a_query_string__section_1866AE6026DE4D66A2CD2363C1BC0406}
A query string is a fully formed OQL statement that can be passed to a query engine and executed against a data set. To build a query string, you combine supported keywords, expressions, and operators to create an expression that returns the information you require.

A query string follows the rules specified by the query language and grammar. It can include:

-   **Namescopes**. For example, the IMPORT statement. See [IMPORT Statement](the_import_statement).
-   **Path expressions**. For example, in the query `SELECT * FROM                                 /exampleRegion`,` /exampleRegion` is a path expression. See [FROM Clause]( the_from_clause.md#the_from_clause__section_FAEBC02C4E414F91B1CA8D33E11218AF).
-   **Attribute names**. For example, in the query `SELECT DISTINCT * FROM /exampleRegion p WHERE                             p.position1.secId = '1'`, we access the `secId` attribute of the Position object. See [WHERE Clause]( the_where_clause.md#the_where_clause).
-   **Method invocations**. For example, in the query `SELECT DISTINCT * FROM /exampleRegion p WHERE                             p.name.startsWith('Bo')`, we invoke the `startsWith` method on the Name object. See [WHERE Clause]( the_where_clause.md#the_where_clause).
-   **Operators**. For example, comparison operators (=,&lt;,&gt;,&lt;&gt;), unary operators (NOT), logical operators (AND, OR) and so on. See [Operators](../query_additional/operators#operators) for a complete list.
-   **Literals**. For example, boolean, date, time and so on. See [Supported Literals](../query_additional/literals) for a complete list.
-   **Query bind parameters**. For example, in the query `SELECT DISTINCT * FROM $1 p WHERE p.status =                             $2`, $1 and $2 are parameters that can be passed to the query during runtime. See [Using Query Bind Parameters](../query_additional/using_query_bind_parameters#concept_173E775FE46B47DF9D7D1E40680D34DF) for more details.
-   **Preset query functions**. For example, ELEMENT(expr) and IS\_DEFINED(expr). See [SELECT Statement]( the_select_statement#concept_85AE7D6B1E2941ED8BD2A8310A81753E) for other available functions.
-   **SELECT statements**. For example, in the example queries above `SELECT *` or `SELECT DISTINCT *`. See [SELECT Statement]( the_select_statement#concept_85AE7D6B1E2941ED8BD2A8310A81753E) for other available functions.
-   **Comments**. OQL permits extra characters to accompany the query string without changing the string's definition. Form a multi-line comment by enclosing the comment body within `/*` and `*/` delimiters; OQL does not permit nested comments. A single line comment body is all the characters to the right of `--` (two hyphens) up to the end of the line.

The components listed above can all be part of the query string, but none of the components are required. At a minimum, a query string contains an expression that can be evaluated against specified data.

The following sections provide guidelines for the query language building blocks that are used when writing typical @@product_name@@ queries.

-   **[IMPORT Statement]( the_import_statement)**

-   **[FROM Clause]( the_from_clause)**

-   **[WHERE Clause]( the_where_clause)**

-   **[SELECT Statement]( the_select_statement)**

-   **[OQL Aggregate Functions]( aggregates)**
