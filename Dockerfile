# Build for Local Development
FROM node:21-alpine3.18 as development

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .
USER node

# Build for Production
FROM node:21-alpine3.18 as build

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

# For Production
FROM node:21-alpine3.18 as production

WORKDIR /app

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules

CMD ["node", "dist/server.js"]