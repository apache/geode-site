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

import React, { useState, useEffect, type ReactNode } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageLogo() {
	const [isDarkTheme, setIsDarkTheme] = useState(false);
  
	useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDarkTheme(
        document.documentElement.getAttribute('data-theme') === 'dark'
      );
    };

    // Check initial theme
    checkTheme();

    // Create a MutationObserver to watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Cleanup observer
    return () => observer.disconnect();
  }, []);

  return (
    <div className={clsx(styles.heroBanner)}>
      <img 
        src={isDarkTheme ? '/img/logo-dark.png' : '/img/logo.png'}
        alt="Apache Geode™"
        className={clsx(styles.heroLogo)}
      />
    </div>
  );
}

export default function Home(): ReactNode {
    return (
        <Layout title='Apache Geode™'>
            <header className={clsx('hero', styles.heroBanner)}>
							<div className="container">
								<HomepageLogo />
							</div>
            </header>
            <main>
              <HomepageFeatures/>
            </main>
        </Layout>
    );
}
