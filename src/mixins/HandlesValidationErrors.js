import Errors from '../utils/Errors'
import config from '../config'

export default {
  props: {
    errorBag: {
      default: () => new Errors(),
    },
  },

  data: () => ({
    errorClass: '',
  }),

  computed: {
    errorClasses() {
      return this.hasError ? [this.errorClass] : []
    },

    hasError() {
      return this.errors && this.errors.has(this.field.attribute)
    },

    errorMessages() {
      if (this.hasError && config.errorMessages) {
        return config.errorMessages === 'first'
          ? this.errors.first(this.field.attribute)
          : this.errors.get(this.field.attribute).join(config.errorMessagesGlue)
      }
    },
  },
}
