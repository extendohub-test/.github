import { kv } from '@extendohub/storage'

export default async ({ api }) => {
  const { request, response } = api
  const handler = handlers[request.method]
  return handler ? handler(request, response) : { ...response, status: 404 }
}

const handlers = {
  get: async (request, response) => {
    const { resource, params, query } = request
    const { name } = params
    const current = await kv.get(name)
    log.info(`Hello ${name}(${query.who}) from ${resource.typeName} ${resource.name}\nThe value at "${name}" is:\n${JSON.stringify(current)}\n`)
    return response.json(current)
  },
  post: async (request, response) => {
    const { resource, params, query, body } = request
    const { name } = params
    const old = await kv.get(name)
    await kv.set(name, body)
    log.info(`Hello ${name}(${query.who}) from ${resource.typeName} ${resource.name}\nSetting value at "${name}" to: ${JSON.stringify(body)}`)
    return response.json(old)
  }
}