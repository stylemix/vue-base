import { getProp, setProp } from './props';
import cloneDeep from 'lodash-es/cloneDeep';
import { appendFormData, formDataName } from './form_data';

/**
 * @property {String} attribute
 * @property {String} component
 * @property {Boolean} multiple
 * @property {*} initialValue
 * @property {Array} depends
 * @property {Array} dependentFields
 * @property {Errors} errors
 */
export default class Field {

  /**
   * Construct the Field instance
   *
   * @param {Object} field
   */
  constructor(field) {
    this.attribute = null;
    this.component = null;
    this.initialValue = null;
    this.required = false;
    this.multiple = false;
    this.disabled = false;
    this.readonly = false;
    this.depends = [];
    this.dependentFields = [];
    this.attrs = {};
    Object.assign(this, field);
  }

  /**
   * Sets model value to initial value
   *
   * @param {Object} model
   */
  applyInitialValue(model) {
    setProp(model, this.attribute, cloneDeep(this.initialValue) || (this.multiple ? [] : null));
  }

  /**
   * Appends model value to FormValue
   *
   * @param {FormData} formData
   * @param {Object} model
   */
  appendFormData(formData, model) {
    appendFormData(formData, getProp(model, this.attribute), formDataName(this));
  }
}
