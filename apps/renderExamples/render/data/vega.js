async ({ inputs, render }) => {
  const content = await render.getContent({}, 'json')
  const data = typeof (content) === 'string' ? { url: content } : { values: content }
  const unique = render.hash.slice(-5)
  const script = `
    const vlSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: '${inputs.description || 'Bar chart'}',
      data: ${JSON.stringify(data, null, 2)},
      mark: '${inputs.mark}',
      encoding: ${JSON.stringify(inputs.encoding, null, 2)}
    };
    vegaEmbed('#vis${unique}', vlSpec);
  `
  const html = `
<html>
  <head>
    <title>Embedding Vega-Lite</title>
    <script src="https://cdn.jsdelivr.net/npm/vega@5.20.2"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-lite@5.1.0"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.17.0"></script>
  </head>
  <body>
    <div id="vis${unique}"></div>
    <script type="text/javascript">
      ${script}
    </script>
  </body>
</html>
`
  return { html }
}
