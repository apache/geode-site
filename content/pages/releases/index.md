Title: Releases
Template: releases
Lead: Apache Geode releases are available at no charge under the Apache License, in binary and source distributions.

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

## Verifying a release

Project releases are approved by a vote of the Apache Geode Project Management Committee (PMC).
The source distributions are the official releases; binary downloads are provided for the
convenience of our users.

When you download from a mirror, verify the file with the checksum and signature from the main
Apache site at [downloads.apache.org/geode](https://downloads.apache.org/geode/). The
[KEYS](https://downloads.apache.org/geode/KEYS) file contains the OpenPGP keys used to sign
releases.

To verify a signature with GPG, import the keys and check the `.asc` file:

```
gpg --import KEYS
gpg --verify apache-geode-X.Y.Z.tgz.asc apache-geode-X.Y.Z.tgz
```

To verify a SHA-256 checksum on Linux or macOS:

```
sha256sum --check apache-geode-X.Y.Z.tgz.sha256
shasum -a 256 --check apache-geode-X.Y.Z.tgz.sha256
```

On Windows, use CertUtil or PowerShell and compare the result with the `.sha256` file:

```
CertUtil -hashfile apache-geode-X.Y.Z.tgz SHA256
Get-FileHash apache-geode-X.Y.Z.tgz -Algorithm SHA256
```

To build from source, see `BUILDING.md` in the top-level source directory.

## Support

Support for a release is provided by project volunteers on the
[mailing lists](/community/#mailing-lists). Report bugs in the
[issue tracker](https://issues.apache.org/jira/browse/GEODE). The mailing lists and issue
tracker are the only support channels hosted by the Apache Geode project.
