---
title:  Managing Data Entries
sidebar_label: Managing Data Entries
sidebar_position: 1
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

Program your applications to create, modify, and manage your cached data entries.
## {#managing_data_entries__section_AACC36127F17411F86D1E409B86C6E5C}
**Note:**
If you do not have the cache's `copy-on-read` attribute set to true, do not change the objects returned from the Java entry access methods. See [Copy on Read Behavior](copy_on_read).

## Keys {#managing_data_entry_keys}
@@product_name@@ calls `hashCode()` on the key
to map an entry within the region.
The `hashCode()` return value must be the same for
a given key on every server that hosts the region.

An `equals()` call return value on a given key also must be
the same on every server that hosts the region.

A key may be a primitive type or a custom class.
For custom classes, see [Classes Used as Keys](using_custom_classes#using_custom_classes__section_CE776B94EDCB4D269A71C3C9CFEDD5FD).

Do not use an enumerated type (`enum`) for a key.
The `enum` `hashCode()` may not be overridden,
and its hash code is based upon an address.
Therefore, the return value for a `hashCode()` call can be different
on each server, violating the restriction that it must return
the same value on every server that hosts the region. 

## Create and Update Entries {#managing_data_entries__section_B095A4073EFB4A3C91AF7C03632EEBFB}
To create or update an entry in the cache, use `Region.put`. For example:

``` pre
String name = ... 
String value = ...  
this.currRegion.put(name,value); 
```

**Note:**
You can also use the `gfsh put` command to add entries to a region, and the `get` command to retrieve entries from a region. See [get](../../tools_modules/gfsh/command-pages/get) and [put](../../tools_modules/gfsh/command-pages/put) for more information.

If you want only to create the entry (with a null value and with method failure if the entry already exists), use `Region.create` instead.

## The getAll Operation {#getAll_method}
The batch operation `Region.getAll`
takes a collection of keys and returns a `Map` of key-value pairs for
the provided keys. If a given key does not exist in the region, then that key's value in the returned map will be null.

## The putAll Operation {#putAll_method}
The batch operation `Region.putAll`
takes a `Map` of key-value pairs, puts them into the cache,
and then distributes them to all other members.

The design of a client application within a client-server design pattern
faces the possibility that a partial operation can occur.
Some, all, or none of the specified key-value pairs may be written
with `putAll`.
If either `ServerOperationException` or `ServerConnectivityException` is
thrown,
it can indicate an incomplete operation.

``` pre
// Retry if the exception may be due to a transient cause.
for (int retry = 0; retry < 3; retry++) {
  throwable = null;
  try {
    region.putAll(map);
  } catch (ServerOperationException e) {
    throwable = e.getCause();
    if (!(e.getCause() instanceof TimeoutException ||
          e.getCause() instanceof LowMemoryException)) {
      // Not a transient exception. Do not retry.
      break;
    }
  } catch (ServerConnectivityException e) {
    throwable = e;
  }
}

if (throwable != null) {
  // Take appropriate action,
  // such as logging the exception and rethrowing it.
  System.out.println("putAll failed due to " + throwable);
  throw new Exception(throwable);
}
``` 

Either a `ServerConnectivityException` or a `ServerOperationException`
with a cause of
`TimeoutException` or `LowMemoryException` can indicate a transient error.
A limited quantity of retries of `putAll` may result in a completed
operation.
A repeated timeout may imply that the `read-timeout` value is not
long enough to complete the bulk operation;
use the `org.apache.geode.cache.client.PoolFactory.setReadTimeout`
method to set the `read-timeout` value.

Client applications that cannot tolerate partial completion of a `putAll`
operation may embed the operation into a transaction.
See [Transactions](../../developing/transactions/chapter_overview)
for details.

The processing of a map with many entries and/or extra-large data values
may affect system performance and cause cache update timeouts,
especially if the region uses overflow or persistence to disk.
The processing may also cause a `LowMemoryException` to be thrown.

## The removeAll Operation {#removeAll_method}
The `removeAll` method takes a collection of keys and removes all of the entries for the specified keys from this region. This call performs the equivalent of calling`destroy(Object)` on this region once for each key in the specified collection. If an entry does not exist, then that key is skipped. An `EntryNotFoundException` is not thrown. This operation will be distributed to other caches if the region's scope is not set to `Scope.LOCAL`.

The processing of a map with many entries and/or extra-large data values
may affect system performance and cause cache update timeouts,
especially if the region uses overflow or persistence to disk.
The processing may also cause a `LowMemoryException` to be thrown.

## Retrieving Region Entries from Proxy Members {#managing_data_entries__section_78F6731642944DE594316B86ECB4E70F}
The `Region.values` method call applies to the local region instance only. If you call the `values` method from a client region using the PROXY shortcut, the method call will not be redirected to the server region. To obtain a collection of all values in the Region from a client, you should use interest registration on ALL\_KEYS, or use a query.

If you use the `Region.get` method from a proxy member, the method call will redirect to the region on the server if it cannot find the key locally.

## Using gfsh to get and put

You can use the gfsh `get` and `put` commands to manage data. See [get](../../tools_modules/gfsh/command-pages/get) and [put](../../tools_modules/gfsh/command-pages/put).

For example:

``` pre
get --key=('id':'133abg124') --region=region1

// Retrieving when key type is a wrapper(primitive)/String
get --key=('133abg124') --region=/region1/region12 --value-class=data.ProfileDetails

get --key=('100L') --region=/region1/region12 --value-class=data.ProfileDetails 
--key-class=java.lang.Long
```

``` pre
put --key=('id':'133abg125') --value=('firstname':'James','lastname':'Gosling') 
--region=/region1 --key-class=data.ProfileKey --value-class=data.ProfileDetails

put --key=('133abg124') --value=('Hello World!!') --region=/region2

put --key=('100F') --value=('2146547689879658564')  --region=/region1/region12 
--key-class=java.lang.Float --value-class=java.lang.Long
```
