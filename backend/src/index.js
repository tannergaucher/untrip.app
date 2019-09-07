const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('../prisma/generated/prisma-client')
const { resolvers } = require('./resolvers')

require('dotenv').config()

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_DEV_URL,
    },
  },
  details => {
    console.log(`Server is running on http://localhost:${details.port}`)
  }
)
