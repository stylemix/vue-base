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
    errors() {
      return this.field.errors
    },
  }
}
