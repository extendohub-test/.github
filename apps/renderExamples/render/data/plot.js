async ({ inputs, render }) => {
  const content = await render.getContent({}, 'json')
  const unique = render.hash.slice(-5)
  const script = `
    const data = ${JSON.stringify(content, null, 2)}
    const marks = ${JSON.stringify(inputs.marks)}.map(mark => {
      return Plot[mark.type](mark.data || data, mark.layout)
    })
    const options = {
      marks
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
    <div id="vis${unique}"></div>
    <script type="text/javascript">
      ${script}
    </script>
  </body>
</html>
`
  return { html }
}
 