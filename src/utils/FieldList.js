import pick from 'lodash-es/pick';
import values from 'lodash-es/values';
import omit from 'lodash-es/omit';
import filter from 'lodash-es/filter';
import find from 'lodash-es/find';
import Field from './Field';
import indexOf from 'lodash-es/indexOf'

/**
 * @property {Field[]} list
 * @property {Object<Field>} byAttribute
 */
export default class FieldList {

  constructor() {
    this.list = [];
    this.byAttribute = {};
  }

  /**
   * Register field instance
   *
   * @param {Field} field
   */
  register(field) {
    let attribute = field.attribute

    // remove existing duplicate by attribute
    if (this.byAttribute[attribute]) {
     this.unregister(field)
    }

    this.list.push(field)
    this.byAttribute[attribute] = field
  }

  /**
   * Unregister (remove) field instance
   *
   * @param {Field} field
   */
  unregister(field) {
    let attribute = field.attribute
    if (this.byAttribute[attribute]) {
      let existent = this.byAttribute[attribute]
      let index = indexOf(this.list, existent)
      if (index >= 0) {
        delete this.list[index]
      }
    }
  }

  /**
   * Get all fields
   *
   * @returns {Field[]}
   */
  all() {
    return this.list
  }

  /**
   * @returns {Field}
   */
  get(attribute) {
    return this.byAttribute[attribute];
  }

  /**
   * @returns {Field}
   */
  find(predicate) {
    return find(this.list, predicate);
  }

  /**
   * @returns {Field[]}
   */
  only(...attributes) {
    return values(pick(this.byAttribute, attributes))
  }

  /**
   * @returns {Field[]}
   */
  except(...attributes) {
    return values(omit(this.byAttribute, attributes))
  }

  /**
   * @returns {Field[]}
   */
  filter(predicate) {
    return filter(this.list, predicate)
  }

}
