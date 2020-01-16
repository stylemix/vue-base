import Vue from 'vue'
import axios from 'axios'

const Base = {

  /**
   * Defined endpoints
   */
  endpoints: {},

  /**
   * Create new API endpoint
   *
   * @param {PropertyKey} name
   * @param {Object} config
   */
  httpEndpoint(name, config) {
    let _config = {
      // guard against mix of standards
      baseURL: config.baseUrl || config.baseURL,
      headers: {
        common: {
          'Accept': 'application/json',
          ...(config.commonHeaders || {})
        },
        ...(config.headers || {})
      },
      ...config,
    }

    // clean shorthand props
    delete _config.baseUrl
    delete _config.commonHeaders
    const instance = axios.create(_config)

    // Add global reference
    Base.endpoints[name] = Vue[name] = instance

    // Add instance reference
    Object.defineProperty(Vue.prototype, name, {
      get() {
        return instance
      },
    })

    return instance
  }
}

export default Base
