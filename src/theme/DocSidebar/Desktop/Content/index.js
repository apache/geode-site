/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import DocSidebarItems from '@theme/DocSidebarItems';
import styles from './styles.module.css';

export default function DocSidebarDesktopContent({path, sidebar}) {
    return (
        <nav
            className={clsx(
                'menu thin-scrollbar',
                styles.menu,
                ThemeClassNames.docs.docSidebarMenu,
            )}>
            <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
                <DocSidebarItems items={sidebar} activePath={path} level={1} />
            </ul>
        </nav>
    );
}