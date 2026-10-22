/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useActivePlugin} from '@docusaurus/plugin-content-docs/client';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import DocsVersionDropdownNavbarItem from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import styles from './styles.module.css';

const VERSIONED_DOC_PLUGIN_IDS = new Set([
  'default',
  'geode_native_cpp',
  'geode_native_dotnet',
]);

function DocSidebarDesktop({path, sidebar, onCollapse, isHidden, docsPluginId}) {
    const {
        navbar: {hideOnScroll},
        docs: {
            sidebar: {hideable},
        },
    } = useThemeConfig();
    const activePlugin = useActivePlugin();
    const resolvedDocsPluginId = docsPluginId ?? activePlugin?.pluginId ?? 'default';
    const showVersionSwitch = VERSIONED_DOC_PLUGIN_IDS.has(resolvedDocsPluginId);

    return (
        <div
            className={clsx(
                styles.sidebar,
                hideOnScroll && styles.sidebarWithHideableNavbar,
                isHidden && styles.sidebarHidden,
            )}>
            {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
            {showVersionSwitch && (
                <div className={styles.sidebarVersionSwitch}>
                    <span>Version: </span>
                    <DocsVersionDropdownNavbarItem
                        docsPluginId={resolvedDocsPluginId}
                        dropdownItemsBefore={[]}
                        dropdownItemsAfter={[]}
                    />
                </div>
            )}
            <Content path={path} sidebar={sidebar} />
            {hideable && <CollapseButton onClick={onCollapse} />}
        </div>
    );
}

export default React.memo(DocSidebarDesktop);
