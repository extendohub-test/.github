export default async ({ api }) => {
  const { resource, method, path, params, query, body } = api.request
  console.info(`Got ${method} to "${path}" with rest "${params.rest}" for ${resource.typeName} ${resource.name}`)
  return { method, path, resource, body, params, query }
}
