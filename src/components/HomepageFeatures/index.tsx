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

import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '👥 Replication & Partitioning',
    description: (
      <>
	      Data are easily partitioned (sharding) and replicated between nodes, which allows performance to scale as needed. Geode ensures durability through redundant in-memory copies and disk-based persistence.
      </>
    ),
  },
  {
    title: '🧊 Persistence',
    description: (
      <>
	      Write-ahead-logging (WAL) persistence with a shared-nothing architecture is optimized for fast parallel recovery of nodes or recovery of an entire cluster.
      </>
    ),
  },
  {
    title: '🚀 Performance',
    description: (
      <>
		    Linear-scaling provides low latency for transactions, reads, writes, and query processing of indexed or unindexed data.
      </>
    ),
  },
    {
        title: '🧠 In-Memory Storage',
        description: (
            <>
	            Blazing fast in-memory storage is optimized for large heaps. Use off-heap storage, compression, and features such as disk-overflow, eviction, and expiration of data.
            </>
        ),
    },
    {
        title: '🔀 Transactions',
        description: (
            <>
            ACID distributed transactions support efficient and safe coordinated operations on co-located data. Initiate or suspend transactions with either a client or a server.
            </>
        ),
    },
    {
        title: '🫧 Clustering',
        description: (
            <>
	            Highly scalable, advanced clustering technology offers failure detection, dynamic scaling, and network-partition detection algorithms.
            </>
        ),
    },
    {
        title: '🎡 Multi-Cluster',
        description: (
            <>
	            Replicate Geode clusters over WAN in various topologies (active-active, active-passive, ring, hub-spoke, and star).
            </>
        ),
    },
    {
        title: '🔒 Security',
        description: (
            <>
	            Geode uses JEP 290 ObjectInputFilter to protect against deserialization vulnerabilities and provides application-level security for HTTP session management.
            </>
        ),
    },
    {
        title: '🖥️ Management',
        description: (
            <>
	            Manage and monitor clusters with the Geode Shell (gfsh), a powerful command-line interface, and Pulse, a web-based dashboard for real-time visualization of cluster health and data distribution.
            </>
        ),
    },
];

function Feature({ title, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--left padding-horiz--md">
                <Heading as="h3" className={styles.featuresHeading}>{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

function TopAboutSection() {
    return (
        <div className={styles.aboutSection}>
            <div className="container">
                <div className={styles.aboutContent}>
                    <p className={styles.aboutTagline}>Apache Geode™ is a data management platform that provides real-time, consistent access to data-intensive applications throughout widely distributed cloud architectures.</p>
										<div className={styles.aboutButtons}>
												<a className={clsx('button button--lg', styles.primaryButton)} href="https://github.com/apache/geode/releases">Download Geode</a>
												<a className={clsx('button button--lg', styles.secondaryButton)} href="/docs">Learn more</a>
										</div>
                </div>
            </div>
        </div>
    );
}

function BottomAboutSection() {
    return (
        <div className={styles.aboutSection}>
            <div className="container">
							<div className={styles.aboutContent}>
										<Heading as="h2" className={styles.aboutHeading}>FAQs</Heading>
										<Heading as="h3" className={styles.aboutHeading}>What is Geode?</Heading>
                    <p className={styles.aboutDescription}>
                  		Apache Geode™ is an in-memory distributed database designed to provide high performance, low latency, extreme scale-out concurrency and consistency for data storage. Unlike traditional relational databases with scaling limitations, Geode scales out horizontally across many nodes to provide low latency response for thousands of concurrent read and write operations on terabytes of data in memory. And unlike many in-memory data grids, Geode can maintain a high degree of data consistency across many concurrent transactions and can operate as a highly available, resilient service. This makes possible the deployment mission-critical applications at very high scale.
										</p>
										<Heading as="h3" className={styles.aboutHeading}>Who uses Geode?</Heading>
                    <p className={styles.aboutDescription}>
                      Apache Geode™ is a mature, robust technology originally developed by GemStone Systems. Commercially available as GemFire™, it was first deployed in the financial sector as the transactional, low-latency data engine used in Wall Street trading platforms. Today, hundreds of enterprise customers use Geode technology for high-scale business applications that must meet low latency and 24x7 availability requirements.
										</p>
										<Heading as="h3" className={styles.aboutHeading}>What else can I do with Geode?</Heading>
										<p className={styles.aboutDescription}>
											Apache Geode™ offers the following additional features.
											<ul>
												<li><strong>OQL and Indexes.</strong> Object Query Language allows distributed query execution on hot and cold data, with SQL-like capabilities, including joins. Define and consistently maintain multiple kinds of indexes across the cluster.</li>
												<li><strong>Events.</strong> Clients can receive notices about server-side data events, and servers can react synchronously or asynchronously with guaranteed delivery of ordered events.</li>
												<li><strong>Functions.</strong> The same nodes storing relevant sharded data for fast parallel processing can deploy and execute distributed, location-aware user functions. Failed operations can be retried on replicant nodes.</li>
												<li><strong>Continuous Query.</strong> Clients can stay up-to-date by registering OQL queries with the Geode servers, making event-driven applications possible.</li>
												<li><strong>Clients.</strong> Clients for Java, C++, and C# .NET Framework are available. A REST API is available for all other languages.</li>
												<li><strong>Adapters.</strong> Use Geode as a drop-in replacement for Memcached, allowing use of Geode's server-side features like multi-cluster replication.</li>
											</ul>
										</p>
										<a className={clsx('button button--md', styles.primaryButton)} href="https://cwiki.apache.org/confluence/display/GEODE/FAQ">Read more</a>
                </div>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
    return (
        <section className={styles.homepageMain}>
            <TopAboutSection />
            <div className={styles.featuresSection}>
                <div className="container">
									<Heading as="h2" className={styles.featuresTitle}>Key features</Heading>		
											<div className="row">
		                        {FeatureList.map((props, idx) => (
                            <Feature key={idx} {...props} />
                        ))}
											</div>
                	</div>
              </div>
            <BottomAboutSection />
        </section>
    );
}
