export default async ({ api, helpers, log }) => {
  const { request, response } = api
  const handler = handlers[request.method]
  return handler ? handler(request, response, { helpers, log }) : { ...response, status: 404 }
}

const handlers = {
  get: async (request, response, { helpers, log }) => {
    const { resource, params, query } = request
    const { name } = params
    const current = await helpers.keyValue.get(name)
    log.info(`Hello ${name}(${query.who}) from ${resource.typeName} ${resource.name}\nThe value at "${name}" is:\n${JSON.stringify(current)}\n`)
    return current
  },
  post: async (request, response, { helpers, log }) => {
    const { resource, params, query, body } = request
    const { name } = params
    const old = await helpers.keyValue.get(name)
    await helpers.keyValue.set(name, body)
    log.info(`Hello ${name}(${query.who}) from ${resource.typeName} ${resource.name}\nSetting value at "${name}" to: ${JSON.stringify(body)}`)
    return old
  }
}