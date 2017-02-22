# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM ubuntu
LABEL maintainer Apache Geode <dev@geode.apache.org>

RUN \
    apt-get update \
    && apt-get install -y pandoc python python-pip ruby ruby-dev zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

RUN \
    locale-gen en_US.UTF-8 \
    && pip install Pygments \
    && gem install nanoc -v 4.2.0 \
    && gem install pygments.rb htmlentities pandoc-ruby nokogiri rack mime-types adsf

ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8 

EXPOSE 3000
CMD ["bash"]
