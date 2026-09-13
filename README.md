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

# Apache Geode Website

This repository contains the source of the [Apache Geode website](https://geode.apache.org).
The site is built with [Pelican](https://getpelican.com) by the
[ASF Infrastructure Pelican action](https://github.com/apache/infrastructure-actions/tree/main/pelican).

## How publishing works

- The **master** branch holds the site source.
- On every push to master, GitHub Actions builds the site and commits the result to the
  `output/` directory of the **asf-site** branch. The ASF serves that directory as
  https://geode.apache.org. Do not edit asf-site by hand.
- Pull requests are built but not published, so template and content errors show up in review.

## Layout

| Path | Contents |
|------|----------|
| `content/pages/` | Site pages in Markdown. `docs/index.md` becomes `/docs/`. |
| `data/releases.yaml` | Releases shown on `/releases/` and the home page. |
| `data/features.yaml` | Feature grid on the home page. |
| `theme/geode/` | Jinja templates, CSS, and vendored Bootstrap. |
| `content/docs/`, `content/releases/` | Generated user guides and API references, copied as is. |
| `content/stylesheets/`, `content/javascripts/`, `content/fonts/`, `content/images/` | Assets used by the generated user guides. |
| `content/schema/` | XML schemas referenced by Geode configuration files. Do not move. |
| `content/.htaccess` | Redirects. |
| `pelicanconf.py` | Pelican settings. |

## Build and preview locally

You need Python 3.10 or later.

```
git clone https://github.com/apache/infrastructure-actions.git ../infrastructure-actions
python3 -m venv .venv
. .venv/bin/activate
pip install "pelican[markdown]==4.11.0.post0" ../infrastructure-actions/pelican
pelican content -o output -e 'PLUGIN_PATHS=["../infrastructure-actions/pelican/plugins"]' -r -l
```

Open http://localhost:8000.

The published site renders Markdown with GitHub Flavored Markdown (libcmark-gfm). Without it, the
local build falls back to Pelican's standard Markdown reader, which is close enough for most
edits. To match the published output exactly, build libcmark-gfm with
`../infrastructure-actions/pelican/build-cmark.sh` and export the `LIBCMARKDIR` it prints before
running `pelican`.

## Check license headers

Every source file needs the Apache license header. Check with
[Apache RAT](https://creadur.apache.org/rat/) before sending a pull request:

```
java -jar apache-rat-0.16.1.jar --dir . --exclude-file .rat-excludes
```

`.rat-excludes` lists files that cannot carry a header: third-party code covered by `LICENSE`,
binary images and fonts, and the generated user guides and API references.

## Common updates

### Announce a release

1. Add the release at the top of its line in `data/releases.yaml`.
2. Remove any release that is no longer on https://downloads.apache.org/geode/. Older releases
   are reached through the archive link on the page.
3. If the release adds a new user guide, add it to `content/pages/docs/index.md`.

### Publish a user guide

1. Build the guide as described in `geode-book/README.md` in the Geode repository.
2. Copy it to `content/docs/guide/XY`, where `XY` is the version without dots (for example `20`
   for 2.0). Use `tar` to preserve the directory structure.
3. For the newest release line, replace `content/docs/guide/latest` with a copy of the same guide.
4. Link it from `content/pages/docs/index.md`.

### Publish API documentation

Replace the contents of `content/releases/latest/javadoc/` with the new Javadoc. The native client
API references live in `content/releases/latest/cppdocs/` and `content/releases/latest/dotnetdocs/`.
