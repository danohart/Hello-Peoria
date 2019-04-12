// This file connects to the remote prisma DB and gives us the ability to query the database
const { Prisma } = require('prisma-binding');

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.DOCKER_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});

module.exports = db;
