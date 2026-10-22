[<img src="https://geode.apache.org/img/Apache_Geode_logo.png" align="center"/>](http://geode.apache.org)

# Apache Geode Website and Project Documentation

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

This repository contains the source files for the [Apache Geode project website](https://geode.apache.org).

The project website also contains the documentation for the Apache Geode project, as well as the Apache Geode community blog.

The project website is built with [Docusaurus](https://docusaurus.io/).

## Local development

### Prerequisites
- **Node.js**: `>= 18.0`
- **Package Manager**: `pnpm`

### Installation
Install dependencies:
```bash
pnpm install
```

### Starting the development server
Start a local development server with live reload at `http://localhost:3000/`:
```bash
pnpm start
```

### Building and previewing
Generate static production assets and preview the build locally:
```bash
pnpm build
pnpm serve
```

## Update procedures
Instructions for maintaining various components of the Apache Geode project website.

### Updating the website
Source code for the Apache Geode project website is stored in the `src` folder.

Elements of the home page are stored in `src/components/Homepage Features` and `src/pages`. These pages are written in TypeScript.

Subpages are stored in `src/pages`. These pages are written in Markdown.

Page styles are stored as CSS files that reside in the same folders as the pages they style.

### Updating the project documentation
Apache Geode project documentation is stored as Markdown files in the `docs` folder.

To edit project documentation:

1. Locate the Markdown file for the document you wish to edit.
2. Edit that file to introduce the changes you'd like to see.
3. Open a pull request and ask a project maintainer to review it.

### Versioning documentation
The project documentation is split into 3 distinct Docusaurus docs plugins/instances:

| Document | Plugin ID | Source Directory | Version Command |
| :--- | :--- | :--- | :--- |
| **Apache Geode** | `default` | `docs/geode` | `pnpm docusaurus docs:version <version>` |
| **Geode Native C++** | `geode_native_cpp` | `docs/geode_native_cpp` | `pnpm docusaurus docs:version:geode_native_cpp <version>` |
| **Geode Native .NET** | `geode_native_dotnet` | `docs/geode_native_dotnet` | `pnpm docusaurus docs:version:geode_native_dotnet <version>` |

#### Creating a new documentation version

To cut a new version for any of the 3 documents:

1. **Run the versioning command** for the target document:
   - For **Apache Geode**:
     ```bash
     pnpm docusaurus docs:version <version>
     ```
     *(or `pnpm docusaurus docs:version:default <version>`)*
   - For **Geode Native C++**:
     ```bash
     pnpm docusaurus docs:version:geode_native_cpp <version>
     ```
   - For **Geode Native .NET**:
     ```bash
     pnpm docusaurus docs:version:geode_native_dotnet <version>
     ```

   This snapshots the current source directory and sidebar into versioned files:
   - **Apache Geode**: creates `versioned_docs/version-<version>/`, `versioned_sidebars/version-<version>-sidebars.json`, and updates `versions.json`.
   - **Geode Native C++**: creates `geode_native_cpp_versioned_docs/version-<version>/`, `geode_native_cpp_versioned_sidebars/version-<version>-sidebars.json`, and updates `geode_native_cpp_versions.json`.
   - **Geode Native .NET**: creates `geode_native_dotnet_versioned_docs/version-<version>/`, `geode_native_dotnet_versioned_sidebars/version-<version>-sidebars.json`, and updates `geode_native_dotnet_versions.json`.

2. **Add documentation variables** for the new version in `config/doc-vars/`:
   - `config/doc-vars/geode.ts` for Apache Geode
   - `config/doc-vars/cpp.ts` for Geode Native C++
   - `config/doc-vars/dotnet.ts` for Geode Native .NET

   Add a new configuration block matching the version string (e.g. `'1.15'`) containing version-specific tokens such as `product_version`, `min_java_version`, etc.

3. **Configure version metadata in `docusaurus.config.ts` (optional)**:
   Customize the version's label, banner, or behavior under the `versions` property of the corresponding docs plugin in `docusaurus.config.ts`:
   ```typescript
   versions: {
     current: {
       label: 'Apache Geode (Next)',
     },
     '<version>': {
       label: 'Apache Geode <version>',
       banner: 'none',
     },
   }
   ```

4. **Editing versioned content**:
   - Changes to the upcoming / unreleased version are made in `docs/<document_folder>/`.
   - Changes or backports to an already versioned release are made in the respective versioned directory (e.g., `versioned_docs/version-<version>/`, `geode_native_cpp_versioned_docs/version-<version>/`, or `geode_native_dotnet_versioned_docs/version-<version>/`).

### Adding a blog post
Posts on the Apache Geode project blog are stored as Markdown files in the `blog` folder.

To add a new blog post:

1. Create a new Markdown file in the `blog` folder. The filename should follow the convention `YYYY-MM-DD-title-slug.md`.
2. Add the appropriate header to the top of the Markdown file. Use an [existing blog post](blog/2026-02-12-modernize-geode-site.md) as a guide.
3. If you're a new author, add your bio details to `authors.yml`.
4. Compose your blog post, open a pull request, and ask a project maintainer to review it.

## License
This project is licensed under the [Apache License 2.0](LICENSE). See [NOTICE](NOTICE) for additional details.

