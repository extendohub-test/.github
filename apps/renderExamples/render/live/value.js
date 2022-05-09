export default ({ inputs, render }) => {
  const root = document.createElement('span')
  root.innerText = render.content.toString()
  if (inputs.color) root.style.color = inputs.color
  return root
}
