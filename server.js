import { fastify } from "fastify"
import { DatabaseMemory } from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

/*
server.get("/", () => {
  return "Olá Mundo!"
})
*/

server.post("/manga", (request, reply) => {
  const { obra, mangaka, quantidade_volume } = request.body
  database.create({
    obra: obra,
    mangaka: mangaka,
    quantidade_volume: quantidade_volume,
  })
  console.log(database.list())
  return reply.status(201).send()
})

server.get("/manga", (request) => {
  const search = request.query.search

  console.log(search)

  const mangas = database.list(search)

  return mangas
})

server.put("/manga/:id", (request, reply) => {
  const mangaId = request.params.id
  const { obra, mangaka, quantidade_volume } = request.body
  const manga = database.update(mangaId, {
    obra,
    mangaka,
    quantidade_volume,
  })
  return reply.status(204).send()
})

server.delete("/manga/:id", (request, reply) => {
  const mangaId = request.params.id

  database.delete(mangaId)

  return reply.status(204).send()
})

server.listen({
  port: 3333,
})
