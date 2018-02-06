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

[<img src="https://geode.apache.org/img/apache_geode_logo.png" align="center"/>](http://geode.apache.org)

[![Build Status](https://travis-ci.org/apache/geode-site.svg?branch=master)](https://travis-ci.org/apache/geode-site) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) 

# Apache Geode Site

This directory contains the source files for the project [website](https://geode.apache.org). Website content is written in [Markdown](https://help.github.com/articles/markdown-basics) and the site files are generated from that source by a tool called [Pandoc](http://johnmacfarlane.net/pandoc).

Source files for the website are in `website/content`. Generated files for the website are in `build/content`.

**NOTE:** To make changes to the [Apache Geode User Guide](http://geode.apache.org/docs/), which is published to the website:

- Review [CONTRIBUTING](https://github.com/apache/geode/blob/develop/geode-docs/CONTRIBUTE.md) in the Geode repository for information about contributing to the documentation source files.
- Follow the [README](https://github.com/apache/geode/blob/develop/geode-book/README.md) in the Geode repository's `geode-book` directory for information about building a local version of the guide and adding it to the website.

The website is updated by a "sync" tool that monitors the __asf-site__ branch 
of our Git repo, so after making changes you must place your updated source
and generated files on the __asf-site__ branch and push.
The content will be published to the
[Geode website](http://geode.apache.org) after a 5-10 minute delay.

## Prerequisites

To generate the site locally, you need to install java and docker. 

## How to change/update the website

### 1. Find and edit the source files you need to change

Source files for the website are in ``website/content``.  When changing the content of the site, find the Markdown files that you
need to edit and make your change. If you need to change the layout or styling of the site, then you will probably need to change
an HTML, JS or CSS file.

### 2. Locally generate the site and test your changes

To generate the site content, navigate to the top level directory of the repo and use gradle to run the `nanoc` compiler:

    $ ./gradlew compile

To view the generated site, run:

    $ ./gradlew view

and point your browser at `http://localhost:3000`. To make further changes, stop the build, edit files, recompile, and view again.

### 3. Publish your changes to the site

Once you are happy with your changes, commit them to the __master__ branch.
The changes also need to be propagated to the __asf-site__ branch. Run the
gradle command

    $ ./gradlew publish

to checkout the __asf-site__ branch and copy the website files.  You will
need to manually commit and push your changes on the __asf-site__ branch.

The site should update in 5-10 minutes. If it does not, 

- Push a new commit by adding or subtracting a blank line, or
- [file a JIRA against the INFRA project](https://issues.apache.org/jira/browse/INFRA), or 
- ask for advice on the Infrastructure project's HipChat room
[#asfinfra](https://www.hipchat.com/g4P84gemn).
