#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

"""Pelican settings for the Apache Geode website.

The ASF Pelican action runs this file with exec(), so it must not rely on
__file__. Paths are relative to the repository root.
"""

import datetime
import os

import yaml

SITENAME = 'Apache Geode'
SITEDESC = ('Apache Geode is a data management platform that provides real-time, '
            'consistent access to data-intensive applications throughout widely '
            'distributed cloud architectures.')
SITEURL = 'https://geode.apache.org'
SITEREPOSITORY = 'https://github.com/apache/geode-site'
CURRENTYEAR = datetime.date.today().year

TIMEZONE = 'UTC'
DEFAULT_LANG = 'en'

PATH = 'content'
THEME = 'theme/geode'
THEME_STATIC_DIR = 'theme'

# GitHub Flavored Markdown needs libcmark-gfm, which the ASF Pelican action
# builds and exposes through LIBCMARKDIR. Without it, fall back to Pelican's
# built-in Markdown reader so the site can still be previewed locally.
# asfgenid adds heading ids so sections can be linked, e.g. /community/#events.
PLUGINS = (['gfm'] if os.environ.get('LIBCMARKDIR') else []) + ['asfgenid']

ASF_GENID = {
    'unsafe_tags': False,
    'metadata': False,
    'elements': False,
    'headings': True,
    'headings_re': r'^h[2-3]',
    'permalinks': False,
    'toc': False,
    'toc_headers': r'h[2-3]',
    'tables': False,
    'debug': False,
}

# Site pages are Markdown files under content/pages. The site has no articles.
PAGE_PATHS = ['pages']
ARTICLE_PATHS = ['blog']
PATH_METADATA = r'pages/(?P<path_no_ext>.*)\..*'
PAGE_URL = '{path_no_ext}.html'
PAGE_SAVE_AS = '{path_no_ext}.html'
PAGE_TRANSLATION_ID = None

# Copied to the output unchanged. docs/ and releases/ hold the generated user
# guides and API references; stylesheets/, javascripts/, fonts/ and images/
# are used by those generated pages.
STATIC_PATHS = [
    '.htaccess',
    'doap_Geode.rdf',
    'docs',
    'favicon.ico',
    'fonts',
    'images',
    'img',
    'javascripts',
    'releases',
    'schema',
    'stylesheets',
]

# Never treat generated HTML as page sources.
READERS = {'html': None}

# Disable blog features.
DIRECT_TEMPLATES = []
INDEX_SAVE_AS = ''
TAGS_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
ARCHIVES_SAVE_AS = ''
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None


def _load_data(name):
    with open(os.path.join('data', name), encoding='utf-8') as f:
        return yaml.safe_load(f)


RELEASES = _load_data('releases.yaml')
FEATURES = _load_data('features.yaml')
