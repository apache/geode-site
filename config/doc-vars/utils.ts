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

import fs from 'fs';
import path from 'path';

export function getLatestJavadocVersion(majorMinor: string, fallback: string): string {
    try {
        const javadocsDir = path.resolve(__dirname, '../../static/javadocs');
        if (!fs.existsSync(javadocsDir)) {
            return fallback;
        }
        const entries = fs.readdirSync(javadocsDir, {withFileTypes: true});
        const matchingVersions = entries
            .filter((entry) => entry.isDirectory() && (entry.name === majorMinor || entry.name.startsWith(`${majorMinor}.`)))
            .map((entry) => entry.name)
            .sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}));

        if (matchingVersions.length > 0) {
            return matchingVersions[matchingVersions.length - 1];
        }
    } catch {
        // Fall back gracefully
    }
    return fallback;
}
