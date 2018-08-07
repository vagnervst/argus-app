FROM node:carbon

COPY . /home/app

# Setup Argus Framework
WORKDIR /home/app/argus
RUN yarn \
    && yarn run build \
    && yarn link

# Setup Argus skins
WORKDIR /home/app/argus-skin
RUN yarn \
    && yarn run build \
    && yarn link

# Setup Argus server
WORKDIR /home/app/argus-server
RUN yarn \
    && yarn link

# Setup Github Extension
WORKDIR /home/app/argus-github-extension
RUN yarn \
    && yarn link "@argus-dashboard/components" \
    && yarn run build \
    && yarn link

# Setup app
WORKDIR /home/app/pagarme-issues-dashboard
RUN yarn

# Link dependencies to app
RUN yarn link "@argus-dashboard/components" \
    && yarn link "@argus-dashboard/skin" \
    && yarn link "@argus-dashboard/server" \
    && yarn link "@argus-dashboard/github-extension"

# Build app
RUN yarn build

ENV PORT 3000
EXPOSE 3000
CMD yarn dev
