/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {
    useActivePlugin,
    useVersions,
    useActiveDocContext,} from '@docusaurus/plugin-content-docs/client';
import {translate} from '@docusaurus/Translate';

const VERSIONED_DOC_PLUGIN_IDS = new Set([
    'default',
    'geode_native_cpp',
    'geode_native_dotnet',
]);

const getVersionMainDoc = (version) =>
    version.docs.find((doc) => doc.id === version.mainDocId);

export default function Index({
                                                          docsPluginId: docsPluginIdProp,
                                                          mobile,
                                                          dropdownActiveClassDisabled,
                                                          dropdownItemsBefore,
                                                          dropdownItemsAfter,
                                                          ...props
                                                      }) {

    const activePlugin = useActivePlugin();
    const docsPluginId = docsPluginIdProp ?? activePlugin?.pluginId ?? 'default';

    if (!VERSIONED_DOC_PLUGIN_IDS.has(docsPluginId)) {
        return null;
    }

    const activeDocContext = useActiveDocContext(docsPluginId);
    const versions = useVersions(docsPluginId);
    const latestVersionSuggestion = versions.find(
        (version) => version.isLast
    );

    function getItems() {
        const versionLinks = versions.map((version) => {
            // Try to find the same doc in the target version
            let targetPath;

            if (activeDocContext?.activeDoc) {
                const currentDocId = activeDocContext.activeDoc.id;
                const targetDoc = version.docs.find(doc => doc.id === currentDocId);

                if (targetDoc) {
                    targetPath = targetDoc.path;
                } else {
                    // Fallback to main doc if current doc doesn't exist in target version
                    targetPath = getVersionMainDoc(version).path;
                }
            } else {
                targetPath = getVersionMainDoc(version).path;
            }

            return {
                isNavLink: true,
                label: version.label,
                to: targetPath,
                isActive: () => version === activeDocContext?.activeVersion,
            };
        });
        return [...dropdownItemsBefore, ...versionLinks, ...dropdownItemsAfter];
    }

    const items = getItems();

    const dropdownVersion =
        activeDocContext?.activeVersion ?? latestVersionSuggestion;

    const dropdownLabel =
        mobile && items.length > 1
            ? translate({
                id: 'theme.navbar.mobileVersionsDropdown.label',
                message: 'Versions',
                description:
                    'The label for the navbar versions dropdown on mobile view',
            })
            : dropdownVersion?.label || 'Version';

    const dropdownTo =
        mobile && items.length > 1
            ? undefined
            : dropdownVersion ? getVersionMainDoc(dropdownVersion).path : undefined;

    if (items.length <= 1) {
        return (
            <DefaultNavbarItem
                {...props}
                mobile={mobile}
                label={dropdownLabel}
                to={dropdownTo}
                isActive={dropdownActiveClassDisabled ? () => false : undefined}
            />
        );
    }

    return (
        <DropdownNavbarItem
            {...props}
            mobile={mobile}
            label={dropdownLabel}
            to={dropdownTo}
            items={items}
            isActive={dropdownActiveClassDisabled ? () => false : undefined}
        />
    );
}
