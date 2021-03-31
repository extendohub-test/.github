({ content, inputs, context }) => {
  const { _ } = context
  const { controls, autoplay } = inputs
  const setup = { controls: _.defaultTo(controls, true), autoplay: _.defaultTo(autoplay, false), preload: 'auto' }
  const fileAndQuery = content.split('/').slice(-1)[0]
  const title = fileAndQuery.split('?').slice(0, 1)[0]
  const html = `
  <html>
  <head>
  <title>${title}</title>
  <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.11.7/video-js.min.css" integrity="sha512-fteJK9ZlHSFXwfkV3ASsRd6CLzPIK1C5wCpbDfYJaRmjUiezOU28xJwrALF+agINF8c6do/EOXXOqI2IDPUwQw==" crossorigin="anonymous" />
  </head>
  <body>
    <div class="egh-center-justified" >
      <div class="egh-tm-10" >
        <video id="rendered" class="video-js vjs-big-play-centered vjs-fill" data-setup='${JSON.stringify(setup)}' >
          <source src="${content}" type="video/mp4" />
        </video>
      </div >
    </div >
    <script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.11.7/video.min.js" integrity="sha512-+n1LqBtKBxGt2673VCcanmzSLgQ8Mfi9NCjg6wI9UOSH//GIBD+2Oe+hFqLdpMMXkuNuGOuPPv+qI3tfq6p9Hw==" crossorigin="anonymous"></script>
    <script>
      const register = function () {
          videojs("rendered", {}, function() {
            // setup a listener to tell the parent DOM that the child is "ready"
            this.on('ready', function () { 
              window.parent.postMessage('renderedReady', 'https://github.com')
          })
        })
      }
      // hook into parent lifecycle to register our child listener
      if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(register, 1)
      } else {
        document.addEventListener("DOMContentLoaded", register, false)
      }
    </script>
  </body>
</html>
`
  return { html }
}
