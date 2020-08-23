import HandlesValidationErrors from './HandlesValidationErrors'

export default {
  mixins: [HandlesValidationErrors],

  props: {
    field: {type: Object, required: true},
    showLabel: {type: Boolean, default: true},
    showHelpText: {type: Boolean, default: true},
  },

  computed: {
    attribute() {
      return this.field.attribute
    },

    layoutClassResolved() {
      return [...this.errorClasses]
    },

    errors() {
      return this.field.errors
    },

    labelProps() {
      return {
        label: this.field.label,
        labelHtml: this.field.labelHtml,
        required: this.field.required,
        showLabel: this.showLabel,
      }
    },

    errorsProps() {
      return {
        hasError: this.hasError,
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
