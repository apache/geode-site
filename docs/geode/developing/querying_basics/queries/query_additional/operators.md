---
title:  Operators
sidebar_label: Operators
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

@@product_name@@ supports comparison, logical, unary, arithmetic, map, index, dot, and right arrow operators.

## Comparison Operators {#operators__section_A3FB372F85D840D7A49CB95BD7FCA7C6}
Comparison operators compare two values and return the results, either TRUE or FALSE.

The following are supported comparison operators:

| Operator | Meaning                  |
|----------|--------------------------|
| &lt;     | less than                |
| &lt;=    | less than or equal to    |
| &gt;     | greater than             |
| &gt;=    | greater than or equal to |
|          |                          |
| =        | equal to                 |
| !=       | not equal to             |
| &lt;&gt; | not equal to             |

Regarding equality and inequality operators:

- The equality and inequality operators have lower precedence than the other comparison operators.
- The equality and inequality operators can be used with null.
- Inequality queries return results for which the search field is [UNDEFINED](literals#literals__section_undefined).
- To perform equality or inequality comparisons with [UNDEFINED](literals#literals__section_undefined), use the IS\_DEFINED and IS\_UNDEFINED preset query functions instead of these comparison operators.

## Logical Operators {#operators__section_6A85A9DDA47E47009FDE1CC38D7BA66C}
The logical operators AND and OR allow you to create more complex expressions by combining expressions to produce a boolean result. When you combine two conditional expressions using the AND operator, both conditions must evaluate to true for the entire expression to be true. When you combine two conditional expressions using the OR operator, the expression evaluates to true if either one or both of the conditions are true. You can create complex expressions by combining multiple simple conditional expressions with AND and OR operators. When expressions use AND and OR operators, AND has higher precedence than OR.

## Unary Operators {#operators__section_A970AE75B0D24E0B9E1B61BE2D9842D8}
Unary operators operate on a single value or expression, and have lower precedence than comparison operators in expressions. @@product_name@@ supports the unary operator NOT. NOT is the negation operator, which changes the value of the operand to its opposite. For example, if an expression evaluates to TRUE, NOT changes it to FALSE. The operand must be a boolean.

## Arithmetic Operators {#operators_arithmetic_OQL}
Arithmetic operators operate on two values or expressions. 
Any of the expected arithmetic exceptions may result,
such as overflow or a divide by zero.
`QueryInvocationTargetException` will be thrown,
and `getCause()` will state `ArithmeticException`.

The following are supported arithmetic operators:

| Operator | Meaning                  |
|----------|--------------------------|
| +        | addition                 |
| -        | subtraction              |
| *        | multiplication           |
| /        | division                 |
| %        | modulus                  |
| MOD      | modulus                  |

## Map and Index Operators {#operators__section_E78FB4FB3703471C8186A0E26D25F01F}
Map and index operators access elements in key/value collections (such as maps and regions) and ordered collections (such as arrays, lists, and `String`s). The operator is represented by a set of square brackets (`[ ]`) immediately following the name of the collection. The mapping or indexing specification is provided inside these brackets.

Array, list, and `String` elements are accessed using an index value. Indexing starts from zero for the first element, 1 for the second element, and so on. If `myList` is an array, list, or `String` and `index` is an expression that evaluates to a non-negative integer, then `myList[index]` represents the (`index + 1`)th element of `myList`. The elements of a `String` are the list of characters that make up the string.

Map and region values are accessed by key using the same syntax. The key can be any `Object`. For a `Region`, the map operator performs a non-distributed `get` in the local cache only - with no use of `netSearch`. So `myRegion[keyExpression]` is the equivalent of `myRegion.getEntry(keyExpression).getValue`.

## Dot, Right Arrow, and Forward Slash Operators {#operators__section_6C0BB787B2324B85AA02AA19D4822A83}
The dot operator (`.`) separates attribute names in a path expression, and specifies the navigation through object attributes. An alternate equivalent to the dot is the right arrow, (`->`). The forward slash is used to separate region names when navigating into subregions.
