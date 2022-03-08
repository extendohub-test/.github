export default async ({ api, log }) => {
  const { resource, method, path, params, query, body } = api.request
  log.info(`Got ${method} to "${path}" with rest"${params.rest}" for ${resource.typeName} ${resource.name}`)
  return { method, path, resource, body, params, query }
}
