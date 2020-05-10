<template>
  <component
    :is="layoutComponent"
    v-bind="layoutProps">
    <template slot="field">
      <slot :name="`field(${field.attribute})`" v-bind="{ field }">
        <input
          :id="field.attribute"
          :type="inputType"
          :min="inputMin"
          :max="inputMax"
          :step="inputStep"
          :pattern="inputPattern"
          v-model="fieldValue"
          class="form-control"
          :class="errorClasses"
          :placeholder="inputPlaceholder"
          :readonly="isReadonly"
          :disabled="isDisabled"
          v-bind="field.attrs"/>
      </slot>
    </template>
  </component>
</template>

<script>
  import { FieldMixin } from '../mixins';

  export default {
    name: 'FormTextField',

    mixins: [FieldMixin],

    props: {
      placeholder: {},
      step: {},
      min: {},
      max: {},
      pattern: {},
    },

    computed: {
      /**
       * Get the input type.
       */
      inputType() {
        return this.field.type || 'text'
      },

      /**
       * Get the input placeholder.
       */
      inputPlaceholder() {
        return this.placeholder || this.field.placeholder
      },

      /**
       * Get the input step amount.
       */
      inputStep() {
        return this.step || this.field.step
      },

      /**
       * Get the input minimum amount.
       */
      inputMin() {
        return this.min || this.field.min
      },

      /**
       * Get the input maximum amount.
       */
      inputMax() {
        return this.max || this.field.max
      },

      /**
       * Get the pattern that should be used for the field
       */
      inputPattern() {
        return this.pattern || this.field.pattern
      },
    },

    methods: {
      sanitizeValue(value) {
        if (this.field.type === 'number') {
          return Number(value);
        }

        return value;
      },
    },
  }
</script>
