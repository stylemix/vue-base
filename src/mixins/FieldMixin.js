import keyBy from "lodash-es/keyBy";
import mapValues from "lodash-es/mapValues";
import isEqual from 'lodash-es/isEqual';
import has from 'lodash-es/has';
import HandlesValidationErrors from './HandlesValidationErrors';
import Field from '../utils/Field';
import { getProp, setProp } from "../utils/props";
import config from "../config";

export default {
  mixins: [HandlesValidationErrors],

  props: {
    field: {type: Field, required: true},
    model: {type: Object},
    eventBus: {type: Object},
    layout: {type: String},
    layoutClass: {type: String},
  },

  data: () => ({
    errorClass: 'is-invalid',
    eventBusListeners: [],
  }),

  computed: {
    /**
     * Used for v-model binding on input element
     */
    fieldValue: {
      get() {
        return this.value();
      },
      set(value) {
        this.fill(value);
      },
    },
    layoutComponent: function () {
      return (this.layout || config.defaultLayout) + '-layout';
    },
    $events() {
      return this.eventBus || this.$root;
    }
  },

  created() {
    if (this.model && !has(this.model, this.field.attribute)) {
      this.field.applyInitialValue(this.model);
    }

    // Register a global event for setting the field's value
    this.listenEventBus('field-value-' + this.field.attribute, this.fill);

    if (this.field.depends && this.field.depends.length) {
      this.field.depends.forEach(attr => {
        this.listenEventBus('field-change-' + attr, value => {
          this.triggerDependentChange(attr, value);
        });
      });

      this.triggerDependentChange();
    }
  },

  destroyed() {
    this.unlistenEventBus();
  },

  methods: {

    /**
     * Perform some sanitize actions when filling the value
     *
     * @param {*} value
     * @returns {*}
     */
    sanitizeValue(value) {
      return value;
    },

    /**
     * Update the field's value
     * @param value
     */
    fill(value) {
      let valueSet = this.sanitizeValue(value);

      if (isEqual(valueSet, this.value())) {
        return;
      }

      if (this.model) {
        setProp(this.model, this.field.attribute, valueSet);
      }

      this.triggerChange();
    },

    /**
     * Get field's value
     * @returns {*}
     */
    value() {
      return this.model ? getProp(this.model, this.field.attribute) : (this.field.multiple ? [] : null);
    },

    triggerChange() {
      this.$events.$emit('field-change', this.value(), this.field.attribute);
      this.$events.$emit('field-change-' + this.field.attribute, this.value());
    },

    triggerDependentChange(attribute, value) {
      let values = mapValues(keyBy(this.field.dependentFields, 'attribute'), (field) => {
        return getProp(this.model, field.attribute);
      });
      this.handleDependentChange(attribute, value, values);
    },

    handleDependentChange(attribute, value, values) {
      // console.log(this.field.attribute + ':handleDependentChange', arguments)
    },

    listenEventBus(event, callback) {
      this.$events.$on(event, callback);
      this.eventBusListeners.push({ event, callback });
    },

    unlistenEventBus() {
      this.eventBusListeners.forEach(({ event, callback}) => {
        this.$events.$off(event, callback);
      });
    }
  },
}
