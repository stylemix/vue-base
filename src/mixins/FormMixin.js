import Errors from '../utils/Errors';
import FieldList from "../utils/FieldList";

export default {
  data() {
    return {
      fields: new FieldList([]),
      errors: new Errors()
    }
  },

  methods: {

    /**
     * Set new field list.
     * Implemented form components should use this function when setting up fields.
     *
     * @param {Array} fields
     */
    setFields(fields) {
      this.fields = new FieldList(fields, this.errors);
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
    setValidationErrors(errors) {
      this.errors.clear();
      this.errors.record(errors);
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
