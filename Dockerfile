FROM python:3.11-slim-bookworm

LABEL maintainer="Candy Chevalier <candysuechevalier@gmail.com>"
LABEL description="Ethical OSINT Training Laboratory CLI Environment"

# Install essential passive intelligence and networking tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    curl \
    wget \
    git \
    jq \
    dnsutils \
    whois \
    traceroute \
    iputils-ping \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Sherlock and other essential OSINT CLI utilities
RUN pip install --no-cache-dir \
    sherlock-project \
    requests \
    beautifulsoup4 \
    exifread

WORKDIR /workspace

# Keep container running for interactive work
CMD ["/bin/bash"]
