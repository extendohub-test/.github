async ({ inputs, render }) => {
  const content = await render.getContent({}, 'json')
  const unique = render.hash.slice(-5)
  const script = `
    const data = ${JSON.stringify(content, null, 2)}
    const options = {
      marks: [
        Plot.barY(data, { x: '${inputs.xColumn}', y: '${inputs.yColumns[0]}' })
      ]
    }
    const target = document.querySelector('#vis${unique}')
    target.appendChild(Plot.plot(options))
  `
  const html = `
<html>
  <head>
    <title>Embedded Plot</title>
    <script src="https://cdn.jsdelivr.net/npm/d3@6"></script>
    <script src="https://cdn.jsdelivr.net/npm/@observablehq/plot@0.1"></script>
  </head>
  <body>
    <div style="display: flex; justify-content: center;">
      <div id="vis${unique}"></div>
    </div>
    <script type="text/javascript">
      ${script}
    </script>
  </body>
</html>
`
  return { html }
}
 