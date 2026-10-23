/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {visit} from 'unist-util-visit';

type ReplacementMap = Record<string, string>;
type ValuesByVersion = Record<string, ReplacementMap>;

type Options = {
    pluginId: string;
    valuesByVersion: ValuesByVersion;
};

function normalizePath(filePath: string): string {
    return filePath.replace(/\\/g, '/');
}

function detectVersion(filePath: string, pluginId: string): string {
    const p = normalizePath(filePath);

    if (pluginId === 'default') {
        if (p.includes('/docs/geode/')) {
            return 'current';
        }

        const match = p.match(/\/versioned_docs\/version-([^/]+)\//);
        if (match) {
            return match[1];
        }

        return 'current';
    }

    if (pluginId === 'geode_native_cpp') {
        if (p.includes('/docs/geode_native_cpp/')) {
            return 'current';
        }

        const match = p.match(/\/geode_native_cpp_versioned_docs\/version-([^/]+)\//);
        if (match) {
            return match[1];
        }

        return 'current';
    }

    if (pluginId === 'geode_native_dotnet') {
        if (p.includes('/docs/geode_native_dotnet/')) {
            return 'current';
        }

        const match = p.match(/\/geode_native_dotnet_versioned_docs\/version-([^/]+)\//);
        if (match) {
            return match[1];
        }

        return 'current';
    }

    return 'current';
}

function applyReplacements(value: string, replacements: ReplacementMap): string {
    let updated = value;

    for (const [token, replacement] of Object.entries(replacements)) {
        updated = updated.replaceAll(`@@${token}@@`, replacement);
    }

    return updated;
}

export default function replaceDocVars(options: Options) {
    const {pluginId, valuesByVersion} = options;

    return function transformer(tree: any, file: any) {
        const filePath =
            (Array.isArray(file.history) && file.history[0]) || file.path || '';

        const version = detectVersion(filePath, pluginId);
        const replacements =
            valuesByVersion[version] ?? valuesByVersion.current ?? {};

        visit(tree, (node: any) => {
            if (typeof node.value === 'string') {
                node.value = applyReplacements(node.value, replacements);
            }
        });
    };
}