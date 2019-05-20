import pick from "lodash-es/pick";
import values from "lodash-es/values";
import keyBy from "lodash-es/keyBy";
import omit from "lodash-es/omit";
import filter from "lodash-es/filter";
import find from "lodash-es/find";
import Field from './Field';

/**
 * @property {Array} list
 * @property {Errors} errors
 */
export default class FieldList {

  constructor(fields, errors) {
    this.list = [];
    this.byAttribute = {};
    this.errors = errors

    // Collect Field instances
    fields.forEach(fieldConfig => {
      let field = new Field(fieldConfig);
      field.errors = this.errors;
      this.list.push(field);
      this.byAttribute[field.attribute] = field;
    });

    // Collect dependencies and assign
    this.list.forEach(field => {
      if (!field.depends) {
        return;
      }

      field.dependentFields = this.only(...field.depends);
    });
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
