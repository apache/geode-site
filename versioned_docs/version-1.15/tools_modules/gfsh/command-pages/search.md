---
title:  search lucene
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

## search lucene {#search_lucene}
Search a Lucene index

See also [create lucene index](create#create_lucene_index), [describe lucene index](describe#describe_lucene_index), [destroy lucene index](destroy#destroy_lucene_index) and [list lucene indexes](list#list_lucene_indexes).

**Availability:** Online.

**Syntax:**

``` pre
search lucene --name=value --region=value --queryString=value --defaultField=value
    [--limit=value] [--keys-only=value]
```

**Parameters, search lucene:**

| Name | Description | Default Value |
|---|---|---|
| `--name` | **Required.** Name of the Lucene index to search. |  |
| `--region` | **Required.** Name/Path of the region where the Lucene index exists. |  |
| `--queryString` | **Required.** Query string to search the Lucene index. Use `__REGION_VALUE_FIELD` as the field name when the field is a primitive value. Surround a string with double quotes to perform an exact match. |  |
| `--defaultField` | **Required.** Default field to search in. `__REGION_VALUE_FIELD` identifies the field as a primitive value. |  |
| `--limit` | Number of search results to return. | If not specified: `-1` |
| `--keys-only` | Return only the keys of search results. | If not specified: `false` |


**Example Commands:**

``` pre
gfsh> search lucene --name=testIndex --region=/testRegion --queryString=value1
   --defaultField=__REGION_VALUE_FIELD
 

gfsh> search lucene --name=indexOfStrings --region=/stringTestRegion 
      --queryString='__REGION_VALUE_FIELD:"my exact string"'
      --defaultField=__REGION_VALUE_FIELD
```

**Sample Output:**

``` pre
gfsh>search lucene --name=testIndex --region=/testRegion --queryString=value* 
   --defaultField=__REGION_VALUE_FIELD
key | value  | score
--- | ------ | -----
3   | value3 | 1
2   | value2 | 1
1   | value1 | 1
```

``` pre
gfsh>search lucene --region=/Person --name=analyzerIndex 
   --defaultField=addr --queryString="97763"
 key   |                         value                                      | score
------ | ------------------------------------------------------------------ | --------
key763 | Person{name='Kris Cat', addr='7 Ash St, Portland_OR_97763', emai.. | 1.669657
```
