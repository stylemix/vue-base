import isEqual from 'lodash-es/isEqual'
import has from 'lodash-es/has'
import HandlesValidationErrors from './HandlesValidationErrors'
import Field from '../utils/Field'
import { getProp, setProp } from '../utils/props'
import config from '../config'
import strings from '../strings'
import FieldList from '../utils/FieldList'

export default {
  mixins: [HandlesValidationErrors],

  props: {
    attribute: {type: String, required: true},
    label: {type: String, default: null},
    placeholder: {type: String, default: null},
    required: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    readonly: {type: Boolean, default: false},
    multiple: {type: Boolean, default: false},
    attrs: {type: Object, default: () => {}},
    layout: {type: [Object, String], default: null},
    layoutClass: {type: String, default: null},
    model: {type: Object, default: null},
    form: {type: Object, default: null},
  },

  data: () => ({
    field: null,
  }),

  computed: {
    /**
     * Used for v-model binding on input element
     */
    fieldValue: {
      get() {
        return this.value()
      },
      set(value) {
        this.fill(value)
      },
    },

    layoutProps() {
      return {
        field: this,
        class: this.layoutClass,
      }
    },

    layoutComponent() {
      const layout = this.layout || this.field.layout || config.defaultLayout

      if (typeof layout === 'string') {
        return layout + '-layout'
      }

      return layout
    },

    formResolved() {
      if (this.form) {
        return this.form
      }

      let $vm = this
      while ($vm.$parent) {
        if ($vm.$parent.fields instanceof FieldList) {
          return $vm.$parent
        }
        $vm = $vm.$parent
      }

      return null
    },

    modelResolved() {
      return this.model || (this.formResolved && this.formResolved.model)
    },

    errors() {
      return this.formResolved && this.formResolved.errors
    },

    strings() {
      return strings
    },
  },

  created() {
    this.field = new Field({
      attribute: this.attribute,
      label: this.label,
      layout: this.layout,
      layoutClass: this.layoutClass,
      disabled: this.disabled,
      readonly: this.readonly,
    })

    if (this.formResolved) {
      this.formResolved.registerField(this.field)
    }

    if (this.modelResolved && !has(this.modelResolved, this.attribute)) {
      this.field.applyInitialValue(this.modelResolved)
    }
  },

  destroyed() {
    if (this.formResolved) {
      this.formResolved.unregisterField(this.field)
    }
  },

  methods: {

    /**
     * Perform some sanitize actions when filling the value
     *
     * @param {*} value
     * @returns {*}
     */
    sanitizeValue(value) {
      return value
    },

    /**
     * Update the field's value
     * @param value
     */
    fill(value) {
      let valueSet = this.sanitizeValue(value)

      if (isEqual(valueSet, this.value())) {
        return
      }

      if (this.model) {
        setProp(this.model, this.attribute, valueSet)
      }
    },

    /**
     * Get field's value
     * @returns {*}
     */
    value() {
      return this.model ? getProp(this.model, this.attribute) : (this.field.multiple ? [] : null)
    },
  },
}
