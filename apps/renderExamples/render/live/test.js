export default ({ render }) => {
  const root = document.createElement('span')
  root.innerText = render.content.toString()
  return root
}
