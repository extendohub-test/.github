async ({ render, inputs }) => {
  const data = await render.getContent({}, 'utf8')
  if (!data) return null
  const table = parseCSV(data)
  const lines = []
  lines.push(`<table>`)
  if (inputs.headings) lines.push(` <tr><th>${table[0].join(`</th><th>`)}</th></tr>`);
  (inputs.headings ? table.slice(1) : table).forEach(row =>
    lines.push(` <tr><td>${row.join(`</td><td>`)}</td></tr>`))
  lines.push('</table>')
  return { html: lines.join('\n') }

  function parseCSV(data, delimiter) {
    delimiter = delimiter || ","
    const pattern = new RegExp(
      "(\\" + delimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + delimiter + "\\r\\n]*))", "gi"
    )
    const result = [[]]
    let matches = null
    while (matches = pattern.exec(data)) {
      var matchedDelimiter = matches[1]
      if (matchedDelimiter.length && matchedDelimiter !== delimiter)
        result.push([])
      const matchedValue = matches[2] ? matches[2].replace(new RegExp("\"\"", "g"), "\"") : matches[3]
      result[result.length - 1].push(matchedValue)
    }
    return result
  }
}