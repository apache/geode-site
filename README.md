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

This repository contains the source files for the [Apache Geode website](https://geode.apache.org). 

The repository contains two branches:

- The __master__ branch contains the site's framework, comprised of the top-level landing page and the next level of pages, such as Docs, Community, and Releases, and the tools needed to compile the deployable site. 

  Most content resides under the `website/content` directory. These sources are compiled into a deployable site by gradle scripts using a tool called [Pandoc](http://johnmacfarlane.net/pandoc).

- The __asf-site__ branch contains a copy of the deployable site built from the __master__ branch, fleshed-out with __externally-generated__ content such as the User Guide and the Javadocs, which you build separately then add manually before publishing the completed site. 

  To deploy the Apache Geode website, you push the __asf-site__ branch to the upstream Apache repository. An Apache "sync" tool monitors the __asf-site__ branch 
of the repository and publishes your update to the
[Geode website](http://geode.apache.org) after a 5-10 minute delay.


# Update procedure
Updating the website is a two-part process:

1. On the __master__ branch, update the website's framework pages.

1. Check out the __asf-site__ branch and add externally-generated content, such as the User Guide and the Javadocs.

When the site's updated framework has been fleshed-out with external content, the site is ready to be deployed.

## Prerequisites

To generate the site locally, you need to install java and docker. 

## Update the website framework

On the __master__ branch, update the website's framework pages. For a general release, this would likely include:

  - {geode-site}/website/content/index.html
  - {geode-site}/website/content/community/index.html
  - {geode-site}/website/content/docs/index.html
  - {geode-site}/website/content/releases/index.html
  - If you need to change the layout or styling of the site, then you will probably need to change
an HTML, JS or CSS file.


## Locally generate the site framework and review your changes

You should still be on the __master__ branch. 

1. Generate the site content by navigating to the top level directory of the `geode-site` repo and using gradle to compile the sources into a deployable site framework:

    ```
    $ ./gradlew compile
    ```
2. View the generated site by running:

    ```
    $ ./gradlew view
    ```
    
  and point your browser at `http://localhost:3000` to view the result. 

3. To make further changes, stop the build (Ctrl-C), edit files, recompile, and view again.

4. Once you are happy with your changes, commit them to the __master__ branch and push them to the upstream Apache repository.

## Add externally-generated content to the site framework

### 1. On the __master__ branch, run the gradle command:

    $ ./gradlew publish

  The gradle `publish` target:

  - Checks out the __asf-site__ branch, and
  - Copies the website files to their deployment directories.

**HEADS-UP**
The `gradlew publish` command *does not* update the `css` and `stylesheets` directories. If you made format changes there, you must manually merge the new versions of those files from the __master__ branch.

  - While still on the __master__ branch, save those files to a location outside the geode-site repo.
  - After running the `gradlew publish` command, copy the new versions to the appropriate directories in the __asf-site__ branch.


### 2. Add a new user guide

1. Create a local build of the User Guide as described in `{geode-project-dir}/geode-book/README.md`. 

1. Copy the User Guide to the `geode-site` repo:

  1. On the __asf-site__ branch, create a destination directory for the User Guide. The naming convention is:

        ```
        {geode-site}/website/content/docs/guide/XY
        ```
  where `XY` is the product version of your documentation (e.g., `{geode-site}/website/content/docs/guide/17` if you are publishing the documentation for Apache Geode 1.7). So, if your current working directory is the top level of `{geode-site}`, you would create the destination directory with the following command:

        ```
        $ mkdir -p {geode-site}/website/content/docs/guide/XY
        ```

  1. Navigate to the User Guide you have built in the Geode repository: `{geode-project-dir}/geode-book/final_app/public/docs/guide/XY`.

  1. Use `tar` to copy the directory in order to preserve links and other filesystem niceties.

  - Create the tarfile in your Desktop for easy access on the retrieval side.

        ```
        $ tar cvf ~/Desktop/new-guide-content.tar .
        ```

  - Navigate to the target directory and un-tar the userguide archive:

        ```
        $ cd {geode-site}/website/content/docs/guide/XY
        $ tar xvf ~/Desktop/new-guide-content.tar
        ```

### 3. Publish new javadocs

You should still be on the __asf-site__ branch. Copy new javadocs directly to the directory
`{geode-site}/releases/latest/javadoc/`.

The new javadocs _replace_ those currently within the directory.

## Deploy the update
Commit and push the __asf-site__ branch. Apache detects the update and publishes it. The site should update in 5-10 minutes.

## Troubleshooting

- If the site does not update in 5-10 minutes, __push a new commit by adding or subtracting a blank line in the top-level `index.html` file.__ This usually does the trick.

- Check your commit of the __asf-site__ branch. The site's deployable files are at the top level, rooted at {geode-site}/index.html. Make sure that directories such as `{geode-site}/docs` and `{geode-site}/releases` contain the latest versions of `index.html` and the docs.

For further assistance, you can

- [file a JIRA against the INFRA project](https://issues.apache.org/jira/browse/INFRA), or 

- ask for advice on the Infrastructure project's HipChat room [#asfinfra](https://www.hipchat.com/g4P84gemn).

