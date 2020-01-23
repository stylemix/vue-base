import ApiBase from './ApiBase'

class ApiResource extends ApiBase {

  /**
   * Method used to retrieve items from the API.
   *
   * @returns {Promise} The result in a promise.
   */
  get(config = {}) {
    return this.request('get', this.basePath, null, config)
  }

  $get(config = {}) {
    return this.get(config).then(result => this.fetchGet(result))
  }

  /**
   * Method to fetch data from get() method
   *
   * @param {Object} result Response result data
   * @return {Array}
   */
  fetchGet(result) {
    return result.data
  }

  /**
   * Method to fetch items with pagination
   *
   * @param {Number} page Page number
   * @param {Number} perPage Number of items per page
   * @param {Object} config
   * @return {Promise} The result in a promise.
   */
  paginate(page, perPage, config = {}) {
    this.setParameters(this.pagerParams(page, perPage))

    return this.get(config)
        .then(data => {
          const total = this.fetchTotal(data)
          return this.fetchGet(data)
        })
  }

  /**
   * Function that generates pagination parameters
   *
   * @param {Number} page
   * @param {Number} per_page
   * @return {Object}
   */
  pagerParams(page, per_page) {
    return {
      page,
      per_page,
    }
  }

  /**
   * Method to extract total items count
   *
   * @param {Object} data Response data
   * @return {Array}
   */
  fetchTotal(data) {
    return data.total
  }

  /**
   * Method used to fetch a single item from the API.
   *
   * @param {int} id The given identifier.
   * @param {Object} config Extra request config
   *
   * @returns {Promise} The result in a promise.
   */
  find(id, config = {}) {
    return this.request('get', this.withBasePath(`${id}`), null, config)
  }

  $find(id, config = {}) {
    return this.find(id, config).then(result => this.fetchFind(result))
  }

  /**
   * Method to fetch data from find() method
   *
   * @param {Object} result Response result data
   * @return {*}
   */
  fetchFind(result) {
    return result.data
  }

  /**
   * Method used to get a create form.
   *
   * @returns {Promise} The result in a promise.
   */
  create(config = {}) {
    return this.request('get', this.withBasePath('create'), null, config)
  }

  $create(config = {}) {
    return this.create(config).then(result => this.fetchCreate(result))
  }

  /**
   * Method to fetch data from create() method
   *
   * @param {Object} result Response result data
   * @return {*}
   */
  fetchCreate(result) {
    return result
  }

  /**
   * Method used to store a new item.
   *
   * @param {Object} item The given item.
   * @param {Object} config Additional request config.
   *
   * @returns {Promise} The result in a promise.
   */
  store(item, config = {}) {
    return this.request('post', this.basePath, item, config)
  }

  $store(item, config = {}) {
    return this.store(item, config).then(result => this.fetchStore(result))
  }

  /**
   * Method to fetch data from store() method
   *
   * @param {Object} result Response result data
   * @return {*}
   */
  fetchStore(result) {
    return result.data
  }

  /**
   * Method used to get an edit for for the item.
   *
   * @param {int}    id   The given identifier.
   * @param {Object} config Additional request config.
   *
   * @returns {Promise} The result in a promise.
   */
  edit(id, config = {}) {
    return this.request('get', this.withBasePath(`${id}/edit`), null, config)
  }

  $edit(id, config = {}) {
    return this.edit(id, config).then(result => this.fetchEdit(result))
  }

  /**
   * Method to fetch data from edit() method
   *
   * @param {Object} result Response result data
   * @return {*}
   */
  fetchEdit(result) {
    return result
  }

  /**
   * Method used to update an item.
   *
   * @param {int}    id   The given identifier.
   * @param {Object} item The given item.
   * @param {Object} config Additional request config.
   *
   * @returns {Promise} The result in a promise.
   */
  update(id, item, config = {}) {
    return this.request('put', this.withBasePath(`${id}`), item, config)
  }

  $update(id, item, config = {}) {
    return this.update(id, item, config).then(result => this.fetchUpdate(result))
  }

  /**
   * Method to fetch data from update() method
   *
   * @param {Object} result Response result data
   * @return {*}
   */
  fetchUpdate(result) {
    return result.data
  }

  /**
   * Method used to destroy an item.
   *
   * @param {int} id The given identifier.
   * @param {Object} config Additional request config.
   *
   * @returns {Promise} The result in a promise.
   */
  destroy(id, config = {}) {
    return this.request('delete', this.withBasePath(`${id}`), null, config)
  }

  $destroy(id, config = {}) {
    return this.destroy(id, config).then(result => this.fetchDestroy(result))
  }

  /**
   * Method to fetch data from destroy() method
   *
   * @param {Object} result Response result data
   * @return {*}
   */
  fetchDestroy(result) {
    return result
  }

}

export default ApiResource
