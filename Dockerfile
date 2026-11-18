# The container image: the checked package from CI, installed on a pinned Node.js base image.
FROM node:24-slim@sha256:dc26ae92c9fb15cf6b1d63e20f0944b2efe0f115b20e00be48fb23fceb061c54
COPY dist/*.tgz /tmp/
RUN npm install --global --no-audit --no-fund /tmp/*.tgz && rm /tmp/*.tgz
USER node
ENTRYPOINT ["slugline"]
