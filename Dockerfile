FROM node:carbon

COPY . /app

# Setup Argus Framework
WORKDIR /app/argus
RUN yarn install \
    && yarn run build \
    && yarn link

# Setup Argus skins
WORKDIR /app/argus-skin
RUN yarn install \
    && yarn run build \
    && yarn link

# Setup Argus server
WORKDIR /app/argus-server
RUN yarn install \
    && yarn link

# Setup Github Extension
WORKDIR /app/argus-github-extension
RUN yarn install \
    && yarn run build \
    && yarn link "@argus-dashboard/components" \
    && yarn link

# Setup app
WORKDIR /app/pagarme-issues-dashboard
RUN yarn install

# Link dependencies to app
RUN yarn link "@argus-dashboard/components" \
    && yarn link "@argus-dashboard/skin" \
    && yarn link "@argus-dashboard/server" \
    && yarn link "@argus-dashboard/github-extension" \
    && yarn run build

ENV PORT 3000
EXPOSE 3000
CMD yarn start
