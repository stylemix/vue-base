import Base from '../base'

export default class ApiBase {

  /**
   * The constructor of the ApiResource.
   *
   * @param {String} basePath The endpoint being used.
   * @param {String} httpEndpoint The HTTP endpoint reference name.
   */
  constructor(basePath = '', httpEndpoint = '$http') {
    this.endpoint = basePath
    this.httpEndpoint = httpEndpoint
    this.parameters = {}
  }

  /**
   * The method used to perform an AJAX-request.
   *
   * @param {string}      method The request type.
   * @param {string}      url         The URL for the request.
   * @param {Object|null} data        The data to be send with the request.
   * @param {Object}      config
   *
   * @returns {Promise} The result in a promise.
   */
  request(method, url, data = null, config = {}) {
    const request = Object.assign(
      {
        method,
        url,
        params: this.parameters,
        data,
      },
      config,
    )

    if (request.data instanceof FormData) {
      request.method = 'POST'
      request.headers = config.headers || {}
      request.headers['Content-Type'] = 'multipart/form-data'
    }

    return new Promise((resolve, reject) => {
      Base.endpoints[this.httpEndpoint](request)
        .then(response => {
          resolve(this._withResponse ? response : response.data)
        })
        .catch(({ response }) => {
          if (response) {
            reject(response)
          } else {
            reject(arguments[0])
          }
        })
    })
  }

  /**
   * Method used to set the query parameters.
   *
   * @param {Object} parameters The given parameters.
   *
   * @returns {this} The instance of the Api.
   */
  setParameters(parameters) {
    Object.keys(parameters).forEach(key => {
      this.parameters[key] = parameters[key]
    })

    return this
  }

  /**
   * Method used to set a single parameter.
   *
   * @param {string} parameter The given parameter.
   * @param {*} value The value to be set.
   *
   * @returns {this} The instance of the Api.
   */
  setParameter(parameter, value) {
    this.parameters[parameter] = value

    return this
  }

  /**
   * Method used to remove all the parameters.
   *
   * @param {Array} parameters The given parameters.
   *
   * @returns {this} The instance of the Api.
   */
  removeParameters(parameters) {
    parameters.forEach(parameter => {
      delete this.parameters[parameter]
    })

    return this
  }

  /**
   * Method used to remove a single parameter.
   *
   * @param {string} parameter The given parameter.
   *
   * @returns {this} The instance of the Api.
   */
  removeParameter(parameter) {
    delete this.parameters[parameter]

    return this
  }

  /**
   * Set flag to receive full response object when resolving
   *
   * @param {Boolean} flag
   *
   * @returns {this} The instance of the Api.
   */
  withResponse(flag = true) {
    this._withResponse = flag

    return this
  }
}
