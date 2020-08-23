import Errors from '../utils/Errors';
import FieldList from "../utils/FieldList";
import Field from '../utils/Field'

export default {
  data() {
    let errors = new Errors()
    let fields = new FieldList()

    return {
      model: {},
      fields,
      errors,
    }
  },

  methods: {
    /**
     * Field components register their field instance here
     *
     * @param {Field} field
     */
    registerField(field) {
      this.fields.register(field)
    },

    /**
     * Field components unregister their field instance when destroyed
     *
     * @param {Field} field
     */
    unregisterField(field) {
      this.fields.unregister(field)
    },

    /**
     * Append new dynamic field list.
     * Form components which load field list dynamically (json/remote) should use this function.
     *
     * @param {Array} fields
     */
    setFields(fields) {
      fields.forEach(fieldConfig => {
        let field = new Field(fieldConfig)
        this.fields.register(field)
      })
    },

    /**
     * Set group for fields by given attribute names
     *
     * @param {String} group
     * @param {Array} attributes
     */
    setFieldGroup(group, attributes) {
      this.fields.only(...attributes).forEach(field => {
        field.group = group
      })
    },

    /**
     * Create FormData object for the model data.
     * Used when data going to be sent as multipart/form-data
     *
     * @param {Object} model Source model
     * @param {Array|null} only (Optional) List of fields to use instead of main fields
     * @returns {FormData}
     */
    formData(model, only = null) {
      let formData = new FormData();
      let fields = only || this.fields.all();

      fields.forEach(field => {
        field.appendFormData(formData, model);
      });

      return formData;
    },

    /**
     * Set new validation errors.
     * Usually used when setting up error messages came from server.
     *
     * @param errors
     */
    setErrors(errors) {
      this.errors.clear();
      this.errors.record(errors);
    },

    /**
     * Clear validation errors.
     */
    clearErrors() {
      this.errors.clear();
    },

    /**
     * Reset field values for model. Sets initial field value.
     *
     * @param {Object} model
     */
    resetModel(model) {
      this.fields.all().forEach(field => {
        field.applyInitialValue(model);
      });
    }
  }
}
