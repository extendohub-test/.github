import https from 'https'

export default async ({ render }) => {
  const content = await render.getContent()
  let file = null
  let node = null
  if (content.match(/^https:\/\/(www.)?figma.com\/file/)) {
    const matches = content.match(/file\/(.*?)[\/\?].*?node-id=(.*)(?:(?:%3A)|:)(.*)$/m)
    if (!matches) return null
    file = matches[1]
    node = `${matches[2]}:${matches[3]}`
  } else
    [file, node] = content.trim().split('#')

  const response = await new Promise(resolve => {
    const headers = {
      'X-FIGMA-TOKEN': process.env.FIGMA_TOKEN
    }
    https.get(`https://api.figma.com/v1/images/${file}?ids=${node}`, { headers }, resolve);
  })
  let data = await new Promise((resolve, reject) => {
    let data = ''
    response.on('data', chunk => data += chunk)
    response.on('error', err => reject(err))
    response.on('end', () => resolve(data))
  })

  const images = JSON.parse(data).images
  const imageUrl = images[node]
  if (!imageUrl) return null
  const html = `<img src="${imageUrl}" />`
  return { html } 
}
