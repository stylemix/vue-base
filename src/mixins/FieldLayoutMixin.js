import HandlesValidationErrors from './HandlesValidationErrors'

export default {
  mixins: [HandlesValidationErrors],

  props: {
    field: {type: Object, required: true},
    fieldLabel: {type: String},
    layoutClass: {type: String},
    showLabel: {type: Boolean, default: true},
    showHelpText: {type: Boolean, default: true},
  },

  computed: {
    layoutClassResolved() {
      return [this.field.layoutClass || this.layoutClass, ...this.errorClasses]
    },

    errors() {
      return this.field.errors
    },

    labelProps() {
      return {
        field: this.field,
        fieldLabel: this.fieldLabel,
        showLabel: this.showLabel,
      }
    },

    errorsProps() {
      return {
        field: this.field,
        hasErrors: this.hasErrors,
        errorMessages: this.errorMessages,
      }
    },

    helpTextProps() {
      return {
        field: this.field,
        showHelpText: this.showHelpText,
      }
    },
  },
}
