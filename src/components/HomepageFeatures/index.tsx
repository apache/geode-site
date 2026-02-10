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

import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Replication and Partitioning',
    description: (
      <>
          Data can easily be partitioned (sharded) or replicated between nodes allowing performance to scale as needed.
          Durability is ensured through redundant in-memory copies and disk-based persistence.
      </>
    ),
  },
  {
    title: 'Persistence',
    description: (
      <>
          Super fast write-ahead-logging (WAL) persistence with a shared-nothing architecture that is optimized for fast
          parallel recovery of nodes or an entire cluster.
      </>
    ),
  },
  {
    title: 'Performance',
    description: (
      <>
          Linear-scaling low latency for transactions, reads,
          writes and query processing of indexed or unindexed data.
      </>
    ),
  },
    {
        title: 'In-Memory Storage',
        description: (
            <>
                Blazing fast in-memory storage optimized for large heaps, with the option of using off-heap storage,
                compression and features such as disk-overflow, eviction and expiration of data.
            </>
        ),
    },
    {
        title: 'Functions',
        description: (
            <>
                Distributed location-aware user functions can be deployed and executed by the same nodes storing
                relevant sharded data for fast parallel processing. Failed operations can be retried on replicant nodes.
            </>
        ),
    },
    {
        title: 'Transactions',
        description: (
            <>
                ACID distributed transactions support efficient and safe coordinated operations on colocated data.
                Transactions can be initiated or suspended by either a client or a server.
            </>
        ),
    },
    {
        title: 'OQL and Indexes',
        description: (
            <>
                Object Query Language allows distributed query execution on hot and cold data, with SQL-like
                capabilities, including joins. Multiple kinds of indexes can be defined and consistently
                maintained across the cluster.
            </>
        ),
    },
    {
        title: 'Events',
        description: (
            <>
                Clients can be notified about server-side data events, and servers can react synchronously or
                asynchronously with guaranteed delivery of ordered events.
            </>
        ),
    },
    {
        title: 'Clustering',
        description: (
            <>
                Highly scalable, robust advanced clustering technology with failure detection,
                dynamic scaling, and network-partition detection algorithms.
            </>
        ),
    },
    {
        title: 'Multi-Cluster',
        description: (
            <>
                Geode clusters can be replicated over WAN in various topologies:
                active-active, active-passive, ring, hub-spoke, star, etc.
            </>
        ),
    },
    {
        title: 'Continuous Query',
        description: (
            <>
                Clients can stay up to date by registering OQL queries with the Geode servers,
                making event-driven applications possible.
            </>
        ),
    },
    {
        title: 'Clients',
        description: (
            <>
                Clients are available for Java, C++, and C# .NET Framework. A REST API is available for all other languages.
            </>
        ),
    },
    {
        title: 'Adapters',
        description: (
            <>
                Geode can be used as a drop-in replacement for memcached,
                allowing use of Geode's server-side features like multi-cluster replication.
            </>
        ),
    },
    {
        title: '',
        description: (
            <>

            </>
        ),
    },
];
function Feature({title, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
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
                    <p className={styles.aboutTagline}>
                    Apache Geode™ is a data management platform that provides real-time, consistent access to data-intensive applications throughout widely distributed cloud architectures.
                    </p>
                        <a className={clsx('button button--primary button--lg', styles.downloadButton)} href="https://github.com/apache/geode/releases">Download Geode</a>
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
										<h2>How does Geode work?</h2>
                    <p className={styles.aboutDescription}>
                        Geode pools memory, CPU, network resources, and optionally local disk across multiple processes
                        to manage application objects and behavior. It uses dynamic replication and data partitioning
                        techniques to implement high availability, improved performance, scalability, and fault
                        tolerance. In addition to being a distributed data container, Apache Geode is an in-memory data
                        management system that provides reliable asynchronous event notifications and guaranteed message
                        delivery.
                    </p>
										<h2>Who uses Geode?</h2>
                    <p className={styles.aboutDescription}>
                        Apache Geode is a mature, robust technology originally developed by GemStone Systems.
                        Commercially available as GemFire™, it was first deployed in the financial sector as the transactional, low-latency data engine used in Wall Street trading platforms.
                        Today Apache Geode technology is used by hundreds of enterprise customers for high-scale business applications that must meet low latency and 24x7 availability requirements.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.homepageMain}>
            <TopAboutSection />

            <div className={styles.featuresSection}>
                <div className="container">
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
