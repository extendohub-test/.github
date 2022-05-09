async ({ render }) => {
  const content = await render.getContent()
  return { html: `<code>${content}</code>` }
}