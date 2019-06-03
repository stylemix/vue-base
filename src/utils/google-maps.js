import config from '../extra-fields/config';

export function loadGoogleMaps(libs) {
  let interval = null

  return new Promise(resolve => {
    if (window.google) {
      resolve()
      return
    }

    const scripts = document.querySelectorAll(
      'script[src^="https://maps.googleapis.com/maps/api/js"]',
    )

    if (!scripts || !scripts.length) {
      // no google maps script tag added to DOM
      // so insert it manually
      const apiKey = config.googleKey || process.env.VUE_APP_GOOGLE_MAP_KEY

      if (!apiKey) {
        const message = `No Google Maps API key is provided. Is VUE_APP_GOOGLE_MAP_KEY variable defined in .env.* file?`
        console.warn(message)
        resolve()
        return
      }

      let scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`

      if (libs && libs.length)
        scriptSrc = `${scriptSrc}&libraries=${libs.join()}`

      // create script with src and insert it
      const scriptEl = document.createElement('script')
      scriptEl.setAttribute('src', scriptSrc)
      document.head.appendChild(scriptEl)
    }

    // google is not defined/loaded yet
    // so insert script element
    // and wait for global "window.google" variable
    interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval)
        resolve()
      }
    }, 200)
  })
}
